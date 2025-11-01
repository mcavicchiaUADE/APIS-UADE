package com.ecommerce.service;

import com.ecommerce.entity.Categoria;
import com.ecommerce.entity.Producto;
import com.ecommerce.entity.Usuario;
import com.ecommerce.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - ProductoService")
class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    private Producto producto;
    private Categoria categoria;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        categoria = Categoria.builder()
                .id(1L)
                .nombre("Electrónicos")
                .build();

        usuario = Usuario.builder()
                .id(1L)
                .nombre("Juan")
                .apellido("Pérez")
                .email("juan@test.com")
                .username("juan")
                .password("password")
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
        List<Producto> productosEsperados = Arrays.asList(producto);
        when(productoRepository.findAll()).thenReturn(productosEsperados);

        // Act
        List<Producto> resultado = productoService.obtenerTodosLosProductos();

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("Laptop", resultado.get(0).getName());
        verify(productoRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Debería obtener un producto por ID cuando existe")
    void testObtenerProductoPorId_Existe() {
        // Arrange
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));

        // Act
        Optional<Producto> resultado = productoService.obtenerProductoPorId(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Laptop", resultado.get().getName());
        verify(productoRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Debería retornar Optional vacío cuando el producto no existe")
    void testObtenerProductoPorId_NoExiste() {
        // Arrange
        when(productoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<Producto> resultado = productoService.obtenerProductoPorId(999L);

        // Assert
        assertFalse(resultado.isPresent());
        verify(productoRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("Debería crear un nuevo producto correctamente")
    void testCrearProducto() {
        // Arrange
        Producto nuevoProducto = Producto.builder()
                .name("Tablet")
                .price(new BigDecimal("500.00"))
                .stock(5)
                .build();

        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> {
            Producto p = invocation.getArgument(0);
            p.setId(2L);
            p.setCreatedAt(LocalDateTime.now());
            return p;
        });

        // Act
        Producto resultado = productoService.crearProducto(nuevoProducto);

        // Assert
        assertNotNull(resultado);
        assertNotNull(resultado.getId());
        assertNotNull(resultado.getCreatedAt());
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    @DisplayName("Debería actualizar un producto existente")
    void testActualizarProducto_Existe() {
        // Arrange
        Producto productoActualizado = Producto.builder()
                .name("Laptop Actualizada")
                .price(new BigDecimal("1600.00"))
                .stock(15)
                .build();

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> {
            Producto p = invocation.getArgument(0);
            p.setUpdatedAt(LocalDateTime.now());
            return p;
        });

        // Act
        Optional<Producto> resultado = productoService.actualizarProducto(1L, productoActualizado);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals(1L, resultado.get().getId());
        assertEquals("Laptop Actualizada", resultado.get().getName());
        verify(productoRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    @DisplayName("Debería retornar Optional vacío al actualizar un producto que no existe")
    void testActualizarProducto_NoExiste() {
        // Arrange
        Producto productoActualizado = Producto.builder()
                .name("Laptop Actualizada")
                .build();

        when(productoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<Producto> resultado = productoService.actualizarProducto(999L, productoActualizado);

        // Assert
        assertFalse(resultado.isPresent());
        verify(productoRepository, times(1)).findById(999L);
        verify(productoRepository, never()).save(any(Producto.class));
    }

    @Test
    @DisplayName("Debería eliminar un producto cuando existe")
    void testEliminarProducto_Existe() {
        // Arrange
        when(productoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productoRepository).deleteById(1L);

        // Act
        boolean resultado = productoService.eliminarProducto(1L);

        // Assert
        assertTrue(resultado);
        verify(productoRepository, times(1)).existsById(1L);
        verify(productoRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Debería retornar false al eliminar un producto que no existe")
    void testEliminarProducto_NoExiste() {
        // Arrange
        when(productoRepository.existsById(999L)).thenReturn(false);

        // Act
        boolean resultado = productoService.eliminarProducto(999L);

        // Assert
        assertFalse(resultado);
        verify(productoRepository, times(1)).existsById(999L);
        verify(productoRepository, never()).deleteById(anyLong());
    }

    @Test
    @DisplayName("Debería buscar productos por nombre")
    void testBuscarProductosPorNombre() {
        // Arrange
        List<Producto> productosEsperados = Arrays.asList(producto);
        when(productoRepository.findByNombreContainingIgnoreCase("laptop")).thenReturn(productosEsperados);

        // Act
        List<Producto> resultado = productoService.buscarProductosPorNombre("laptop");

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(productoRepository, times(1)).findByNombreContainingIgnoreCase("laptop");
    }

    @Test
    @DisplayName("Debería retornar todos los productos cuando el nombre es nulo o vacío")
    void testBuscarProductosPorNombre_NuloOVacio() {
        // Arrange
        List<Producto> todosLosProductos = Arrays.asList(producto);
        when(productoRepository.findAll()).thenReturn(todosLosProductos);

        // Act
        List<Producto> resultado1 = productoService.buscarProductosPorNombre(null);
        List<Producto> resultado2 = productoService.buscarProductosPorNombre("");

        // Assert
        assertNotNull(resultado1);
        assertNotNull(resultado2);
        verify(productoRepository, times(2)).findAll();
    }

    @Test
    @DisplayName("Debería buscar productos por categoría")
    void testBuscarProductosPorCategoria() {
        // Arrange
        List<Producto> productosEsperados = Arrays.asList(producto);
        when(productoRepository.findByCategoriaId(1L)).thenReturn(productosEsperados);

        // Act
        List<Producto> resultado = productoService.buscarProductosPorCategoria(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(productoRepository, times(1)).findByCategoriaId(1L);
    }

    @Test
    @DisplayName("Debería contar productos correctamente")
    void testContarProductos() {
        // Arrange
        when(productoRepository.count()).thenReturn(5L);

        // Act
        long resultado = productoService.contarProductos();

        // Assert
        assertEquals(5L, resultado);
        verify(productoRepository, times(1)).count();
    }

    @Test
    @DisplayName("Debería verificar si existe un producto")
    void testExisteProducto() {
        // Arrange
        when(productoRepository.existsById(1L)).thenReturn(true);
        when(productoRepository.existsById(999L)).thenReturn(false);

        // Act
        boolean existe1 = productoService.existeProducto(1L);
        boolean existe2 = productoService.existeProducto(999L);

        // Assert
        assertTrue(existe1);
        assertFalse(existe2);
        verify(productoRepository, times(2)).existsById(anyLong());
    }
}

