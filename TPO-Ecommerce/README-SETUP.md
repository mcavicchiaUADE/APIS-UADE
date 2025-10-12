# 🚀 CONFIGURACIÓN COMPLETA DEL E-COMMERCE

## 📋 PRERREQUISITOS

- **Java 24** (o Java 17+)
- **Node.js 18+**
- **Docker Desktop** (para MySQL)
- **Maven Daemon (mvnd)** - Ya instalado

## 🗄️ PASO 1: CONFIGURAR MYSQL CON DOCKER

```powershell
# Crear contenedor MySQL
docker run --name mysql-ecommerce -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=ecommerce_db -p 3308:3306 -d mysql:8.0

# Verificar que esté corriendo
docker ps | Select-String "mysql"
```

**✅ Resultado esperado:** Contenedor `mysql-ecommerce` corriendo en puerto `3308`

## 🔧 PASO 2: CONFIGURAR BACKEND SPRING BOOT

```powershell
# Navegar al directorio backend
cd TPO-Ecommerce\backend

# Compilar y ejecutar (esto creará las tablas automáticamente)
mvnd clean compile
mvnd spring-boot:run
```

**✅ Resultado esperado:** 
- Aplicación corriendo en `http://localhost:8081`
- Base de datos MySQL conectada
- 7 productos, 5 categorías, 3 usuarios cargados automáticamente

## 🎨 PASO 3: CONFIGURAR FRONTEND REACT

```powershell
# Navegar al directorio raíz del proyecto
cd TPO-Ecommerce

# Instalar dependencias
npm install

# Ejecutar frontend
npm run dev
```

**✅ Resultado esperado:**
- Frontend corriendo en `http://localhost:5173`
- Interfaz funcional con productos del backend

## 🧪 PASO 4: VERIFICAR FUNCIONAMIENTO

### Backend (Postman/curl):
```powershell
# Probar endpoint de productos
Invoke-WebRequest -Uri "http://localhost:8081/api/productos" -Method GET
```

### Frontend:
- Abrir `http://localhost:5173`
- Ver productos cargados desde el backend
- Probar login (funcionalidad simulada)

## 📊 ESTADO ACTUAL

### ✅ **Backend funcionando:**
- **API REST**: `http://localhost:8081/api`
- **Base de datos**: MySQL en puerto 3308
- **Endpoints**: Productos, categorías, usuarios
- **Seguridad**: Spring Security activo
- **Datos**: 7 productos, 5 categorías, 3 usuarios

### ✅ **Frontend funcionando:**
- **Interfaz**: React + TailwindCSS
- **Páginas**: Home, Login, Register, Dashboard
- **Autenticación**: Simulada (lista para conectar con backend real)
- **Estilos**: Sistema de diseño completo

### 🔗 **Integración:**
- **Productos**: ✅ Conectados (frontend lee del backend)
- **Categorías**: ✅ Conectadas (frontend lee del backend)
- **Autenticación**: ⚠️ Simulada (pendiente conectar con backend real)

## 🛠️ COMANDOS ÚTILES

### Backend:
```powershell
# Parar aplicación
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# Reiniciar aplicación
cd TPO-Ecommerce\backend
mvnd spring-boot:run
```

### Frontend:
```powershell
# Parar frontend
Ctrl+C

# Reiniciar frontend
npm run dev
```

### Docker:
```powershell
# Ver estado MySQL
docker ps

# Reiniciar MySQL
docker restart mysql-ecommerce

# Ver logs MySQL
docker logs mysql-ecommerce
```

## 🎯 PRÓXIMOS PASOS

1. **Conectar autenticación real** (Fase 1 del plan)
2. **Agregar páginas de administración** (Fases 2-3)
3. **Completar integración** (Fase 4)

## 📁 ARCHIVOS IMPORTANTES

- **Backend**: `TPO-Ecommerce/backend/`
- **Frontend**: `TPO-Ecommerce/src/`
- **Postman**: `TPO-Ecommerce/backend/postman-collection-complete.json`
- **Configuración**: `TPO-Ecommerce/backend/src/main/resources/application-prod.properties`

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error de conexión MySQL:
```powershell
# Verificar puerto correcto (debe ser 3308, no 3306)
docker port mysql-ecommerce
```

### Error de compilación Java:
```powershell
# Limpiar y recompilar
cd TPO-Ecommerce\backend
mvnd clean
mvnd compile
```

### Error de autenticación:
- Los endpoints protegidos devuelven 403 (comportamiento esperado)
- La autenticación real se implementará en la Fase 1
