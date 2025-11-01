package com.ecommerce.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - JwtUtil")
class JwtUtilTest {

    private JwtUtil jwtUtil;

    private String email;
    private Long userId;

    @BeforeEach
    void setUp() {
        email = "test@example.com";
        userId = 1L;
        // Crear instancia real de JwtUtil con tiempo de expiración largo para tests
        jwtUtil = new JwtUtil();
        // Usar reflexión para establecer un tiempo de expiración más largo (1 hora)
        try {
            java.lang.reflect.Field expirationField = JwtUtil.class.getDeclaredField("expiration");
            expirationField.setAccessible(true);
            expirationField.set(jwtUtil, 3600000); // 1 hora en milisegundos
        } catch (Exception e) {
            // Si falla, usar el valor por defecto
        }
    }

    @Test
    @DisplayName("Debería generar un token JWT válido")
    void testGenerateToken() {
        // Act
        String nuevoToken = jwtUtil.generateToken(email, userId);

        // Assert
        assertNotNull(nuevoToken);
        assertFalse(nuevoToken.isEmpty());
        assertTrue(nuevoToken.split("\\.").length == 3); // JWT tiene 3 partes separadas por puntos
    }

    @Test
    @DisplayName("Debería extraer el email del token")
    void testGetEmailFromToken() {
        // Arrange - Generar token fresco
        String tokenFresco = jwtUtil.generateToken(email, userId);
        
        // Act
        String emailExtraido = jwtUtil.getEmailFromToken(tokenFresco);

        // Assert
        assertNotNull(emailExtraido);
        assertEquals(email, emailExtraido);
    }

    @Test
    @DisplayName("Debería extraer el userId del token")
    void testGetUserIdFromToken() {
        // Arrange - Generar token fresco
        String tokenFresco = jwtUtil.generateToken(email, userId);
        
        // Act
        Long userIdExtraido = jwtUtil.getUserIdFromToken(tokenFresco);

        // Assert
        assertNotNull(userIdExtraido);
        assertEquals(userId, userIdExtraido);
    }

    @Test
    @DisplayName("Debería validar un token válido")
    void testValidateToken_TokenValido() {
        // Arrange - Generar token fresco
        String tokenFresco = jwtUtil.generateToken(email, userId);
        
        // Act
        boolean esValido = jwtUtil.validateToken(tokenFresco);

        // Assert
        assertTrue(esValido);
    }

    @Test
    @DisplayName("Debería retornar false para un token inválido")
    void testValidateToken_TokenInvalido() {
        // Arrange
        String tokenInvalido = "token.invalido.malformado";

        // Act
        boolean esValido = jwtUtil.validateToken(tokenInvalido);

        // Assert
        assertFalse(esValido);
    }

    @Test
    @DisplayName("Debería retornar false para un token nulo")
    void testValidateToken_TokenNulo() {
        // Act
        boolean esValido = jwtUtil.validateToken(null);

        // Assert
        assertFalse(esValido);
    }

    @Test
    @DisplayName("Debería obtener la fecha de expiración del token")
    void testGetExpirationDateFromToken() {
        // Arrange - Generar token fresco
        String tokenFresco = jwtUtil.generateToken(email, userId);
        
        // Act
        Date fechaExpiracion = jwtUtil.getExpirationDateFromToken(tokenFresco);

        // Assert
        assertNotNull(fechaExpiracion);
        assertTrue(fechaExpiracion.after(new Date())); // Debe estar en el futuro
    }

    @Test
    @DisplayName("Debería verificar si un token está expirado")
    void testIsTokenExpired_TokenNoExpirado() {
        // Arrange - Generar token fresco
        String tokenFresco = jwtUtil.generateToken(email, userId);
        
        // Act
        boolean estaExpirado = jwtUtil.isTokenExpired(tokenFresco);

        // Assert
        assertFalse(estaExpirado); // El token recién generado no debería estar expirado
    }

    @Test
    @DisplayName("Debería generar tokens diferentes para diferentes emails")
    void testGenerateToken_DiferentesEmails() {
        // Act
        String token1 = jwtUtil.generateToken("email1@test.com", 1L);
        String token2 = jwtUtil.generateToken("email2@test.com", 2L);

        // Assert
        assertNotEquals(token1, token2);
        assertNotNull(token1);
        assertNotNull(token2);
    }

    @Test
    @DisplayName("Debería generar tokens diferentes para el mismo email pero diferentes usuarios")
    void testGenerateToken_DiferentesUsuarios() {
        // Act
        String token1 = jwtUtil.generateToken(email, 1L);
        String token2 = jwtUtil.generateToken(email, 2L);

        // Assert
        assertNotEquals(token1, token2);
    }
}

