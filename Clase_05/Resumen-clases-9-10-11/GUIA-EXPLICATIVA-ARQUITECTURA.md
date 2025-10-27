# 📚 GUÍA EXPLICATIVA DE LA ARQUITECTURA DEL PROYECTO
## TPO-Ecommerce - Explicación Detallada de Componentes

---

## 🎯 **PROPÓSITO DE ESTA GUÍA**

Este documento explica **qué es cada componente** mencionado en el documento de comparación, con referencias directas a los archivos del proyecto para facilitar la comprensión y navegación del código.

---

## 📂 **ESTRUCTURA DEL PROYECTO**

```
TPO-Ecommerce/backend/
├── pom.xml                                      ← Configuración Maven
├── src/main/resources/
│   ├── application.properties                   ← Configuración de la app
│   ├── application-dev.properties              ← Configuración desarrollo
│   └── application-prod.properties             ← Configuración producción
└── src/main/java/com/ecommerce/
    ├── EcommerceBackendApplication.java        ← Punto de entrada (main)
    ├── controller/                             ← Capa de presentación (API)
    ├── service/                                 ← Capa de lógica de negocio
    ├── repository/                              ← Capa de acceso a datos
    ├── entity/                                  ← Modelo de datos (entidades)
    ├── dto/                                     ← Objetos de transferencia
    ├── config/                                  ← Configuraciones
    ├── security/                                ← Seguridad y JWT
    ├── exception/                               ← Excepciones personalizadas
    ├── util/                                    ← Utilidades
    └── initializer/                             ← Inicializadores de datos
```

---

## 🔧 **1. CONFIGURACIÓN DEL PROYECTO**

### **📄 pom.xml**
**Ubicación:** [`TPO-Ecommerce/backend/pom.xml`](../TPO-Ecommerce/backend/pom.xml)

**¿Qué es?**  
Archivo de configuración de Maven que define todas las dependencias y configuraciones del proyecto.

**¿Para qué sirve?**
- Define las librerías que usa el proyecto (Spring Boot, JPA, Lombok, etc.)
- Configura la versión de Java (17)
- Establece los plugins de compilación

**Dependencias principales:**
```xml
- spring-boot-starter-web      → Framework web de Spring
- spring-boot-starter-data-jpa → Spring Data JPA para acceso a datos
- lombok                       → Reduce código boilerplate
- spring-boot-starter-security → Seguridad con Spring Security
- mysql-connector-j           → Conector para MySQL
- jjwt-api/jjwt-impl          → JWT para autenticación
```

---

### **📄 application.properties**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/resources/application.properties`](../TPO-Ecommerce/backend/src/main/resources/application.properties)

**¿Qué es?**  
Archivo de configuración de Spring Boot que define el perfil activo y el nivel de logging.

**¿Para qué sirve?**
- Activa el perfil de producción (prod)
- Configura niveles de debug para el logging

---

### **📄 application-prod.properties**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/resources/application-prod.properties`](../TPO-Ecommerce/backend/src/main/resources/application-prod.properties)

**¿Qué es?**  
Configuración específica para el entorno de producción.

**¿Para qué sirve?**
- Define la conexión a MySQL
- Configura Hibernate para manejo de base de datos
- Establece parámetros de producción (logging, SQL formatting, etc.)

---

### **📄 application-dev.properties**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/resources/application-dev.properties`](../TPO-Ecommerce/backend/src/main/resources/application-dev.properties)

**¿Qué es?**  
Configuración para el entorno de desarrollo.

**¿Para qué sirve?**
- Permite usar H2 (base de datos en memoria) para desarrollo rápido
- Facilita el testing sin necesidad de MySQL

---

## 🏗️ **2. ARQUITECTURA EN CAPAS**

### **📁 CAPA DE PRESENTACIÓN - Controllers**

Los **Controllers** son el punto de entrada de las peticiones HTTP. Responden con JSON y exponen la API REST.

#### **📄 ProductoController.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/ProductoController.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/ProductoController.java)

**¿Qué es?**  
Controlador REST que maneja las operaciones CRUD (Create, Read, Update, Delete) de productos.

**Endpoints:**
- `GET /api/productos` → Lista todos los productos
- `GET /api/productos/{id}` → Obtiene un producto por ID
- `POST /api/productos` → Crea un nuevo producto (requiere auth)
- `PUT /api/productos/{id}` → Actualiza un producto (requiere auth)
- `DELETE /api/productos/{id}` → Elimina un producto (requiere auth)

**Ejemplo de código:**
```java
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProductoController {
    @Autowired
    private ProductoService productoService;
    
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodosLosProductos() {
        // Llama al servicio y retorna los productos
    }
}
```

---

#### **📄 AuthController.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/AuthController.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/AuthController.java)

**¿Qué es?**  
Controlador que maneja la autenticación y registro de usuarios.

**Endpoints:**
- `POST /api/auth/login` → Inicia sesión y retorna JWT
- `POST /api/auth/register` → Registra un nuevo usuario

**¿Para qué sirve?**
- Validar credenciales
- Generar tokens JWT para autenticación
- Registrar nuevos usuarios

---

#### **📄 CategoriaController.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/CategoriaController.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/CategoriaController.java)

**¿Qué es?**  
Controlador para gestionar las categorías de productos.

**Endpoints:**
- `GET /api/categorias` → Lista todas las categorías
- `GET /api/categorias/{id}` → Obtiene una categoría

---

#### **📄 PedidoController.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/PedidoController.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/PedidoController.java)

**¿Qué es?**  
Controlador para gestionar los pedidos de compra.

**Endpoints:**
- `GET /api/pedidos` → Lista pedidos del usuario autenticado
- `POST /api/pedidos` → Crea un nuevo pedido

---

### **📁 CAPA DE LÓGICA DE NEGOCIO - Services**

Los **Services** contienen la lógica de negocio y validaciones. Se comunican con los repositories para acceder a los datos.

#### **📄 ProductoService.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/ProductoService.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/ProductoService.java)

**¿Qué es?**  
Servicio que contiene la lógica de negocio para productos.

**Funciones principales:**
- Buscar productos por diferentes criterios
- Validar datos antes de guardar
- Actualizar precios y stock
- Gestionar imágenes

**¿Para qué sirve?**
- Separa la lógica de negocio del controlador
- Facilita el mantenimiento y testing
- Permite reutilización de código

---

#### **📄 UsuarioService.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/UsuarioService.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/UsuarioService.java)

**¿Qué es?**  
Servicio para gestionar usuarios y sus operaciones.

**Funciones principales:**
- Buscar usuarios por email o username
- Validar usuarios duplicados
- Encriptar contraseñas con BCrypt
- Asignar roles (USER/ADMIN)

---

#### **📄 PedidoService.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/PedidoService.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/PedidoService.java)

**¿Qué es?**  
Servicio para procesar pedidos y gestionar el carrito de compras.

**Funciones principales:**
- Crear pedidos con validaciones
- Calcular totales
- Verificar stock disponible
- Actualizar estado de pedidos

---

#### **📄 CategoriaService.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/CategoriaService.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/CategoriaService.java)

**¿Qué es?**  
Servicio para gestionar las categorías de productos.

**Funciones principales:**
- Buscar categorías
- Validar que no existan duplicados
- Asociar productos a categorías

---

### **📁 CAPA DE ACCESO A DATOS - Repositories**

Los **Repositories** son interfaces que extienden `JpaRepository` y permiten acceder a la base de datos con métodos predefinidos.

#### **📄 ProductoRepository.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/ProductoRepository.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/ProductoRepository.java)

**¿Qué es?**  
Interfaz que extiende `JpaRepository<Producto, Long>` para acceder a la tabla de productos.

**Métodos personalizados:**
```java
// Buscar productos por nombre (sin importar mayúsculas)
List<Producto> findByNombreContainingIgnoreCase(String nombre);

// Buscar productos por categoría
List<Producto> findByCategoriaId(Long categoriaId);

// Buscar productos con stock disponible
List<Producto> findByStockGreaterThan(Integer stock);

// Buscar productos por rango de precio
List<Producto> findByPriceBetween(BigDecimal precioMin, BigDecimal precioMax);
```

**¿Para qué sirve?**
- Proporciona métodos CRUD automáticos (save, delete, findAll, etc.)
- Permite crear consultas personalizadas con @Query
- Facilita el acceso a datos sin escribir SQL manual

---

#### **📄 UsuarioRepository.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/UsuarioRepository.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/UsuarioRepository.java)

**¿Qué es?**  
Interfaz para acceder a la tabla de usuarios.

**Métodos personalizados:**
```java
Optional<Usuario> findByEmail(String email);
Optional<Usuario> findByUsername(String username);
boolean existsByEmail(String email);
List<Usuario> findByRole(Role role);
```

---

#### **📄 CategoriaRepository.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/CategoriaRepository.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/CategoriaRepository.java)

**¿Qué es?**  
Interfaz para acceder a la tabla de categorías.

**Métodos:**
```java
Optional<Categoria> findByNombre(String nombre);
boolean existsByNombre(String nombre);
```

---

#### **📄 PedidoRepository.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/PedidoRepository.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/PedidoRepository.java)

**¿Qué es?**  
Interfaz para acceder a la tabla de pedidos.

**Métodos personalizados:**
```java
List<Pedido> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
List<Pedido> findByEstado(EstadoPedido estado);
List<Pedido> findByUsuarioIdAndEstado(Long usuarioId, EstadoPedido estado);
```

---

### **📁 CAPA DE DOMINIO - Entities (Modelos de Datos)**

Las **Entities** son clases Java que representan tablas en la base de datos. Usan anotaciones JPA para mapear a SQL.

#### **📄 Usuario.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Usuario.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Usuario.java)

**¿Qué es?**  
Representa la tabla "usuarios" en la base de datos.

**Campos principales:**
- `id` → ID único (autoincremental)
- `nombre`, `apellido` → Datos personales
- `username`, `email` → Credenciales únicas
- `password` → Contraseña encriptada
- `role` → Rol del usuario (USER/ADMIN)
- `productos` → Relación OneToMany con productos
- `pedidos` → Relación OneToMany con pedidos

**Anotaciones JPA:**
```java
@Entity                          // Marca como entidad de JPA
@Table(name = "usuarios")        // Nombre de la tabla
@Id @GeneratedValue              // Clave primaria autoincremental
@OneToMany(mappedBy = "...")    // Relación 1 a muchos
```

**Implementa UserDetails:** Proporciona integración con Spring Security.

---

#### **📄 Producto.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Producto.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Producto.java)

**¿Qué es?**  
Representa la tabla "productos" en la base de datos.

**Campos principales:**
- `id` → ID único
- `name`, `description` → Información del producto
- `price` → Precio (BigDecimal para precisión)
- `stock` → Cantidad disponible
- `images` → Lista de URLs de imágenes
- `categoria` → Relación ManyToOne con Categoria
- `ownerUser` → Relación ManyToOne con Usuario (vendedor)

**Relaciones JPA:**
```java
@ManyToOne(fetch = FetchType.LAZY)  // Relación muchos a uno
@JoinColumn(name = "category_id")    // Nombre de la columna FK
```

---

#### **📄 Categoria.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Categoria.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Categoria.java)

**¿Qué es?**  
Representa categorías de productos (Electrónica, Ropa, Hogar, etc.).

**Campos:**
- `id` → ID único
- `nombre` → Nombre de la categoría
- `description` → Descripción
- `productos` → Relación OneToMany con productos

---

#### **📄 Pedido.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Pedido.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Pedido.java)

**¿Qué es?**  
Representa un pedido de compra realizado por un usuario.

**Campos:**
- `id` → ID del pedido
- `usuario` → Usuario que realizó el pedido
- `detalles` → Lista de productos en el pedido (OneToMany)
- `total` → Total del pedido
- `estado` → Estado del pedido (PENDIENTE, ENVIADO, ENTREGADO)
- `createdAt` → Fecha de creación

---

#### **📄 DetallePedido.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/DetallePedido.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/DetallePedido.java)

**¿Qué es?**  
Representa cada línea de un pedido (qué producto y cuántas unidades).

**Campos:**
- `id` → ID del detalle
- `pedido` → Pedido al que pertenece
- `producto` → Producto comprado
- `cantidad` → Cantidad comprada
- `precioUnitario` → Precio en el momento de la compra

---

#### **📄 Role.java (Enum)**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Role.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Role.java)

**¿Qué es?**  
Enum que define los roles disponibles en el sistema.

**Valores:**
- `USER` → Usuario normal (compra y vende)
- `ADMIN` → Administrador (acceso total)

---

### **📁 DTOs (Data Transfer Objects)**

Los **DTOs** son objetos que se usan para transferir datos entre capas, exponiendo solo la información necesaria al frontend.

#### **📄 ProductoDTO.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/ProductoDTO.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/ProductoDTO.java)

**¿Qué es?**  
Objeto que representa un producto para enviar al frontend.

**¿Por qué existe?**  
- Evita exponer datos internos de la entidad
- Permite incluir información adicional (categoría completa, etc.)
- Diferencia entre lo que se guarda en DB y lo que se muestra en API

---

#### **📄 LoginRequestDTO.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/LoginRequestDTO.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/LoginRequestDTO.java)

**¿Qué es?**  
Objeto que recibe los datos de login (email/username y password).

---

#### **📄 LoginResponseDTO.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/LoginResponseDTO.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/LoginResponseDTO.java)

**¿Qué es?**  
Objeto que retorna el token JWT y datos del usuario después de login exitoso.

---

#### **📄 PedidoDTO.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/PedidoDTO.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/dto/PedidoDTO.java)

**¿Qué es?**  
Objeto que representa un pedido completo con sus detalles para el frontend.

---

## 🔒 **3. SEGURIDAD**

### **📄 SecurityConfig.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/config/SecurityConfig.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/config/SecurityConfig.java)

**¿Qué es?**  
Configuración de Spring Security que define las reglas de acceso.

**¿Qué hace?**
- Define qué endpoints son públicos (sin auth)
- Define qué endpoints requieren autenticación
- Define qué endpoints requieren rol ADMIN
- Configura JWT como método de autenticación
- Desactiva CSRF (no necesario para APIs REST)

**Ejemplo de reglas:**
```java
.requestMatchers("/api/auth/**").permitAll()           // Login y registro públicos
.requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()  // Ver productos es público
.requestMatchers("/api/admin/**").hasRole("ADMIN")     // Solo admin
.requestMatchers(HttpMethod.POST, "/api/productos").authenticated() // Crear requiere auth
```

---

### **📄 JwtAuthenticationFilter.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/security/JwtAuthenticationFilter.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/security/JwtAuthenticationFilter.java)

**¿Qué es?**  
Filtro que intercepta todas las peticiones HTTP para validar el token JWT.

**¿Qué hace?**
1. Extrae el token JWT del header `Authorization: Bearer <token>`
2. Valida que el token sea válido y no haya expirado
3. Extrae el email del usuario del token
4. Carga el usuario de la base de datos
5. Establece el usuario en el contexto de Spring Security

**¿Cuándo se ejecuta?**  
Se ejecuta ANTES de que la petición llegue al controller.

---

### **📄 JwtUtil.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/util/JwtUtil.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/util/JwtUtil.java)

**¿Qué es?**  
Utilidad para generar y validar tokens JWT.

**Métodos principales:**
```java
String generateToken(UserDetails user)  // Genera un token JWT
Boolean validateToken(String token)    // Valida si un token es válido
String getEmailFromToken(String token) // Extrae el email del token
```

**¿Para qué sirve?**
- Genera tokens al hacer login
- Valida tokens en cada petición
- Extrae información del usuario del token

---

## ⚠️ **4. MANEJO DE EXCEPCIONES**

### **📄 GlobalExceptionHandler.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/exception/GlobalExceptionHandler.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/exception/GlobalExceptionHandler.java)

**¿Qué es?**  
Clase con `@RestControllerAdvice` que captura todas las excepciones de la aplicación.

**¿Qué hace?**
- Intercepta excepciones personalizadas
- Retorna respuestas JSON con formato consistente
- Incluye timestamp, status code, mensaje y path

**Excepciones manejadas:**
- `ProductoNotFoundException` → Cuando no se encuentra un producto
- `CategoriaNotFoundException` → Cuando no se encuentra una categoría
- `UsuarioNotFoundException` → Cuando no se encuentra un usuario
- `UnauthorizedException` → Cuando no hay token JWT válido
- `ValidationException` → Cuando faltan datos requeridos

**¿Por qué es útil?**  
Estandariza las respuestas de error y mejora la experiencia del frontend.

---

### **Excepciones personalizadas:**
Todas ubicadas en: [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/exception/`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/exception/)

- **ProductoNotFoundException** → Producto no encontrado
- **CategoriaNotFoundException** → Categoría no encontrada
- **UsuarioNotFoundException** → Usuario no encontrado
- **PedidoNotFoundException** → Pedido no encontrado
- **StockInsuficienteException** → No hay stock suficiente
- **UnauthorizedException** → No autorizado (falta token)
- **ForbiddenException** → Prohibido (no tiene permiso)
- **ValidationException** → Error de validación de datos
- **DuplicateResourceException** → Recurso duplicado

---

## 🚀 **5. CONFIGURACIÓN Y UTILIDADES**

### **📄 EcommerceBackendApplication.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/EcommerceBackendApplication.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/EcommerceBackendApplication.java)

**¿Qué es?**  
Clase principal que contiene el método `main()` y la anotación `@SpringBootApplication`.

**¿Qué hace?**
- Inicia la aplicación Spring Boot
- Escanea y carga todos los componentes
- Conecta con la base de datos
- Inicia el servidor Tomcat embebido (puerto 8080 por defecto)

**¿Cómo se ejecuta?**
```bash
# Desde la carpeta backend/
mvn spring-boot:run

# O ejecutando el JAR
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

---

### **📄 DataInitializer.java**
**Ubicación:** [`TPO-Ecommerce/backend/src/main/java/com/ecommerce/initializer/DataInitializer.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/initializer/DataInitializer.java)

**¿Qué es?**  
Clase que implementa `CommandLineRunner` y se ejecuta al iniciar la app.

**¿Qué hace?**
- Crea datos de prueba si la base de datos está vacía
- Genera usuarios de ejemplo (admin y usuario normal)
- Crea categorías de ejemplo
- Crea productos de ejemplo

**¿Cuándo se ejecuta?**  
Al iniciar la aplicación por primera vez (solo si la BD está vacía).

---

## 📊 **6. RELACIONES JPA (MAPEO DE ENTIDADES)**

### **¿Qué es una relación JPA?**
Define cómo se relacionan las tablas en la base de datos.

### **Tipos de relaciones:**

#### **@OneToMany** (1 a Muchos)
```java
// En Usuario.java
@OneToMany(mappedBy = "ownerUser")
private List<Producto> productos;

// Significa: Un usuario puede tener muchos productos
```

#### **@ManyToOne** (Muchos a Uno)
```java
// En Producto.java
@ManyToOne
@JoinColumn(name = "owner_user_id")
private Usuario ownerUser;

// Significa: Muchos productos pueden pertenecer a un usuario
```

#### **@ManyToMany** (Muchos a Muchos)
```java
// No usada en este proyecto, pero ejemplo:
// Un pedido puede tener muchos productos
// Un producto puede estar en muchos pedidos
```

---

## 🔄 **7. FLUJO DE DATOS (EJEMPLO: LISTAR PRODUCTOS)**

**1. Cliente Frontend hace petición:**
```javascript
GET http://localhost:8080/api/productos
```

**2. JwtAuthenticationFilter se ejecuta:**
- Valida si necesita token (para listar productos es público, no requiere)

**3. ProductoController recibe la petición:**
```java
@GetMapping
public ResponseEntity<List<ProductoDTO>> obtenerTodosLosProductos() {
    // Llama al servicio
}
```

**4. ProductoService ejecuta la lógica:**
```java
public List<Producto> obtenerTodosLosProductos() {
    return productoRepository.findAll(); // Llama al repository
}
```

**5. ProductoRepository accede a la base de datos:**
```java
// JpaRepository ya tiene el método findAll() implementado
// Hace SELECT * FROM productos
```

**6. Datos se transforman a DTO:**
```java
List<ProductoDTO> productos = productoService.obtenerTodosLosProductos()
    .stream()
    .map(ProductoDTO::new)  // Convierte Entity a DTO
    .collect(Collectors.toList());
```

**7. Se retorna JSON al frontend:**
```json
[
  {
    "id": 1,
    "name": "Laptop Dell",
    "price": 999.99,
    "stock": 10
  },
  ...
]
```

---

## 🎯 **8. ANOTACIONES MÁS IMPORTANTES**

### **@RestController**
Marca una clase como controller REST que retorna JSON automáticamente.

### **@RequestMapping("/api/productos")**
Define la ruta base para todos los métodos del controller.

### **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping**
Define el método HTTP y la ruta del endpoint.

### **@Autowired**
Inyecta dependencias automáticamente (Spring crea el objeto).

### **@Service**
Marca una clase como servicio (capa de negocio).

### **@Repository**
Marca una interfaz como repositorio (capa de datos).

### **@Entity**
Marca una clase como entidad JPA (se mapea a una tabla).

### **@Id**
Marca el campo como clave primaria.

### **@GeneratedValue**
Hace que el ID sea autoincremental.

### **@Column**
Define propiedades de la columna en la base de datos.

### **@OneToMany, @ManyToOne**
Define relaciones entre entidades.

### **@Transactional**
Las operaciones de base de datos se ejecutan en una transacción.

### **@CrossOrigin**
Permite peticiones desde el frontend (evita errores de CORS).

---

## 🔍 **9. CÓMO BUSCAR ARCHIVOS EN EL PROYECTO**

### **Estructura de carpetas:**
```
TPO-Ecommerce/backend/src/main/java/com/ecommerce/
├── controller/    → Busca aquí los endpoints
├── service/       → Busca aquí la lógica de negocio
├── repository/    → Busca aquí el acceso a datos
├── entity/        → Busca aquí los modelos de datos
├── dto/          → Busca aquí los objetos de transferencia
├── config/        → Busca aquí las configuraciones
├── security/      → Busca aquí JWT y filtros
└── exception/     → Busca aquí las excepciones
```

### **Ejemplo: Encontrar el código de login**

**1. Controller:** [`AuthController.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/controller/AuthController.java)
- Busca el método `login()`

**2. Service:** [`UsuarioService.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/service/UsuarioService.java)
- Busca `getUsuarioByEmail()` y validaciones

**3. Repository:** [`UsuarioRepository.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/repository/UsuarioRepository.java)
- Busca `findByEmail()`

**4. Entity:** [`Usuario.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/entity/Usuario.java)
- Modelo de datos del usuario

**5. JWT:** [`JwtUtil.java`](../TPO-Ecommerce/backend/src/main/java/com/ecommerce/util/JwtUtil.java)
- Generación y validación de tokens

---

## ✅ **10. CHECKLIST DE CONCEPTOS**

### **Ya entiendo:**
- [ ] ¿Qué es un Controller y qué hace?
- [ ] ¿Qué es un Service y por qué existe?
- [ ] ¿Qué es un Repository y cómo accede a datos?
- [ ] ¿Qué es una Entity y cómo se mapea a una tabla?
- [ ] ¿Qué es un DTO y por qué se usa?
- [ ] ¿Cómo funciona JWT y la autenticación?
- [ ] ¿Qué hace SecurityConfig?
- [ ] ¿Cómo se manejan las excepciones?
- [ ] ¿Qué son las anotaciones JPA (@Entity, @OneToMany, etc.)?
- [ ] ¿Cómo fluyen los datos desde el frontend hasta la BD?

---

## 📝 **CONCLUSIÓN**

Este documento explica cada componente del proyecto TPO-Ecommerce con referencias directas a los archivos del código.

**Para profundizar:**
1. Abre los archivos mencionados y lee el código
2. Sigue el flujo de una petición desde el controller hasta la BD
3. Prueba los endpoints con Postman
4. Modifica el código y observa los cambios

**Recursos útiles:**
- Documentación Spring Boot: https://spring.io/guides
- Documentación JPA: https://spring.io/guides/gs/accessing-data-jpa/
- Documentación Spring Security: https://spring.io/guides/topicals/spring-security-architecture

---

**¡Listo para la presentación! 🚀**

*Este documento facilita la comprensión del código y la navegación del proyecto.*

