package com.ecommerce.controller;

import com.ecommerce.dto.UsuarioDTO;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.Usuario;
import com.ecommerce.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Obtener todos los usuarios (solo ADMIN)
     */
    @GetMapping("/usuarios")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        List<UsuarioDTO> usuariosDTO = usuarios.stream()
                .map(UsuarioDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuariosDTO);
    }

    /**
     * Obtener un usuario por ID (solo ADMIN)
     */
    @GetMapping("/usuarios/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new UsuarioDTO(usuario));
    }

    /**
     * Crear un nuevo usuario (solo ADMIN)
     */
    @PostMapping("/usuarios")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUsuario(@Valid @RequestBody CreateUsuarioRequest request) {
        // Validar que el email no exista
        if (usuarioService.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "El email ya está registrado"));
        }

        // Validar que el username no exista
        if (usuarioService.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "El nombre de usuario ya está registrado"));
        }

        // Crear nuevo usuario
        Usuario nuevoUsuario = Usuario.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .build();

        Usuario usuarioGuardado = usuarioService.save(nuevoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UsuarioDTO(usuarioGuardado));
    }

    /**
     * Actualizar usuario (solo ADMIN)
     */
    @PutMapping("/usuarios/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUsuario(@PathVariable Long id, @Valid @RequestBody UpdateUsuarioRequest request) {
        Usuario usuario = usuarioService.findById(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        // Verificar si el email está siendo cambiado y si ya existe
        if (request.getEmail() != null && !request.getEmail().equals(usuario.getEmail())) {
            if (usuarioService.existsByEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "El email ya está registrado"));
            }
            usuario.setEmail(request.getEmail());
        }

        // Verificar si el username está siendo cambiado y si ya existe
        if (request.getUsername() != null && !request.getUsername().equals(usuario.getUsername())) {
            if (usuarioService.existsByUsername(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "El nombre de usuario ya está registrado"));
            }
            usuario.setUsername(request.getUsername());
        }

        // Actualizar otros campos
        if (request.getNombre() != null) {
            usuario.setNombre(request.getNombre());
        }
        if (request.getApellido() != null) {
            usuario.setApellido(request.getApellido());
        }
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getRole() != null) {
            usuario.setRole(request.getRole());
        }

        usuario.setUpdatedAt(LocalDateTime.now());
        Usuario usuarioActualizado = usuarioService.save(usuario);
        return ResponseEntity.ok(new UsuarioDTO(usuarioActualizado));
    }

    /**
     * Actualizar solo el rol de un usuario (solo ADMIN)
     */
    @PutMapping("/usuarios/{id}/rol")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUsuarioRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Usuario usuario = usuarioService.findById(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        String roleStr = request.get("role");
        try {
            Role newRole = Role.valueOf(roleStr.toUpperCase());
            usuario.setRole(newRole);
            usuario.setUpdatedAt(LocalDateTime.now());
            Usuario usuarioActualizado = usuarioService.save(usuario);
            return ResponseEntity.ok(new UsuarioDTO(usuarioActualizado));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Rol inválido. Debe ser USER o ADMIN"));
        }
    }

    /**
     * Eliminar usuario (solo ADMIN)
     */
    @DeleteMapping("/usuarios/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        usuarioService.deleteUsuario(id);
        return ResponseEntity.ok(Map.of("message", "Usuario eliminado exitosamente"));
    }

    /**
     * Obtener estadísticas de usuarios (solo ADMIN)
     */
    @GetMapping("/usuarios/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUsuariosStats() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        long totalUsuarios = usuarios.size();
        long adminUsuarios = usuarios.stream()
                .filter(u -> u.getRole() == Role.ADMIN)
                .count();
        long userUsuarios = usuarios.stream()
                .filter(u -> u.getRole() == Role.USER)
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsuarios", totalUsuarios);
        stats.put("adminUsuarios", adminUsuarios);
        stats.put("userUsuarios", userUsuarios);
        return ResponseEntity.ok(stats);
    }

    // DTOs internos para requests
    public static class CreateUsuarioRequest {
        private String username;
        private String email;
        private String password;
        private String nombre;
        private String apellido;
        private Role role;

        // Getters y Setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }

        public String getApellido() { return apellido; }
        public void setApellido(String apellido) { this.apellido = apellido; }

        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
    }

    public static class UpdateUsuarioRequest {
        private String username;
        private String email;
        private String password;
        private String nombre;
        private String apellido;
        private Role role;

        // Getters y Setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }

        public String getApellido() { return apellido; }
        public void setApellido(String apellido) { this.apellido = apellido; }

        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
    }
}

