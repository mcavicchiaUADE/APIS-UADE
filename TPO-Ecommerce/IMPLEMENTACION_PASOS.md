# 🚀 Guía de Implementación - Clase 09: Persistencia con Spring Boot

## 📋 Checklist de Implementación

### ✅ FASE 1: Configuración del Entorno

#### 1.1 Instalar y Configurar XAMPP
```powershell
# Descargar XAMPP desde: https://www.apachefriends.org/es/download.html
# Instalar y ejecutar XAMPP Control Panel
# Iniciar Apache y MySQL
```

#### 1.2 Crear Base de Datos MySQL
```sql
-- Abrir phpMyAdmin (http://localhost/phpmyadmin)
-- Crear nueva base de datos:
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 1.3 Verificar Dependencias en pom.xml
```xml
<!-- Verificar que tienes estas dependencias: -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

### ✅ FASE 2: Configuración de Base de Datos

#### 2.1 Configurar application.properties
```properties
# Ya está configurado correctamente en tu proyecto:
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

#### 2.2 Probar Conexión
```powershell
# Ejecutar la aplicación Spring Boot
mvn spring-boot:run
# Verificar en consola que no hay errores de conexión
# Verificar en phpMyAdmin que se crearon las tablas automáticamente
```

### ✅ FASE 3: Completar Entidades (Modelos)

#### 3.1 Arreglar Producto.java
```java
// PROBLEMA DETECTADO: Error de sintaxis en línea 24
// CAMBIAR:
@Column(nullable = false)
private Double precio;    @Column(nullable = false)
private Integer stock;

// POR:
@Column(nullable = false)
private Double precio;
    
@Column(nullable = false)
private Integer stock;
```

#### 3.2 Arreglar Categoria.java
```java
// PROBLEMA DETECTADO: Error de sintaxis en línea 17
// CAMBIAR:
@Column(nullable = false)    private String nombre;

// POR:
@Column(nullable = false)
private String nombre;
```

#### 3.3 Completar Entidades Faltantes
Crear las siguientes entidades que están referenciadas pero no implementadas:

**Usuario.java:**
```java
package com.api.e_commerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellido;
    
    @Column(nullable = false, unique = true)
    private String dni;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();
}
```

**Pedido.java:**
```java
package com.api.e_commerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    private String detalle;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}
```

**Direccion.java:**
```java
package com.api.e_commerce.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "direcciones")
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String calle;
    
    @Column(nullable = false)
    private String numero;
    
    private String piso;
    
    private String departamento;
    
    @Column(nullable = false)
    private String ciudad;
    
    @Column(nullable = false)
    private String codigoPostal;
    
    @Column(nullable = false)
    private String pais;
}
```

#### 3.4 Completar Productos Especializados
**ProductoFisico.java:**
```java
package com.api.e_commerce.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "productos_fisicos")
@EqualsAndHashCode(callSuper = true)
public class ProductoFisico extends Producto {
    
    @Column(name = "peso")
    private Double peso;
    
    @Column(name = "dimensiones")
    private String dimensiones;
    
    @Column(name = "material")
    private String material;
}
```

**ProductoDigital.java:**
```java
package com.api.e_commerce.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "productos_digitales")
@EqualsAndHashCode(callSuper = true)
public class ProductoDigital extends Producto {
    
    @Column(name = "tamaño_archivo")
    private String tamañoArchivo;
    
    @Column(name = "formato")
    private String formato;
    
    @Column(name = "url_descarga")
    private String urlDescarga;
}
```

### ✅ FASE 4: Implementar DTOs Completos

#### 4.1 Completar ProductoDTO.java
```java
package com.api.e_commerce.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private List<String> categorias;
    
    public ProductoDTO() {}
    
    public ProductoDTO(Long id, String nombre, String descripcion, Double precio, Integer stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }
}
```

#### 4.2 Completar ProductoMapper.java
```java
package com.api.e_commerce.dto;

import com.api.e_commerce.model.Producto;
import com.api.e_commerce.model.Categoria;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductoMapper {
    
    public ProductoDTO toDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        
        if (producto.getCategorias() != null) {
            List<String> nombresCategorias = producto.getCategorias()
                .stream()
                .map(Categoria::getNombre)
                .collect(Collectors.toList());
            dto.setCategorias(nombresCategorias);
        }
        
        return dto;
    }
    
    public List<ProductoDTO> toDTOList(List<Producto> productos) {
        return productos.stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
}
```

### ✅ FASE 5: Implementar Manejo de Excepciones

#### 5.1 Crear Excepciones Personalizadas
**ProductoNotFoundException.java:**
```java
package com.api.e_commerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(Long id) {
        super("Producto con ID " + id + " no encontrado");
    }
    
    public ProductoNotFoundException(String mensaje) {
        super(mensaje);
    }
}
```

**ProductoValidationException.java:**
```java
package com.api.e_commerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ProductoValidationException extends RuntimeException {
    public ProductoValidationException(String mensaje) {
        super(mensaje);
    }
}
```

#### 5.2 Crear Global Exception Handler
**GlobalExceptionHandler.java:**
```java
package com.api.e_commerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ProductoNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleProductoNotFound(
            ProductoNotFoundException ex, WebRequest request) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "Producto no encontrado");
        response.put("message", ex.getMessage());
        response.put("path", request.getDescription(false).replace("uri=", ""));
        
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ProductoValidationException.class)
    public ResponseEntity<Map<String, Object>> handleProductoValidation(
            ProductoValidationException ex, WebRequest request) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Error de validación");
        response.put("message", ex.getMessage());
        response.put("path", request.getDescription(false).replace("uri=", ""));
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(
            Exception ex, WebRequest request) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Error interno del servidor");
        response.put("message", "Ha ocurrido un error inesperado");
        response.put("path", request.getDescription(false).replace("uri=", ""));
        
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

### ✅ FASE 6: Mejorar Servicios y Controladores

#### 6.1 Actualizar ProductoService.java
```java
package com.api.e_commerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.model.Producto;
import com.api.e_commerce.repository.ProductoRepository;
import com.api.e_commerce.dto.ProductoUpdateDTO;
import com.api.e_commerce.exception.ProductoNotFoundException;
import com.api.e_commerce.exception.ProductoValidationException;

@Service
@Transactional
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
            .orElseThrow(() -> new ProductoNotFoundException(id));
    }

    public Producto saveProducto(Producto producto) {
        // Validaciones de negocio
        if (producto.getPrecio() <= 0) {
            throw new ProductoValidationException("El precio debe ser mayor a 0");
        }
        if (producto.getStock() < 0) {
            throw new ProductoValidationException("El stock no puede ser negativo");
        }
        
        return productoRepository.save(producto);
    }

    public void deleteProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ProductoNotFoundException(id);
        }
        productoRepository.deleteById(id);
    }
    
    public Producto updateProducto(Long id, ProductoUpdateDTO productoDTO) {
        Producto producto = getProductoById(id); // Esto ya lanza excepción si no existe
        
        // Validaciones
        if (productoDTO.getPrecio() != null && productoDTO.getPrecio() <= 0) {
            throw new ProductoValidationException("El precio debe ser mayor a 0");
        }
        if (productoDTO.getStock() != null && productoDTO.getStock() < 0) {
            throw new ProductoValidationException("El stock no puede ser negativo");
        }
        
        // Actualizar campos
        if (productoDTO.getNombre() != null) {
            producto.setNombre(productoDTO.getNombre());
        }
        if (productoDTO.getDescripcion() != null) {
            producto.setDescripcion(productoDTO.getDescripcion());
        }
        if (productoDTO.getPrecio() != null) {
            producto.setPrecio(productoDTO.getPrecio());
        }
        if (productoDTO.getStock() != null) {
            producto.setStock(productoDTO.getStock());
        }
        
        return productoRepository.save(producto);
    }
}
```

#### 6.2 Actualizar ProductoController.java
```java
package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.e_commerce.model.Producto;
import com.api.e_commerce.service.ProductoService;
import com.api.e_commerce.dto.ProductoUpdateDTO;
import com.api.e_commerce.dto.ProductoDTO;
import com.api.e_commerce.dto.ProductoMapper;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @Autowired
    private ProductoMapper productoMapper;

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        List<Producto> productos = productoService.getAllProductos();
        List<ProductoDTO> productosDTO = productoMapper.toDTOList(productos);
        return ResponseEntity.ok(productosDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> getProductoById(@PathVariable Long id) {
        Producto producto = productoService.getProductoById(id);
        ProductoDTO productoDTO = productoMapper.toDTO(producto);
        return ResponseEntity.ok(productoDTO);
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> addProducto(@RequestBody Producto producto) {
        Producto productoGuardado = productoService.saveProducto(producto);
        ProductoDTO productoDTO = productoMapper.toDTO(productoGuardado);
        return ResponseEntity.status(HttpStatus.CREATED).body(productoDTO);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> updateProducto(@PathVariable Long id, @RequestBody ProductoUpdateDTO productoDTO) {
        Producto productoActualizado = productoService.updateProducto(id, productoDTO);
        ProductoDTO productoResponseDTO = productoMapper.toDTO(productoActualizado);
        return ResponseEntity.ok(productoResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
}
```

### ✅ FASE 7: Agregar Repositorios Adicionales

#### 7.1 Crear CategoriaRepository.java
```java
package com.api.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.api.e_commerce.model.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    // Query methods personalizados
    Categoria findByNombre(String nombre);
    
    boolean existsByNombre(String nombre);
}
```

#### 7.2 Crear UsuarioRepository.java
```java
package com.api.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.api.e_commerce.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Usuario findByEmail(String email);
    
    Usuario findByDni(String dni);
    
    boolean existsByEmail(String email);
    
    boolean existsByDni(String dni);
}
```

### ✅ FASE 8: Pruebas y Validación

#### 8.1 Probar la Aplicación
```powershell
# Ejecutar la aplicación
mvn spring-boot:run

# Verificar en consola:
# - No hay errores de conexión a MySQL
# - Se muestran las consultas SQL formateadas
# - Las tablas se crean automáticamente
```

#### 8.2 Probar Endpoints con Postman

**GET /api/productos**
```json
// Respuesta esperada: Lista de productos con DTOs
[
    {
        "id": 1,
        "nombre": "Producto Ejemplo",
        "descripcion": "Descripción del producto",
        "precio": 99.99,
        "stock": 10,
        "categorias": ["Electrónicos", "Hogar"]
    }
]
```

**POST /api/productos**
```json
// Body:
{
    "nombre": "Nuevo Producto",
    "descripcion": "Descripción del nuevo producto",
    "precio": 149.99,
    "stock": 5
}

// Respuesta esperada: Producto creado con ID asignado
```

**PUT /api/productos/{id}**
```json
// Body:
{
    "nombre": "Producto Actualizado",
    "precio": 199.99
}

// Respuesta esperada: Producto actualizado
```

**DELETE /api/productos/{id}**
```json
// Respuesta esperada: 204 No Content
```

#### 8.3 Probar Manejo de Errores

**GET /api/productos/999**
```json
// Respuesta esperada: 404 Not Found
{
    "timestamp": "2024-01-15T10:30:00",
    "status": 404,
    "error": "Producto no encontrado",
    "message": "Producto con ID 999 no encontrado",
    "path": "/api/productos/999"
}
```

**POST /api/productos (con precio negativo)**
```json
// Body:
{
    "nombre": "Producto Inválido",
    "precio": -10.00,
    "stock": 5
}

// Respuesta esperada: 400 Bad Request
{
    "timestamp": "2024-01-15T10:30:00",
    "status": 400,
    "error": "Error de validación",
    "message": "El precio debe ser mayor a 0",
    "path": "/api/productos"
}
```

### ✅ FASE 9: Verificación Final

#### 9.1 Checklist de Verificación
- [ ] ✅ XAMPP instalado y MySQL funcionando
- [ ] ✅ Base de datos `ecommerce_db` creada
- [ ] ✅ Aplicación Spring Boot se ejecuta sin errores
- [ ] ✅ Tablas creadas automáticamente en MySQL
- [ ] ✅ Todos los endpoints funcionan correctamente
- [ ] ✅ DTOs implementados y funcionando
- [ ] ✅ Manejo de excepciones implementado
- [ ] ✅ Validaciones de negocio funcionando
- [ ] ✅ Relaciones entre entidades configuradas
- [ ] ✅ Consultas SQL se muestran en consola

#### 9.2 Estructura Final del Proyecto
```
src/main/java/com/api/e_commerce/
├── controller/
│   └── ProductoController.java ✅
├── dto/
│   ├── ProductoDTO.java ✅
│   ├── ProductoMapper.java ✅
│   └── ProductoUpdateDTO.java ✅
├── exception/
│   ├── GlobalExceptionHandler.java ✅
│   ├── ProductoNotFoundException.java ✅
│   └── ProductoValidationException.java ✅
├── model/
│   ├── Categoria.java ✅
│   ├── Direccion.java ✅
│   ├── Pedido.java ✅
│   ├── Producto.java ✅
│   ├── ProductoDigital.java ✅
│   ├── ProductoFisico.java ✅
│   └── Usuario.java ✅
├── repository/
│   ├── CategoriaRepository.java ✅
│   ├── ProductoRepository.java ✅
│   └── UsuarioRepository.java ✅
├── service/
│   └── ProductoService.java ✅
└── ECommerceApplication.java ✅
```

## 🎯 Resultado Final

Al completar todos estos pasos tendrás:

1. **API REST completa** con persistencia en MySQL
2. **Arquitectura en capas** bien definida (Controller → Service → Repository → Entity)
3. **DTOs implementados** para transferencia de datos
4. **Manejo de excepciones centralizado** con respuestas HTTP apropiadas
5. **Validaciones de negocio** en el servicio
6. **Relaciones entre entidades** configuradas correctamente
7. **Código limpio y mantenible** siguiendo mejores prácticas

## 🚨 Problemas Comunes y Soluciones

### Error de Conexión a MySQL
```bash
# Verificar que XAMPP esté ejecutándose
# Verificar usuario y contraseña en application.properties
# Verificar que la base de datos existe
```

### Error de Compilación
```bash
# Verificar que todas las dependencias están en pom.xml
# Limpiar y recompilar: mvn clean compile
```

### Tablas No Se Crean
```bash
# Verificar configuración de Hibernate
# Cambiar ddl-auto a 'create' temporalmente
# Verificar logs de la aplicación
```

¡Con esta guía tendrás todo lo necesario para implementar exitosamente el proyecto de persistencia con Spring Boot! 🚀
