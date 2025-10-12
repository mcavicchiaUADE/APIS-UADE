package com.ecommerce.service;

import com.ecommerce.dto.CreatePedidoDTO;
import com.ecommerce.entity.*;
import com.ecommerce.exception.PedidoNotFoundException;
import com.ecommerce.exception.ProductoNotFoundException;
import com.ecommerce.exception.StockInsuficienteException;
import com.ecommerce.exception.UsuarioNotFoundException;
import com.ecommerce.repository.DetallePedidoRepository;
import com.ecommerce.repository.PedidoRepository;
import com.ecommerce.repository.ProductoRepository;
import com.ecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private DetallePedidoRepository detallePedidoRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    /**
     * Obtener todos los pedidos
     */
    @Transactional(readOnly = true)
    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }
    
    /**
     * Obtener pedido por ID
     */
    @Transactional(readOnly = true)
    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id);
    }
    
    /**
     * Obtener pedidos de un usuario (historial)
     */
    @Transactional(readOnly = true)
    public List<Pedido> obtenerPedidosPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioIdOrderByCreatedAtDesc(usuarioId);
    }
    
    /**
     * Obtener pedidos por estado
     */
    @Transactional(readOnly = true)
    public List<Pedido> obtenerPedidosPorEstado(EstadoPedido estado) {
        return pedidoRepository.findByEstado(estado);
    }
    
    /**
     * Crear un nuevo pedido desde el carrito
     * - Valida stock disponible
     * - Descuenta stock de productos
     * - Crea el pedido y los detalles
     * - Calcula el total
     */
    public Pedido crearPedido(Long usuarioId, CreatePedidoDTO createPedidoDTO) {
        // 1. Validar que el usuario existe
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UsuarioNotFoundException(usuarioId));
        
        // 2. Validar que hay items en el pedido
        if (createPedidoDTO.getItems() == null || createPedidoDTO.getItems().isEmpty()) {
            throw new IllegalArgumentException("El pedido debe tener al menos un producto");
        }
        
        // 3. Crear el pedido
        Pedido pedido = Pedido.builder()
                .usuario(usuario)
                .estado(EstadoPedido.PENDIENTE)
                .direccionEnvio(createPedidoDTO.getDireccionEnvio())
                .notas(createPedidoDTO.getNotas())
                .total(BigDecimal.ZERO)
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();
        
        // 4. Procesar cada item del carrito
        BigDecimal totalPedido = BigDecimal.ZERO;
        
        for (CreatePedidoDTO.ItemCarritoDTO itemDTO : createPedidoDTO.getItems()) {
            // 4.1 Obtener el producto
            Producto producto = productoRepository.findById(itemDTO.getProductoId())
                    .orElseThrow(() -> new ProductoNotFoundException(itemDTO.getProductoId()));
            
            // 4.2 Validar stock disponible
            if (producto.getStock() < itemDTO.getCantidad()) {
                throw new StockInsuficienteException(
                        producto.getName(), 
                        producto.getStock(), 
                        itemDTO.getCantidad()
                );
            }
            
            // 4.3 Crear detalle del pedido
            DetallePedido detalle = DetallePedido.builder()
                    .pedido(pedido)
                    .producto(producto)
                    .cantidad(itemDTO.getCantidad())
                    .precioUnitario(producto.getPrice())
                    .productoNombre(producto.getName())
                    .productoImagen(producto.getImages() != null && !producto.getImages().isEmpty() 
                            ? producto.getImages().get(0) 
                            : null)
                    .build();
            
            // 4.4 Agregar detalle al pedido
            pedido.getItems().add(detalle);
            
            // 4.5 Descontar stock del producto
            producto.setStock(producto.getStock() - itemDTO.getCantidad());
            productoRepository.save(producto);
            
            // 4.6 Calcular subtotal y agregar al total
            BigDecimal subtotal = producto.getPrice().multiply(BigDecimal.valueOf(itemDTO.getCantidad()));
            totalPedido = totalPedido.add(subtotal);
        }
        
        // 5. Establecer el total del pedido
        pedido.setTotal(totalPedido);
        
        // 6. Guardar el pedido (cascade guardará los detalles automáticamente)
        return pedidoRepository.save(pedido);
    }
    
    /**
     * Actualizar estado de un pedido
     */
    public Pedido actualizarEstado(Long pedidoId, EstadoPedido nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new PedidoNotFoundException(pedidoId));
        
        pedido.setEstado(nuevoEstado);
        pedido.setUpdatedAt(LocalDateTime.now());
        
        return pedidoRepository.save(pedido);
    }
    
    /**
     * Cancelar un pedido
     * Devuelve el stock a los productos
     */
    public Pedido cancelarPedido(Long pedidoId, Long usuarioId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new PedidoNotFoundException(pedidoId));
        
        // Validar que el pedido pertenece al usuario
        if (!pedido.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("No tienes permiso para cancelar este pedido");
        }
        
        // Solo se pueden cancelar pedidos PENDIENTES
        if (pedido.getEstado() != EstadoPedido.PENDIENTE) {
            throw new IllegalArgumentException("Solo se pueden cancelar pedidos en estado PENDIENTE");
        }
        
        // Devolver stock a los productos
        for (DetallePedido detalle : pedido.getItems()) {
            Producto producto = detalle.getProducto();
            if (producto != null) {
                producto.setStock(producto.getStock() + detalle.getCantidad());
                productoRepository.save(producto);
            }
        }
        
        // Actualizar estado del pedido
        pedido.setEstado(EstadoPedido.CANCELADO);
        pedido.setUpdatedAt(LocalDateTime.now());
        
        return pedidoRepository.save(pedido);
    }
    
    /**
     * Eliminar un pedido (solo admin)
     */
    public boolean eliminarPedido(Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Contar pedidos de un usuario
     */
    @Transactional(readOnly = true)
    public Long contarPedidosDeUsuario(Long usuarioId) {
        return pedidoRepository.countByUsuarioId(usuarioId);
    }
}

