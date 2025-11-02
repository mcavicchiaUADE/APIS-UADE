package com.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

/**
 * Entidad que representa un item/detalle dentro de un pedido
 * Relaciona un pedido con los productos comprados
 * Cada item tiene su propio estado y vendedor (owner del producto)
 */
@Entity
@Table(name = "detalle_pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetallePedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Relación con el pedido (muchos items pertenecen a un pedido)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    @ToString.Exclude  // Evitar recursión infinita en toString
    private Pedido pedido;
    
    // Relación con el producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;
    
    // Relación con el vendedor (owner del producto al momento de la compra)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendedor_id", nullable = false)
    private Usuario vendedor;
    
    @Column(nullable = false)
    private Integer cantidad;
    
    // Guardamos el precio al momento de la compra (puede cambiar después)
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;
    
    // Guardamos el nombre por si el producto se elimina después
    @Column(name = "producto_nombre", nullable = false)
    private String productoNombre;
    
    // Guardamos una imagen de referencia
    @Column(name = "producto_imagen")
    private String productoImagen;
    
    // Estado individual del item (cada vendedor gestiona sus propios items)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoPedido estadoItem = EstadoPedido.PENDIENTE;
    
    // Método auxiliar para calcular subtotal
    public BigDecimal getSubtotal() {
        return precioUnitario.multiply(BigDecimal.valueOf(cantidad));
    }
    
    @Override
    public String toString() {
        return "DetallePedido{" +
                "id=" + id +
                ", producto=" + (producto != null ? producto.getId() : null) +
                ", vendedor=" + (vendedor != null ? vendedor.getId() : null) +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                ", subtotal=" + getSubtotal() +
                ", estadoItem=" + estadoItem +
                '}';
    }
}

