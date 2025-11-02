package com.ecommerce.entity;

/**
 * Estados posibles de un pedido o item individual
 * Usado tanto para el pedido general como para items individuales
 */
public enum EstadoPedido {
    PENDIENTE,          // Pedido/Item creado, esperando confirmación del vendedor
    CONFIRMADO,         // Pedido/Item confirmado por el vendedor
    PREPARANDO,         // Vendedor está preparando el envío
    ENVIADO,            // Pedido/Item enviado al cliente
    EN_TRANSITO,        // Item en camino al destino
    ENTREGADO,          // Pedido/Item entregado exitosamente
    
    @Deprecated         // Usar CANCELADO_COMPRADOR o CANCELADO_VENDEDOR
    CANCELADO,          // Cancelado (compatibilidad con datos antiguos)
    
    CANCELADO_COMPRADOR,  // Cancelado por el comprador
    CANCELADO_VENDEDOR,   // Cancelado por el vendedor
    DEVOLUCION_SOLICITADA, // Cliente solicitó devolución
    DEVUELTO            // Item devuelto
}

