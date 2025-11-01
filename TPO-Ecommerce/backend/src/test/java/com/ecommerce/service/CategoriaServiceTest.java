package com.ecommerce.service;

import com.ecommerce.entity.Categoria;
import com.ecommerce.repository.CategoriaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - CategoriaService")
class CategoriaServiceTest {

    @Mock
    private CategoriaRepository categoriaRepository;

    @InjectMocks
    private CategoriaService categoriaService;

    private Categoria categoria;

    @BeforeEach
    void setUp() {
        categoria = Categoria.builder()
                .id(1L)
                .nombre("Electrónicos")
                .descripcion("Dispositivos electrónicos")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("Debería obtener todas las categorías")
    void testGetAllCategorias() {
        // Arrange
        List<Categoria> categoriasEsperadas = Arrays.asList(categoria);
        when(categoriaRepository.findAll()).thenReturn(categoriasEsperadas);

        // Act
        List<Categoria> resultado = categoriaService.getAllCategorias();

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("Electrónicos", resultado.get(0).getNombre());
        verify(categoriaRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Debería obtener una categoría por ID cuando existe")
    void testGetCategoriaById_Existe() {
        // Arrange
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria));

        // Act
        Optional<Categoria> resultado = categoriaService.getCategoriaById(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Electrónicos", resultado.get().getNombre());
        verify(categoriaRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Debería retornar Optional vacío cuando la categoría no existe")
    void testGetCategoriaById_NoExiste() {
        // Arrange
        when(categoriaRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<Categoria> resultado = categoriaService.getCategoriaById(999L);

        // Assert
        assertFalse(resultado.isPresent());
        verify(categoriaRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("Debería obtener una categoría por nombre cuando existe")
    void testGetCategoriaByNombre_Existe() {
        // Arrange
        when(categoriaRepository.findByNombre("Electrónicos")).thenReturn(Optional.of(categoria));

        // Act
        Optional<Categoria> resultado = categoriaService.getCategoriaByNombre("Electrónicos");

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Electrónicos", resultado.get().getNombre());
        verify(categoriaRepository, times(1)).findByNombre("Electrónicos");
    }

    @Test
    @DisplayName("Debería guardar una categoría correctamente")
    void testSaveCategoria() {
        // Arrange
        Categoria nuevaCategoria = Categoria.builder()
                .nombre("Ropa")
                .descripcion("Indumentaria")
                .build();

        when(categoriaRepository.save(any(Categoria.class))).thenAnswer(invocation -> {
            Categoria c = invocation.getArgument(0);
            c.setId(2L);
            c.setCreatedAt(LocalDateTime.now());
            return c;
        });

        // Act
        Categoria resultado = categoriaService.saveCategoria(nuevaCategoria);

        // Assert
        assertNotNull(resultado);
        assertNotNull(resultado.getId());
        verify(categoriaRepository, times(1)).save(any(Categoria.class));
    }

    @Test
    @DisplayName("Debería eliminar una categoría por ID")
    void testDeleteCategoria() {
        // Arrange
        doNothing().when(categoriaRepository).deleteById(1L);

        // Act
        categoriaService.deleteCategoria(1L);

        // Assert
        verify(categoriaRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Debería verificar si existe una categoría por nombre")
    void testExistsByNombre() {
        // Arrange
        when(categoriaRepository.existsByNombre("Electrónicos")).thenReturn(true);
        when(categoriaRepository.existsByNombre("NoExiste")).thenReturn(false);

        // Act
        boolean existe1 = categoriaService.existsByNombre("Electrónicos");
        boolean existe2 = categoriaService.existsByNombre("NoExiste");

        // Assert
        assertTrue(existe1);
        assertFalse(existe2);
        verify(categoriaRepository, times(2)).existsByNombre(anyString());
    }
}

