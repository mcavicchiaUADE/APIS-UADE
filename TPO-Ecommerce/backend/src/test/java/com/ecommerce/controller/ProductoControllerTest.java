package com.ecommerce.controller;

import com.ecommerce.dto.ProductoDTO;
import com.ecommerce.entity.Categoria;
import com.ecommerce.entity.Producto;
import com.ecommerce.entity.Usuario;
import com.ecommerce.exception.ProductoNotFoundException;
import com.ecommerce.service.ProductoService;
import com.ecommerce.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - ProductoController")
class ProductoControllerTest {

    @Mock
    private ProductoService productoService;
    
    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private ProductoController productoController;

    private Producto producto;

    @BeforeEach
    void setUp() {
        Categoria categoria = Categoria.builder()
                .id(1L)
                .nombre("Electrónicos")
                .build();

        Usuario usuario = Usuario.builder()
                .id(1L)
                .nombre("Juan")
                .build();

        producto = Producto.builder()
                .id(1L)
                .name("Laptop")
                .description("Laptop de alta calidad")
                .price(new BigDecimal("1500.00"))
                .stock(10)
                .categoria(categoria)
                .ownerUser(usuario)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("Debería obtener todos los productos")
    void testObtenerTodosLosProductos() {
        // Arrange
        List<Producto> productos = Arrays.asList(producto);
        when(productoService.obtenerTodosLosProductos()).thenReturn(productos);

        // Act
        ResponseEntity<List<ProductoDTO>> respuesta = productoController.obtenerTodosLosProductos();

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        assertEquals(1, respuesta.getBody().size());
        verify(productoService, times(1)).obtenerTodosLosProductos();
    }

    @Test
    @DisplayName("Debería obtener un producto por ID cuando existe")
    void testObtenerProductoPorId_Existe() {
        // Arrange
        when(productoService.obtenerProductoPorId(1L)).thenReturn(Optional.of(producto));

        // Act
        ResponseEntity<ProductoDTO> respuesta = productoController.obtenerProductoPorId(1L);

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        assertEquals("Laptop", respuesta.getBody().getName());
        verify(productoService, times(1)).obtenerProductoPorId(1L);
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando el producto no existe")
    void testObtenerProductoPorId_NoExiste() {
        // Arrange
        when(productoService.obtenerProductoPorId(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ProductoNotFoundException.class,
                () -> productoController.obtenerProductoPorId(999L));
        verify(productoService, times(1)).obtenerProductoPorId(999L);
    }

    @Test
    @DisplayName("Debería crear un nuevo producto")
    void testCrearProducto() {
        // Arrange
        String authHeader = "Bearer test-token";
        Long userId = 1L;
        
        when(jwtUtil.getUserIdFromToken("test-token")).thenReturn(userId);
        when(productoService.crearProducto(any(Producto.class), eq(userId))).thenReturn(producto);

        // Act
        ResponseEntity<ProductoDTO> respuesta = productoController.crearProducto(producto, authHeader);

        // Assert
        assertEquals(HttpStatus.CREATED, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        assertEquals("Laptop", respuesta.getBody().getName());
        verify(productoService, times(1)).crearProducto(any(Producto.class), eq(userId));
    }

    @Test
    @DisplayName("Debería actualizar un producto existente")
    void testActualizarProducto_Existe() {
        // Arrange
        Producto productoActualizado = Producto.builder()
                .id(1L)
                .name("Laptop Actualizada")
                .price(new BigDecimal("1600.00"))
                .build();

        when(productoService.actualizarProducto(1L, productoActualizado))
                .thenReturn(Optional.of(productoActualizado));

        // Act
        ResponseEntity<ProductoDTO> respuesta = productoController.actualizarProducto(1L, productoActualizado);

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        verify(productoService, times(1)).actualizarProducto(1L, productoActualizado);
    }

    @Test
    @DisplayName("Debería eliminar un producto")
    void testEliminarProducto() {
        // Arrange
        when(productoService.eliminarProducto(1L)).thenReturn(true);

        // Act
        ResponseEntity<Void> respuesta = productoController.eliminarProducto(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, respuesta.getStatusCode());
        verify(productoService, times(1)).eliminarProducto(1L);
    }

    @Test
    @DisplayName("Debería buscar productos por nombre")
    void testBuscarProductosPorNombre() {
        // Arrange
        List<Producto> productos = Arrays.asList(producto);
        when(productoService.buscarProductosPorNombre("laptop")).thenReturn(productos);

        // Act
        ResponseEntity<List<ProductoDTO>> respuesta = productoController.buscarProductosPorNombre("laptop");

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        verify(productoService, times(1)).buscarProductosPorNombre("laptop");
    }
}

