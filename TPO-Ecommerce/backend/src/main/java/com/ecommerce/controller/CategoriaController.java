package com.ecommerce.controller;

import com.ecommerce.dto.CategoriaDTO;
import com.ecommerce.entity.Categoria;
import com.ecommerce.exception.CategoriaNotFoundException;
import com.ecommerce.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;
    
    /**
     * GET /api/categorias
     * Obtiene todas las categorías
     */
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> obtenerTodasLasCategorias() {
        try {
            List<CategoriaDTO> categorias = categoriaService.getAllCategorias()
                    .stream()
                    .map(CategoriaDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/categorias/{id}
     * Obtiene una categoría por su ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> obtenerCategoriaPorId(@PathVariable Long id) {
        try {
            Optional<Categoria> categoria = categoriaService.getCategoriaById(id);
            return categoria.map(c -> ResponseEntity.ok(new CategoriaDTO(c)))
                         .orElseThrow(() -> new CategoriaNotFoundException(id));
        } catch (CategoriaNotFoundException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * POST /api/categorias
     * Crea una nueva categoría
     */
    @PostMapping
    public ResponseEntity<CategoriaDTO> crearCategoria(@RequestBody Categoria categoria) {
        try {
            Categoria categoriaCreada = categoriaService.saveCategoria(categoria);
            return ResponseEntity.status(HttpStatus.CREATED).body(new CategoriaDTO(categoriaCreada));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * PUT /api/categorias/{id}
     * Actualiza una categoría existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> actualizarCategoria(
            @PathVariable Long id, 
            @RequestBody Categoria categoria) {
        try {
            Optional<Categoria> categoriaExistente = categoriaService.getCategoriaById(id);
            if (categoriaExistente.isEmpty()) {
                throw new CategoriaNotFoundException(id);
            }
            
            categoria.setId(id);
            Categoria categoriaActualizada = categoriaService.saveCategoria(categoria);
            return ResponseEntity.ok(new CategoriaDTO(categoriaActualizada));
        } catch (CategoriaNotFoundException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * DELETE /api/categorias/{id}
     * Elimina una categoría por su ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        try {
            Optional<Categoria> categoria = categoriaService.getCategoriaById(id);
            if (categoria.isEmpty()) {
                throw new CategoriaNotFoundException(id);
            }
            
            categoriaService.deleteCategoria(id);
            return ResponseEntity.noContent().build();
        } catch (CategoriaNotFoundException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/categorias/health
     * Endpoint de salud para verificar que el servicio está funcionando
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Servicio de categorías funcionando correctamente");
    }
}
