package com.ecommerce.controller;

import com.ecommerce.dto.LoginRequestDTO;
import com.ecommerce.dto.RegisterRequestDTO;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.Usuario;
import com.ecommerce.exception.DuplicateResourceException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.service.UsuarioService;
import com.ecommerce.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - AuthController")
class AuthControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = Usuario.builder()
                .id(1L)
                .nombre("Juan")
                .apellido("Pérez")
                .username("juan")
                .email("juan@test.com")
                .password("$2a$10$encodedPassword")
                .role(Role.USER)
                .build();
    }

    @Test
    @DisplayName("Debería hacer login correctamente con email")
    void testLogin_ConEmail() {
        // Arrange
        LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                .emailOrUsername("juan@test.com")
                .password("password123")
                .build();

        when(usuarioService.findByEmailOrUsername("juan@test.com")).thenReturn(usuario);
        when(passwordEncoder.matches("password123", usuario.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken("juan@test.com", 1L)).thenReturn("jwt-token");

        // Act
        ResponseEntity<?> respuesta = authController.login(loginRequest);

        // Assert
        assertEquals(200, respuesta.getStatusCode().value());
        assertNotNull(respuesta.getBody());
        verify(usuarioService, times(1)).findByEmailOrUsername("juan@test.com");
        verify(passwordEncoder, times(1)).matches("password123", usuario.getPassword());
        verify(jwtUtil, times(1)).generateToken("juan@test.com", 1L);
    }

    @Test
    @DisplayName("Debería hacer login correctamente con username")
    void testLogin_ConUsername() {
        // Arrange
        LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                .emailOrUsername("juan")
                .password("password123")
                .build();

        when(usuarioService.findByEmailOrUsername("juan")).thenReturn(usuario);
        when(passwordEncoder.matches("password123", usuario.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken("juan@test.com", 1L)).thenReturn("jwt-token");

        // Act
        ResponseEntity<?> respuesta = authController.login(loginRequest);

        // Assert
        assertEquals(200, respuesta.getStatusCode().value());
        verify(usuarioService, times(1)).findByEmailOrUsername("juan");
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando las credenciales son inválidas - usuario no existe")
    void testLogin_UsuarioNoExiste() {
        // Arrange
        LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                .emailOrUsername("noexiste@test.com")
                .password("password123")
                .build();

        when(usuarioService.findByEmailOrUsername("noexiste@test.com")).thenReturn(null);

        // Act & Assert
        assertThrows(UnauthorizedException.class, () -> authController.login(loginRequest));
        verify(usuarioService, times(1)).findByEmailOrUsername("noexiste@test.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando la contraseña es incorrecta")
    void testLogin_PasswordIncorrecto() {
        // Arrange
        LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                .emailOrUsername("juan@test.com")
                .password("passwordIncorrecto")
                .build();

        when(usuarioService.findByEmailOrUsername("juan@test.com")).thenReturn(usuario);
        when(passwordEncoder.matches("passwordIncorrecto", usuario.getPassword())).thenReturn(false);

        // Act & Assert
        assertThrows(UnauthorizedException.class, () -> authController.login(loginRequest));
        verify(usuarioService, times(1)).findByEmailOrUsername("juan@test.com");
        verify(passwordEncoder, times(1)).matches("passwordIncorrecto", usuario.getPassword());
    }

    @Test
    @DisplayName("Debería registrar un nuevo usuario correctamente")
    void testRegister() {
        // Arrange
        RegisterRequestDTO registerRequest = RegisterRequestDTO.builder()
                .nombre("María")
                .apellido("González")
                .username("maria")
                .email("maria@test.com")
                .password("password123")
                .build();

        Usuario nuevoUsuario = Usuario.builder()
                .id(2L)
                .nombre("María")
                .apellido("González")
                .username("maria")
                .email("maria@test.com")
                .password("$2a$10$encodedPassword")
                .role(Role.USER)
                .build();

        when(usuarioService.existsByEmail("maria@test.com")).thenReturn(false);
        when(usuarioService.existsByUsername("maria")).thenReturn(false);
        when(usuarioService.save(any(Usuario.class))).thenReturn(nuevoUsuario);
        when(jwtUtil.generateToken("maria@test.com", 2L)).thenReturn("jwt-token");

        // Act
        ResponseEntity<?> respuesta = authController.register(registerRequest);

        // Assert
        assertEquals(200, respuesta.getStatusCode().value());
        assertNotNull(respuesta.getBody());
        verify(usuarioService, times(1)).existsByEmail("maria@test.com");
        verify(usuarioService, times(1)).existsByUsername("maria");
        verify(usuarioService, times(1)).save(any(Usuario.class));
        verify(jwtUtil, times(1)).generateToken("maria@test.com", 2L);
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando el email ya existe")
    void testRegister_EmailDuplicado() {
        // Arrange
        RegisterRequestDTO registerRequest = RegisterRequestDTO.builder()
                .email("juan@test.com")
                .username("nuevo")
                .password("password123")
                .build();

        when(usuarioService.existsByEmail("juan@test.com")).thenReturn(true);

        // Act & Assert
        assertThrows(DuplicateResourceException.class, () -> authController.register(registerRequest));
        verify(usuarioService, times(1)).existsByEmail("juan@test.com");
        verify(usuarioService, never()).save(any(Usuario.class));
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando el username ya existe")
    void testRegister_UsernameDuplicado() {
        // Arrange
        RegisterRequestDTO registerRequest = RegisterRequestDTO.builder()
                .email("nuevo@test.com")
                .username("juan")
                .password("password123")
                .build();

        when(usuarioService.existsByEmail("nuevo@test.com")).thenReturn(false);
        when(usuarioService.existsByUsername("juan")).thenReturn(true);

        // Act & Assert
        assertThrows(DuplicateResourceException.class, () -> authController.register(registerRequest));
        verify(usuarioService, times(1)).existsByEmail("nuevo@test.com");
        verify(usuarioService, times(1)).existsByUsername("juan");
        verify(usuarioService, never()).save(any(Usuario.class));
    }

    @Test
    @DisplayName("Debería validar un token correctamente")
    void testValidateToken() {
        // Arrange
        String token = "valid-token";
        String authHeader = "Bearer " + token;

        when(jwtUtil.validateToken(token)).thenReturn(true);
        when(jwtUtil.getEmailFromToken(token)).thenReturn("juan@test.com");
        when(usuarioService.findByEmail("juan@test.com")).thenReturn(usuario);

        // Act
        ResponseEntity<?> respuesta = authController.validateToken(authHeader);

        // Assert
        assertEquals(200, respuesta.getStatusCode().value());
        assertNotNull(respuesta.getBody());
        verify(jwtUtil, times(1)).validateToken(token);
        verify(jwtUtil, times(1)).getEmailFromToken(token);
        verify(usuarioService, times(1)).findByEmail("juan@test.com");
    }
}

