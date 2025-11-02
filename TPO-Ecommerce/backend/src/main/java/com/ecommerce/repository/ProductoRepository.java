package com.ecommerce.repository;

import com.ecommerce.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Buscar productos por nombre (case insensitive)
    @Query("SELECT p FROM Producto p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Producto> findByNombreContainingIgnoreCase(@Param("nombre") String nombre);
    
    // Buscar productos por categoría
    List<Producto> findByCategoriaId(Long categoriaId);
    
    // Buscar productos con stock disponible
    List<Producto> findByStockGreaterThan(Integer stock);
    
    // Buscar productos sin stock
    List<Producto> findByStockEquals(Integer stock);
    
    // Buscar productos por rango de precio
    List<Producto> findByPriceBetween(java.math.BigDecimal precioMin, java.math.BigDecimal precioMax);
    
    // Buscar productos por propietario
    List<Producto> findByOwnerUserId(Long ownerUserId);
}
