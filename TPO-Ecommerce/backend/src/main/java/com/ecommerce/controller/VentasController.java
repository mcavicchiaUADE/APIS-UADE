package com.ecommerce.controller;

import com.ecommerce.dto.VentaDTO;
import com.ecommerce.entity.DetallePedido;
import com.ecommerce.entity.EstadoPedido;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.service.PedidoService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Controlador para gestionar las ventas desde la perspectiva del vendedor
 * Los usuarios pueden ver y gestionar los productos que han vendido
 */
@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class VentasController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * GET /api/ventas/mis-ventas
     * Obtiene todas las ventas del usuario autenticado (como vendedor)
     */
    @GetMapping("/mis-ventas")
    public ResponseEntity<?> obtenerMisVentas(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long vendedorId = getUserIdFromAuth(authHeader);
        if (vendedorId == null) {
            throw new UnauthorizedException("Debe iniciar sesión para ver sus ventas");
        }
        
        List<VentaDTO> ventas = pedidoService.obtenerVentasPorVendedor(vendedorId)
                .stream()
                .map(VentaDTO::new)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ventas);
    }
    
    /**
     * GET /api/ventas/mis-ventas/estado/{estado}
     * Obtiene las ventas del vendedor filtradas por estado
     */
    @GetMapping("/mis-ventas/estado/{estado}")
    public ResponseEntity<?> obtenerMisVentasPorEstado(
            @PathVariable String estado,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long vendedorId = getUserIdFromAuth(authHeader);
        if (vendedorId == null) {
            throw new UnauthorizedException("Debe iniciar sesión");
        }
        
        EstadoPedido estadoPedido;
        try {
            estadoPedido = EstadoPedido.valueOf(estado.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado inválido: " + estado);
        }
        
        List<VentaDTO> ventas = pedidoService.obtenerVentasPorVendedorYEstado(vendedorId, estadoPedido)
                .stream()
                .map(VentaDTO::new)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ventas);
    }
    
    /**
     * GET /api/ventas/{detalleId}
     * Obtiene el detalle de una venta específica
     */
    @GetMapping("/{detalleId}")
    public ResponseEntity<?> obtenerVentaPorId(
            @PathVariable Long detalleId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long vendedorId = getUserIdFromAuth(authHeader);
        if (vendedorId == null) {
            throw new UnauthorizedException("Debe iniciar sesión");
        }
        
        DetallePedido detalle = pedidoService.obtenerVentaPorId(detalleId, vendedorId);
        return ResponseEntity.ok(new VentaDTO(detalle));
    }
    
    /**
     * PUT /api/ventas/{detalleId}/estado
     * Actualiza el estado de una venta (item)
     * Solo el vendedor puede actualizar el estado de sus propios items
     */
    @PutMapping("/{detalleId}/estado")
    public ResponseEntity<?> actualizarEstadoVenta(
            @PathVariable Long detalleId,
            @RequestParam String estado,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long vendedorId = getUserIdFromAuth(authHeader);
        if (vendedorId == null) {
            throw new UnauthorizedException("Debe iniciar sesión");
        }
        
        EstadoPedido nuevoEstado;
        try {
            nuevoEstado = EstadoPedido.valueOf(estado.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado inválido: " + estado);
        }
        
        DetallePedido detalle = pedidoService.actualizarEstadoItem(detalleId, vendedorId, nuevoEstado);
        return ResponseEntity.ok(new VentaDTO(detalle));
    }
    
    /**
     * GET /api/ventas/estadisticas
     * Obtiene estadísticas de ventas del vendedor
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticasVentas(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long vendedorId = getUserIdFromAuth(authHeader);
        if (vendedorId == null) {
            throw new UnauthorizedException("Debe iniciar sesión");
        }
        
        List<DetallePedido> todasLasVentas = pedidoService.obtenerVentasPorVendedor(vendedorId);
        
        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("totalVentas", todasLasVentas.size());
        estadisticas.put("ventasPendientes", 
                todasLasVentas.stream()
                        .filter(v -> v.getEstadoItem() == EstadoPedido.PENDIENTE)
                        .count());
        estadisticas.put("ventasConfirmadas", 
                todasLasVentas.stream()
                        .filter(v -> v.getEstadoItem() == EstadoPedido.CONFIRMADO)
                        .count());
        estadisticas.put("ventasEnviadas", 
                todasLasVentas.stream()
                        .filter(v -> v.getEstadoItem() == EstadoPedido.ENVIADO || 
                                   v.getEstadoItem() == EstadoPedido.EN_TRANSITO)
                        .count());
        estadisticas.put("ventasEntregadas", 
                todasLasVentas.stream()
                        .filter(v -> v.getEstadoItem() == EstadoPedido.ENTREGADO)
                        .count());
        estadisticas.put("ventasCanceladas", 
                todasLasVentas.stream()
                        .filter(v -> v.getEstadoItem() == EstadoPedido.CANCELADO ||
                                   v.getEstadoItem() == EstadoPedido.CANCELADO_COMPRADOR || 
                                   v.getEstadoItem() == EstadoPedido.CANCELADO_VENDEDOR)
                        .count());
        
        return ResponseEntity.ok(estadisticas);
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
    
}

