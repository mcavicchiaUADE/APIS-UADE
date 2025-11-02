package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class DuplicateResourceException extends RuntimeException {
    
    public DuplicateResourceException(String mensaje) {
        super(mensaje);
    }
    
    public DuplicateResourceException(String recurso, String valor) {
        super("El " + recurso + " '" + valor + "' ya existe");
    }
}
