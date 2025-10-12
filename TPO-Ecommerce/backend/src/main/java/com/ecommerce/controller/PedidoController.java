package com.ecommerce.controller;

import com.ecommerce.dto.CreatePedidoDTO;
import com.ecommerce.dto.PedidoDTO;
import com.ecommerce.entity.EstadoPedido;
import com.ecommerce.entity.Pedido;
import com.ecommerce.entity.Usuario;
import com.ecommerce.exception.PedidoNotFoundException;
import com.ecommerce.service.PedidoService;
import com.ecommerce.service.UsuarioService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * GET /api/pedidos
     * Obtiene todos los pedidos (solo ADMIN)
     */
    @GetMapping
    public ResponseEntity<?> obtenerTodosLosPedidos(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            // Validar que sea admin
            if (!isAdmin(authHeader)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(createErrorResponse("Solo administradores pueden ver todos los pedidos"));
            }
            
            List<PedidoDTO> pedidos = pedidoService.obtenerTodosLosPedidos()
                    .stream()
                    .map(PedidoDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al obtener pedidos"));
        }
    }
    
    /**
     * GET /api/pedidos/mis-pedidos
     * Obtiene los pedidos del usuario autenticado (historial)
     */
    @GetMapping("/mis-pedidos")
    public ResponseEntity<?> obtenerMisPedidos(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            Long userId = getUserIdFromAuth(authHeader);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(createErrorResponse("Debe iniciar sesión para ver sus pedidos"));
            }
            
            List<PedidoDTO> pedidos = pedidoService.obtenerPedidosPorUsuario(userId)
                    .stream()
                    .map(PedidoDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al obtener pedidos: " + e.getMessage()));
        }
    }
    
    /**
     * GET /api/pedidos/{id}
     * Obtiene un pedido por ID
     * Solo el dueño del pedido o admin pueden verlo
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPedidoPorId(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            Long userId = getUserIdFromAuth(authHeader);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(createErrorResponse("Debe iniciar sesión"));
            }
            
            Pedido pedido = pedidoService.obtenerPedidoPorId(id)
                    .orElseThrow(() -> new PedidoNotFoundException(id));
            
            // Validar que el usuario es el dueño o es admin
            if (!pedido.getUsuario().getId().equals(userId) && !isAdmin(authHeader)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(createErrorResponse("No tienes permiso para ver este pedido"));
            }
            
            return ResponseEntity.ok(new PedidoDTO(pedido));
        } catch (PedidoNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al obtener pedido"));
        }
    }
    
    /**
     * POST /api/pedidos
     * Crea un nuevo pedido desde el carrito
     */
    @PostMapping
    public ResponseEntity<?> crearPedido(
            @RequestBody CreatePedidoDTO createPedidoDTO,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            // Obtener usuario del token
            Long userId = getUserIdFromAuth(authHeader);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(createErrorResponse("Debe iniciar sesión para crear un pedido"));
            }
            
            // Crear el pedido
            Pedido pedido = pedidoService.crearPedido(userId, createPedidoDTO);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(new PedidoDTO(pedido));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al crear pedido: " + e.getMessage()));
        }
    }
    
    /**
     * PUT /api/pedidos/{id}/estado
     * Actualiza el estado de un pedido
     * Solo ADMIN puede cambiar estados
     */
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(
            @PathVariable Long id,
            @RequestParam EstadoPedido estado,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (!isAdmin(authHeader)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(createErrorResponse("Solo administradores pueden cambiar el estado"));
            }
            
            Pedido pedido = pedidoService.actualizarEstado(id, estado);
            return ResponseEntity.ok(new PedidoDTO(pedido));
        } catch (PedidoNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al actualizar estado"));
        }
    }
    
    /**
     * PUT /api/pedidos/{id}/cancelar
     * Cancela un pedido (solo si está PENDIENTE)
     * Devuelve el stock a los productos
     */
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarPedido(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            Long userId = getUserIdFromAuth(authHeader);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(createErrorResponse("Debe iniciar sesión"));
            }
            
            Pedido pedido = pedidoService.cancelarPedido(id, userId);
            return ResponseEntity.ok(new PedidoDTO(pedido));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(createErrorResponse(e.getMessage()));
        } catch (PedidoNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al cancelar pedido"));
        }
    }
    
    /**
     * GET /api/pedidos/estado/{estado}
     * Obtiene pedidos por estado (ADMIN)
     */
    @GetMapping("/estado/{estado}")
    public ResponseEntity<?> obtenerPedidosPorEstado(
            @PathVariable EstadoPedido estado,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (!isAdmin(authHeader)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(createErrorResponse("Solo administradores pueden filtrar por estado"));
            }
            
            List<PedidoDTO> pedidos = pedidoService.obtenerPedidosPorEstado(estado)
                    .stream()
                    .map(PedidoDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error al obtener pedidos"));
        }
    }
    
    // ===== MÉTODOS AUXILIARES =====
    
    /**
     * Extrae el ID del usuario del token JWT
     */
    private Long getUserIdFromAuth(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        
        try {
            String token = authHeader.substring(7);
            return jwtUtil.getUserIdFromToken(token);
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     * Verifica si el usuario es administrador
     */
    private boolean isAdmin(String authHeader) {
        Long userId = getUserIdFromAuth(authHeader);
        if (userId == null) {
            return false;
        }
        
        Usuario usuario = usuarioService.findById(userId);
        return usuario != null && usuario.getRole().name().equals("ADMIN");
    }
    
    /**
     * Crea un mapa de respuesta de error
     */
    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return error;
    }
}

