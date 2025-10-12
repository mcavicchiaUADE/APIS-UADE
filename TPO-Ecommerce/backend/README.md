# 🔧 Backend E-commerce - Spring Boot

Backend completo para el proyecto de e-commerce con **Spring Boot** + **MySQL** + **Spring Security**.

## ✅ Características Implementadas

- **Entidades completas**: Producto, Categoria, Usuario con relaciones JPA
- **CRUD completo**: Productos, categorías y usuarios
- **Spring Security**: Autenticación y autorización
- **Base de datos MySQL**: Con Docker + datos iniciales
- **API REST**: Endpoints documentados con Postman
- **CORS configurado**: Para conectar con frontend React

## 🏗️ Estructura del Proyecto

```
backend/
├── src/main/java/com/ecommerce/
│   ├── EcommerceBackendApplication.java
│   ├── controller/
│   │   ├── ProductoController.java
│   │   ├── CategoriaController.java
│   │   └── UsuarioController.java
│   ├── entity/
│   │   ├── Producto.java
│   │   ├── Categoria.java
│   │   └── Usuario.java
│   ├── service/
│   │   ├── ProductoService.java
│   │   ├── CategoriaService.java
│   │   └── UsuarioService.java
│   ├── repository/
│   │   ├── ProductoRepository.java
│   │   ├── CategoriaRepository.java
│   │   └── UsuarioRepository.java
│   └── dto/
│       ├── ProductoDTO.java
│       ├── CategoriaDTO.java
│       └── UsuarioDTO.java
├── src/main/resources/
│   ├── application.properties
│   └── application-prod.properties
├── pom.xml
├── postman-collection-complete.json
└── README.md
```

## 🌐 Endpoints Disponibles

### 📦 Productos
- `GET /api/productos` - Todos los productos
- `GET /api/productos/{id}` - Producto por ID
- `POST /api/productos` - Crear producto (autenticado)
- `PUT /api/productos/{id}` - Actualizar producto (autenticado)
- `DELETE /api/productos/{id}` - Eliminar producto (autenticado)
- `GET /api/productos/buscar?nombre={nombre}` - Buscar por nombre
- `GET /api/productos/categoria/{id}` - Productos por categoría

### 📂 Categorías
- `GET /api/categorias` - Todas las categorías
- `GET /api/categorias/{id}` - Categoría por ID
- `POST /api/categorias` - Crear categoría (autenticado)
- `PUT /api/categorias/{id}` - Actualizar categoría (autenticado)
- `DELETE /api/categorias/{id}` - Eliminar categoría (autenticado)

### 👥 Usuarios (Protegidos)
- `GET /api/usuarios` - Todos los usuarios (403 esperado)
- `GET /api/usuarios/{id}` - Usuario por ID
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario (autenticado)
- `DELETE /api/usuarios/{id}` - Eliminar usuario (autenticado)

## 🚀 Configuración y Ejecución

### Prerrequisitos
- **Java 24** (o Java 17+)
- **Maven Daemon (mvnd)**
- **Docker Desktop** (para MySQL)

### Pasos de Configuración

1. **Configurar MySQL:**
```powershell
docker run --name mysql-ecommerce -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=ecommerce_db -p 3308:3306 -d mysql:8.0
```

2. **Ejecutar Backend:**
```powershell
cd TPO-Ecommerce\backend
mvnd clean compile
mvnd spring-boot:run
```

3. **Verificar funcionamiento:**
- Aplicación: `http://localhost:8081`
- API: `http://localhost:8081/api/productos`

## 🧪 Pruebas con Postman

**Colección completa disponible:** `postman-collection-complete.json`

### Ejemplos de uso:

```powershell
# Obtener productos
Invoke-WebRequest -Uri "http://localhost:8081/api/productos" -Method GET

# Obtener categorías  
Invoke-WebRequest -Uri "http://localhost:8081/api/categorias" -Method GET

# Buscar productos
Invoke-WebRequest -Uri "http://localhost:8081/api/productos/buscar?nombre=iPhone" -Method GET
```

## 🗄️ Base de Datos MySQL

### Configuración:
- **Host**: `localhost:3308`
- **Base de datos**: `ecommerce_db`
- **Usuario**: `root`
- **Contraseña**: `password`

### Datos iniciales cargados automáticamente:
- **7 productos** con imágenes y relaciones
- **5 categorías** (Electrónica, Ropa, Hogar, Deportes, Libros)
- **3 usuarios** (admin, Juan Pérez, María García)

## 🔗 Integración con Frontend

- **Frontend**: `http://localhost:5173`
- **CORS configurado** para desarrollo local
- **Endpoints públicos**: Productos y categorías
- **Endpoints protegidos**: CRUD de usuarios (requiere autenticación)

## 🛠️ Comandos Útiles

```powershell
# Verificar estado MySQL
docker ps | Select-String "mysql"

# Reiniciar aplicación
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
cd TPO-Ecommerce\backend
mvnd spring-boot:run

# Ver logs de la aplicación
# Los logs aparecen en la consola donde ejecutas mvnd spring-boot:run
```

## 📊 Estado del Sistema

### ✅ **Funcionando correctamente:**
- Conexión a MySQL
- Creación automática de tablas
- Carga de datos iniciales
- Endpoints REST
- Spring Security (endpoints protegidos)

### 🔄 **Próximos pasos:**
- Implementar autenticación JWT real
- Conectar frontend con autenticación
- Agregar páginas de administración
