# Carrito de Compras - React

Un proyecto React básico que demuestra el uso de Context API para manejar el estado global del carrito de compras.

## Características

- ✅ Componente `ProductList` que muestra productos desde una API local
- ✅ Uso de `useState` para manejar productos y items del carrito
- ✅ `CartContext` para compartir el estado del carrito entre componentes
- ✅ Componente `Cart` que muestra los productos agregados
- ✅ Botones "Agregar al carrito" que usan `useContext`
- ✅ **Selector de categorías** para filtrar productos
- ✅ Interfaz limpia y moderna con diseño responsivo

## API Utilizada

El proyecto utiliza una API local con json-server que simula una base de datos de productos. Los datos se encuentran en `json-server/db.json`.

## Instalación y Ejecución

### Opción 1: Ejecutar todo junto (Más fácil)

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar ambos servidores al mismo tiempo:
```bash
npm start
```

3. Abrir en el navegador: `http://localhost:5173`

### Opción 2: Ejecutar por separado

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar el servidor de la API (en una terminal):
```bash
npm run json-server
```

3. Ejecutar la aplicación React (en otra terminal):
```bash
npm run dev
```

4. Abrir en el navegador: `http://localhost:5173`

### Opción 3: Usando npx directamente

Si hay problemas con los scripts, puedes ejecutar directamente:

1. Terminal 1 - API:
```bash
npx json-server --watch json-server/products.json --port 3000
```

2. Terminal 2 - React:
```bash
npm run dev
```

### Solución de Problemas

- **Error de HMR**: Los errores de Hot Module Replacement son normales y no afectan la funcionalidad
- **API no responde**: Verifica que json-server esté ejecutándose en el puerto 3000
- **Productos no cargan**: Asegúrate de que ambos servidores estén ejecutándose

**Nota:** Es necesario ejecutar ambos comandos en terminales separadas para que la aplicación funcione correctamente.

## Estructura del Proyecto

```
├── json-server/
│   ├── products.json    # Base de datos simplificada de productos
│   ├── db.json          # Base de datos completa de productos
│   └── dbproductos.json # Base de datos alternativa
├── src/
│   ├── components/
│   │   ├── ProductList.jsx      # Lista de productos con llamada a API
│   │   ├── Cart.jsx            # Carrito de compras
│   │   └── CategorySelector.jsx # Selector de categorías
│   ├── context/
│   │   └── CartContext.jsx     # Context para estado global del carrito
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── package.json
├── json-server.json         # Configuración de json-server
└── README.md
```

## Funcionalidades

- **ProductList**: Muestra productos desde la API con botones para agregar al carrito
- **CategorySelector**: Permite filtrar productos por categoría (Anteojos, Fotografía, Deportes, Tecnología, Accesorios)
- **Cart**: Muestra items del carrito con opciones para modificar cantidad y eliminar
- **CartContext**: Maneja el estado global del carrito con funciones para agregar, remover y actualizar items
- **Filtrado**: Los productos se filtran dinámicamente según la categoría seleccionada
- **Responsive**: Diseño adaptativo que funciona en diferentes tamaños de pantalla

## Tecnologías Utilizadas

- React 18
- Vite
- Context API
- Hooks (useState, useEffect, useContext)
- CSS3
