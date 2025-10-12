package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CategoriaNotFoundException extends RuntimeException {
    
    public CategoriaNotFoundException(Long id) {
        super("Categoría con ID " + id + " no encontrada");
    }
    
    public CategoriaNotFoundException(String nombre) {
        super("Categoría con nombre '" + nombre + "' no encontrada");
    }
}
