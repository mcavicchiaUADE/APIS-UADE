package com.ecommerce.service;

import com.ecommerce.dto.CreatePedidoDTO;
import com.ecommerce.entity.*;
import com.ecommerce.exception.ProductoNotFoundException;
import com.ecommerce.exception.StockInsuficienteException;
import com.ecommerce.exception.UsuarioNotFoundException;
import com.ecommerce.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - PedidoService")
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private DetallePedidoRepository detallePedidoRepository;

    @Mock
    private ProductoRepository productoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private PedidoService pedidoService;

    private Usuario usuario;
    private Producto producto;
    private Pedido pedido;

    @BeforeEach
    void setUp() {
        usuario = Usuario.builder()
                .id(1L)
                .nombre("Juan")
                .email("juan@test.com")
                .username("juan")
                .password("password")
                .role(Role.USER)
                .build();

        Usuario vendedor = Usuario.builder()
                .id(2L)
                .nombre("Vendedor")
                .email("vendedor@test.com")
                .build();

        producto = Producto.builder()
                .id(1L)
                .name("Laptop")
                .price(new BigDecimal("1500.00"))
                .stock(10)
                .ownerUser(vendedor)
                .build();

        pedido = Pedido.builder()
                .id(1L)
                .usuario(usuario)
                .estado(EstadoPedido.PENDIENTE)
                .total(new BigDecimal("1500.00"))
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();
    }

    @Test
    @DisplayName("Debería obtener todos los pedidos")
    void testObtenerTodosLosPedidos() {
        // Arrange
        List<Pedido> pedidosEsperados = Arrays.asList(pedido);
        when(pedidoRepository.findAll()).thenReturn(pedidosEsperados);

        // Act
        List<Pedido> resultado = pedidoService.obtenerTodosLosPedidos();

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(pedidoRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Debería obtener un pedido por ID cuando existe")
    void testObtenerPedidoPorId_Existe() {
        // Arrange
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        // Act
        Optional<Pedido> resultado = pedidoService.obtenerPedidoPorId(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals(EstadoPedido.PENDIENTE, resultado.get().getEstado());
        verify(pedidoRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Debería obtener pedidos por usuario")
    void testObtenerPedidosPorUsuario() {
        // Arrange
        List<Pedido> pedidosEsperados = Arrays.asList(pedido);
        when(pedidoRepository.findByUsuarioIdOrderByCreatedAtDesc(1L)).thenReturn(pedidosEsperados);

        // Act
        List<Pedido> resultado = pedidoService.obtenerPedidosPorUsuario(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(pedidoRepository, times(1)).findByUsuarioIdOrderByCreatedAtDesc(1L);
    }

    @Test
    @DisplayName("Debería crear un pedido correctamente")
    void testCrearPedido() {
        // Arrange
        CreatePedidoDTO.ItemCarritoDTO itemDTO = CreatePedidoDTO.ItemCarritoDTO.builder()
                .productoId(1L)
                .cantidad(1)
                .build();

        CreatePedidoDTO createPedidoDTO = CreatePedidoDTO.builder()
                .items(Arrays.asList(itemDTO))
                .direccionEnvio("Calle Falsa 123")
                .build();

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> {
            Pedido p = invocation.getArgument(0);
            p.setId(1L);
            return p;
        });
        when(productoRepository.save(any(Producto.class))).thenReturn(producto);

        // Act
        Pedido resultado = pedidoService.crearPedido(1L, createPedidoDTO);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.getItems().size());
        verify(usuarioRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).findById(1L);
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando el usuario no existe")
    void testCrearPedido_UsuarioNoExiste() {
        // Arrange
        CreatePedidoDTO createPedidoDTO = CreatePedidoDTO.builder()
                .items(new ArrayList<>())
                .build();

        when(usuarioRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsuarioNotFoundException.class, 
                () -> pedidoService.crearPedido(999L, createPedidoDTO));
        verify(usuarioRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando el producto no existe")
    void testCrearPedido_ProductoNoExiste() {
        // Arrange
        CreatePedidoDTO.ItemCarritoDTO itemDTO = CreatePedidoDTO.ItemCarritoDTO.builder()
                .productoId(999L)
                .cantidad(1)
                .build();

        CreatePedidoDTO createPedidoDTO = CreatePedidoDTO.builder()
                .items(Arrays.asList(itemDTO))
                .build();

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ProductoNotFoundException.class,
                () -> pedidoService.crearPedido(1L, createPedidoDTO));
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando no hay stock suficiente")
    void testCrearPedido_StockInsuficiente() {
        // Arrange
        producto.setStock(0); // Sin stock

        CreatePedidoDTO.ItemCarritoDTO itemDTO = CreatePedidoDTO.ItemCarritoDTO.builder()
                .productoId(1L)
                .cantidad(1)
                .build();

        CreatePedidoDTO createPedidoDTO = CreatePedidoDTO.builder()
                .items(Arrays.asList(itemDTO))
                .build();

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));

        // Act & Assert
        assertThrows(StockInsuficienteException.class,
                () -> pedidoService.crearPedido(1L, createPedidoDTO));
    }

    @Test
    @DisplayName("Debería actualizar el estado de un pedido")
    void testActualizarEstado() {
        // Arrange
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        // Act
        Pedido resultado = pedidoService.actualizarEstado(1L, EstadoPedido.CANCELADO_COMPRADOR);

        // Assert
        assertNotNull(resultado);
        verify(pedidoRepository, times(1)).findById(1L);
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }

    @Test
    @DisplayName("Debería obtener pedidos por estado")
    void testObtenerPedidosPorEstado() {
        // Arrange
        List<Pedido> pedidosEsperados = Arrays.asList(pedido);
        when(pedidoRepository.findByEstado(EstadoPedido.PENDIENTE)).thenReturn(pedidosEsperados);

        // Act
        List<Pedido> resultado = pedidoService.obtenerPedidosPorEstado(EstadoPedido.PENDIENTE);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(pedidoRepository, times(1)).findByEstado(EstadoPedido.PENDIENTE);
    }
}

