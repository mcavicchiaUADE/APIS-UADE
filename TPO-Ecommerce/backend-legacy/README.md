# Backend Legacy - JSON Server

Esta carpeta contiene la referencia al backend anterior que usaba JSON Server.

## Archivos de Referencia

- `db.json` - Base de datos original con productos, usuarios y categorías
- `package.json` - Configuración original de JSON Server
- `README.md` - Documentación del backend anterior

## Estado

**⚠️ NO IMPLEMENTADO** - Este backend ya no se usa en el proyecto.

El proyecto ahora usa Spring Boot como backend principal. Ver `../backend/` para el backend actual.

## Datos Originales

Los datos originales del `db.json` han sido migrados al backend Spring Boot y están disponibles en:
- Backend Spring Boot: `http://localhost:8081/api/productos`
- Consola H2: `http://localhost:8081/h2-console`

## Comandos Legacy (No Usar)

```bash
# Estos comandos ya no funcionan en el proyecto actual
npm run server
npm run dev:full
```

## Migración

Los datos del `db.json` original fueron migrados al backend Spring Boot con la siguiente estructura:

### Productos
- `id` → `id` (Long)
- `name` → `name` (String)
- `description` → `description` (String)
- `price` → `price` (BigDecimal)
- `stock` → `stock` (Integer)
- `images` → `images` (List<String>)
- `categoryId` → `categoryId` (Long)
- `ownerUserId` → `ownerUserId` (Long)
- `createdAt` → `createdAt` (LocalDateTime)

### Categorías
Las categorías se mantienen como constantes en el backend Spring Boot:
- Electrónicos (ID: 1)
- Ropa (ID: 2)
- Hogar (ID: 3)
- Deportes (ID: 4)
- Libros (ID: 5)

### Usuarios
Los usuarios se mantienen como constantes simuladas en el backend Spring Boot.
