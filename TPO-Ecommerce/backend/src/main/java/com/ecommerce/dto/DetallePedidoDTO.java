package com.ecommerce.dto;

import com.ecommerce.entity.DetallePedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetallePedidoDTO {
    private Long id;
    private Long productoId;
    private String productoNombre;
    private String productoImagen;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
    
    // Información del vendedor
    private Long vendedorId;
    private String vendedorNombre;
    private String vendedorEmail;
    
    // Estado individual del item
    private String estadoItem;
    
    // Constructor para mapear desde DetallePedido
    public DetallePedidoDTO(DetallePedido detalle) {
        this.id = detalle.getId();
        this.productoId = detalle.getProducto() != null ? detalle.getProducto().getId() : null;
        this.productoNombre = detalle.getProductoNombre();
        this.productoImagen = detalle.getProductoImagen();
        this.cantidad = detalle.getCantidad();
        this.precioUnitario = detalle.getPrecioUnitario();
        this.subtotal = detalle.getSubtotal();
        this.vendedorId = detalle.getVendedor() != null ? detalle.getVendedor().getId() : null;
        this.vendedorNombre = detalle.getVendedor() != null ? 
                detalle.getVendedor().getNombre() + " " + detalle.getVendedor().getApellido() : null;
        this.vendedorEmail = detalle.getVendedor() != null ? detalle.getVendedor().getEmail() : null;
        this.estadoItem = detalle.getEstadoItem() != null ? detalle.getEstadoItem().name() : null;
    }
}

