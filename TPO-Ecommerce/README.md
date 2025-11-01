# 🛒 E-commerce Full Stack

Aplicación completa de e-commerce con **React + Vite** (Frontend) y **Spring Boot + MySQL** (Backend).

## 🚀 Inicio Rápido

### 🐳 Método 1: Docker (Recomendado)

#### Opción A: Desarrollo Local (construir desde código)
```powershell
# Construir e iniciar desde código local
docker-compose up -d --build

# ¡Listo! Los servicios están corriendo
```

#### Opción B: Producción (usar imágenes de Docker Hub)
```powershell
# Descargar y usar imágenes publicadas (más rápido)
docker-compose -f docker-compose.prod.yml up -d

# ¡Listo! Los servicios están corriendo
```

### 💻 Método 2: Desarrollo Local (Manual)

```powershell
# 1. MySQL con Docker
docker run --name mysql-ecommerce -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=ecommerce_db -p 3308:3306 -d mysql:8.0

# 2. Instalar dependencias (solo primera vez)
cd TPO-Ecommerce
npm install

# 3. Iniciar aplicación completa (Backend + Frontend)
npm run start
```

### URLs de Acceso:
- **Frontend**: http://localhost (Docker) / http://localhost:5173 (Local)
- **Backend API**: http://localhost:8081/api
- **MySQL**: localhost:3306 (Docker) / localhost:3308 (Local)

### Credenciales de Prueba:
- **Admin**: `admin@test.com` / `admin123`
- **User**: `user1@test.com` / `user123`

> 📖 Para más información sobre Docker, consulta [DOCKER.md](./docs/DOCKER.md)

---

## 🎯 Características

### ✅ Implementadas:
- **Backend**: Spring Boot + MySQL + JWT + Spring Security
- **Frontend**: React + TailwindCSS + Context API
- **Autenticación**: Login/Register con JWT
- **Productos**: CRUD completo con imágenes
- **Categorías**: Gestión completa
- **Carrito**: Sistema de compras funcional
- **UI/UX**: Diseño moderno y responsivo + Dark mode

---

## 🔧 Tecnologías

### Backend:
- **Java 24** + **Spring Boot 3.2.0**
- **MySQL 8.0** (Docker)
- **Spring Security** + **JWT**
- **Spring Data JPA** + **Hibernate**

### Frontend:
- **React 18** + **Vite**
- **TailwindCSS** + **Lucide Icons**
- **React Router** + **Context API**

---

## 📁 Estructura del Proyecto

```
TPO-Ecommerce/
├── backend/                 # Spring Boot + MySQL
│   ├── src/main/java/      # Código Java
│   ├── src/main/resources/ # Configuración
│   └── postman-collection-complete.json
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── pages/         # Páginas principales
│   │   ├── components/    # Componentes reutilizables
│   │   ├── context/        # Estado global
│   │   └── services/api.js # API integrada con backend
│   └── package.json
├── docs/                   # Documentación completa
│   ├── DOCUMENTACION-COMPLETA.md  # Guía completa de desarrollo
│   └── DOCKER.md          # Guía específica de Docker
├── docker-compose.yml      # Orquestación Docker
└── package.json           # Scripts de desarrollo
```

---

## 📚 Documentación

- **[Documentación Completa](./docs/DOCUMENTACION-COMPLETA.md)** - Guía completa de desarrollo, arquitectura, backend, frontend, testing
- **[Guía de Docker](./docs/DOCKER.md)** - Configuración, comandos y troubleshooting de Docker
- **Postman Collection**: `backend/postman-collection-complete.json` - Colección completa para testing de la API

---

## 🛠️ Comandos Útiles

### 🐳 Docker Compose (Recomendado)

#### Desarrollo Local (construir desde código)
```powershell
# Construir e iniciar desde código local
docker-compose up -d --build        # Construir e iniciar todo
docker-compose logs -f             # Ver logs en tiempo real
docker-compose ps                   # Ver estado de servicios
docker-compose restart              # Reiniciar servicios
docker-compose down                 # Detener servicios
docker-compose down -v              # Detener y eliminar volúmenes
```

#### Producción (usar imágenes de Docker Hub)
```powershell
# Usar imágenes publicadas en Docker Hub (más rápido)
docker-compose -f docker-compose.prod.yml up -d     # Descargar y usar imágenes de Docker Hub
docker-compose -f docker-compose.prod.yml logs -f   # Ver logs
docker-compose -f docker-compose.prod.yml ps         # Ver estado
docker-compose -f docker-compose.prod.yml down       # Detener servicios
```

**Diferencia**:
- `docker-compose.yml` → Construye las imágenes desde tu código local
- `docker-compose.prod.yml` → Descarga y usa las imágenes de Docker Hub (`bautistabozzer/ecommerce-backend:latest`)

### 💻 Desarrollo Local
```powershell
# Desarrollo
npm run dev              # Solo frontend
npm run backend          # Solo backend
npm run start            # Backend + Frontend

# Docker MySQL
docker start mysql-ecommerce
docker restart mysql-ecommerce
docker logs mysql-ecommerce

# Backend (manual)
cd backend
mvnd spring-boot:run

# Verificar estado
docker ps                                           # MySQL corriendo
netstat -an | Select-String ":8081"                # Backend corriendo
netstat -an | Select-String ":5173"                # Frontend corriendo
```

---

## 📊 Datos Iniciales

Al iniciar el backend por primera vez, se cargan automáticamente:
- ✅ **3 usuarios** (1 admin, 2 usuarios normales)
- ✅ **5 categorías** (Electrónicos, Ropa, Hogar, Deportes, Libros)
- ✅ **7 productos** con imágenes y descripciones completas

---

## 🧪 Testing

### Postman
Importar la colección: `backend/postman-collection-complete.json`

### Endpoints Principales
```http
# Autenticación
POST http://localhost:8081/api/auth/login
POST http://localhost:8081/api/auth/register

# Productos
GET  http://localhost:8081/api/productos
GET  http://localhost:8081/api/productos/{id}
POST http://localhost:8081/api/productos          # Requiere JWT

# Categorías
GET  http://localhost:8081/api/categorias
```

---

## 🆘 Solución de Problemas

### Error: MySQL no conecta
```powershell
# Verificar que MySQL esté corriendo
docker ps
docker start mysql-ecommerce
```

### Error: Puerto 8081 ocupado
```powershell
# Detener proceso Java
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Error: "Credenciales inválidas"
```powershell
# Recrear base de datos
docker exec mysql-ecommerce mysql -u root -ppassword -e "DROP DATABASE IF EXISTS ecommerce_db; CREATE DATABASE ecommerce_db;"
npm run start
```

---

## 👨‍💻 Desarrollo

### Estructura del Código
- **Backend**: Arquitectura en capas (Controller → Service → Repository)
- **Frontend**: Componentes funcionales con Hooks
- **Estado**: Context API para autenticación y carrito
- **Estilos**: TailwindCSS con sistema de diseño consistente

### Flujo de Autenticación
1. Login en frontend → Request a backend
2. Backend valida credenciales
3. Backend genera JWT token
4. Frontend almacena token
5. Token se incluye automáticamente en requests

---

## 📈 Próximos Pasos

- [x] Sistema de órdenes/pedidos ✅
- [x] Panel de administración ✅
- [x] Gestión de usuarios ✅
- [x] Sistema de marketplace multi-vendedor ✅
- [ ] Sistema de reviews y ratings
- [ ] Pasarela de pagos
- [ ] Deploy a producción

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios mayores.

---

**¿Necesitas ayuda?** Consulta la [documentación completa](./docs/DOCUMENTACION-COMPLETA.md) o la [guía de Docker](./docs/DOCKER.md).
