package com.ecommerce.service;

import com.ecommerce.entity.Categoria;
import com.ecommerce.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    // Obtener todas las categorías
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }
    
    // Obtener categoría por ID
    public Optional<Categoria> getCategoriaById(Long id) {
        return categoriaRepository.findById(id);
    }
    
    // Obtener categoría por nombre
    public Optional<Categoria> getCategoriaByNombre(String nombre) {
        return categoriaRepository.findByNombre(nombre);
    }
    
    // Crear o actualizar categoría
    public Categoria saveCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    // Eliminar categoría
    public void deleteCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
    
    // Verificar si existe una categoría
    public boolean existsByNombre(String nombre) {
        return categoriaRepository.existsByNombre(nombre);
    }
}
