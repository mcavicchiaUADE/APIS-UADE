package com.ecommerce.controller;

import com.ecommerce.dto.ProductoDTO;
import com.ecommerce.entity.Producto;
import com.ecommerce.exception.ProductoNotFoundException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.service.ProductoService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * GET /api/productos
     * Obtiene todos los productos
     */
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodosLosProductos() {
        List<ProductoDTO> productos = productoService.obtenerTodosLosProductos()
                .stream()
                .map(ProductoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/{id}
     * Obtiene un producto por su ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerProductoPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.obtenerProductoPorId(id);
        return producto.map(p -> ResponseEntity.ok(new ProductoDTO(p)))
                     .orElseThrow(() -> new ProductoNotFoundException(id));
    }
    
    /**
     * POST /api/productos
     * Crea un nuevo producto
     * Asigna automáticamente el producto al vendedor autenticado
     */
    @PostMapping
    public ResponseEntity<ProductoDTO> crearProducto(
            @RequestBody Producto producto,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        // Obtener usuario del token
        Long userId = getUserIdFromAuth(authHeader);
        if (userId == null) {
            throw new UnauthorizedException("Debe iniciar sesión para crear un producto");
        }
        
        // Crear el producto asignándolo al usuario autenticado
        Producto productoCreado = productoService.crearProducto(producto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProductoDTO(productoCreado));
    }
    
    /**
     * PUT /api/productos/{id}
     * Actualiza un producto existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        Optional<Producto> productoActualizado = productoService.actualizarProducto(id, producto);
        return productoActualizado.map(p -> ResponseEntity.ok(new ProductoDTO(p)))
                                .orElseThrow(() -> new ProductoNotFoundException(id));
    }
    
    /**
     * DELETE /api/productos/{id}
     * Elimina un producto por su ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        boolean eliminado = productoService.eliminarProducto(id);
        if (!eliminado) {
            throw new ProductoNotFoundException(id);
        }
        return ResponseEntity.noContent().build();
    }
    
    /**
     * GET /api/productos/buscar?nombre={nombre}
     * Busca productos por nombre
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDTO>> buscarProductosPorNombre(@RequestParam(required = false) String nombre) {
        List<ProductoDTO> productos = productoService.buscarProductosPorNombre(nombre)
                .stream()
                .map(ProductoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/categoria/{categoryId}
     * Busca productos por categoría
     */
    @GetMapping("/categoria/{categoryId}")
    public ResponseEntity<List<ProductoDTO>> buscarProductosPorCategoria(@PathVariable Long categoryId) {
        List<ProductoDTO> productos = productoService.buscarProductosPorCategoria(categoryId)
                .stream()
                .map(ProductoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/stock?disponible={disponible}
     * Busca productos por disponibilidad de stock
     */
    @GetMapping("/stock")
    public ResponseEntity<List<ProductoDTO>> buscarProductosPorStock(@RequestParam(defaultValue = "true") boolean disponible) {
        List<ProductoDTO> productos = productoService.buscarProductosPorStock(disponible)
                .stream()
                .map(ProductoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productos);
    }
    
    /**
     * GET /api/productos/health
     * Endpoint de salud para verificar que el servicio está funcionando
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Servicio de productos funcionando correctamente");
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
