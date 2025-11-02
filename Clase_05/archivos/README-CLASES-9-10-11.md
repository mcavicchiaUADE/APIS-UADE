# 📚 Guía Completa: Desarrollo Backend con Spring Boot
## Clases 9, 10 y 11 - E-commerce con React + Spring Boot

---

## 📋 Índice

1. [Introducción](#introducción)
2. [Instalaciones Necesarias](#instalaciones-necesarias)
3. [Clase 09: Fundamentos de Spring Boot y APIs REST](#clase-09-fundamentos-de-spring-boot-y-apis-rest)
4. [Clase 10: Persistencia con JPA, Hibernate y MySQL](#clase-10-persistencia-con-jpa-hibernate-y-mysql)
5. [Clase 11: Seguridad, Autenticación y Autorización](#clase-11-seguridad-autenticación-y-autorización)
6. [Resumen de Conceptos Clave](#resumen-de-conceptos-clave)
7. [Estructura de Archivos Completa](#estructura-de-archivos-completa)

---

## 🎯 Introducción

Esta guía documenta el desarrollo progresivo de un **backend completo para un e-commerce** utilizando Spring Boot, desde la creación básica de APIs REST hasta la implementación de seguridad con JWT.

### Contexto del Proyecto
- **Frontend**: React (productos, carrito, interfaz de usuario)
- **Backend**: API REST con Spring Boot
- **Base de Datos**: MySQL con Spring Data JPA
- **Seguridad**: Spring Security con autenticación y autorización por roles

### Arquitectura General

```
Frontend (React)
    ↓ HTTP Requests
Backend (Spring Boot) - Arquitectura en Capas
    ├── Controller   → Maneja peticiones HTTP
    ├── Service      → Lógica de negocio
    ├── Repository   → Acceso a datos
    └── Model        → Entidades (Producto, Usuario, etc.)
    ↓
Base de Datos (MySQL)
```

---

## 🛠️ Instalaciones Necesarias

### 1. JDK 17 (Java Development Kit)

**¿Por qué JDK 17?**
- Spring Boot 3.x requiere Java 17 o superior
- Mayor estabilidad y recursos disponibles
- Compatible con la mayoría de librerías

**Instalación:**
```bash
# Descargar de:
https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

# Windows: Descargar el instalador
https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.exe
```

**Configurar Variables de Entorno (Windows):**
1. Panel de Control → Variables de entorno
2. Crear `JAVA_HOME`: `C:\Program Files\Java\jdk-17\`
3. Agregar a `PATH`: `C:\Program Files\Java\jdk-17\bin`

**Verificar instalación:**
```bash
java --version
```

### 2. Maven (Gestor de Dependencias)

**¿Qué es Maven?**
Maven es el equivalente a `npm` para Java. Gestiona:
- Dependencias del proyecto
- Compilación y empaquetado
- Versionado de librerías
- Resolución automática de dependencias transitivas

**Archivo principal:** `pom.xml` (equivalente a `package.json`)

### 3. IDE y Extensiones

**VS Code - Extensiones recomendadas:**
- `vmware.vscode-boot-dev-pack` - Spring Boot Extension Pack
- `vscjava.vscode-java-pack` - Extension Pack for Java
- `Postman.postman-for-vscode` - Para probar APIs (opcional)

**Alternativas de IDE:**
- IntelliJ IDEA Community (recomendado para Spring Boot)
- Spring Tools Suite (STS)

### 4. XAMPP / MySQL

**Instalación:**
```bash
# Windows
https://www.apachefriends.org/es/download.html

# Ubuntu
sudo apt install mysql-server

# Fedora
sudo dnf install mysql-server

# Con Chocolatey (Windows)
choco install mysql-server

# Con Docker + MySQL Workbench
docker run --name mysql_server_dev -d -p 3306:3306 mysql:8.0
```

### 5. Postman (Prueba de APIs)

Descargar de: [postman.com](https://www.postman.com/)

---

## 📘 Clase 09: Fundamentos de Spring Boot y APIs REST

### 🎯 Objetivos de la Clase
- Comprender la arquitectura en capas
- Crear un proyecto Spring Boot desde cero
- Implementar APIs REST básicas (CRUD)
- Entender el patrón MVC
- Aplicar Inversión de Control (IoC) e Inyección de Dependencias

---

### 1. Arquitectura en Capas

**¿Qué es?**
Organización del código en capas independientes con responsabilidades claras.

#### Capas Principales:

```
┌─────────────────────────────────┐
│  CAPA DE PRESENTACIÓN           │  @RestController
│  (Controller)                   │  → Maneja HTTP requests/responses
├─────────────────────────────────┤
│  CAPA DE NEGOCIO                │  @Service
│  (Service)                      │  → Lógica de negocio, validaciones
├─────────────────────────────────┤
│  CAPA DE ACCESO A DATOS         │  @Repository
│  (Repository)                   │  → Interactúa con la base de datos
├─────────────────────────────────┤
│  CAPA DE DOMINIO                │  @Entity
│  (Model)                        │  → Define entidades del negocio
└─────────────────────────────────┘
```

**Ejemplo práctico:**
```
Solicitud: GET /api/productos/1
    ↓
Controller (recibe la petición, valida formato)
    ↓
Service (aplica lógica de negocio)
    ↓
Repository (consulta la base de datos)
    ↓
Respuesta: JSON con el producto
```

**Paquetes típicos en Spring Boot:**
```
com/api/ecommerce/
├── controller/     # @RestController
├── service/        # @Service
├── repository/     # @Repository
└── model/          # @Entity
```

---

### 2. Crear Proyecto Spring Boot

#### Paso 1: Usar Spring Initializr

Ir a: [https://start.spring.io/](https://start.spring.io/)

**Configuración del proyecto:**
```
Project:          Maven
Language:         Java
Spring Boot:      3.x (versión estable actual)
Packaging:        Jar
Java:             17

Group:            com.api
Artifact:         ecommerce
Name:             ecommerce
Description:      E-commerce Backend API
Package name:     com.api.ecommerce
```

**Dependencias iniciales:**
- ✅ **Spring Web** - Para crear APIs REST
- ✅ **Spring Data JPA** - Para persistencia de datos
- ✅ **Lombok** - Reduce código boilerplate
- ✅ **H2 Database** - Base de datos en memoria (desarrollo)
- ✅ **MySQL Driver** - Para producción

**Generar, descargar, descomprimir y abrir en VS Code**

#### Paso 2: Estructura del Proyecto Generado

```
ecommerce/
├── src/
│   ├── main/
│   │   ├── java/com/api/ecommerce/
│   │   │   └── EcommerceApplication.java    # Clase principal
│   │   └── resources/
│   │       └── application.properties        # Configuración
│   └── test/
│       └── java/
├── target/                                   # Archivos compilados
├── pom.xml                                   # Dependencias Maven
└── README.md
```

#### Paso 3: Configurar Base de Datos H2 (Desarrollo)

Editar `src/main/resources/application.properties`:

```properties
# H2 Database (base de datos en memoria para desarrollo)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Habilitar consola H2
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Mostrar SQL en consola
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

#### Paso 4: Levantar el Proyecto

**Opción 1 - VS Code:**
1. Abrir `pom.xml`
2. Spring Dashboard → Play (▶️)

**Opción 2 - Terminal:**
```bash
./mvnw spring-boot:run
```

**Verificar:**
- Servidor corriendo en: `http://localhost:8080`
- Consola H2: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Usuario: `sa`
  - Password: (vacío)

---

### 3. Patrón MVC (Model-View-Controller)

#### ¿Qué es MVC?

**MVC** es un patrón de diseño que separa la aplicación en tres componentes:

```
┌──────────┐      ┌──────────────┐      ┌───────────┐
│  MODEL   │ ←──→ │  CONTROLLER  │ ←──→ │   VIEW    │
└──────────┘      └──────────────┘      └───────────┘
   Datos            Lógica de              Frontend
   (Entidades)      control                (React)
```

**En nuestro e-commerce:**
- **Model**: `Producto.java`, `Usuario.java` → Representan datos
- **View**: React (frontend) → Interfaz de usuario
- **Controller**: `ProductoController.java` → Maneja peticiones HTTP

---

### 4. Crear API REST para Productos

#### Paso 1: Crear la Entidad (Model)

`src/main/java/com/api/ecommerce/model/Producto.java`:

```java
package com.api.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Data                      // Genera getters, setters, toString, equals, hashCode
@NoArgsConstructor         // Constructor sin argumentos
@AllArgsConstructor        // Constructor con todos los argumentos
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    private String descripcion;
    
    @Column(nullable = false)
    private Double precio;
    
    private Integer stock;
    
    private String imagen;
}
```

**Anotaciones clave:**
- `@Entity`: Marca la clase como una entidad JPA (tabla de BD)
- `@Table(name = "productos")`: Nombre de la tabla en la BD
- `@Id`: Clave primaria
- `@GeneratedValue`: Genera IDs automáticamente
- `@Column`: Configuración de la columna
- `@Data` (Lombok): Genera getters, setters, etc.

#### Paso 2: Crear el Repository

`src/main/java/com/api/ecommerce/repository/ProductoRepository.java`:

```java
package com.api.ecommerce.repository;

import com.api.ecommerce.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Spring Data JPA genera automáticamente la implementación
    // Métodos disponibles: save(), findById(), findAll(), deleteById(), etc.
}
```

**¿Qué hace JpaRepository?**
Proporciona automáticamente métodos CRUD:
- `save(producto)` - Guarda o actualiza
- `findById(id)` - Busca por ID
- `findAll()` - Lista todos
- `deleteById(id)` - Elimina por ID
- `count()` - Cuenta registros

#### Paso 3: Crear el Service

`src/main/java/com/api/ecommerce/service/ProductoService.java`:

```java
package com.api.ecommerce.service;

import com.api.ecommerce.model.Producto;
import com.api.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    // Obtener todos los productos
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }
    
    // Obtener producto por ID
    public Optional<Producto> getProductoById(Long id) {
        return productoRepository.findById(id);
    }
    
    // Crear o actualizar producto
    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }
    
    // Eliminar producto
    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
```

**¿Por qué separar Service del Controller?**

| Controller | Service |
|-----------|---------|
| Maneja HTTP requests | Contiene lógica de negocio |
| Valida formato de datos | Aplica reglas de negocio |
| Devuelve respuestas HTTP | Gestiona transacciones |
| No reutilizable | Reutilizable por múltiples controllers |

**Ejemplo práctico:**
```java
// ❌ MAL: Lógica en el Controller
@PostMapping("/transferencia")
public ResponseEntity<?> transferir(...) {
    // Validar fondos
    // Debitar cuenta origen
    // Acreditar cuenta destino
    // Todo mezclado con manejo HTTP
}

// ✅ BIEN: Lógica en el Service
@PostMapping("/transferencia")
public ResponseEntity<?> transferir(...) {
    transferenciaService.realizarTransferencia(...);
    return ResponseEntity.ok("Transferencia exitosa");
}
```

#### Paso 4: Crear el Controller

`src/main/java/com/api/ecommerce/controller/ProductoController.java`:

```java
package com.api.ecommerce.controller;

import com.api.ecommerce.model.Producto;
import com.api.ecommerce.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")  // Permitir peticiones desde React
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    // GET /api/productos - Listar todos
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }
    
    // GET /api/productos/1 - Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Optional<Producto> producto = productoService.getProductoById(id);
        return producto.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/productos - Crear producto
    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.saveProducto(producto);
        return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
    }
    
    // PUT /api/productos/1 - Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(
            @PathVariable Long id, 
            @RequestBody Producto producto) {
        
        if (!productoService.getProductoById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        producto.setId(id);
        Producto actualizado = productoService.saveProducto(producto);
        return ResponseEntity.ok(actualizado);
    }
    
    // DELETE /api/productos/1 - Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        if (!productoService.getProductoById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
}
```

**Anotaciones HTTP:**
- `@GetMapping` → GET (obtener datos)
- `@PostMapping` → POST (crear datos)
- `@PutMapping` → PUT (actualizar datos)
- `@DeleteMapping` → DELETE (eliminar datos)
- `@PathVariable` → Parámetro en la URL (`/productos/{id}`)
- `@RequestBody` → Datos en el cuerpo de la petición (JSON)

---

### 5. Inversión de Control (IoC) e Inyección de Dependencias

#### ¿Qué es IoC?

**Sin IoC (forma tradicional):**
```java
public class ProductoController {
    // Nosotros creamos las instancias manualmente
    private ProductoService productoService = new ProductoService();
    private ProductoRepository productoRepository = new ProductoRepository();
}
```

**Con IoC (Spring):**
```java
@RestController
public class ProductoController {
    // Spring crea y gestiona las instancias automáticamente
    @Autowired
    private ProductoService productoService;
}
```

**Ventajas:**
- ✅ Desacoplamiento: Las clases no dependen de implementaciones concretas
- ✅ Facilita testing: Podemos inyectar mocks
- ✅ Configuración centralizada
- ✅ Ciclo de vida gestionado por Spring

#### Tipos de Inyección

**1. Por campo (más común):**
```java
@Autowired
private ProductoService productoService;
```

**2. Por constructor (recomendado):**
```java
private final ProductoService productoService;

public ProductoController(ProductoService productoService) {
    this.productoService = productoService;
}
```

**3. Por setter:**
```java
private ProductoService productoService;

@Autowired
public void setProductoService(ProductoService productoService) {
    this.productoService = productoService;
}
```

---

### 6. Probar la API con Postman

#### GET - Listar productos
```http
GET http://localhost:8080/api/productos
```

#### GET - Obtener producto por ID
```http
GET http://localhost:8080/api/productos/1
```

#### POST - Crear producto
```http
POST http://localhost:8080/api/productos
Content-Type: application/json

{
    "nombre": "Laptop Dell",
    "descripcion": "Laptop para desarrollo",
    "precio": 999.99,
    "stock": 10,
    "imagen": "laptop.jpg"
}
```

#### PUT - Actualizar producto
```http
PUT http://localhost:8080/api/productos/1
Content-Type: application/json

{
    "nombre": "Laptop Dell XPS",
    "descripcion": "Laptop premium",
    "precio": 1299.99,
    "stock": 5,
    "imagen": "laptop-xps.jpg"
}
```

#### DELETE - Eliminar producto
```http
DELETE http://localhost:8080/api/productos/1
```

---

### 📝 Resumen Clase 09

**Conceptos aprendidos:**
- ✅ Arquitectura en capas (Controller, Service, Repository, Model)
- ✅ Patrón MVC
- ✅ Creación de proyecto Spring Boot
- ✅ APIs REST con métodos HTTP
- ✅ Spring Data JPA y repositorios
- ✅ Inversión de Control e Inyección de Dependencias
- ✅ Pruebas con Postman

**Siguiente paso:** Migrar de H2 a MySQL y agregar relaciones entre entidades.

---

## 📗 Clase 10: Persistencia con JPA, Hibernate y MySQL

### 🎯 Objetivos de la Clase
- Migrar de H2 (memoria) a MySQL (persistencia)
- Comprender ORM y Hibernate
- Implementar relaciones entre entidades (OneToMany, ManyToMany)
- Usar DTOs para transferencia de datos
- Manejar excepciones personalizadas

---

### 1. Persistencia de Datos

#### ¿Qué es la Persistencia?

**Persistencia** = Almacenamiento duradero de datos que sobrevive al reinicio de la aplicación.

```
H2 (Memoria)                    MySQL (Persistencia)
    ↓                                  ↓
Datos se pierden al               Datos permanecen
reiniciar la app                  almacenados en disco
```

**¿Por qué migrar de H2 a MySQL?**
- ✅ **Producción**: MySQL es robusto y escalable
- ✅ **Persistencia real**: Los datos no se pierden
- ✅ **Concurrencia**: Soporta múltiples conexiones simultáneas
- ✅ **Seguridad**: Mejor control de acceso

---

### 2. Configurar MySQL con Spring Boot

#### Paso 1: Instalar MySQL (XAMPP)

**Descargar XAMPP:**
- Windows: [https://www.apachefriends.org/es/download.html](https://www.apachefriends.org/es/download.html)

**Iniciar servicios:**
1. Abrir XAMPP Control Panel
2. Start Apache
3. Start MySQL

**Acceder a phpMyAdmin:**
- URL: `http://localhost/phpmyadmin`
- Usuario: `root`
- Password: (vacío por defecto)

#### Paso 2: Crear la Base de Datos

En phpMyAdmin:
```sql
CREATE DATABASE ecommerce_db;
```

O desde terminal MySQL:
```bash
mysql -u root -p
CREATE DATABASE ecommerce_db;
```

#### Paso 3: Configurar application.properties

Reemplazar la configuración de H2 por MySQL:

`src/main/resources/application.properties`:

```properties
# ========================================
# CONFIGURACIÓN DE MYSQL
# ========================================

# Datasource (conexión a MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

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

#### Explicación de Configuraciones

**spring.datasource.url:**
```
jdbc:mysql://localhost:3306/ecommerce_db?useSSL=false&serverTimezone=UTC
        ↓         ↓      ↓         ↓                ↓                ↓
    Protocolo  Driver Puerto   BD Nombre   Desactivar SSL    Zona horaria
```

**spring.jpa.hibernate.ddl-auto:**
- `create`: Elimina y recrea tablas (⚠️ Pierdes datos)
- `create-drop`: Crea tablas al iniciar, las elimina al cerrar
- `update`: Actualiza estructura sin perder datos (✅ Desarrollo)
- `validate`: Solo valida que la estructura coincida
- `none`: No hace nada automáticamente (✅ Producción)

#### Paso 4: Verificar la Conexión

1. Levantar el proyecto:
```bash
./mvnw spring-boot:run
```

2. Verificar en phpMyAdmin que se creó la tabla `productos`

3. Probar endpoints:
```http
POST http://localhost:8080/api/productos
Content-Type: application/json

{
    "nombre": "Mouse Logitech",
    "precio": 29.99,
    "stock": 50
}
```

4. Verificar en phpMyAdmin que el registro se guardó

---

### 3. ORM (Object-Relational Mapping) e Hibernate

#### ¿Qué es un ORM?

**ORM** mapea objetos de tu código (Java) a tablas de una base de datos relacional.

```
Clase Java (Producto.java)     ←→     Tabla MySQL (productos)
    ↓                                         ↓
private Long id;                        id BIGINT PRIMARY KEY
private String nombre;                  nombre VARCHAR(255)
private Double precio;                  precio DOUBLE
```

**Sin ORM (SQL manual):**
```java
String sql = "INSERT INTO productos (nombre, precio) VALUES (?, ?)";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, "Laptop");
stmt.setDouble(2, 999.99);
stmt.executeUpdate();
```

**Con ORM (Hibernate/JPA):**
```java
Producto producto = new Producto("Laptop", 999.99);
productoRepository.save(producto);  // Hibernate genera el SQL automáticamente
```

#### ¿Qué es Hibernate?

**Hibernate** es el framework ORM más usado en Java. Spring Boot lo usa por defecto cuando incluyes `spring-boot-starter-data-jpa`.

**JPA vs Hibernate:**
- **JPA** (Java Persistence API): Es una especificación (interfaz/contrato)
- **Hibernate**: Es la implementación de JPA (hace el trabajo real)

```
JPA (especificación)
    ↓
Hibernate (implementación)
    ↓
Base de Datos (MySQL, PostgreSQL, etc.)
```

---

### 4. Relaciones Entre Entidades

#### Tipos de Relaciones

| Relación | Ejemplo | Anotación |
|----------|---------|-----------|
| **One-to-One** (1:1) | Usuario → Perfil | `@OneToOne` |
| **One-to-Many** (1:N) | Usuario → Pedidos | `@OneToMany` |
| **Many-to-One** (N:1) | Pedidos → Usuario | `@ManyToOne` |
| **Many-to-Many** (N:N) | Productos ↔ Categorías | `@ManyToMany` |

#### Ejemplo 1: One-to-Many (Usuario → Pedidos)

**Caso:** Un usuario puede tener muchos pedidos.

```
Usuario                    Pedido
   1    ────────────────→    N
   │                         │
   id                    usuario_id (FK)
```

**Entidad Usuario:**
```java
@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String email;
    
    // Un usuario tiene muchos pedidos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Pedido> pedidos = new ArrayList<>();
}
```

**Entidad Pedido:**
```java
@Entity
@Table(name = "pedidos")
@Data
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String detalle;
    private Double total;
    
    // Muchos pedidos pertenecen a un usuario
    @ManyToOne
    @JoinColumn(name = "usuario_id")  // Clave foránea en la tabla pedidos
    private Usuario usuario;
}
```

**Explicación:**
- `@OneToMany(mappedBy = "usuario")`: La relación es manejada por el campo `usuario` de la clase `Pedido`
- `@ManyToOne`: Muchos pedidos pertenecen a un usuario
- `@JoinColumn(name = "usuario_id")`: Crea la columna `usuario_id` en la tabla `pedidos`
- `cascade = CascadeType.ALL`: Al guardar un usuario, también guarda sus pedidos

#### Ejemplo 2: Many-to-Many (Productos ↔ Categorías)

**Caso:** Un producto puede estar en varias categorías, y una categoría puede tener varios productos.

```
Producto          producto_categoria          Categoria
    N    ←──────────────────────────────→    N
         (tabla intermedia)
```

**Entidad Producto:**
```java
@Entity
@Table(name = "productos")
@Data
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private Double precio;
    
    // Muchos productos pueden tener muchas categorías
    @ManyToMany
    @JoinTable(
        name = "producto_categoria",
        joinColumns = @JoinColumn(name = "producto_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> categorias = new HashSet<>();
}
```

**Entidad Categoria:**
```java
@Entity
@Table(name = "categorias")
@Data
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String descripcion;
    
    // Muchas categorías pueden tener muchos productos
    @ManyToMany(mappedBy = "categorias")
    private Set<Producto> productos = new HashSet<>();
}
```

**Tabla intermedia generada automáticamente:**
```sql
CREATE TABLE producto_categoria (
    producto_id BIGINT,
    categoria_id BIGINT,
    PRIMARY KEY (producto_id, categoria_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
```

---

### 5. DTOs (Data Transfer Objects)

#### ¿Qué es un DTO?

**DTO** es un objeto simple que se usa para transferir datos entre capas de la aplicación (backend ↔ frontend).

**¿Por qué usar DTOs?**
- ✅ **Seguridad**: No exponer datos sensibles (ej: contraseñas, IDs internos)
- ✅ **Optimización**: Enviar solo los datos necesarios
- ✅ **Desacoplamiento**: Frontend no depende de la estructura de entidades
- ✅ **Validación**: Diferentes validaciones según el endpoint

#### Ejemplo: DTO para Producto

**Sin DTO (❌ Problema):**
```java
// Se envía todo el objeto Producto con todas sus relaciones
@GetMapping
public List<Producto> getProductos() {
    return productoService.findAll();  // Puede incluir datos innecesarios
}
```

**Con DTO (✅ Solución):**

**ProductoDTO.java:**
```java
package com.api.ecommerce.dto;

import lombok.Data;

@Data
public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private String imagen;
    
    // Constructor para mapear desde Producto
    public ProductoDTO(Producto producto) {
        this.id = producto.getId();
        this.nombre = producto.getNombre();
        this.descripcion = producto.getDescripcion();
        this.precio = producto.getPrecio();
        this.stock = producto.getStock();
        this.imagen = producto.getImagen();
    }
}
```

**Usar DTO en el Controller:**
```java
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping
    public List<ProductoDTO> getAllProductos() {
        return productoService.getAllProductos()
                .stream()
                .map(ProductoDTO::new)  // Convertir Producto a ProductoDTO
                .collect(Collectors.toList());
    }
    
    @PostMapping
    public ResponseEntity<ProductoDTO> createProducto(@RequestBody ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());
        // ... mapear otros campos
        
        Producto guardado = productoService.saveProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ProductoDTO(guardado));
    }
}
```

#### Principio: Un DTO por Endpoint

**CreateProductoDTO** (para crear):**
```java
@Data
public class CreateProductoDTO {
    @NotBlank
    private String nombre;
    
    @NotNull
    @Min(0)
    private Double precio;
    
    private Integer stock;
}
```

**UpdateProductoDTO** (para actualizar):**
```java
@Data
public class UpdateProductoDTO {
    private String nombre;
    private Double precio;
    private Integer stock;
}
```

**ProductoResponseDTO** (para respuestas):**
```java
@Data
public class ProductoResponseDTO {
    private Long id;
    private String nombre;
    private Double precio;
    private Integer stock;
    private LocalDateTime createdAt;
}
```

---

### 6. Manejo de Excepciones

#### Crear Excepciones Personalizadas

**ProductoNotFoundException.java:**
```java
package com.api.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductoNotFoundException extends RuntimeException {
    
    public ProductoNotFoundException(Long id) {
        super("Producto con ID " + id + " no encontrado");
    }
}
```

#### Lanzar la Excepción en el Service

```java
@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNotFoundException(id));
    }
}
```

#### Manejo Global de Excepciones

**GlobalExceptionHandler.java:**
```java
package com.api.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ProductoNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleProductoNotFound(
            ProductoNotFoundException ex) {
        
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.NOT_FOUND.value());
        error.put("error", "Not Found");
        error.put("message", ex.getMessage());
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(
            Exception ex) {
        
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.put("error", "Internal Server Error");
        error.put("message", "Ocurrió un error inesperado");
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

**Respuesta cuando no se encuentra un producto:**
```json
{
    "timestamp": "2025-10-12T15:30:00",
    "status": 404,
    "error": "Not Found",
    "message": "Producto con ID 999 no encontrado"
}
```

---

### 7. Anotación @Transactional

#### ¿Qué es una Transacción?

**Transacción**: Conjunto de operaciones que se ejecutan como una unidad (todo o nada).

```
Principio "TODO O NADA":
    ✅ Si todas las operaciones tienen éxito → COMMIT (se guardan los cambios)
    ❌ Si una operación falla → ROLLBACK (se deshacen todos los cambios)
```

#### Ejemplo: Compra en E-commerce

**Sin @Transactional (❌ Problema):**
```java
public void realizarCompra(Long usuarioId, Long productoId) {
    // 1. Restar saldo del usuario
    usuarioService.restarSaldo(usuarioId, 100.0);  // ✅ Ejecutado
    
    // 2. Descontar stock
    productoService.descontarStock(productoId, 1);  // ❌ Falla (sin stock)
    
    // PROBLEMA: El usuario perdió su dinero pero no obtuvo el producto
}
```

**Con @Transactional (✅ Solución):**
```java
@Service
public class CompraService {
    
    @Transactional  // Garantiza atomicidad
    public void realizarCompra(Long usuarioId, Long productoId) {
        // 1. Restar saldo del usuario
        usuarioService.restarSaldo(usuarioId, 100.0);
        
        // 2. Descontar stock
        productoService.descontarStock(productoId, 1);  // Si falla aquí...
        
        // ...se hace ROLLBACK automáticamente de TODO (incluido el paso 1)
    }
}
```

**Uso recomendado:**
```java
@Service
@Transactional  // Aplicar a toda la clase
public class ProductoService {
    
    // Todos los métodos públicos son transaccionales
    public Producto saveProducto(Producto producto) { ... }
    
    // Se puede personalizar por método
    @Transactional(readOnly = true)  // Optimización para solo lectura
    public List<Producto> getAllProductos() { ... }
}
```

---

### 📝 Resumen Clase 10

**Conceptos aprendidos:**
- ✅ Migración de H2 a MySQL
- ✅ ORM (Hibernate/JPA)
- ✅ Relaciones entre entidades (OneToMany, ManyToMany)
- ✅ DTOs para transferencia de datos
- ✅ Excepciones personalizadas
- ✅ Transacciones con @Transactional

**Base de datos E-commerce completa:**
```
usuarios (1) ──→ (N) pedidos
productos (N) ←→ (N) categorías
pedidos (N) ──→ (1) usuarios
```

**Siguiente paso:** Implementar seguridad, autenticación y autorización.

---

## 📕 Clase 11: Seguridad, Autenticación y Autorización

### 🎯 Objetivos de la Clase
- Implementar Spring Security
- Crear sistema de registro y login
- Gestionar usuarios con roles (USER, ADMIN)
- Proteger endpoints según roles
- Encriptar contraseñas

---

### 1. Spring Security

#### ¿Qué es Spring Security?

**Spring Security** es un framework de seguridad para aplicaciones Spring que maneja:

```
┌─────────────────────────────────────────┐
│         SPRING SECURITY                 │
├─────────────────────────────────────────┤
│  1. AUTENTICACIÓN                       │
│     → ¿Quién eres?                      │
│     → Login con usuario/contraseña      │
├─────────────────────────────────────────┤
│  2. AUTORIZACIÓN                        │
│     → ¿Qué puedes hacer?                │
│     → Control de acceso por roles       │
├─────────────────────────────────────────┤
│  3. PROTECCIÓN                          │
│     → CSRF, XSS, Session Fixation       │
│     → Encriptación de contraseñas       │
└─────────────────────────────────────────┘
```

#### Conceptos Clave

**Autenticación vs Autorización:**

| Autenticación | Autorización |
|---------------|--------------|
| ¿Quién eres? | ¿Qué puedes hacer? |
| Login con credenciales | Control de acceso |
| Email + password | Roles (USER, ADMIN) |
| Verificar identidad | Permisos |

**Ejemplo:**
```
Usuario: juan@email.com
Password: ********

Autenticación: ✅ Credenciales correctas → Usuario autenticado
Autorización:
    - Rol: USER
    - Puede: Ver productos, crear pedidos
    - NO puede: Eliminar productos, gestionar usuarios
```

---

### 2. Implementar Autenticación

#### Paso 1: Agregar Dependencias

Editar `pom.xml`:

```xml
<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Después de agregar, ejecutar:
```bash
./mvnw clean install
```

#### Paso 2: Modificar la Entidad Usuario

`src/main/java/com/api/ecommerce/model/Usuario.java`:

```java
package com.api.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    // =============================================
    // Métodos requeridos por UserDetails
    // =============================================
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    
    @Override
    public String getUsername() {
        return email;  // Usamos email como identificador
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

**¿Por qué implementar UserDetails?**
- Spring Security necesita esta interfaz para autenticar usuarios
- Define cómo obtener credenciales y permisos
- Permite personalizar el comportamiento de autenticación

#### Paso 3: Crear el Enum de Roles

`src/main/java/com/api/ecommerce/model/Role.java`:

```java
package com.api.ecommerce.model;

public enum Role {
    USER,   // Usuario regular que puede comprar
    ADMIN   // Administrador con acceso total
}
```

#### Paso 4: Actualizar el Repository de Usuario

`src/main/java/com/api/ecommerce/repository/UsuarioRepository.java`:

```java
package com.api.ecommerce.repository;

import com.api.ecommerce.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar usuario por email (para login)
    Optional<Usuario> findByEmail(String email);
    
    // Verificar si existe un email (para registro)
    Boolean existsByEmail(String email);
}
```

#### Paso 5: Crear DTOs para Autenticación

**RegisterRequest.java** (para registro):
```java
package com.api.ecommerce.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nombre;
    private String email;
    private String password;
}
```

**LoginRequest.java** (para login):
```java
package com.api.ecommerce.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
```

**AuthResponse.java** (respuesta de autenticación):
```java
package com.api.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String email;
    private String role;
}
```

#### Paso 6: Crear el Servicio de Autenticación

`src/main/java/com/api/ecommerce/service/AuthenticationService.java`:

```java
package com.api.ecommerce.service;

import com.api.ecommerce.dto.AuthResponse;
import com.api.ecommerce.dto.LoginRequest;
import com.api.ecommerce.dto.RegisterRequest;
import com.api.ecommerce.model.Role;
import com.api.ecommerce.model.Usuario;
import com.api.ecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    // Registro de nuevos usuarios
    public AuthResponse register(RegisterRequest request) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRole(Role.USER);  // Asignar rol USER por defecto
        
        usuarioRepository.save(usuario);
        
        return new AuthResponse(
            "Usuario registrado exitosamente",
            usuario.getEmail(),
            usuario.getRole().name()
        );
    }
    
    // Login de usuarios existentes
    public AuthResponse authenticate(LoginRequest request) {
        // Autenticar usando Spring Security
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        // Obtener usuario autenticado
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return new AuthResponse(
            "Login exitoso",
            usuario.getEmail(),
            usuario.getRole().name()
        );
    }
}
```

#### Paso 7: Crear el Controller de Autenticación

`src/main/java/com/api/ecommerce/controller/AuthenticationController.java`:

```java
package com.api.ecommerce.controller;

import com.api.ecommerce.dto.AuthResponse;
import com.api.ecommerce.dto.LoginRequest;
import com.api.ecommerce.dto.RegisterRequest;
import com.api.ecommerce.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {
    
    @Autowired
    private AuthenticationService authenticationService;
    
    // POST /api/auth/register - Registrar nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authenticationService.register(request);
        return ResponseEntity.ok(response);
    }
    
    // POST /api/auth/login - Iniciar sesión
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authenticationService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
```

#### Paso 8: Configurar Spring Security

`src/main/java/com/api/ecommerce/config/SecurityConfig.java`:

```java
package com.api.ecommerce.config;

import com.api.ecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // =============================================
    // USER DETAILS SERVICE
    // =============================================
    @Bean
    public UserDetailsService userDetailsService() {
        return email -> usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
    
    // =============================================
    // PASSWORD ENCODER (Encriptación)
    // =============================================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    // =============================================
    // AUTHENTICATION PROVIDER
    // =============================================
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    
    // =============================================
    // AUTHENTICATION MANAGER
    // =============================================
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    // =============================================
    // SECURITY FILTER CHAIN (Reglas de seguridad)
    // =============================================
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Desactivar CSRF para APIs REST
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos (sin autenticación)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()
                
                // Endpoints para administradores
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                
                // Endpoints que requieren autenticación
                .requestMatchers(HttpMethod.POST, "/api/productos").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/productos/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/productos/**").authenticated()
                
                // Cualquier otra petición requiere autenticación
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider());
        
        return http.build();
    }
}
```

**Explicación de las reglas:**

```
Endpoints Públicos (sin login):
    ✅ POST /api/auth/register      → Registrarse
    ✅ POST /api/auth/login         → Iniciar sesión
    ✅ GET  /api/productos          → Ver lista de productos
    ✅ GET  /api/productos/1        → Ver detalle de producto

Endpoints Autenticados (requieren login):
    🔐 POST   /api/productos        → Crear producto
    🔐 PUT    /api/productos/1      → Actualizar producto
    🔐 DELETE /api/productos/1      → Eliminar producto

Endpoints de Administrador (requieren rol ADMIN):
    👑 *      /api/admin/**         → Rutas administrativas
```

---

### 3. Implementar Autorización (Roles)

#### Modificar SecurityConfig para Roles

Ya implementado en el paso anterior. La configuración incluye:

```java
// Rutas públicas: cualquiera puede acceder
.requestMatchers("/api/auth/**").permitAll()
.requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()

// Rutas de admin: solo usuarios con rol ADMIN
.requestMatchers("/api/admin/**").hasRole("ADMIN")

// Rutas autenticadas: cualquier usuario logueado
.requestMatchers(HttpMethod.POST, "/api/productos").authenticated()
```

#### Proteger Métodos Específicos con @PreAuthorize

Alternativa: Usar anotaciones en los métodos del controller:

**Habilitar anotaciones de seguridad:**
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // ← Agregar esta línea
public class SecurityConfig {
    // ...
}
```

**Usar @PreAuthorize en el controller:**
```java
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @GetMapping
    public List<ProductoDTO> getAllProductos() {
        // Público: todos pueden acceder
        return productoService.getAllProductos();
    }
    
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ProductoDTO> createProducto(@RequestBody ProductoDTO dto) {
        // Solo usuarios autenticados
        return ResponseEntity.ok(productoService.create(dto));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        // Solo administradores
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

### 4. Probar Autenticación y Autorización

#### Test 1: Registrar un Usuario

```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "password": "password123"
}
```

**Respuesta esperada:**
```json
{
    "message": "Usuario registrado exitosamente",
    "email": "juan@email.com",
    "role": "USER"
}
```

#### Test 2: Iniciar Sesión

```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
    "email": "juan@email.com",
    "password": "password123"
}
```

**Respuesta esperada:**
```json
{
    "message": "Login exitoso",
    "email": "juan@email.com",
    "role": "USER"
}
```

#### Test 3: Acceder a Endpoint Público (✅ Sin autenticación)

```http
GET http://localhost:8080/api/productos
```

**Resultado:** ✅ Funciona sin credenciales

#### Test 4: Crear Producto Sin Autenticación (❌ Debe fallar)

```http
POST http://localhost:8080/api/productos
Content-Type: application/json

{
    "nombre": "Producto Test",
    "precio": 100.0
}
```

**Resultado:** ❌ Error 403 Forbidden

#### Test 5: Crear Producto Con Autenticación (✅ Funciona)

**Postman:**
1. Ir a Authorization
2. Seleccionar "Basic Auth"
3. Username: `juan@email.com`
4. Password: `password123`

```http
POST http://localhost:8080/api/productos
Content-Type: application/json
Authorization: Basic anVhbkBlbWFpbC5jb206cGFzc3dvcmQxMjM=

{
    "nombre": "Producto Test",
    "precio": 100.0
}
```

**Resultado:** ✅ Producto creado exitosamente

#### Test 6: Crear Usuario Admin (Manualmente en BD)

Actualizar en phpMyAdmin o ejecutar SQL:
```sql
UPDATE usuarios 
SET role = 'ADMIN' 
WHERE email = 'juan@email.com';
```

Ahora `juan@email.com` es administrador.

---

### 5. Encriptación de Contraseñas

#### ¿Cómo Funciona BCrypt?

**Sin encriptación (❌ NUNCA hacer esto):**
```
password123 → se guarda tal cual en la BD
```

**Con BCrypt (✅):**
```
password123 → $2a$10$N9qo8uLOickgx2ZMRZoMye.9F3VQwPDjOJxMlVZ...
              (hash de 60 caracteres)
```

**Verificación:**
```java
// Guardar
String passwordPlano = "password123";
String passwordEncriptado = passwordEncoder.encode(passwordPlano);
// Resultado: $2a$10$N9qo8uLOickgx2ZMRZoMye...

// Verificar
boolean coincide = passwordEncoder.matches("password123", passwordEncriptado);
// Resultado: true
```

**Ventajas de BCrypt:**
- ✅ No se puede revertir (hash de una sola vía)
- ✅ Usa "salt" (aleatorio) para prevenir ataques de diccionario
- ✅ Es lento a propósito (dificulta fuerza bruta)
- ✅ Mismo password genera hashes diferentes cada vez

#### Configuración en SecurityConfig

Ya implementado:
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

Spring Security usa automáticamente este encoder para:
1. Encriptar contraseñas al registrar usuarios
2. Verificar contraseñas al hacer login

---

### 📝 Resumen Clase 11

**Conceptos aprendidos:**
- ✅ Spring Security (autenticación y autorización)
- ✅ Implementación de sistema de registro y login
- ✅ Roles de usuario (USER, ADMIN)
- ✅ Protección de endpoints según roles
- ✅ Encriptación de contraseñas con BCrypt
- ✅ Configuración de seguridad stateless (para APIs REST)

**Flujo completo de autenticación:**
```
1. Usuario se registra → POST /api/auth/register
   → Contraseña se encripta con BCrypt
   → Se asigna rol USER por defecto
   
2. Usuario hace login → POST /api/auth/login
   → Spring Security verifica credenciales
   → Retorna información del usuario autenticado
   
3. Usuario accede a endpoints protegidos
   → Spring Security valida las credenciales
   → Verifica que tenga el rol requerido
   → Permite o deniega el acceso
```

---

## 📚 Resumen de Conceptos Clave

### Arquitectura en Capas

```
┌─────────────────────────────────────────┐
│ Controller → Service → Repository → DB  │
└─────────────────────────────────────────┘
```

| Capa | Responsabilidad | Anotación |
|------|----------------|-----------|
| **Controller** | Manejo de peticiones HTTP | `@RestController` |
| **Service** | Lógica de negocio y transacciones | `@Service` |
| **Repository** | Acceso a base de datos | `@Repository` |
| **Model** | Representación de datos | `@Entity` |

### Anotaciones Principales

#### Spring Boot
- `@SpringBootApplication` - Clase principal
- `@RestController` - Controller REST
- `@Service` - Capa de servicios
- `@Repository` - Capa de acceso a datos
- `@Component` - Bean genérico

#### Mapeo HTTP
- `@RequestMapping("/ruta")` - Mapeo base
- `@GetMapping` - GET request
- `@PostMapping` - POST request
- `@PutMapping` - PUT request
- `@DeleteMapping` - DELETE request
- `@PathVariable` - Parámetro en URL
- `@RequestBody` - Cuerpo de la petición

#### JPA/Hibernate
- `@Entity` - Entidad de BD
- `@Table(name = "tabla")` - Nombre de tabla
- `@Id` - Clave primaria
- `@GeneratedValue` - Generación automática de ID
- `@Column` - Configuración de columna
- `@OneToMany` - Relación uno a muchos
- `@ManyToOne` - Relación muchos a uno
- `@ManyToMany` - Relación muchos a muchos
- `@JoinColumn` - Columna de unión (FK)
- `@JoinTable` - Tabla intermedia

#### Transacciones
- `@Transactional` - Gestión de transacciones

#### Seguridad
- `@EnableWebSecurity` - Habilita Spring Security
- `@PreAuthorize` - Autorización a nivel de método

#### Lombok
- `@Data` - Genera getters, setters, toString, equals, hashCode
- `@NoArgsConstructor` - Constructor sin argumentos
- `@AllArgsConstructor` - Constructor con todos los argumentos
- `@Getter` - Solo getters
- `@Setter` - Solo setters

### Gestores de Dependencias

| Lenguaje/Framework | Gestor | Archivo de Configuración |
|-------------------|--------|--------------------------|
| Java (Spring Boot) | Maven | `pom.xml` |
| JavaScript (Node.js) | npm/pnpm | `package.json` |
| Python | pip | `requirements.txt` |
| PHP | Composer | `composer.json` |

### Bases de Datos

#### Relacionales vs NoSQL

| Relacionales (SQL) | NoSQL |
|-------------------|-------|
| Datos estructurados | Datos flexibles |
| Esquema fijo | Esquema dinámico |
| Relaciones complejas | Escalabilidad horizontal |
| MySQL, PostgreSQL | MongoDB, Redis |

#### Configuración de MySQL

```properties
# Conexión
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### Patrones de Diseño

#### DAO (Data Access Object)
Capa intermedia para acceso a datos. En Spring Boot se reemplaza por `JpaRepository`.

#### DTO (Data Transfer Object)
Objeto simple para transferir datos entre capas.

**Beneficios:**
- Seguridad (no exponer datos sensibles)
- Optimización (solo datos necesarios)
- Desacoplamiento (frontend independiente de entidades)

#### MVC (Model-View-Controller)
- **Model**: Entidades de datos
- **View**: Interfaz de usuario (React)
- **Controller**: Maneja comunicación entre View y Model

### Spring Security

#### Autenticación vs Autorización

| Autenticación | Autorización |
|---------------|--------------|
| ¿Quién eres? | ¿Qué puedes hacer? |
| Login/registro | Roles y permisos |
| Email + password | USER, ADMIN |

#### Encriptación BCrypt

```java
// Encriptar
String hash = passwordEncoder.encode("password123");
// Resultado: $2a$10$N9qo8uLOickgx2ZMRZoMye...

// Verificar
boolean matches = passwordEncoder.matches("password123", hash);
// Resultado: true
```

---

## 📂 Estructura de Archivos Completa

### Backend (Spring Boot)

```
ecommerce/
├── src/
│   ├── main/
│   │   ├── java/com/api/ecommerce/
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthenticationController.java
│   │   │   │   └── ProductoController.java
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── AuthResponse.java
│   │   │   │   └── ProductoDTO.java
│   │   │   ├── exception/
│   │   │   │   ├── ProductoNotFoundException.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── model/
│   │   │   │   ├── Producto.java
│   │   │   │   ├── Usuario.java
│   │   │   │   ├── Categoria.java
│   │   │   │   ├── Pedido.java
│   │   │   │   └── Role.java
│   │   │   ├── repository/
│   │   │   │   ├── ProductoRepository.java
│   │   │   │   ├── UsuarioRepository.java
│   │   │   │   ├── CategoriaRepository.java
│   │   │   │   └── PedidoRepository.java
│   │   │   ├── service/
│   │   │   │   ├── ProductoService.java
│   │   │   │   ├── AuthenticationService.java
│   │   │   │   └── UsuarioService.java
│   │   │   └── EcommerceApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-dev.properties
│   └── test/
│       └── java/com/api/ecommerce/
├── target/
├── pom.xml
└── README.md
```

### Frontend (React)

```
ecommerce-frontend/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProductDetail.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── productService.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

---

## 🎓 Pasos Para Crear una API REST Completa

### Checklist de Implementación

#### 1. Configuración Inicial
- [x] Crear proyecto en Spring Initializr
- [x] Configurar `application.properties`
- [x] Instalar dependencias necesarias
- [x] Configurar base de datos (H2 o MySQL)

#### 2. Capa de Modelo (Model)
- [x] Crear entidades con `@Entity`
- [x] Definir relaciones (`@OneToMany`, `@ManyToMany`)
- [x] Configurar anotaciones JPA
- [x] Usar Lombok para reducir código

#### 3. Capa de Repositorio (Repository)
- [x] Crear interfaces que extiendan `JpaRepository`
- [x] Definir métodos de consulta personalizados si es necesario

#### 4. Capa de Servicio (Service)
- [x] Crear clases de servicio con `@Service`
- [x] Implementar lógica de negocio
- [x] Agregar `@Transactional` para consistencia de datos
- [x] Manejar excepciones

#### 5. Capa de Controlador (Controller)
- [x] Crear controllers con `@RestController`
- [x] Definir endpoints con `@GetMapping`, `@PostMapping`, etc.
- [x] Usar `@PathVariable` y `@RequestBody`
- [x] Retornar `ResponseEntity` con códigos HTTP apropiados

#### 6. DTOs (Opcional pero Recomendado)
- [x] Crear DTOs para requests y responses
- [x] Mapear entre entidades y DTOs
- [x] Validar datos de entrada

#### 7. Manejo de Excepciones
- [x] Crear excepciones personalizadas
- [x] Implementar `@RestControllerAdvice`
- [x] Definir respuestas de error consistentes

#### 8. Seguridad (Spring Security)
- [x] Agregar dependencia de Spring Security
- [x] Configurar `SecurityConfig`
- [x] Implementar autenticación (login/registro)
- [x] Implementar autorización (roles)
- [x] Encriptar contraseñas con BCrypt

#### 9. Pruebas
- [x] Probar endpoints con Postman
- [x] Verificar respuestas HTTP
- [x] Validar autenticación y autorización
- [x] Verificar persistencia en base de datos

#### 10. Integración con Frontend
- [ ] Configurar CORS
- [ ] Documentar API
- [ ] Conectar React con backend
- [ ] Implementar manejo de tokens (si se usa JWT)

---

## 📌 Comandos Útiles

### Maven

**En PowerShell (Windows):**
```powershell
# Compilar proyecto
.\mvnw.cmd clean compile

# Ejecutar aplicación
.\mvnw.cmd spring-boot:run

# Empaquetar (crear JAR)
.\mvnw.cmd clean package

# Instalar dependencias
.\mvnw.cmd clean install

# Encadenar comandos en PowerShell (usar ; en lugar de &&)
.\mvnw.cmd clean install; .\mvnw.cmd spring-boot:run
```

**En Linux/Mac:**
```bash
# Compilar proyecto
./mvnw clean compile

# Ejecutar aplicación
./mvnw spring-boot:run

# Empaquetar (crear JAR)
./mvnw clean package

# Instalar dependencias
./mvnw clean install
```

### MySQL (Terminal)
```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE ecommerce_db;

# Listar bases de datos
SHOW DATABASES;

# Usar base de datos
USE ecommerce_db;

# Listar tablas
SHOW TABLES;

# Ver estructura de tabla
DESCRIBE productos;

# Ver datos
SELECT * FROM productos;
```

### Git
```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit
git commit -m "Implementar autenticación"

# Ver estado
git status

# Ver historial
git log --oneline
```

---

## 🔗 Referencias y Recursos

### Documentación Oficial
- **Spring Boot**: [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- **Spring Security**: [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)
- **Spring Data JPA**: [https://spring.io/projects/spring-data-jpa](https://spring.io/projects/spring-data-jpa)
- **Hibernate**: [https://hibernate.org/](https://hibernate.org/)
- **MySQL**: [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)

### Herramientas
- **Spring Initializr**: [https://start.spring.io/](https://start.spring.io/)
- **Postman**: [https://www.postman.com/](https://www.postman.com/)
- **XAMPP**: [https://www.apachefriends.org/](https://www.apachefriends.org/)
- **MySQL Workbench**: [https://www.mysql.com/products/workbench/](https://www.mysql.com/products/workbench/)

### Tutoriales y Guías
- Spring Boot Official Guides
- Baeldung Spring Tutorials
- Spring Security Reference Documentation

---

## ✅ Conclusión

Este documento cubre el camino completo desde la creación de un proyecto Spring Boot básico hasta la implementación de un backend seguro y funcional para un e-commerce, incluyendo:

✔️ **Clase 09**: Fundamentos, arquitectura en capas, APIs REST básicas  
✔️ **Clase 10**: Persistencia con MySQL, relaciones JPA, DTOs, transacciones  
✔️ **Clase 11**: Seguridad completa con autenticación, autorización y roles

**Siguiente paso recomendado**: Implementar JWT (JSON Web Tokens) para autenticación stateless y conectar el frontend React con este backend.

---

**Desarrollado para el curso de APIs - UADE 2025**  
*Documentación creada: Octubre 2025*

