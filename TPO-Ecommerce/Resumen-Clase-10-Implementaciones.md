# 📗 Resumen Clase 10: Implementaciones en TPO-Ecommerce

## Persistencia con JPA, Hibernate y MySQL

---

## ✅ **1. Migración de H2 a MySQL**

### Configuración de Base de Datos
- **Archivo**: `application-prod.properties`
- **Base de datos**: MySQL en puerto 3308
- **Nombre**: `ecommerce_db`
- **Usuario**: root
- **Configuración completa de conexión JDBC**

```properties
# Datasource (conexión a MySQL)
spring.datasource.url=jdbc:mysql://localhost:3308/ecommerce_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

---

## ✅ **2. ORM (Object-Relational Mapping) e Hibernate**

### Entidades JPA Implementadas

#### Producto.java
```java
@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(nullable = false)
    private Integer stock;
    
    @ElementCollection
    @CollectionTable(name = "producto_imagenes", joinColumns = @JoinColumn(name = "producto_id"))
    @Column(name = "imagen_url")
    private List<String> images;
}
```

#### Usuario.java
```java
@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
```

### Anotaciones JPA Utilizadas
- `@Entity` - Marca la clase como entidad JPA
- `@Table(name = "tabla")` - Especifica nombre de tabla
- `@Id` - Clave primaria
- `@GeneratedValue(strategy = GenerationType.IDENTITY)` - ID auto-incremental
- `@Column` - Configuración de columnas
- `@ElementCollection` - Para colecciones de elementos básicos
- `@PreUpdate` - Hook para actualizaciones

---

## ✅ **3. Relaciones Entre Entidades**

### Relación Many-to-One: Producto → Categoria
```java
// En Producto.java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id")
private Categoria categoria;
```

### Relación Many-to-One: Producto → Usuario (Propietario)
```java
// En Producto.java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "owner_user_id")
private Usuario ownerUser;
```

### Relación One-to-Many: Usuario → Productos
```java
// En Usuario.java
@OneToMany(mappedBy = "ownerUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
@Builder.Default
private List<Producto> productos = new ArrayList<>();
```

### Relación One-to-Many: Usuario → Pedidos
```java
// En Usuario.java
@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
@Builder.Default
private List<Pedido> pedidos = new ArrayList<>();
```

---

## ✅ **4. DTOs (Data Transfer Objects)**

### ProductoDTO.java
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private List<String> images;
    private Long categoriaId;
    private String categoriaNombre;
    private Long ownerUserId;
    private String ownerUserNombre;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor para mapear desde Producto
    public ProductoDTO(Producto producto) {
        this.id = producto.getId();
        this.name = producto.getName();
        this.description = producto.getDescription();
        this.price = producto.getPrice();
        this.stock = producto.getStock();
        this.images = producto.getImages();
        this.categoriaId = producto.getCategoria() != null ? producto.getCategoria().getId() : null;
        this.categoriaNombre = producto.getCategoria() != null ? producto.getCategoria().getNombre() : null;
        this.ownerUserId = producto.getOwnerUser() != null ? producto.getOwnerUser().getId() : null;
        this.ownerUserNombre = producto.getOwnerUser() != null ? producto.getOwnerUser().getNombre() : null;
        this.createdAt = producto.getCreatedAt();
        this.updatedAt = producto.getUpdatedAt();
    }
}
```

### UsuarioDTO.java
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor para mapear desde Usuario (sin password por seguridad)
    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.email = usuario.getEmail();
        this.role = usuario.getRole();
        this.createdAt = usuario.getCreatedAt();
        this.updatedAt = usuario.getUpdatedAt();
    }
}
```

---

## ✅ **5. Manejo de Excepciones**

### Excepción Personalizada
```java
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(Long id) {
        super("Producto con ID " + id + " no encontrado");
    }
}
```

### Manejo en Controller
```java
@GetMapping("/{id}")
public ResponseEntity<ProductoDTO> obtenerProductoPorId(@PathVariable Long id) {
    try {
        Optional<Producto> producto = productoService.obtenerProductoPorId(id);
        return producto.map(p -> ResponseEntity.ok(new ProductoDTO(p)))
                     .orElseThrow(() -> new ProductoNotFoundException(id));
    } catch (ProductoNotFoundException e) {
        throw e;
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
```

---

## ✅ **6. Anotación @Transactional**

### En ProductoService.java
```java
@Service
@Transactional
public class ProductoService {
    
    // Método transaccional de solo lectura
    @Transactional(readOnly = true)
    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }
    
    // Método transaccional completo
    public Producto crearProducto(Producto producto) {
        producto.setCreatedAt(LocalDateTime.now());
        return productoRepository.save(producto);
    }
}
```

---

## ✅ **7. Repositorios con Spring Data JPA**

### ProductoRepository.java
```java
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
}
```

### UsuarioRepository.java
```java
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar usuario por email (para login)
    Optional<Usuario> findByEmail(String email);
    
    // Buscar usuario por username
    Optional<Usuario> findByUsername(String username);
    
    // Verificar si existe un email (para registro)
    boolean existsByEmail(String email);
    
    // Verificar si existe un username (para registro)
    boolean existsByUsername(String username);
    
    // Buscar usuarios por rol
    List<Usuario> findByRole(Role role);
}
```

---

## ✅ **8. Configuración Hibernate**

### application-prod.properties
```properties
# ========================================
# CONFIGURACIÓN DE HIBERNATE/JPA
# ========================================

# DDL (Estructura de tablas)
# Opciones: create, create-drop, update, validate, none
spring.jpa.hibernate.ddl-auto=update

# Mostrar SQL en consola (útil en desarrollo)
spring.jpa.show-sql=true

# Formatear SQL para mejor legibilidad
spring.jpa.properties.hibernate.format_sql=true

# Dialecto de MySQL 8
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

---

## 📊 **Estado de Implementación Clase 10**

| Concepto Clase 10 | TPO-Ecommerce | Estado |
|-------------------|---------------|---------|
| MySQL + Hibernate | ✅ | **Completo** |
| Entidades JPA | ✅ | **Completo** |
| Relaciones OneToMany/ManyToOne | ✅ | **Completo** |
| DTOs | ✅ | **Completo** |
| Excepciones Personalizadas | ✅ | **Completo** |
| @Transactional | ✅ | **Completo** |
| Repositorios JPA | ✅ | **Completo** |
| Queries Personalizadas | ✅ | **Completo** |
| Configuración Hibernate | ✅ | **Completo** |

---

## 🚀 **Funcionalidades Adicionales Implementadas**

### Más allá de la Clase 10:

1. **Timestamps Automáticos**
   - `createdAt` y `updatedAt` con `@PreUpdate`
   - Gestión automática de fechas

2. **Manejo de Imágenes Múltiples**
   - `@ElementCollection` para lista de URLs de imágenes
   - Tabla separada `producto_imagenes`

3. **Queries Avanzadas**
   - Búsqueda por nombre con `LIKE`
   - Filtros por categoría y stock
   - Queries personalizadas con `@Query`

4. **Configuración de Perfiles**
   - Separación dev/prod en archivos properties
   - Configuración específica por entorno

---

## ✅ **Conclusión**

El proyecto **TPO-Ecommerce** implementa **TODOS** los conceptos de la Clase 10:

- ✅ **Persistencia real** con MySQL
- ✅ **ORM completo** con Hibernate/JPA
- ✅ **Relaciones complejas** entre entidades
- ✅ **DTOs** para transferencia segura de datos
- ✅ **Manejo de excepciones** personalizado
- ✅ **Transacciones** con `@Transactional`
- ✅ **Repositorios** con Spring Data JPA
- ✅ **Queries personalizadas** avanzadas

**El proyecto va más allá de los requisitos básicos** e incluye funcionalidades profesionales como timestamps automáticos, manejo de imágenes múltiples y queries complejas de búsqueda.

---

**Fecha**: Diciembre 2024  
**Proyecto**: TPO-Ecommerce  
**Curso**: APIs - UADE

