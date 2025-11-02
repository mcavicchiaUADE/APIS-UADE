package com.ecommerce.repository;

import com.ecommerce.entity.DetallePedido;
import com.ecommerce.entity.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    
    // Buscar detalles por pedido
    List<DetallePedido> findByPedidoId(Long pedidoId);
    
    // Buscar detalles por producto
    List<DetallePedido> findByProductoId(Long productoId);
    
    // ========== MÉTODOS PARA VENDEDORES ==========
    
    // Buscar todas las ventas de un vendedor (ordenadas por fecha de pedido descendente)
    List<DetallePedido> findByVendedorIdOrderByPedidoCreatedAtDesc(Long vendedorId);
    
    // Buscar ventas de un vendedor por estado del item
    List<DetallePedido> findByVendedorIdAndEstadoItemOrderByPedidoCreatedAtDesc(Long vendedorId, EstadoPedido estadoItem);
    
    // Contar ventas totales de un vendedor
    Long countByVendedorId(Long vendedorId);
    
    // Contar ventas de un vendedor por estado
    Long countByVendedorIdAndEstadoItem(Long vendedorId, EstadoPedido estadoItem);
}

