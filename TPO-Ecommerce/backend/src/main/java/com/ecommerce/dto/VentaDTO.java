package com.ecommerce.dto;

import com.ecommerce.entity.DetallePedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para representar una venta individual desde la perspectiva del vendedor
 * Cada item vendido es una venta independiente
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaDTO {
    // Información del item vendido
    private Long detalleId;
    private Long productoId;
    private String productoNombre;
    private String productoImagen;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
    private String estadoItem;
    
    // Información del pedido al que pertenece
    private Long pedidoId;
    private LocalDateTime fechaPedido;
    
    // Información del comprador
    private Long compradorId;
    private String compradorNombre;
    private String compradorEmail;
    
    // Información de envío
    private String direccionEnvio;
    
    // Constructor desde DetallePedido
    public VentaDTO(DetallePedido detalle) {
        this.detalleId = detalle.getId();
        this.productoId = detalle.getProducto() != null ? detalle.getProducto().getId() : null;
        this.productoNombre = detalle.getProductoNombre();
        this.productoImagen = detalle.getProductoImagen();
        this.cantidad = detalle.getCantidad();
        this.precioUnitario = detalle.getPrecioUnitario();
        this.subtotal = detalle.getSubtotal();
        this.estadoItem = detalle.getEstadoItem() != null ? detalle.getEstadoItem().name() : null;
        
        if (detalle.getPedido() != null) {
            this.pedidoId = detalle.getPedido().getId();
            this.fechaPedido = detalle.getPedido().getCreatedAt();
            this.direccionEnvio = detalle.getPedido().getDireccionEnvio();
            
            if (detalle.getPedido().getUsuario() != null) {
                this.compradorId = detalle.getPedido().getUsuario().getId();
                this.compradorNombre = detalle.getPedido().getUsuario().getNombre() + " " + 
                        detalle.getPedido().getUsuario().getApellido();
                this.compradorEmail = detalle.getPedido().getUsuario().getEmail();
            }
        }
    }
}

