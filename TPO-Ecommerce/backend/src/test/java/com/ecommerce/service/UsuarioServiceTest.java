package com.ecommerce.service;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.Usuario;
import com.ecommerce.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - UsuarioService")
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

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
    @DisplayName("Debería obtener todos los usuarios")
    void testGetAllUsuarios() {
        // Arrange
        List<Usuario> usuariosEsperados = Arrays.asList(usuario);
        when(usuarioRepository.findAll()).thenReturn(usuariosEsperados);

        // Act
        List<Usuario> resultado = usuarioService.getAllUsuarios();

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(usuarioRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Debería obtener un usuario por ID cuando existe")
    void testGetUsuarioById_Existe() {
        // Arrange
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        // Act
        Optional<Usuario> resultado = usuarioService.getUsuarioById(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("juan@test.com", resultado.get().getEmail());
        verify(usuarioRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Debería encontrar usuario por email cuando existe")
    void testFindByEmail_Existe() {
        // Arrange
        when(usuarioRepository.findByEmail("juan@test.com")).thenReturn(Optional.of(usuario));

        // Act
        Usuario resultado = usuarioService.findByEmail("juan@test.com");

        // Assert
        assertNotNull(resultado);
        assertEquals("juan@test.com", resultado.getEmail());
        verify(usuarioRepository, times(1)).findByEmail("juan@test.com");
    }

    @Test
    @DisplayName("Debería retornar null cuando el email no existe")
    void testFindByEmail_NoExiste() {
        // Arrange
        when(usuarioRepository.findByEmail("noexiste@test.com")).thenReturn(Optional.empty());

        // Act
        Usuario resultado = usuarioService.findByEmail("noexiste@test.com");

        // Assert
        assertNull(resultado);
        verify(usuarioRepository, times(1)).findByEmail("noexiste@test.com");
    }

    @Test
    @DisplayName("Debería encontrar usuario por email o username")
    void testFindByEmailOrUsername() {
        // Arrange
        when(usuarioRepository.findByEmail("juan@test.com")).thenReturn(Optional.of(usuario));
        when(usuarioRepository.findByUsername("juan")).thenReturn(Optional.of(usuario));

        // Act
        Usuario resultadoEmail = usuarioService.findByEmailOrUsername("juan@test.com");
        Usuario resultadoUsername = usuarioService.findByEmailOrUsername("juan");

        // Assert
        assertNotNull(resultadoEmail);
        assertNotNull(resultadoUsername);
        verify(usuarioRepository, times(1)).findByEmail("juan@test.com");
        verify(usuarioRepository, times(1)).findByUsername("juan");
    }

    @Test
    @DisplayName("Debería guardar un usuario con contraseña encriptada")
    void testSaveUsuario_EncriptaPassword() {
        // Arrange
        Usuario nuevoUsuario = Usuario.builder()
                .nombre("María")
                .email("maria@test.com")
                .password("password123")
                .build();

        when(passwordEncoder.encode("password123")).thenReturn("$2a$10$encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario u = invocation.getArgument(0);
            u.setId(2L);
            return u;
        });

        // Act
        Usuario resultado = usuarioService.saveUsuario(nuevoUsuario);

        // Assert
        assertNotNull(resultado);
        verify(passwordEncoder, times(1)).encode("password123");
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    @DisplayName("No debería encriptar contraseña si ya está encriptada")
    void testSaveUsuario_PasswordYaEncriptada() {
        // Arrange
        Usuario usuarioConPasswordEncriptada = Usuario.builder()
                .nombre("María")
                .email("maria@test.com")
                .password("$2a$10$encodedPassword")
                .build();

        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioConPasswordEncriptada);

        // Act
        Usuario resultado = usuarioService.saveUsuario(usuarioConPasswordEncriptada);

        // Assert
        assertNotNull(resultado);
        verify(passwordEncoder, never()).encode(anyString());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    @DisplayName("Debería verificar si existe un email")
    void testExistsByEmail() {
        // Arrange
        when(usuarioRepository.existsByEmail("juan@test.com")).thenReturn(true);
        when(usuarioRepository.existsByEmail("noexiste@test.com")).thenReturn(false);

        // Act
        boolean existe1 = usuarioService.existsByEmail("juan@test.com");
        boolean existe2 = usuarioService.existsByEmail("noexiste@test.com");

        // Assert
        assertTrue(existe1);
        assertFalse(existe2);
        verify(usuarioRepository, times(2)).existsByEmail(anyString());
    }

    @Test
    @DisplayName("Debería verificar si existe un username")
    void testExistsByUsername() {
        // Arrange
        when(usuarioRepository.existsByUsername("juan")).thenReturn(true);
        when(usuarioRepository.existsByUsername("noexiste")).thenReturn(false);

        // Act
        boolean existe1 = usuarioService.existsByUsername("juan");
        boolean existe2 = usuarioService.existsByUsername("noexiste");

        // Assert
        assertTrue(existe1);
        assertFalse(existe2);
        verify(usuarioRepository, times(2)).existsByUsername(anyString());
    }

    @Test
    @DisplayName("Debería obtener usuarios por rol")
    void testGetUsuariosByRole() {
        // Arrange
        List<Usuario> admins = Arrays.asList(usuario);
        when(usuarioRepository.findByRole(Role.ADMIN)).thenReturn(admins);

        // Act
        List<Usuario> resultado = usuarioService.getUsuariosByRole(Role.ADMIN);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(usuarioRepository, times(1)).findByRole(Role.ADMIN);
    }

    @Test
    @DisplayName("Debería crear un usuario administrador")
    void testCreateAdmin() {
        // Arrange
        when(passwordEncoder.encode("admin123")).thenReturn("$2a$10$encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario u = invocation.getArgument(0);
            u.setId(2L);
            return u;
        });

        // Act
        Usuario resultado = usuarioService.createAdmin("Admin", "admin@test.com", "admin123");

        // Assert
        assertNotNull(resultado);
        assertEquals(Role.ADMIN, resultado.getRole());
        verify(passwordEncoder, times(1)).encode("admin123");
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    @DisplayName("Debería eliminar un usuario")
    void testDeleteUsuario() {
        // Arrange
        doNothing().when(usuarioRepository).deleteById(1L);

        // Act
        usuarioService.deleteUsuario(1L);

        // Assert
        verify(usuarioRepository, times(1)).deleteById(1L);
    }
}

