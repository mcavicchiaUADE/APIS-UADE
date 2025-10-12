package com.ecommerce.dto;

import com.ecommerce.entity.EstadoPedido;
import com.ecommerce.entity.Pedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoDTO {
    private Long id;
    private Long usuarioId;
    private String usuarioNombre;
    private String usuarioEmail;
    private List<DetallePedidoDTO> items;
    private BigDecimal total;
    private EstadoPedido estado;
    private String direccionEnvio;
    private String notas;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor para mapear desde Pedido
    public PedidoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.usuarioId = pedido.getUsuario() != null ? pedido.getUsuario().getId() : null;
        this.usuarioNombre = pedido.getUsuario() != null ? pedido.getUsuario().getNombre() : null;
        this.usuarioEmail = pedido.getUsuario() != null ? pedido.getUsuario().getEmail() : null;
        this.items = pedido.getItems().stream()
                .map(DetallePedidoDTO::new)
                .collect(Collectors.toList());
        this.total = pedido.getTotal();
        this.estado = pedido.getEstado();
        this.direccionEnvio = pedido.getDireccionEnvio();
        this.notas = pedido.getNotas();
        this.createdAt = pedido.getCreatedAt();
        this.updatedAt = pedido.getUpdatedAt();
    }
}

