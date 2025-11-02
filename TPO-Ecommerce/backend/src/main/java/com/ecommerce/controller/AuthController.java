package com.ecommerce.controller;

import com.ecommerce.dto.UsuarioDTO;
import com.ecommerce.dto.LoginRequestDTO;
import com.ecommerce.dto.LoginResponseDTO;
import com.ecommerce.dto.RegisterRequestDTO;
import com.ecommerce.entity.Usuario;
import com.ecommerce.entity.Role;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.exception.DuplicateResourceException;
import com.ecommerce.service.UsuarioService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

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
        // Buscar usuario por email o username
        Usuario usuario = usuarioService.findByEmailOrUsername(loginRequest.getEmailOrUsername());
        
        if (usuario == null) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        // Verificar contraseña
        if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());

        // Crear respuesta
        LoginResponseDTO response = LoginResponseDTO.builder()
                .token(token)
                .user(UsuarioDTO.builder()
                        .id(usuario.getId())
                        .username(usuario.getUsername())
                        .email(usuario.getEmail())
                        .nombre(usuario.getNombre())
                        .apellido(usuario.getApellido())
                        .role(usuario.getRole())
                        .build())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        // Verificar si el email ya existe
        if (usuarioService.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateResourceException("email", registerRequest.getEmail());
        }

        // Verificar si el username ya existe
        if (usuarioService.existsByUsername(registerRequest.getUsername())) {
            throw new DuplicateResourceException("username", registerRequest.getUsername());
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
                        .username(usuarioGuardado.getUsername())
                        .email(usuarioGuardado.getEmail())
                        .nombre(usuarioGuardado.getNombre())
                        .apellido(usuarioGuardado.getApellido())
                        .role(usuarioGuardado.getRole())
                        .build())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token inválido");
        }

        String token = authHeader.substring(7);
        
        if (!jwtUtil.validateToken(token)) {
            throw new UnauthorizedException("Token expirado o inválido");
        }

        String email = jwtUtil.getEmailFromToken(token);
        Usuario usuario = usuarioService.findByEmail(email);
        
        if (usuario == null) {
            throw new UnauthorizedException("Usuario no encontrado");
        }

        UsuarioDTO userDTO = UsuarioDTO.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .email(usuario.getEmail())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .role(usuario.getRole())
                .build();

        return ResponseEntity.ok(userDTO);
    }

}
