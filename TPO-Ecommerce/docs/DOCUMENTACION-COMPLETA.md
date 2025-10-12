# 📚 Documentación Completa - E-commerce Full Stack

**Proyecto**: Sistema de E-commerce con Spring Boot + React  
**Fecha**: Octubre 2025  
**Versión**: 2.0.0

---

## 📖 Tabla de Contenidos

- [**Capítulo 0: Inicio Rápido**](#capítulo-0-inicio-rápido) ⚡
- [**Capítulo 1: Arquitectura**](#capítulo-1-arquitectura-del-sistema)
- [**Capítulo 2: Configuración Avanzada**](#capítulo-2-configuración-avanzada)
- [**Capítulo 3: Backend**](#capítulo-3-documentación-del-backend)
- [**Capítulo 4: Integración**](#capítulo-4-integración-frontend-backend)
- [**Capítulo 5: Seguridad**](#capítulo-5-seguridad-y-autenticación)
- [**Capítulo 6: Testing**](#capítulo-6-guía-de-pruebas)
- [**Capítulo 7: Sistema de Pedidos**](#capítulo-7-sistema-de-pedidos)
- [**Capítulo 8: Análisis Comparativo**](#capítulo-8-informe-comparativo)
- [**Apéndice**](#apéndice-registro-de-cambios)

---

# Introducción

Bienvenido a la documentación completa del proyecto **E-commerce Full Stack**. Este documento unifica toda la información técnica, guías de configuración, manuales de prueba y análisis comparativos del sistema.

## Sobre el Proyecto

Este es un sistema de e-commerce completo que implementa:

- **Backend**: Spring Boot 3.2.0 + MySQL 8.0
- **Frontend**: React 18 + Vite + TailwindCSS
- **Autenticación**: JWT (JSON Web Tokens)
- **Base de Datos**: MySQL containerizado con Docker
- **Seguridad**: Spring Security con roles y validación de propiedad
- **Sistema de Pedidos**: Gestión completa del ciclo de vida de compras

## Características Principales

✅ CRUD completo de productos y categorías  
✅ Autenticación JWT con roles (USER, ADMIN)  
✅ Carrito de compras funcional  
✅ Sistema de pedidos con historial  
✅ Gestión de stock automática  
✅ UI/UX moderna con dark mode  
✅ Responsive design  
✅ Documentación extensa  

## Guía de Lectura

- **Nuevo en el proyecto**: Comienza con el [Capítulo 0](#capítulo-0-inicio-rápido)
- **Desarrollador Backend**: Capítulos 1, 3, 5
- **Desarrollador Frontend**: Capítulos 1, 4, 7
- **Testing/QA**: Capítulos 0, 6
- **Documentación completa**: Lee todos los capítulos en orden

---

# Capítulo 0: Inicio Rápido

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Java 17+** (recomendado Java 24)
- **Node.js 18+** y npm
- **Docker Desktop** (para MySQL)
- **Maven** o **Maven Daemon (mvnd)**
- **Git** (para clonar el repositorio)

---

## Instalación y Configuración

### 1. Clonar el Repositorio

```powershell
git clone [url-del-repositorio]
cd TPO-Ecommerce
```

### 2. Configurar MySQL con Docker

```powershell
# Crear y ejecutar contenedor MySQL
docker run --name mysql-ecommerce `
  -e MYSQL_ROOT_PASSWORD=password `
  -e MYSQL_DATABASE=ecommerce_db `
  -p 3308:3306 `
  -d mysql:8.0

# Verificar que esté corriendo
docker ps
```

**✅ Resultado esperado:** Contenedor corriendo con el nombre `mysql-ecommerce`

### 3. Cargar Datos Iniciales (Opcional)

Si deseas cargar los 100 productos de prueba:

```powershell
# Desde el directorio raíz del proyecto
Get-Content TPO-Ecommerce\backend\db-seed.sql | docker exec -i mysql-ecommerce mysql -u root -ppassword ecommerce_db
```

**Nota:** Si no ejecutas este paso, el backend cargará automáticamente datos mínimos al iniciar.

---

## Inicializar el Proyecto

### Opción A: Iniciar Todo (Recomendado)

```powershell
# Desde el directorio raíz
cd TPO-Ecommerce

# Instalar dependencias del frontend
npm install

# Iniciar backend y frontend simultáneamente
npm run start
```

Esto ejecutará:
- **Backend**: http://localhost:8081
- **Frontend**: http://localhost:5173

### Opción B: Iniciar por Separado

**Terminal 1 - Backend:**
```powershell
cd TPO-Ecommerce\backend
mvnd clean compile
mvnd spring-boot:run
```

**Terminal 2 - Frontend:**
```powershell
cd TPO-Ecommerce
npm install
npm run dev
```

---

## Credenciales de Acceso Inicio

El sistema viene con 3 usuarios pre-configurados:

| Rol | Email | Username | Password |
|-----|-------|----------|----------|
| **Admin** | admin@test.com | admin | password |
| **Usuario** | user1@test.com | user1 | password |
| **Usuario** | test@test.com | testuser | password |

---

## Verificación

### 1. Verificar Backend

Abre tu navegador o Postman:

```
GET http://localhost:8081/api/productos
```

**Respuesta esperada:** Lista de productos en formato JSON

### 2. Verificar Frontend

Abre tu navegador:

```
http://localhost:5173
```

**Resultado esperado:** 
- Página principal con productos
- Botón de login funcional
- Interfaz responsive

### 3. Probar Login

1. Click en "Iniciar Sesión"
2. Usar credenciales: `admin@test.com` / `password`
3. Deberías ser redirigido al dashboard

---

## Comandos Útiles

```powershell
# Detener el backend
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# Reiniciar MySQL
docker restart mysql-ecommerce

# Ver logs de MySQL
docker logs mysql-ecommerce

# Limpiar y recompilar backend
cd TPO-Ecommerce\backend
mvnd clean compile
```

---

## Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| **Puerto 8081 ocupado** | Detener otros procesos Java o cambiar puerto en `application.properties` |
| **Puerto 3308 ocupado** | Cambiar el mapeo de puerto en el comando docker: `-p 3309:3306` |
| **Error de conexión BD** | Verificar que el contenedor MySQL esté corriendo: `docker ps` |
| **Productos no cargan** | Verificar que el backend esté corriendo en http://localhost:8081 |
| **Login no funciona** | Verificar credenciales: `admin@test.com` / `password` |

---

# Capítulo 1: Arquitectura del Sistema

## Visión General

Este proyecto sigue una arquitectura de **tres capas** con separación clara entre frontend, backend y base de datos.

```
┌─────────────────────────────────────────┐
│         FRONTEND (React + Vite)         │
│         http://localhost:5173            │
└───────────────┬─────────────────────────┘
                │ HTTP/REST + JWT
                │
┌───────────────▼─────────────────────────┐
│    BACKEND (Spring Boot + Spring Security)  │
│         http://localhost:8081            │
└───────────────┬─────────────────────────┘
                │ JDBC/JPA
                │
┌───────────────▼─────────────────────────┐
│      BASE DE DATOS (MySQL 8.0)          │
│         localhost:3308                   │
└─────────────────────────────────────────┘
```

---

## Frontend - React

### Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Context API** - Gestión de estado global
- **TailwindCSS** - Estilos
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

### Estructura de Directorios

```
src/
├── components/          # Componentes reutilizables
│   ├── modals/         # Modales del sistema
│   ├── ProductCard.jsx
│   ├── Header.jsx
│   └── ...
├── pages/              # Páginas principales
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ProductDetail.jsx
│   ├── Orders.jsx
│   └── ...
├── context/            # Context API
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ToastContext.jsx
├── services/           # Servicios y APIs
│   └── api.js
├── hooks/              # Custom hooks
│   ├── useFetch.js
│   └── useTheme.js
├── reducers/           # Reducers para Context
│   ├── authReducer.js
│   └── cartReducer.js
├── utils/              # Utilidades
│   ├── formatters.js
│   └── validators.js
├── constants/          # Constantes
│   └── index.js
└── styles/             # Estilos globales
    └── global.css
```

### Patrones de Diseño

- **Context API** para estado global
- **Custom Hooks** para lógica reutilizable
- **Reducers** para manejo de estado complejo
- **HOC** para rutas protegidas

---

## Backend - Spring Boot

### Tecnologías

- **Java 24** - Lenguaje de programación
- **Spring Boot 3.2.0** - Framework principal
- **Spring Security** - Autenticación y autorización
- **Spring Data JPA** - ORM
- **Hibernate** - Implementación de JPA
- **MySQL Connector** - Driver de base de datos
- **BCrypt** - Encriptación de contraseñas
- **JWT** - Tokens de autenticación
- **Maven** - Gestor de dependencias

### Estructura de Directorios

```
src/main/java/com/ecommerce/
├── controller/    # 5 controllers (REST API)
├── service/       # 4 services (lógica de negocio)
├── repository/    # 5 repositories (JPA)
├── entity/        # 6 entidades (modelos)
├── dto/           # 6 DTOs (transferencia)
├── security/      # JWT + Spring Security
├── exception/     # Manejo de errores
└── initializer/   # Carga de datos
```

### Arquitectura en Capas

```
┌─────────────────────────┐
│   Controller Layer      │ ← REST API Endpoints
├─────────────────────────┤
│    Service Layer        │ ← Lógica de Negocio
├─────────────────────────┤
│   Repository Layer      │ ← Acceso a Datos (JPA)
├─────────────────────────┤
│    Entity Layer         │ ← Modelos de Datos
└─────────────────────────┘
```

### Seguridad

- **Spring Security** con JWT tokens
- **BCrypt** para hash de contraseñas
- **CORS** configurado
- **Roles**: ADMIN, USER

---

## Base de Datos - MySQL

### Esquema de Base de Datos

```sql
┌─────────────┐         ┌─────────────┐
│  usuarios   │         │ categorias  │
├─────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)     │
│ email       │         │ nombre      │
│ username    │         │ descripcion │
│ password    │         └─────────────┘
│ nombre      │               │
│ apellido    │               │
│ role        │               │
└─────┬───────┘               │
      │                       │
      │ owner_user_id         │ categoria_id
      │                       │
      │   ┌─────────────┐     │
      └──▶│  productos  │◀────┘
      │   ├─────────────┤
      │   │ id (PK)     │
      │   │ name        │
      │   │ description │
      │   │ price       │
      │   │ stock       │
      │   │ images      │
      │   │ created_at  │
      │   │ updated_at  │
      │   └─────┬───────┘
      │         │
      │   ┌─────▼───────┐
      ├──▶│  pedidos    │
      │   ├─────────────┤
      │   │ id (PK)     │
      │   │ usuario_id  │
      │   │ total       │
      │   │ estado      │
      │   │ direccion   │
      │   │ notas       │
      │   │ created_at  │
      │   └─────┬───────┘
      │         │
      │   ┌─────▼───────────────┐
      │   │ detalle_pedidos     │
      │   ├─────────────────────┤
      │   │ id (PK)             │
      │   │ pedido_id           │
      │   │ producto_id         │
      │   │ cantidad            │
      │   │ precio_unitario     │
      │   │ producto_nombre     │
      │   │ producto_imagen     │
      │   └─────────────────────┘
```

### Relaciones

- `productos.owner_user_id` → `usuarios.id` (Many-to-One)
- `productos.categoria_id` → `categorias.id` (Many-to-One)
- `pedidos.usuario_id` → `usuarios.id` (Many-to-One)
- `detalle_pedidos.pedido_id` → `pedidos.id` (Many-to-One)
- `detalle_pedidos.producto_id` → `productos.id` (Many-to-One)

### Configuración

- **Host**: localhost:3308 (Docker)
- **Base de datos**: ecommerce_db
- **Usuario**: root
- **Contraseña**: password
- **Motor**: InnoDB
- **Charset**: UTF-8

---

## Flujo de Datos Completo

```
Frontend → api.js (mapeo + JWT) → Backend (Security → Controller → Service → Repository) → MySQL
                                                                                            ↓
Frontend ← api.js (mapeo) ← Response JSON ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

---

# Capítulo 2: Configuración Avanzada

> **Nota:** Para inicializar el proyecto rápidamente, consulta el [Capítulo 0: Inicio Rápido](#capítulo-0-inicio-rápido)

## Configuración de Perfiles Spring

El backend soporta múltiples perfiles de configuración:

### application.properties (Principal)
```properties
spring.profiles.active=prod
```

### application-dev.properties (Desarrollo)
```properties
spring.datasource.url=jdbc:h2:mem:testdb
server.port=8080
```

### application-prod.properties (Producción)
```properties
spring.datasource.url=jdbc:mysql://localhost:3308/ecommerce_db
server.port=8081
```

## Variables de Entorno

Puedes configurar las siguientes variables:

| Variable | Descripción | Default |
|----------|-------------|---------|
| `DB_HOST` | Host de MySQL | localhost:3308 |
| `DB_NAME` | Nombre de la base de datos | ecommerce_db |
| `DB_USER` | Usuario de MySQL | root |
| `DB_PASSWORD` | Contraseña de MySQL | password |
| `JWT_SECRET` | Secreto para JWT | (auto-generado) |
| `JWT_EXPIRATION` | Expiración del token | 86400000 (24h) |

---

# Capítulo 3: Documentación del Backend

## Características Implementadas

- **Entidades completas**: Producto, Categoria, Usuario, Pedido, DetallePedido con relaciones JPA
- **CRUD completo**: Productos, categorías, usuarios y pedidos
- **Spring Security**: Autenticación con JWT
- **Base de datos MySQL**: Con Docker + datos iniciales (100 productos)
- **API REST**: Endpoints documentados con Postman
- **CORS configurado**: Para conectar con frontend React
- **Sistema de Pedidos**: Gestión completa del ciclo de vida de compras

---

## Estructura del Proyecto Backend

> **Nota:** Ver estructura detallada en [Capítulo 1: Arquitectura](#backend---spring-boot)

Organizado en capas:
- **controller/** - REST API endpoints (5 controllers)
- **service/** - Lógica de negocio (4 services)
- **repository/** - Acceso a datos JPA (5 repositories)
- **entity/** - Modelos de datos (6 entidades)
- **dto/** - Data Transfer Objects (6 DTOs)
- **security/** - JWT y Spring Security
- **exception/** - Manejo de errores

---

## Endpoints Disponibles

### 📦 Productos

- `GET /api/productos` - Todos los productos (público)
- `GET /api/productos/{id}` - Producto por ID (público)
- `POST /api/productos` - Crear producto (autenticado)
- `PUT /api/productos/{id}` - Actualizar producto (autenticado)
- `DELETE /api/productos/{id}` - Eliminar producto (autenticado)
- `GET /api/productos/buscar?nombre={nombre}` - Buscar por nombre (público)
- `GET /api/productos/categoria/{id}` - Productos por categoría (público)
- `GET /api/productos/stock?disponible=true` - Productos con stock (público)

### 📂 Categorías

- `GET /api/categorias` - Todas las categorías (público)
- `GET /api/categorias/{id}` - Categoría por ID (público)
- `POST /api/categorias` - Crear categoría (autenticado)
- `PUT /api/categorias/{id}` - Actualizar categoría (autenticado)
- `DELETE /api/categorias/{id}` - Eliminar categoría (autenticado)

### 🔐 Autenticación

- `POST /api/auth/login` - Iniciar sesión (público)
- `POST /api/auth/register` - Registrar usuario (público)
- `GET /api/auth/validate` - Validar token JWT (autenticado)

### 👥 Usuarios

- `GET /api/usuarios` - Todos los usuarios (admin)
- `GET /api/usuarios/{id}` - Usuario por ID (autenticado)
- `PUT /api/usuarios/{id}` - Actualizar usuario (autenticado)
- `DELETE /api/usuarios/{id}` - Eliminar usuario (admin)

### 📦 Pedidos

- `POST /api/pedidos` - Crear pedido (autenticado)
- `GET /api/pedidos/mis-pedidos` - Historial del usuario (autenticado)
- `GET /api/pedidos/{id}` - Detalle de pedido (owner/admin)
- `PUT /api/pedidos/{id}/cancelar` - Cancelar pedido (owner)
- `PUT /api/pedidos/{id}/estado` - Cambiar estado (admin)
- `GET /api/pedidos` - Todos los pedidos (admin)
- `GET /api/pedidos/estado/{estado}` - Filtrar por estado (admin)

---

## Configuración de Base de Datos

> **Ver:** [Capítulo 1](#base-de-datos---mysql) para esquema completo y [Capítulo 0](#capítulo-0-inicio-rápido) para configuración inicial

**Conexión:** `localhost:3308` | **BD:** `ecommerce_db` | **User:** `root` | **Pass:** `password`

**Datos pre-cargados:** 100 productos, 5 categorías, 3 usuarios

---

## Seguridad

> **Ver:** [Capítulo 5: Seguridad](#capítulo-5-seguridad-y-autenticación) para detalles completos de autenticación y autorización

- JWT tokens con expiración de 24 horas
- BCrypt para encriptación de contraseñas
- Validación de propiedad (owner) en operaciones CRUD

---

# Capítulo 4: Integración Frontend-Backend

## Capa de Integración (api.js)

### Responsabilidades del Módulo

1. **Mapeo de campos** - Convierte nombres de campos entre backend (Java) y frontend (JavaScript)
2. **Interceptor JWT** - Agrega automáticamente el header `Authorization: Bearer <token>`
3. **Manejo de errores** - Captura y formatea errores del backend
4. **Transformación de datos** - Adapta estructuras complejas (arrays, objetos anidados)

### Mapeo Automático

| Backend (Java) | Frontend (JavaScript) |
|----------------|----------------------|
| categoriaId | categoryId |
| categoriaNombre | categoryName |
| ownerUserNombre | ownerUserName |
| productoId | productId |

### Métodos Principales

```javascript
// Autenticación
api.login(credentials)
api.register(userData)
api.validateToken()

// Productos
api.getProducts(filters)
api.getProduct(id)
api.createProduct(data)
api.updateProduct(id, data)
api.deleteProduct(id)

// Pedidos
api.createOrder(orderData)
api.getMyOrders()
api.getOrder(id)
api.cancelOrder(id)
```

---

# Capítulo 5: Seguridad y Autenticación

> **Nota:** Para credenciales de acceso rápido, consulta el [Capítulo 0: Inicio Rápido](#capítulo-0-inicio-rápido)

## Flujo de Autenticación JWT

1. Usuario envía credenciales (email/username + password) a `/api/auth/login`
2. Backend valida credenciales con BCrypt
3. Si es válido, genera token JWT con payload: `{ userId, email, role, exp }`
4. Token se almacena en cliente (localStorage/sessionStorage)
5. Requests posteriores incluyen header: `Authorization: Bearer <token>`
6. Backend valida token en cada request protegido

## Implementación de Seguridad

### Spring Security Configuration

- **JwtAuthenticationFilter**: Intercepta requests y valida tokens
- **SecurityFilterChain**: Define rutas públicas y protegidas
- **BCryptPasswordEncoder**: Hash de contraseñas con salt automático
- **UserDetailsService**: Carga usuarios desde base de datos

### Validación de Permisos

| Operación | Requiere | Validación Adicional |
|-----------|----------|---------------------|
| Ver productos | - | Ninguna |
| Crear producto | JWT | Usuario autenticado |
| Editar producto | JWT | Owner o ADMIN |
| Eliminar producto | JWT | Owner o ADMIN |
| Ver pedidos | JWT | Usuario autenticado |
| Ver pedido específico | JWT | Owner del pedido o ADMIN |
| Cambiar estado pedido | JWT | Solo ADMIN |

### Verificar Usuarios en Base de Datos

```powershell
docker exec mysql-ecommerce mysql -u root -ppassword -e "USE ecommerce_db; SELECT id, email, username, role FROM usuarios;"
```

---

# Capítulo 6: Guía de Pruebas

> **Nota:** Para iniciar el proyecto, consulta el [Capítulo 0: Inicio Rápido](#capítulo-0-inicio-rápido)

## Colección Postman

Importa la colección completa: `backend/postman-collection-complete.json`

Incluye:
- ✅ 40+ requests organizados por categoría
- ✅ Variables de entorno pre-configuradas
- ✅ Ejemplos de todas las operaciones CRUD
- ✅ Scripts de prueba automatizados

## Ejemplos de Testing con PowerShell

### Productos
```powershell
# Listar todos
Invoke-WebRequest -Uri "http://localhost:8081/api/productos" -Method GET

# Buscar por nombre
Invoke-WebRequest -Uri "http://localhost:8081/api/productos/buscar?nombre=iPhone" -Method GET
```

### Autenticación
```powershell
# Login y obtener token
$loginBody = @{
    emailOrUsername = "admin@test.com"
    password = "password"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8081/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = ($response.Content | ConvertFrom-Json).token
```

---

## Checklist de Pruebas

### Esenciales
- [ ] Backend inicia en puerto 8081
- [ ] Frontend inicia en puerto 5173
- [ ] Login funciona (admin@test.com / password)
- [ ] Productos se listan correctamente
- [ ] Crear pedido desde carrito funciona
- [ ] Stock se descuenta al crear pedido
- [ ] Cancelar pedido restaura stock

### CRUD Completo
- [ ] Productos: Crear, Leer, Actualizar, Eliminar
- [ ] Categorías: Crear, Leer, Actualizar, Eliminar
- [ ] Pedidos: Crear, Leer, Cancelar

### Seguridad
- [ ] JWT requerido en endpoints protegidos
- [ ] Solo owner puede editar sus productos
- [ ] Solo admin puede cambiar estado de pedidos

---

# Capítulo 7: Sistema de Pedidos

## Resumen del Sistema

Sistema completo de pedidos implementado que permite a los usuarios:

- ✅ Crear pedidos desde el carrito de compras
- ✅ Ver historial completo de sus compras
- ✅ Ver detalle de cada pedido
- ✅ Cancelar pedidos pendientes
- ✅ Descuento automático de stock
- ✅ Estados de pedido (PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO)

---

## Arquitectura de Pedidos

```
Usuario
   │
   ├── 1:N Pedidos
   │      │
   │      ├── Estado (PENDIENTE, CONFIRMADO, etc.)
   │      ├── Total
   │      ├── Dirección de envío
   │      └── 1:N DetallePedido
   │             │
   │             ├── Producto (referencia)
   │             ├── Cantidad
   │             ├── Precio unitario (histórico)
   │             └── Subtotal
   └── 1:N Productos (vendedor)
```

---

## Implementación

### Backend

**Entidades:**
- `EstadoPedido` - Enum con 5 estados (PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO)
- `Pedido` - Pedido completo con total, estado, dirección, notas
- `DetallePedido` - Items del pedido con precio histórico

**Servicios:**
- Crear pedido con validación de stock
- Obtener historial de usuario
- Cancelar pedido y restaurar stock
- Cambiar estados (admin)
- Filtrar por estado (admin)

**Endpoints:** Ver [Capítulo 3](#pedidos) para lista completa

### Frontend

**Páginas:**
- `Orders.jsx` - Historial con badges de estado coloridos
- `OrderDetail.jsx` - Detalle completo con opción de cancelar

**Context:**
- `CartContext.checkout()` - Crea pedido desde el carrito

**API:**
- 7 métodos nuevos para gestión de pedidos

---

## Flujo Completo de Compra

1. Usuario agrega productos al carrito
2. Click "Finalizar Compra" → Modal con dirección y notas
3. Backend valida stock, crea pedido y descuenta inventario
4. Frontend limpia carrito y navega a detalle del pedido
5. Usuario ve confirmación con número de pedido

---

## Base de Datos - Nuevas Tablas

### Tabla: pedidos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | PK auto-increment |
| usuario_id | BIGINT | FK → usuarios(id) |
| total | DECIMAL(10,2) | Total del pedido |
| estado | VARCHAR | PENDIENTE, CONFIRMADO, etc. |
| direccion_envio | TEXT | Dirección de entrega |
| notas | VARCHAR | Notas del cliente |
| created_at | DATETIME | Fecha de creación |
| updated_at | DATETIME | Última modificación |

### Tabla: detalle_pedidos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | PK auto-increment |
| pedido_id | BIGINT | FK → pedidos(id) |
| producto_id | BIGINT | FK → productos(id) |
| cantidad | INT | Cantidad comprada |
| precio_unitario | DECIMAL(10,2) | Precio en el momento |
| producto_nombre | VARCHAR | Nombre guardado |
| producto_imagen | VARCHAR | URL de imagen |

---

## Testing del Sistema de Pedidos

### Prueba Completa del Flujo

1. Login → Home → Agregar productos al carrito
2. Click "Finalizar Compra" → Ingresar dirección
3. Confirmar pedido → Ver detalle
4. Verificar descuento de stock en productos

### Verificar en Base de Datos

```sql
-- Ver pedidos con detalles completos
SELECT p.id, u.username, p.total, p.estado, COUNT(dp.id) AS items
FROM pedidos p
JOIN usuarios u ON p.usuario_id = u.id
LEFT JOIN detalle_pedidos dp ON p.id = dp.pedido_id
GROUP BY p.id;
```

## Clases 9-10-11

| Aspecto | Clase 9-10-11 | Proyecto Actual | Estado | Mejoras |
|---------|---------------|-----------------|--------|---------|
| **Arquitectura en Capas** | ✅ Controller → Service → Repository | ✅ Controller → Service → Repository | ✅ Cumple | + DTO layer separado |
| **Base de Datos** | H2 (desarrollo) + MySQL (producción) | MySQL con Docker | ✅ Cumple | + Docker containerizado |
| **Autenticación** | Basic Auth | JWT (JSON Web Token) | ⭐ Mejorado | + Autenticación stateless moderna |
| **Encriptación** | BCrypt | BCrypt | ✅ Cumple | Igual implementación |
| **Roles** | USER, ADMIN | USER, ADMIN | ✅ Cumple | Igual implementación |
| **Relaciones JPA** | @OneToMany, @ManyToOne | @OneToMany, @ManyToOne, @ElementCollection | ✅ Cumple | + @ElementCollection para imágenes |
| **Validación Usuarios** | UserDetails | UserDetails | ✅ Cumple | Igual implementación |
| **Manejo Excepciones** | @RestControllerAdvice | @RestControllerAdvice | ✅ Cumple | + Excepciones específicas |
| **DTOs** | Básico | Completo con Builder pattern | ⭐ Mejorado | + Lombok @Builder |
| **CORS** | Básico en controller | Global en SecurityConfig | ⭐ Mejorado | Configuración centralizada |

---

## Clase 09: Fundamentos y APIs REST

### Conceptos Implementados

| Concepto | Esperado | Implementado | Detalles |
|----------|----------|--------------|----------|
| **Arquitectura en Capas** | Controller → Service → Repository → Model | ✅ Implementado | Separación clara en paquetes |
| **Patrón MVC** | Model-View-Controller | ✅ Implementado | Controller maneja HTTP, React es la View |
| **Inversión de Control** | @Autowired | ✅ Implementado | Inyección de dependencias en todos los servicios |
| **Endpoints REST** | GET, POST, PUT, DELETE | ✅ Implementado | CRUD completo en todos los controllers |
| **ResponseEntity** | Códigos HTTP apropiados | ✅ Implementado | 200, 201, 204, 400, 401, 403, 404 |
| **JpaRepository** | extends JpaRepository | ✅ Implementado | Todos los repositorios |

### Estructura del Proyecto

El proyecto actual cumple con la estructura esperada y agrega capas adicionales para JWT, DTOs y manejo de excepciones centralizado.

---

## Clase 10: Persistencia con JPA

### Conceptos Implementados

| Concepto | Esperado (Clase 10) | Implementado | Cumplimiento |
|----------|---------------------|--------------|--------------|
| **ORM Hibernate** | JPA + Hibernate | ✅ Spring Data JPA + Hibernate | ✅ 100% |
| **MySQL** | jdbc:mysql://localhost:3306 | jdbc:mysql://localhost:3308 | ✅ 100% (puerto customizado) |
| **@Entity** | Sí | ✅ Producto, Usuario, Categoria, Pedido, DetallePedido | ✅ 100% |
| **@OneToMany** | Usuario → Pedidos | ✅ Categoria → Productos<br>✅ Usuario → Productos<br>✅ Usuario → Pedidos | ✅ 100% |
| **@ManyToOne** | Pedidos → Usuario | ✅ Producto → Categoria<br>✅ Producto → Usuario<br>✅ Pedido → Usuario | ✅ 100% |
| **DTOs** | Básico | ✅ 9 DTOs con @Builder | ⭐ Mejorado |
| **@Transactional** | En Service | ✅ En todos los Services | ✅ 100% |
| **Excepciones** | @ResponseStatus | ✅ @ResponseStatus + GlobalExceptionHandler | ⭐ Mejorado |
| **ddl-auto** | create-drop / update | ✅ update | ✅ 100% |

### Tipos de Datos Mejorados

| Campo | Clase Básica | Proyecto Actual | Mejora |
|-------|--------------|-----------------|--------|
| **precio** | `Double` | `BigDecimal` | ⭐ Mejor (precisión decimal) |
| **nombre** | `String` | `String` | ✅ Igual |
| **images** | `String imagen` | `List<String> images` | ⭐ Mejor (múltiples imágenes) |
| **timestamps** | No incluido | `LocalDateTime createdAt/updatedAt` | ⭐ Agregado |

---

## Clase 11: Seguridad y Autenticación

### Conceptos Implementados

| Concepto | Esperado (Clase 11) | Implementado | Cumplimiento |
|----------|---------------------|--------------|--------------|
| **Spring Security** | ✅ spring-boot-starter-security | ✅ Presente | ✅ 100% |
| **Autenticación** | Basic Auth | JWT Tokens | ⭐⭐⭐ Mejorado significativamente |
| **UserDetails** | Usuario implements UserDetails | ✅ Usuario implements UserDetails | ✅ 100% |
| **PasswordEncoder** | BCryptPasswordEncoder | ✅ BCryptPasswordEncoder | ✅ 100% |
| **Roles** | USER, ADMIN | ✅ USER, ADMIN (enum) | ✅ 100% |
| **SecurityFilterChain** | ✅ Configuración de endpoints | ✅ Configuración completa | ✅ 100% |
| **AuthenticationManager** | ✅ Bean configurado | ✅ Bean configurado | ✅ 100% |
| **Session Policy** | No especificado | STATELESS | ⭐ Mejorado (API REST moderna) |

### Autenticación: Basic Auth vs JWT

| Aspecto | Clase 11 (Basic Auth) | Proyecto Actual (JWT) | Ventaja Proyecto |
|---------|----------------------|----------------------|------------------|
| **Método** | Header: `Authorization: Basic base64(user:pass)` | Header: `Authorization: Bearer <token>` | ⭐ Más seguro |
| **Credenciales** | Se envían en cada request | Token se envía una vez | ⭐ Mejor seguridad |
| **Expiración** | No expira | Expira en 24 horas | ⭐ Más seguro |
| **Stateless** | No claramente | Sí (STATELESS) | ⭐ Escalable |
| **Payload** | Solo credenciales | userId + email + expiración | ⭐ Más información |

---

## Mejoras Adicionales

- **JWT Authentication** - Tokens en lugar de Basic Auth (más seguro)
- **Owner validation** - Solo el dueño puede editar sus productos
- **@Builder pattern** - Código más limpio con Lombok
- **Múltiples imágenes** - List<String> en lugar de String
- **BigDecimal** - Precios precisos sin errores de redondeo
- **DataInitializer** - Carga automática de 100 productos
- **Sistema de Pedidos** - Gestión completa de compras

---

### Recursos del Proyecto

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081/api
- **MySQL**: localhost:3308
- **Postman Collection**: `TPO-Ecommerce/backend/postman-collection-complete.json`
- **Script SQL**: `TPO-Ecommerce/backend/db-seed.sql`

### Tecnologías

- [React Documentation](https://react.dev/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Última actualización**: Octubre 12, 2025  
**Versión del documento**: 2.0.0  
**Estado**: Completo y actualizado

---

_Fin de la Documentación Completa_

