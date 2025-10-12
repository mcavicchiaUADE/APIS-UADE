# 🧪 Guía de Pruebas - Backend E-commerce

## 🚀 Cómo Ejecutar la Aplicación

### 1. Configurar Base de Datos

#### Opción A: H2 (Desarrollo - Recomendado para empezar)
```bash
# No necesitas hacer nada, H2 se ejecuta en memoria
# La aplicación ya está configurada para usar H2 por defecto
```

#### Opción B: MySQL con Docker
```bash
# 1. Crear la base de datos en MySQL
docker exec -it mysql_container mysql -u root -p
CREATE DATABASE ecommerce_db;

# 2. Cambiar el perfil activo a MySQL
# Editar application.properties y cambiar:
# spring.profiles.active=prod
```

### 2. Ejecutar la Aplicación
```bash
cd TPO-Ecommerce/backend
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8081`

---

## 📋 Endpoints Disponibles

### 🔓 Endpoints Públicos (sin autenticación)

#### Autenticación
```http
# Registrar nuevo usuario
POST http://localhost:8081/api/auth/register
Content-Type: application/json

{
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "password": "password123"
}

# Iniciar sesión
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
    "email": "juan@test.com",
    "password": "password123"
}
```

#### Productos (solo lectura)
```http
# Obtener todos los productos
GET http://localhost:8081/api/productos

# Obtener producto por ID
GET http://localhost:8081/api/productos/1

# Buscar productos por nombre
GET http://localhost:8081/api/productos/buscar?nombre=iPhone

# Buscar productos por categoría
GET http://localhost:8081/api/productos/categoria/1

# Buscar productos con stock
GET http://localhost:8081/api/productos/stock?disponible=true
```

#### Categorías (solo lectura)
```http
# Obtener todas las categorías
GET http://localhost:8081/api/categorias

# Obtener categoría por ID
GET http://localhost:8081/api/categorias/1
```

### 🔐 Endpoints Autenticados (requieren login)

Para estos endpoints necesitas autenticación HTTP Basic:
- Username: `juan@test.com` (o el email del usuario)
- Password: `password123` (o la contraseña del usuario)

#### Productos (CRUD completo)
```http
# Crear producto (requiere autenticación)
POST http://localhost:8081/api/productos
Authorization: Basic anVhbkB0ZXN0LmNvbTpwYXNzd29yZDEyMw==
Content-Type: application/json

{
    "name": "Nuevo Producto",
    "description": "Descripción del producto",
    "price": 99.99,
    "stock": 10,
    "images": ["https://example.com/image.jpg"],
    "categoria": {"id": 1},
    "ownerUser": {"id": 1}
}

# Actualizar producto
PUT http://localhost:8081/api/productos/1
Authorization: Basic anVhbkB0ZXN0LmNvbTpwYXNzd29yZDEyMw==
Content-Type: application/json

{
    "name": "Producto Actualizado",
    "description": "Nueva descripción",
    "price": 149.99,
    "stock": 5
}

# Eliminar producto
DELETE http://localhost:8081/api/productos/1
Authorization: Basic anVhbkB0ZXN0LmNvbTpwYXNzd29yZDEyMw==
```

#### Categorías (CRUD completo)
```http
# Crear categoría
POST http://localhost:8081/api/categorias
Authorization: Basic anVhbkB0ZXN0LmNvbTpwYXNzd29yZDEyMw==
Content-Type: application/json

{
    "nombre": "Nueva Categoría",
    "descripcion": "Descripción de la categoría"
}

# Actualizar categoría
PUT http://localhost:8081/api/categorias/1
Authorization: Basic anVhbkB0ZXN0LmNvbTpwYXNzd29yZDEyMw==
Content-Type: application/json

{
    "nombre": "Categoría Actualizada",
    "descripcion": "Nueva descripción"
}

# Eliminar categoría
DELETE http://localhost:8081/api/categorias/1
Authorization: Basic anVhbkB0ZXN0LmNvbTpwYXNzd29yZDEyMw==
```

### 👑 Endpoints de Administrador

Para endpoints de admin, necesitas un usuario con rol ADMIN:
- Username: `admin@ecommerce.com`
- Password: `admin123`

---

## 🧪 Datos de Prueba Pre-cargados

La aplicación se inicializa automáticamente con:

### Usuarios
- **Admin**: `admin@ecommerce.com` / `admin123` (rol: ADMIN)
- **Usuario 1**: `juan@email.com` / `password123` (rol: USER)
- **Usuario 2**: `maria@email.com` / `password123` (rol: USER)

### Categorías
1. **Electrónica** - Dispositivos electrónicos y tecnología
2. **Ropa** - Prendas de vestir y accesorios
3. **Hogar** - Artículos para el hogar y decoración
4. **Deportes** - Artículos deportivos y fitness
5. **Libros** - Libros y material educativo

### Productos
- iPhone 15 Pro Max - $1299.99 (Electrónica)
- MacBook Air M2 - $1199.99 (Electrónica)
- Nike Air Max 270 - $149.99 (Ropa)
- Sofá 3 Plazas Moderno - $899.99 (Hogar)
- Balón de Fútbol Adidas Al Rihla - $89.99 (Deportes)
- Don Quijote de la Mancha - $24.99 (Libros)

---

## 🔧 Herramientas de Prueba

### Postman
1. Importa las siguientes colecciones:
   - Endpoints públicos
   - Endpoints autenticados
   - Endpoints de admin

### cURL
```bash
# Ejemplo: Obtener todos los productos
curl -X GET http://localhost:8081/api/productos

# Ejemplo: Registrar usuario
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","email":"test@example.com","password":"password123"}'

# Ejemplo: Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### H2 Console (solo en modo desarrollo)
- URL: `http://localhost:8081/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

---

## ✅ Checklist de Pruebas

### Funcionalidades Básicas
- [ ] La aplicación inicia correctamente
- [ ] Los datos se cargan automáticamente
- [ ] Los endpoints públicos responden
- [ ] El registro de usuarios funciona
- [ ] El login funciona
- [ ] Los endpoints autenticados requieren login

### CRUD de Productos
- [ ] GET /api/productos (listar todos)
- [ ] GET /api/productos/{id} (obtener por ID)
- [ ] POST /api/productos (crear - autenticado)
- [ ] PUT /api/productos/{id} (actualizar - autenticado)
- [ ] DELETE /api/productos/{id} (eliminar - autenticado)
- [ ] GET /api/productos/buscar?nombre=X (buscar por nombre)
- [ ] GET /api/productos/categoria/{id} (buscar por categoría)

### CRUD de Categorías
- [ ] GET /api/categorias (listar todas)
- [ ] GET /api/categorias/{id} (obtener por ID)
- [ ] POST /api/categorias (crear - autenticado)
- [ ] PUT /api/categorias/{id} (actualizar - autenticado)
- [ ] DELETE /api/categorias/{id} (eliminar - autenticado)

### Seguridad
- [ ] Los endpoints protegidos requieren autenticación
- [ ] Las contraseñas se encriptan con BCrypt
- [ ] Los roles funcionan correctamente
- [ ] Las excepciones se manejan apropiadamente

### Relaciones JPA
- [ ] Los productos muestran información de categoría
- [ ] Los productos muestran información del propietario
- [ ] Las categorías muestran sus productos
- [ ] Los usuarios muestran sus productos

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que MySQL esté corriendo en Docker
- Verifica que la base de datos `ecommerce_db` exista
- Revisa las credenciales en `application-prod.properties`

### Error: "Access Denied" en endpoints autenticados
- Verifica que estés enviando las credenciales correctas
- Usa HTTP Basic Auth en Postman
- Verifica que el usuario exista en la base de datos

### Error: "User not found"
- Verifica que el usuario esté registrado
- Usa las credenciales de prueba pre-cargadas
- Registra un nuevo usuario con `/api/auth/register`

### La aplicación no inicia
- Verifica que Java 17 esté instalado
- Verifica que Maven esté instalado
- Revisa los logs de la aplicación para errores específicos

---

## 📊 Resultados Esperados

### Respuesta de Login Exitoso
```json
{
    "message": "Login exitoso",
    "email": "juan@email.com",
    "role": "USER",
    "userId": 2,
    "nombre": "Juan Pérez"
}
```

### Respuesta de Producto con Relaciones
```json
{
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "description": "El iPhone más avanzado...",
    "price": 1299.99,
    "stock": 8,
    "images": ["https://images.unsplash.com/..."],
    "categoriaId": 1,
    "categoriaNombre": "Electrónica",
    "ownerUserId": 2,
    "ownerUserNombre": "Juan Pérez",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": null
}
```

### Error 404 - Producto No Encontrado
```json
{
    "timestamp": "2024-01-15T15:30:00",
    "status": 404,
    "error": "Not Found",
    "message": "Producto con ID 999 no encontrado",
    "path": "/api/productos"
}
```

---

¡La aplicación está lista para ser probada! 🎉
