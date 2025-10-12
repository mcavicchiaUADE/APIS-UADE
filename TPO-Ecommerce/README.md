# 🛒 E-COMMERCE FULL STACK

Proyecto completo de e-commerce con **React** (Frontend) y **Spring Boot** (Backend) + **MySQL**.

## 🚀 CONFIGURACIÓN RÁPIDA

### ⚡ **Setup en 3 pasos:**

1. **MySQL con Docker:**
```powershell
docker run --name mysql-ecommerce -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=ecommerce_db -p 3308:3306 -d mysql:8.0
```

2. **Backend Spring Boot:**
```powershell
cd TPO-Ecommerce\backend
mvnd clean compile
mvnd spring-boot:run
```

3. **Frontend React:**
```powershell
cd TPO-Ecommerce
npm install
npm run dev
```

### 📖 **Para configuración detallada:** [README-SETUP.md](README-SETUP.md)

## 🎯 ESTADO ACTUAL

### ✅ **Funcionando:**
- **Backend**: Spring Boot + MySQL + 7 productos + 5 categorías + 3 usuarios
- **Frontend**: React + TailwindCSS + Autenticación simulada
- **API**: Endpoints REST completos (`/api/productos`, `/api/categorias`)
- **Base de datos**: MySQL con datos iniciales

### 🔗 **URLs:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081/api
- **Postman**: `backend/postman-collection-complete.json`

## 📁 ESTRUCTURA

```
TPO-Ecommerce/
├── backend/                 # Spring Boot + MySQL
│   ├── src/main/java/       # Código Java
│   ├── src/main/resources/  # Configuración
│   └── postman-collection-complete.json
├── src/                     # React Frontend
│   ├── pages/              # Páginas principales
│   ├── components/         # Componentes reutilizables
│   └── services/api.js     # Conexión con backend
└── README-SETUP.md         # Configuración detallada
```

## 🔧 TECNOLOGÍAS

### Backend:
- **Java 24** + **Spring Boot 3.2.0**
- **MySQL 8.0** (Docker)
- **Spring Security** + **JPA/Hibernate**
- **Maven Daemon (mvnd)**

### Frontend:
- **React 18** + **Vite**
- **TailwindCSS** + **Lucide Icons**
- **React Router** + **Context API**

## 📊 FUNCIONALIDADES

### ✅ **Implementadas:**
- CRUD completo de productos
- Gestión de categorías
- Sistema de usuarios
- Autenticación (simulada)
- Interfaz responsive
- Dark mode

### 🔄 **En desarrollo:**
- Autenticación real con JWT
- Páginas de administración
- Gestión de usuarios

## 🛠️ COMANDOS ÚTILES

```powershell
# Verificar estado
docker ps                    # MySQL corriendo
netstat -an | Select-String ":8081"  # Backend corriendo
netstat -an | Select-String ":5173"  # Frontend corriendo

# Reiniciar servicios
docker restart mysql-ecommerce
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
```

## 📚 DOCUMENTACIÓN

- **[Configuración Completa](README-SETUP.md)** - Pasos detallados
- **[Backend](backend/README.md)** - Documentación técnica
- **[Postman Collection](backend/postman-collection-complete.json)** - Pruebas de API