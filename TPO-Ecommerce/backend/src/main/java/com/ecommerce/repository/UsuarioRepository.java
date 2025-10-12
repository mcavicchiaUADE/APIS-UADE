package com.ecommerce.repository;

import com.ecommerce.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar usuario por email (para login)
    Optional<Usuario> findByEmail(String email);
    
    // Buscar usuario por username
    Optional<Usuario> findByUsername(String username);
    
    // Verificar si existe un email (para registro)
    boolean existsByEmail(String email);
    
    // Verificar si existe un username (para registro)
    boolean existsByUsername(String username);
    
    // Buscar usuarios por rol
    java.util.List<Usuario> findByRole(com.ecommerce.entity.Role role);
}
