package com.ecommerce.repository;

import com.ecommerce.entity.Pedido;
import com.ecommerce.entity.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    // Buscar pedidos por usuario (para historial)
    List<Pedido> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
    
    // Buscar pedidos por estado
    List<Pedido> findByEstado(EstadoPedido estado);
    
    // Buscar pedidos por usuario y estado
    List<Pedido> findByUsuarioIdAndEstado(Long usuarioId, EstadoPedido estado);
    
    // Contar pedidos de un usuario
    Long countByUsuarioId(Long usuarioId);
}

