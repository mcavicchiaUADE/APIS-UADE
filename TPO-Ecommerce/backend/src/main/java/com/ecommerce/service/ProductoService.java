package com.ecommerce.service;

import com.ecommerce.entity.Producto;
import com.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    /**
     * Obtener todos los productos
     */
    @Transactional(readOnly = true)
    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    /**
     * Obtener producto por ID
     */
    @Transactional(readOnly = true)
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id);
    }

    /**
     * Crear nuevo producto
     */
    public Producto crearProducto(Producto producto) {
        producto.setCreatedAt(LocalDateTime.now());
        return productoRepository.save(producto);
    }

    /**
     * Actualizar producto existente
     */
    public Optional<Producto> actualizarProducto(Long id, Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(productoExistente -> {
                productoActualizado.setId(id);
                    productoActualizado.setCreatedAt(productoExistente.getCreatedAt()); // Preservar fecha de creación
                productoActualizado.setUpdatedAt(LocalDateTime.now());
                    return productoRepository.save(productoActualizado);
                });
    }

    /**
     * Eliminar producto
     */
    public boolean eliminarProducto(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Buscar productos por nombre
     */
    @Transactional(readOnly = true)
    public List<Producto> buscarProductosPorNombre(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return obtenerTodosLosProductos();
        }
        
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    /**
     * Buscar productos por categoría
     */
    @Transactional(readOnly = true)
    public List<Producto> buscarProductosPorCategoria(Long categoryId) {
        return productoRepository.findByCategoriaId(categoryId);
    }

    /**
     * Buscar productos por disponibilidad de stock
     */
    @Transactional(readOnly = true)
    public List<Producto> buscarProductosPorStock(boolean disponible) {
        if (disponible) {
            return productoRepository.findByStockGreaterThan(0);
        } else {
            return productoRepository.findByStockEquals(0);
        }
    }

    /**
     * Buscar productos por propietario
     */
    @Transactional(readOnly = true)
    public List<Producto> buscarProductosPorPropietario(Long ownerUserId) {
        return productoRepository.findByOwnerUserId(ownerUserId);
    }

    /**
     * Buscar productos por rango de precio
     */
    @Transactional(readOnly = true)
    public List<Producto> buscarProductosPorPrecio(BigDecimal precioMin, BigDecimal precioMax) {
        return productoRepository.findByPriceBetween(precioMin, precioMax);
    }

    /**
     * Contar total de productos
     */
    @Transactional(readOnly = true)
    public long contarProductos() {
        return productoRepository.count();
    }

    /**
     * Verificar si existe un producto
     */
    @Transactional(readOnly = true)
    public boolean existeProducto(Long id) {
        return productoRepository.existsById(id);
    }
}