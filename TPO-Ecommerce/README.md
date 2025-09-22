# E-commerce Full Stack

Proyecto de e-commerce desarrollado con React (Frontend) y Spring Boot (Backend).

## 🚀 Inicio Rápido

### Ejecutar Todo el Proyecto
```powershell
# Instalar dependencias
npm install

# Ejecutar backend + frontend
npm run start
```

### Ejecutar por Separado
```powershell
# Solo backend
npm run backend

# Solo frontend
npm run dev
```

## 📁 Estructura

- `backend/` - Backend Spring Boot (Java) con **100 productos**
- `backend-legacy/` - Referencia al backend anterior (JSON Server) - NO USAR
- `src/` - Frontend React

## 📦 Productos

El sistema incluye **100 productos** organizados en 5 categorías:
- **Electrónicos** (30 productos)
- **Ropa** (10 productos)
- **Hogar** (20 productos)
- **Deportes** (20 productos)
- **Libros** (20 productos)

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081/api
- **Consola H2**: http://localhost:8081/h2-console

## 📋 Comandos Disponibles

- `npm run start` - Ejecutar backend + frontend
- `npm run backend` - Solo backend Spring Boot
- `npm run dev` - Solo frontend React
- `npm run build` - Construir para producción

## 🔧 Tecnologías

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven Daemon (mvnd)

## 📚 Documentación

- [Backend Spring Boot](backend/README.md)
- [Backend Legacy (Referencia)](backend-legacy/README.md)
- [Documentación Completa](README-BACKEND.md)