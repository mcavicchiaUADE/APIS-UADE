package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Pedido no encontrado")
public class PedidoNotFoundException extends RuntimeException {
    
    public PedidoNotFoundException(Long id) {
        super("Pedido con ID " + id + " no encontrado");
    }
    
    public PedidoNotFoundException(String mensaje) {
        super(mensaje);
    }
}

