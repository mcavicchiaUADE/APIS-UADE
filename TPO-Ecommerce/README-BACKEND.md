# E-commerce Full Stack - Frontend + Backend

Este proyecto incluye tanto el frontend en React como el backend en Spring Boot para crear una aplicación de e-commerce completa.

## ⚠️ Backend Legacy

El proyecto anteriormente usaba JSON Server como backend. Los archivos de referencia se encuentran en `backend-legacy/` pero **NO SE USAN** en el proyecto actual.

## Estructura del Proyecto

```
TPO-Ecommerce/
├── backend/                 # Backend Spring Boot (ACTIVO)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/ecommerce/
│   │       │   ├── EcommerceBackendApplication.java
│   │       │   ├── controller/
│   │       │   │   └── ProductoController.java
│   │       │   ├── entity/
│   │       │   │   └── Producto.java
│   │       │   └── service/
│   │       │       └── ProductoService.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   ├── run-backend.ps1
│   ├── postman-collection.json
│   └── README.md
├── backend-legacy/          # Backend JSON Server (REFERENCIA)
│   ├── db.json              # Datos originales
│   ├── package.json         # Configuración legacy
│   └── README.md            # Documentación legacy
├── src/                     # Frontend React
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   │   └── api.js           # API para Spring Boot
│   └── ...
├── package.json
├── vite.config.js
├── run-full-stack.ps1
└── README.md
```

## Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Web**
- **Spring Data JPA**
- **H2 Database** (en memoria)
- **Maven Daemon (mvnd)**

### Frontend
- **React 18**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **React Router**

## Cómo Ejecutar el Proyecto

### Opción 1: Ejecutar Backend y Frontend por separado

#### Backend (Spring Boot)
```powershell
# Navegar al directorio del backend
cd TPO-Ecommerce/backend

# Ejecutar con Maven Daemon
mvnd spring-boot:run

# O usar el script de PowerShell
.\run-backend.ps1
```

#### Frontend (React)
```powershell
# Navegar al directorio raíz del proyecto
cd TPO-Ecommerce

# Instalar dependencias (si es la primera vez)
npm install

# Ejecutar el frontend
npm run dev
```

### Opción 2: Ejecutar ambos simultáneamente

```powershell
# Navegar al directorio raíz del proyecto
cd TPO-Ecommerce

# Instalar dependencias (si es la primera vez)
npm install

# Ejecutar backend y frontend juntos
npm run start
# o
.\run-full-stack.ps1
```

## URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081
- **Consola H2**: http://localhost:8081/h2-console

## Endpoints del Backend

### Productos
- `GET /api/productos` - Obtiene todos los productos
- `GET /api/productos/{id}` - Obtiene un producto por ID
- `POST /api/productos` - Crea un nuevo producto
- `PUT /api/productos/{id}` - Actualiza un producto existente
- `DELETE /api/productos/{id}` - Elimina un producto
- `GET /api/productos/buscar?nombre={nombre}` - Busca productos por nombre
- `GET /api/productos/health` - Verifica el estado del servicio

## Pruebas con Postman

1. Importa el archivo `backend/postman-collection.json` en Postman
2. Ejecuta las peticiones para probar los endpoints

## Ejemplos de Uso

### Crear un nuevo producto
```bash
curl -X POST http://localhost:8081/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Nuevo Producto", "precio": 99.99}'
```

### Obtener todos los productos
```bash
curl http://localhost:8081/api/productos
```

### Buscar productos por nombre
```bash
curl "http://localhost:8081/api/productos/buscar?nombre=iPhone"
```

## Configuración de CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:3000` (React con npm start)
- `http://localhost:5173` (Vite dev server)

## Base de Datos

- **Tipo**: H2 en memoria
- **Consola**: http://localhost:8081/h2-console
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Usuario**: `sa`
- **Contraseña**: `password`

## Productos Iniciales

El backend se inicializa con **100 productos** del `db.json` original, incluyendo:
- Electrónicos (30 productos)
- Ropa (10 productos) 
- Hogar (20 productos)
- Deportes (20 productos)
- Libros (20 productos)

## Próximos Pasos

1. **Conectar Frontend con Backend**: Modificar el frontend para usar los endpoints del backend en lugar de json-server
2. **Agregar más entidades**: Usuarios, Categorías, Carrito de compras
3. **Implementar autenticación**: JWT, Spring Security
4. **Base de datos persistente**: PostgreSQL, MySQL
5. **Despliegue**: Docker, AWS, Heroku

## Solución de Problemas

### Error de Puerto en uso
Si el puerto 8081 está ocupado, modifica `backend/src/main/resources/application.properties`:
```properties
server.port=8081
```

### Error de CORS
Si tienes problemas de CORS, verifica que el frontend esté ejecutándose en los puertos configurados (3000 o 5173).

### Error de Maven
Asegúrate de tener Maven instalado y en el PATH:
```bash
mvn -version
```

### Error de Java
Asegúrate de tener Java 17 o superior:
```bash
java -version
```
