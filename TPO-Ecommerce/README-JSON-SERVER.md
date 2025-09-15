# Configuración de JSON Server

Este proyecto ahora usa JSON Server para persistencia de datos en lugar de localStorage.

## Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el proyecto completo
```bash
npm start
```
Este comando ejecuta tanto JSON Server (puerto 3001) como Vite (puerto 5173) simultáneamente.

### 3. Ejecutar solo JSON Server
```bash
npm run server
```

### 4. Ejecutar solo el frontend
```bash
npm run dev
```

## Endpoints de la API

JSON Server crea automáticamente los siguientes endpoints:

- `GET /users` - Obtener todos los usuarios
- `POST /users` - Crear nuevo usuario
- `GET /users/:id` - Obtener usuario por ID
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

- `GET /products` - Obtener todos los productos
- `POST /products` - Crear nuevo producto
- `GET /products/:id` - Obtener producto por ID
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

- `GET /categories` - Obtener todas las categorías
- `POST /categories` - Crear nueva categoría
- `GET /categories/:id` - Obtener categoría por ID
- `PUT /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría

## Filtros y Búsquedas

### Productos
- `GET /products?categoryId=1` - Filtrar por categoría
- `GET /products?q=iphone` - Buscar por texto (se filtra en el frontend)

### Usuarios
- `GET /users?email=admin@test.com` - Buscar por email

### Paginación
- `GET /products?_page=1&_limit=10` - Paginación de productos
- `GET /products?_start=0&_end=9` - Rango de productos
- `GET /products?_sort=name&_order=asc` - Ordenamiento

## Datos Iniciales

El archivo `db.json` contiene datos iniciales:
- 3 usuarios de prueba (admin@test.com / admin123, user1@test.com / user123, test@test.com / test123)
- 5 categorías (Electrónicos, Ropa, Hogar, Deportes, Libros)
- 100+ productos de ejemplo con datos reales
- Imágenes y descripciones completas

## Ventajas de JSON Server

1. **Persistencia**: Los datos se mantienen entre recargas de página
2. **API REST Real**: Endpoints HTTP estándar
3. **Filtros**: Búsquedas y filtros automáticos
4. **Paginación**: Soporte para paginación
5. **Relaciones**: Manejo de relaciones entre entidades
6. **Desarrollo**: Ideal para desarrollo y testing
7. **Simplicidad**: No requiere configuración de base de datos
8. **Flexibilidad**: Fácil modificación de datos para testing

## Solución de Problemas

### Error de conexión
Si ves el error "No se puede conectar con el servidor", asegúrate de que JSON Server esté ejecutándose:
```bash
npm run server
```

### Puerto ocupado
Si el puerto 3001 está ocupado, puedes cambiarlo en `package.json`:
```json
"server": "json-server --watch db.json --port 3002"
```

### Datos no persisten
Asegúrate de que el archivo `db.json` tenga permisos de escritura y que JSON Server esté ejecutándose con la opción `--watch`.
