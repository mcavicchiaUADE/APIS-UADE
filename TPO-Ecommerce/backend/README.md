# Backend E-commerce - Spring Boot

Este es el backend para el proyecto de e-commerce desarrollado con Spring Boot.

## Características

- **Entidad Producto**: Con campos id, nombre y precio
- **ProductoService**: Simula almacenamiento en memoria usando una List
- **ProductoController**: Endpoints REST para operaciones CRUD
- **CORS configurado**: Para conectar con el frontend React
- **Base de datos H2**: En memoria para desarrollo

## Estructura del Proyecto

```
backend/
├── src/
│   └── main/
│       ├── java/com/ecommerce/
│       │   ├── EcommerceBackendApplication.java
│       │   ├── controller/
│       │   │   └── ProductoController.java
│       │   ├── entity/
│       │   │   └── Producto.java
│       │   └── service/
│       │       └── ProductoService.java
│       └── resources/
│           └── application.properties
├── pom.xml
└── README.md
```

## Endpoints Disponibles

### Productos
- `GET /api/productos` - Obtiene todos los productos
- `GET /api/productos/{id}` - Obtiene un producto por ID
- `POST /api/productos` - Crea un nuevo producto
- `PUT /api/productos/{id}` - Actualiza un producto existente
- `DELETE /api/productos/{id}` - Elimina un producto
- `GET /api/productos/buscar?nombre={nombre}` - Busca productos por nombre
- `GET /api/productos/health` - Verifica el estado del servicio

## Cómo Ejecutar

### Prerrequisitos
- Java 17 o superior
- Maven 3.6 o superior

### Pasos
1. Navegar al directorio del backend:
   ```bash
   cd TPO-Ecommerce/backend
   ```

2. Compilar el proyecto:
   ```bash
   mvn clean compile
   ```

3. Ejecutar la aplicación:
   ```bash
   mvn spring-boot:run
   ```

4. La aplicación estará disponible en: `http://localhost:8081`

## Pruebas con Postman

### Obtener todos los productos
```
GET http://localhost:8081/api/productos
```

### Crear un nuevo producto
```
POST http://localhost:8081/api/productos
Content-Type: application/json

{
    "nombre": "Nuevo Producto",
    "precio": 99.99
}
```

### Obtener un producto por ID
```
GET http://localhost:8081/api/productos/1
```

### Buscar productos por nombre
```
GET http://localhost:8081/api/productos/buscar?nombre=iPhone
```

## Base de Datos H2

Para acceder a la consola de H2 (solo para desarrollo):
- URL: `http://localhost:8081/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuario: `sa`
- Contraseña: `password`

## Integración con Frontend

El backend está configurado para aceptar peticiones desde:
- `http://localhost:3000` (React con npm start)
- `http://localhost:5173` (Vite dev server)

## Productos Iniciales

El servicio se inicializa con algunos productos de ejemplo:
1. iPhone 15 Pro Max - $1299.99
2. MacBook Air M2 - $1199.99
3. Nike Air Max 270 - $149.99
4. Sofá 3 Plazas Moderno - $899.99
5. Balón de Fútbol Adidas - $89.99
