package com.ecommerce.service;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.Usuario;
import com.ecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Obtener todos los usuarios
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }
    
    // Obtener usuario por ID
    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }
    
    // Obtener usuario por email
    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    // Obtener usuario por email (sin Optional para JWT)
    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }
    
    // Buscar usuario por email o username
    public Usuario findByEmailOrUsername(String emailOrUsername) {
        // Primero intentar por email
        Usuario usuario = usuarioRepository.findByEmail(emailOrUsername).orElse(null);
        if (usuario == null) {
            // Si no se encuentra por email, intentar por username
            usuario = usuarioRepository.findByUsername(emailOrUsername).orElse(null);
        }
        return usuario;
    }
    
    // Crear o actualizar usuario
    public Usuario saveUsuario(Usuario usuario) {
        // Encriptar contraseña si no está ya encriptada
        if (usuario.getPassword() != null && !usuario.getPassword().startsWith("$2a$")) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }
    
    // Eliminar usuario
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
    
    // Verificar si existe un email
    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    
    // Verificar si existe un username
    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }
    
    // Método save simple para AuthController
    public Usuario save(Usuario usuario) {
        return saveUsuario(usuario);
    }
    
    // Obtener usuarios por rol
    public List<Usuario> getUsuariosByRole(Role role) {
        return usuarioRepository.findByRole(role);
    }
    
    // Crear usuario administrador
    public Usuario createAdmin(String nombre, String email, String password) {
        Usuario admin = Usuario.builder()
                .nombre(nombre)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(Role.ADMIN)
                .build();
        return usuarioRepository.save(admin);
    }
}
