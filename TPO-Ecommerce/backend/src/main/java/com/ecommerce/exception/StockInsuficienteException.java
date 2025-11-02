package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Stock insuficiente")
public class StockInsuficienteException extends RuntimeException {
    
    public StockInsuficienteException(String productoNombre, Integer stockDisponible, Integer cantidadSolicitada) {
        super("Stock insuficiente para " + productoNombre + 
              ". Disponible: " + stockDisponible + ", Solicitado: " + cantidadSolicitada);
    }
    
    public StockInsuficienteException(String mensaje) {
        super(mensaje);
    }
}

