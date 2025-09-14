# 🛒 E-Commerce System - Frontend

Un sistema de e-commerce moderno y responsive construido con **Vite + React + Tailwind CSS**, diseñado para ofrecer una experiencia de usuario excepcional.

## ✨ Características

- 🚀 **Rendimiento optimizado** con Vite
- 🎨 **Diseño moderno** con Tailwind CSS y modo oscuro
- 📱 **Completamente responsive**
- 🔐 **Sistema de autenticación** completo con persistencia
- 🛍️ **Gestión de carrito** en tiempo real
- 📦 **Dashboard de productos** para administradores con paginación
- 🖼️ **Subida de imágenes** integrada
- 💾 **Persistencia de datos** con localStorage, sessionStorage y JSON Server
- 🔄 **Paginación avanzada** y controles de vista
- 🎠 **Carrusel de productos** destacados
- 🔗 **Productos relacionados** en detalle
- ⚡ **Hot Module Replacement** para desarrollo

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **PostCSS** - Procesamiento de CSS

### Estado y Routing
- **React Router DOM** - Enrutamiento de la aplicación
- **Context API** - Gestión de estado global
- **Custom Hooks** - Lógica reutilizable

### Utilidades
- **Fetch API** - Cliente HTTP nativo
- **Lucide React** - Iconos modernos
- **ESLint** - Linting de código
- **JSON Server** - Backend simulado para desarrollo

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm 9+

### 1. Clonar el repositorio
```bash
git clone https://github.com/bautistabozzer/ProyectosEcommerceAPIS.git
cd ProyectosEcommerceAPIS
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### 4. Ejecutar con JSON Server (recomendado)
```bash
npm start
```

Esto ejecutará tanto el frontend como el JSON Server:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

### 5. Build de producción
```bash
npm run build
```

### 6. Preview del build
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
my-app/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── CartSummary.jsx
│   │   ├── CategoryPill.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── modals/          # Modales específicos
│   │   │   ├── AboutUsModal.jsx
│   │   │   ├── ContactModal.jsx
│   │   │   ├── PrivacyModal.jsx
│   │   │   └── TermsModal.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCarousel.jsx
│   │   ├── ProductListItem.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── QuantitySelector.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ViewControls.jsx
│   ├── context/             # Contextos de React
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useFetch.js
│   │   └── useTheme.js
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Cart.jsx
│   │   ├── DashboardProducts.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductForm.jsx
│   │   └── Register.jsx
│   ├── reducers/            # Reducers para estado
│   │   ├── authReducer.js
│   │   └── cartReducer.js
│   ├── services/            # Servicios y APIs
│   │   └── api.js
├── db.json                  # Base de datos JSON Server
│   ├── styles/              # Estilos globales
│   │   └── global.css
│   ├── utils/               # Utilidades y helpers
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── constants/           # Constantes centralizadas
│   │   └── index.js
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── router.jsx           # Configuración de rutas
├── public/                  # Assets estáticos
├── dist/                    # Build de producción
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.cjs       # Configuración de PostCSS
└── package.json             # Dependencias y scripts
```

## 🔐 Funcionalidades

### Autenticación
- **Registro de usuarios** con validación
- **Inicio de sesión** seguro con opción "Recordarme"
- **Persistencia de sesión** con localStorage y sessionStorage
- **Protección de rutas** para usuarios autenticados
- **Restauración automática** de sesión al recargar la página

### Gestión de Productos
- **Catálogo de productos** con filtros avanzados
- **Búsqueda por nombre** y categoría
- **Paginación** con controles personalizables
- **Vista en grid y lista** intercambiables
- **Carrusel de productos** destacados
- **Productos relacionados** en página de detalle
- **Detalles de producto** completos con galería de imágenes
- **Gestión de stock** en tiempo real

### Carrito de Compras
- **Agregar/eliminar productos**
- **Modificar cantidades**
- **Persistencia del carrito**
- **Resumen de compra**

### Panel de Administración
- **Dashboard de productos** con gestión completa y paginación
- **Crear nuevos productos** con formulario avanzado
- **Editar productos existentes** con pre-carga de datos
- **Subida de imágenes** con preview
- **Gestión de categorías** integrada
- **Paginación inteligente** con navegación por elipsis
- **Selector de elementos** por página (3, 6, 9, 12, 18, 24)

### Interfaz de Usuario
- **Modo oscuro/claro** con persistencia
- **Diseño responsive** optimizado para todos los dispositivos
- **Navegación intuitiva** con breadcrumbs
- **Notificaciones toast** para feedback del usuario
- **Loading states** y skeleton loaders

## 🎨 Componentes Principales

### Layout y Navegación
- **Header**: Navegación principal y estado de autenticación
- **Footer**: Enlaces y información de la aplicación
- **Layout**: Estructura base de las páginas
- **ProtectedRoute**: Protección de rutas privadas

### Productos
- **ProductCard**: Tarjeta de producto con información básica
- **ProductListItem**: Vista en lista con detalles extendidos
- **ProductDetail**: Vista detallada del producto con galería
- **ProductForm**: Formulario para crear/editar productos
- **ProductCarousel**: Carrusel de productos destacados
- **CategoryPill**: Etiqueta de categoría
- **ViewControls**: Controles de paginación y vista

### Carrito
- **CartSummary**: Resumen del carrito
- **QuantitySelector**: Selector de cantidad
- **Cart**: Página principal del carrito

### Utilidades
- **LoadingSpinner**: Indicador de carga
- **SkeletonLoader**: Placeholder durante la carga
- **ErrorBoundary**: Manejo de errores
- **ImageUploader**: Subida de imágenes
- **ThemeToggle**: Toggle para modo oscuro/claro
- **Modal**: Sistema de modales reutilizable
- **Toast**: Sistema de notificaciones
- **Pagination**: Componente de paginación reutilizable

## 🚀 Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "dev:full": "concurrently \"npm run server\" \"npm run dev\"", // Frontend + JSON Server
  "start": "npm run dev:full",      // Comando principal
  "server": "json-server --watch db.json --port 3001", // JSON Server
  "build": "vite build",            // Build de producción
  "preview": "vite preview",        // Preview del build
  "lint": "eslint ."               // Linting del código
}
```

## 🔧 Configuración

### Vite
- **Puerto**: 5173
- **HMR**: Habilitado
- **Build**: Optimizado para producción

### JSON Server
- **Puerto**: 3001
- **Base de datos**: db.json
- **Endpoints**: /users, /products, /categories

### Tailwind CSS
- **Colores personalizados** para branding
- **Modo oscuro** con clases dark:
- **Componentes utilitarios** predefinidos
- **Responsive design** integrado

### PostCSS
- **Autoprefixer** para compatibilidad
- **Tailwind CSS** processing
- **Optimización** de CSS

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 **Mobile First** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Screens** (1440px+)

## 🧪 Datos de Prueba

### Usuarios por defecto
- **Admin**: `admin@test.com` / `admin123`
- **Usuario**: `user1@test.com` / `user123`

### Categorías disponibles
- Electrónicos
- Ropa
- Hogar
- Deportes
- Libros

### Productos
- **100+ productos** en total
- **Productos del catálogo** con datos reales
- **Imágenes** y descripciones completas
- **Categorías** organizadas (Electrónicos, Ropa, Hogar, Deportes, Libros)

## 🚀 Deploy

### Build de Producción
```bash
npm run build
```

### Servir archivos estáticos
Los archivos en `dist/` están listos para ser servidos por cualquier servidor web estático.

### Plataformas recomendadas
- **Vercel**: Deploy automático desde GitHub
- **Netlify**: Drag & drop de la carpeta dist/
- **GitHub Pages**: Deploy desde branch gh-pages
- **Firebase Hosting**: Deploy con Firebase CLI

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Vite** por el build tool increíblemente rápido
- **Tailwind CSS** por el framework de CSS utility-first
- **React** por la biblioteca de UI declarativa
- **Lucide** por los iconos modernos y hermosos

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**