package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.Usuario;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor para mapear desde Usuario (sin password por seguridad)
    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.email = usuario.getEmail();
        this.role = usuario.getRole();
        this.createdAt = usuario.getCreatedAt();
        this.updatedAt = usuario.getUpdatedAt();
    }
}
