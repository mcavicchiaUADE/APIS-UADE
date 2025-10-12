package com.ecommerce.entity;

/**
 * Estados posibles de un pedido
 */
public enum EstadoPedido {
    PENDIENTE,      // Pedido creado, esperando confirmación
    CONFIRMADO,     // Pedido confirmado, en proceso
    ENVIADO,        // Pedido enviado al cliente
    ENTREGADO,      // Pedido entregado exitosamente
    CANCELADO       // Pedido cancelado
}

