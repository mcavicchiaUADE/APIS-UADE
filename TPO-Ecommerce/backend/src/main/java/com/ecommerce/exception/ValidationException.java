package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ValidationException extends RuntimeException {
    
    public ValidationException(String mensaje) {
        super(mensaje);
    }
    
    public ValidationException(String campo, String valor) {
        super("Error de validación en el campo '" + campo + "' con valor: " + valor);
    }
}
