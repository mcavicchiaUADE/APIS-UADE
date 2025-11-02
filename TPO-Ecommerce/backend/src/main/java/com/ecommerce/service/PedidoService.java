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
            
            // 4.3 Crear detalle del pedido (asignando vendedor = owner del producto)
            DetallePedido detalle = DetallePedido.builder()
                    .pedido(pedido)
                    .producto(producto)
                    .vendedor(producto.getOwnerUser())  // Asignar el vendedor (owner del producto)
                    .cantidad(itemDTO.getCantidad())
                    .precioUnitario(producto.getPrice())
                    .productoNombre(producto.getName())
                    .productoImagen(producto.getImages() != null && !producto.getImages().isEmpty() 
                            ? producto.getImages().get(0) 
                            : null)
                    .estadoItem(EstadoPedido.PENDIENTE)  // Estado inicial del item
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
     * Solo cancela items en estado PENDIENTE
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
        
        // Devolver stock a los productos y actualizar estado de items
        for (DetallePedido detalle : pedido.getItems()) {
            // Solo cancelar items que estén en estado PENDIENTE
            if (detalle.getEstadoItem() == EstadoPedido.PENDIENTE) {
                Producto producto = detalle.getProducto();
                if (producto != null) {
                    producto.setStock(producto.getStock() + detalle.getCantidad());
                    productoRepository.save(producto);
                }
                detalle.setEstadoItem(EstadoPedido.CANCELADO_COMPRADOR);
            }
        }
        
        // Actualizar estado del pedido
        pedido.setEstado(EstadoPedido.CANCELADO_COMPRADOR);
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
    
    // ==========================================
    // MÉTODOS PARA VENDEDORES (MARKETPLACE)
    // ==========================================
    
    /**
     * Obtener todas las ventas de un vendedor
     * Retorna todos los DetallePedido donde el vendedor es el usuario indicado
     */
    @Transactional(readOnly = true)
    public List<DetallePedido> obtenerVentasPorVendedor(Long vendedorId) {
        return detallePedidoRepository.findByVendedorIdOrderByPedidoCreatedAtDesc(vendedorId);
    }
    
    /**
     * Obtener ventas de un vendedor por estado
     */
    @Transactional(readOnly = true)
    public List<DetallePedido> obtenerVentasPorVendedorYEstado(Long vendedorId, EstadoPedido estado) {
        return detallePedidoRepository.findByVendedorIdAndEstadoItemOrderByPedidoCreatedAtDesc(vendedorId, estado);
    }
    
    /**
     * Actualizar estado de un item de venta (solo el vendedor puede hacerlo)
     */
    public DetallePedido actualizarEstadoItem(Long detalleId, Long vendedorId, EstadoPedido nuevoEstado) {
        DetallePedido detalle = detallePedidoRepository.findById(detalleId)
                .orElseThrow(() -> new IllegalArgumentException("Detalle de pedido no encontrado"));
        
        // Validar que el vendedor es el dueño del item
        if (!detalle.getVendedor().getId().equals(vendedorId)) {
            throw new IllegalArgumentException("No tienes permiso para modificar este item");
        }
        
        // Validar transiciones de estado válidas
        validarTransicionEstado(detalle.getEstadoItem(), nuevoEstado);
        
        // Si se cancela por parte del vendedor, devolver stock
        if (nuevoEstado == EstadoPedido.CANCELADO_VENDEDOR) {
            Producto producto = detalle.getProducto();
            if (producto != null) {
                producto.setStock(producto.getStock() + detalle.getCantidad());
                productoRepository.save(producto);
            }
        }
        
        detalle.setEstadoItem(nuevoEstado);
        DetallePedido detalleGuardado = detallePedidoRepository.save(detalle);
        
        // Actualizar el estado del pedido general basado en el estado de todos los items
        actualizarEstadoPedidoGeneral(detalle.getPedido().getId());
        
        return detalleGuardado;
    }
    
    /**
     * Actualiza el estado del pedido general basado en el estado de todos sus items
     * Lógica:
     * - Si todos los items están ENTREGADO → pedido ENTREGADO
     * - Si algún item está CANCELADO → pedido CANCELADO_COMPRADOR
     * - Si hay items EN_TRANSITO o ENVIADO → pedido ENVIADO
     * - Si hay items CONFIRMADO o PREPARANDO → pedido CONFIRMADO
     * - Si todos están PENDIENTE → pedido PENDIENTE
     */
    private void actualizarEstadoPedidoGeneral(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));
        
        List<DetallePedido> items = pedido.getItems();
        if (items.isEmpty()) {
            return;
        }
        
        // Contar estados de los items
        long totalItems = items.size();
        long itemsEntregados = items.stream()
                .filter(item -> item.getEstadoItem() == EstadoPedido.ENTREGADO)
                .count();
        long itemsCancelados = items.stream()
                .filter(item -> item.getEstadoItem() == EstadoPedido.CANCELADO_COMPRADOR || 
                              item.getEstadoItem() == EstadoPedido.CANCELADO_VENDEDOR ||
                              item.getEstadoItem() == EstadoPedido.CANCELADO)
                .count();
        long itemsEnTransito = items.stream()
                .filter(item -> item.getEstadoItem() == EstadoPedido.EN_TRANSITO)
                .count();
        long itemsEnviados = items.stream()
                .filter(item -> item.getEstadoItem() == EstadoPedido.ENVIADO)
                .count();
        long itemsConfirmados = items.stream()
                .filter(item -> item.getEstadoItem() == EstadoPedido.CONFIRMADO ||
                              item.getEstadoItem() == EstadoPedido.PREPARANDO)
                .count();
        long itemsPendientes = items.stream()
                .filter(item -> item.getEstadoItem() == EstadoPedido.PENDIENTE)
                .count();
        
        EstadoPedido nuevoEstadoPedido;
        
        // Lógica de decisión del estado del pedido
        if (itemsCancelados > 0) {
            // Si hay algún item cancelado, el pedido está cancelado
            nuevoEstadoPedido = EstadoPedido.CANCELADO_COMPRADOR;
        } else if (itemsEntregados == totalItems) {
            // Si todos los items están entregados
            nuevoEstadoPedido = EstadoPedido.ENTREGADO;
        } else if (itemsEnTransito > 0 || itemsEnviados > 0) {
            // Si hay items en tránsito o enviados
            nuevoEstadoPedido = EstadoPedido.ENVIADO;
        } else if (itemsConfirmados > 0) {
            // Si hay items confirmados o preparando
            nuevoEstadoPedido = EstadoPedido.CONFIRMADO;
        } else if (itemsPendientes == totalItems) {
            // Si todos están pendientes
            nuevoEstadoPedido = EstadoPedido.PENDIENTE;
        } else {
            // Estado mixto, usar el más avanzado
            nuevoEstadoPedido = EstadoPedido.CONFIRMADO;
        }
        
        // Solo actualizar si el estado cambió
        if (!pedido.getEstado().equals(nuevoEstadoPedido)) {
            pedido.setEstado(nuevoEstadoPedido);
            pedido.setUpdatedAt(LocalDateTime.now());
            pedidoRepository.save(pedido);
        }
    }
    
    /**
     * Validar que la transición de estado es válida
     */
    private void validarTransicionEstado(EstadoPedido estadoActual, EstadoPedido nuevoEstado) {
        // PENDIENTE puede ir a: CONFIRMADO, CANCELADO_VENDEDOR, CANCELADO_COMPRADOR
        if (estadoActual == EstadoPedido.PENDIENTE) {
            if (nuevoEstado != EstadoPedido.CONFIRMADO && 
                nuevoEstado != EstadoPedido.CANCELADO_VENDEDOR && 
                nuevoEstado != EstadoPedido.CANCELADO_COMPRADOR) {
                throw new IllegalArgumentException("Transición de estado inválida desde PENDIENTE");
            }
        }
        
        // CONFIRMADO puede ir a: PREPARANDO, CANCELADO_VENDEDOR
        else if (estadoActual == EstadoPedido.CONFIRMADO) {
            if (nuevoEstado != EstadoPedido.PREPARANDO && 
                nuevoEstado != EstadoPedido.CANCELADO_VENDEDOR) {
                throw new IllegalArgumentException("Transición de estado inválida desde CONFIRMADO");
            }
        }
        
        // PREPARANDO puede ir a: ENVIADO
        else if (estadoActual == EstadoPedido.PREPARANDO) {
            if (nuevoEstado != EstadoPedido.ENVIADO) {
                throw new IllegalArgumentException("Transición de estado inválida desde PREPARANDO");
            }
        }
        
        // ENVIADO puede ir a: EN_TRANSITO, ENTREGADO
        else if (estadoActual == EstadoPedido.ENVIADO) {
            if (nuevoEstado != EstadoPedido.EN_TRANSITO && 
                nuevoEstado != EstadoPedido.ENTREGADO) {
                throw new IllegalArgumentException("Transición de estado inválida desde ENVIADO");
            }
        }
        
        // EN_TRANSITO puede ir a: ENTREGADO
        else if (estadoActual == EstadoPedido.EN_TRANSITO) {
            if (nuevoEstado != EstadoPedido.ENTREGADO) {
                throw new IllegalArgumentException("Transición de estado inválida desde EN_TRANSITO");
            }
        }
        
        // ENTREGADO puede ir a: DEVOLUCION_SOLICITADA
        else if (estadoActual == EstadoPedido.ENTREGADO) {
            if (nuevoEstado != EstadoPedido.DEVOLUCION_SOLICITADA) {
                throw new IllegalArgumentException("Transición de estado inválida desde ENTREGADO");
            }
        }
        
        // DEVOLUCION_SOLICITADA puede ir a: DEVUELTO
        else if (estadoActual == EstadoPedido.DEVOLUCION_SOLICITADA) {
            if (nuevoEstado != EstadoPedido.DEVUELTO) {
                throw new IllegalArgumentException("Transición de estado inválida desde DEVOLUCION_SOLICITADA");
            }
        }
        
        // Estados finales no pueden cambiar
        else if (estadoActual == EstadoPedido.CANCELADO || 
                 estadoActual == EstadoPedido.CANCELADO_COMPRADOR || 
                 estadoActual == EstadoPedido.CANCELADO_VENDEDOR || 
                 estadoActual == EstadoPedido.DEVUELTO) {
            throw new IllegalArgumentException("No se puede cambiar el estado de un item cancelado o devuelto");
        }
    }
    
    /**
     * Obtener un item de venta específico (validando que el vendedor sea el dueño)
     */
    @Transactional(readOnly = true)
    public DetallePedido obtenerVentaPorId(Long detalleId, Long vendedorId) {
        DetallePedido detalle = detallePedidoRepository.findById(detalleId)
                .orElseThrow(() -> new IllegalArgumentException("Venta no encontrada"));
        
        // Validar que el vendedor es el dueño
        if (!detalle.getVendedor().getId().equals(vendedorId)) {
            throw new IllegalArgumentException("No tienes permiso para ver esta venta");
        }
        
        return detalle;
    }
}

