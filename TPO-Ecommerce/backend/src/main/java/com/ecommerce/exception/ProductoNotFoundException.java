package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductoNotFoundException extends RuntimeException {
    
    public ProductoNotFoundException(Long id) {
        super("Producto con ID " + id + " no encontrado");
    }
    
    public ProductoNotFoundException(String nombre) {
        super("Producto con nombre '" + nombre + "' no encontrado");
    }
}
