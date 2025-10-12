package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO para crear un nuevo pedido desde el frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePedidoDTO {
    
    private List<ItemCarritoDTO> items;
    private String direccionEnvio;
    private String notas;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ItemCarritoDTO {
        private Long productoId;
        private Integer cantidad;
    }
}

