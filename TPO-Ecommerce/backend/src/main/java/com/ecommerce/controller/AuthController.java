package com.ecommerce.controller;

import com.ecommerce.dto.UsuarioDTO;
import com.ecommerce.dto.LoginRequestDTO;
import com.ecommerce.dto.LoginResponseDTO;
import com.ecommerce.dto.RegisterRequestDTO;
import com.ecommerce.entity.Usuario;
import com.ecommerce.entity.Role;
import com.ecommerce.service.UsuarioService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            // Buscar usuario por email o username
            Usuario usuario = usuarioService.findByEmailOrUsername(loginRequest.getEmailOrUsername());
            
            if (usuario == null) {
                return ResponseEntity.badRequest().body(createErrorResponse("Credenciales inválidas"));
            }

            // Verificar contraseña
            if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
                return ResponseEntity.badRequest().body(createErrorResponse("Credenciales inválidas"));
            }

            // Generar token JWT
            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());

            // Crear respuesta
            LoginResponseDTO response = LoginResponseDTO.builder()
                    .token(token)
                    .user(UsuarioDTO.builder()
                            .id(usuario.getId())
                            .email(usuario.getEmail())
                            .nombre(usuario.getNombre())
                            .role(usuario.getRole())
                            .build())
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createErrorResponse("Error en el servidor: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        try {
            // Verificar si el email ya existe
            if (usuarioService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest().body(createErrorResponse("El email ya está registrado"));
            }

            // Verificar si el username ya existe
            if (usuarioService.existsByUsername(registerRequest.getUsername())) {
                return ResponseEntity.badRequest().body(createErrorResponse("El nombre de usuario ya está en uso"));
            }

            // Crear nuevo usuario
            Usuario nuevoUsuario = Usuario.builder()
                    .username(registerRequest.getUsername())
                    .email(registerRequest.getEmail())
                    .password(passwordEncoder.encode(registerRequest.getPassword()))
                    .nombre(registerRequest.getNombre())
                    .apellido(registerRequest.getApellido())
                    .role(Role.USER) // Rol por defecto
                    .build();

            Usuario usuarioGuardado = usuarioService.save(nuevoUsuario);

            // Generar token JWT
            String token = jwtUtil.generateToken(usuarioGuardado.getEmail(), usuarioGuardado.getId());

            // Crear respuesta
            LoginResponseDTO response = LoginResponseDTO.builder()
                    .token(token)
                    .user(UsuarioDTO.builder()
                            .id(usuarioGuardado.getId())
                            .email(usuarioGuardado.getEmail())
                            .nombre(usuarioGuardado.getNombre())
                            .role(usuarioGuardado.getRole())
                            .build())
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createErrorResponse("Error al crear la cuenta: " + e.getMessage()));
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(createErrorResponse("Token inválido"));
            }

            String token = authHeader.substring(7);
            
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body(createErrorResponse("Token expirado o inválido"));
            }

            String email = jwtUtil.getEmailFromToken(token);
            Usuario usuario = usuarioService.findByEmail(email);
            
            if (usuario == null) {
                return ResponseEntity.badRequest().body(createErrorResponse("Usuario no encontrado"));
            }

            UsuarioDTO userDTO = UsuarioDTO.builder()
                    .id(usuario.getId())
                    .email(usuario.getEmail())
                    .nombre(usuario.getNombre())
                    .role(usuario.getRole())
                    .build();

            return ResponseEntity.ok(userDTO);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createErrorResponse("Token inválido"));
        }
    }

    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return error;
    }
}
