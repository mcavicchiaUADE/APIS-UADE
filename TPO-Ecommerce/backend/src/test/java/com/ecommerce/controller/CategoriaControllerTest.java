package com.ecommerce.controller;

import com.ecommerce.dto.CategoriaDTO;
import com.ecommerce.entity.Categoria;
import com.ecommerce.exception.CategoriaNotFoundException;
import com.ecommerce.service.CategoriaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests Unitarios - CategoriaController")
class CategoriaControllerTest {

    @Mock
    private CategoriaService categoriaService;

    @InjectMocks
    private CategoriaController categoriaController;

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
    void testObtenerTodasLasCategorias() {
        // Arrange
        List<Categoria> categorias = Arrays.asList(categoria);
        when(categoriaService.getAllCategorias()).thenReturn(categorias);

        // Act
        ResponseEntity<List<CategoriaDTO>> respuesta = categoriaController.obtenerTodasLasCategorias();

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        assertEquals(1, respuesta.getBody().size());
        verify(categoriaService, times(1)).getAllCategorias();
    }

    @Test
    @DisplayName("Debería obtener una categoría por ID cuando existe")
    void testObtenerCategoriaPorId_Existe() {
        // Arrange
        when(categoriaService.getCategoriaById(1L)).thenReturn(Optional.of(categoria));

        // Act
        ResponseEntity<CategoriaDTO> respuesta = categoriaController.obtenerCategoriaPorId(1L);

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        assertEquals("Electrónicos", respuesta.getBody().getNombre());
        verify(categoriaService, times(1)).getCategoriaById(1L);
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando la categoría no existe")
    void testObtenerCategoriaPorId_NoExiste() {
        // Arrange
        when(categoriaService.getCategoriaById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(CategoriaNotFoundException.class,
                () -> categoriaController.obtenerCategoriaPorId(999L));
        verify(categoriaService, times(1)).getCategoriaById(999L);
    }

    @Test
    @DisplayName("Debería crear una nueva categoría")
    void testCrearCategoria() {
        // Arrange
        when(categoriaService.saveCategoria(any(Categoria.class))).thenReturn(categoria);

        // Act
        ResponseEntity<CategoriaDTO> respuesta = categoriaController.crearCategoria(categoria);

        // Assert
        assertEquals(HttpStatus.CREATED, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        assertEquals("Electrónicos", respuesta.getBody().getNombre());
        verify(categoriaService, times(1)).saveCategoria(any(Categoria.class));
    }

    @Test
    @DisplayName("Debería actualizar una categoría existente")
    void testActualizarCategoria_Existe() {
        // Arrange
        Categoria categoriaActualizada = Categoria.builder()
                .id(1L)
                .nombre("Electrónicos Actualizada")
                .build();

        when(categoriaService.getCategoriaById(1L)).thenReturn(Optional.of(categoria));
        when(categoriaService.saveCategoria(any(Categoria.class))).thenReturn(categoriaActualizada);

        // Act
        ResponseEntity<CategoriaDTO> respuesta = categoriaController.actualizarCategoria(1L, categoriaActualizada);

        // Assert
        assertEquals(HttpStatus.OK, respuesta.getStatusCode());
        assertNotNull(respuesta.getBody());
        verify(categoriaService, times(1)).getCategoriaById(1L);
        verify(categoriaService, times(1)).saveCategoria(any(Categoria.class));
    }

    @Test
    @DisplayName("Debería eliminar una categoría")
    void testEliminarCategoria() {
        // Arrange
        when(categoriaService.getCategoriaById(1L)).thenReturn(Optional.of(categoria));
        doNothing().when(categoriaService).deleteCategoria(1L);

        // Act
        ResponseEntity<Void> respuesta = categoriaController.eliminarCategoria(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, respuesta.getStatusCode());
        verify(categoriaService, times(1)).getCategoriaById(1L);
        verify(categoriaService, times(1)).deleteCategoria(1L);
    }
}

