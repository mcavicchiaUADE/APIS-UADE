package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class UsuarioNotFoundException extends RuntimeException {
    
    public UsuarioNotFoundException(Long id) {
        super("Usuario con ID " + id + " no encontrado");
    }
    
    public UsuarioNotFoundException(String email) {
        super("Usuario con email '" + email + "' no encontrado");
    }
}
