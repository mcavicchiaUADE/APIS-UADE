# 📚 Explicación del Proyecto - Carrito de Compras React

## 🎯 Objetivo del Proyecto
Este proyecto demuestra el uso de **React** con **Context API** para crear una aplicación de carrito de compras funcional, incluyendo filtrado por categorías y manejo de estado global.

---

## 🔧 Conceptos de React Implementados

### 1. **Componentes Funcionales**
```jsx
const ProductList = ({ selectedCategory }) => {
  // Lógica del componente
  return <div>...</div>;
};
```
- **¿Qué es?** Funciones que retornan JSX (JavaScript XML)
- **¿Por qué?** Permiten reutilizar código y organizar la interfaz en partes pequeñas
- **En nuestro proyecto:** `ProductList`, `Cart`, `CategorySelector`, `App`

### 2. **Hooks de React**

#### **useState** - Manejo de Estado Local
```jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
```
- **¿Qué hace?** Permite agregar estado a componentes funcionales
- **Sintaxis:** `[valor, funciónParaCambiarlo] = useState(valorInicial)`
- **En nuestro proyecto:** 
  - `products`: Lista de productos
  - `loading`: Estado de carga
  - `selectedCategory`: Categoría seleccionada

#### **useEffect** - Efectos Secundarios
```jsx
useEffect(() => {
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/productos');
    const data = await response.json();
    setProducts(data);
  };
  fetchProducts();
}, []); // Array vacío = se ejecuta solo al montar
```
- **¿Qué hace?** Ejecuta código cuando el componente se monta o cambian dependencias
- **¿Cuándo usar?** Para llamadas a APIs, suscripciones, timers
- **En nuestro proyecto:** Cargar productos desde la API al iniciar

#### **useContext** - Consumir Contexto
```jsx
const { addToCart, cartItems } = useCart();
```
- **¿Qué hace?** Permite acceder a datos compartidos entre componentes
- **¿Por qué?** Evita "prop drilling" (pasar props por muchos niveles)
- **En nuestro proyecto:** Acceder al estado del carrito desde cualquier componente

### 3. **Context API** - Estado Global
```jsx
// Crear contexto
const CartContext = createContext();

// Provider (proveedor)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
    // Lógica para agregar al carrito
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
```
- **¿Qué es?** Sistema para compartir estado entre componentes sin pasar props
- **Componentes:**
  - `createContext()`: Crea el contexto
  - `Provider`: Envuelve componentes que necesitan acceso
  - `useContext()`: Consume el contexto

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ProductList.jsx      # Lista y filtrado de productos
│   ├── Cart.jsx            # Carrito de compras
│   └── CategorySelector.jsx # Selector de categorías
├── context/
│   └── CartContext.jsx     # Estado global del carrito
├── App.jsx                 # Componente principal
└── main.jsx               # Punto de entrada
```

---

## 🔍 Análisis de Cada Componente

### **1. App.jsx - Componente Principal**
```jsx
function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <CartProvider>
      <div className="container">
        <CategorySelector 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ProductList selectedCategory={selectedCategory} />
        <Cart />
      </div>
    </CartProvider>
  );
}
```

**¿Qué hace?**
- **Estado local:** `selectedCategory` para saber qué categoría está seleccionada
- **Provider:** Envuelve toda la app con `CartProvider` para compartir estado del carrito
- **Comunicación:** Pasa `selectedCategory` como prop a `ProductList`
- **Layout:** Organiza los componentes en la interfaz

### **2. CartContext.jsx - Estado Global**
```jsx
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
```

**¿Qué hace?**
- **Estado global:** `cartItems` almacena todos los productos del carrito
- **Funciones:**
  - `addToCart()`: Agrega producto o incrementa cantidad si ya existe
  - `removeFromCart()`: Elimina producto del carrito
  - `getTotal()`: Calcula el precio total
- **Lógica:** Verifica si el producto ya existe antes de agregarlo

### **3. ProductList.jsx - Lista de Productos**
```jsx
const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/productos');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categoria === selectedCategory);

  return (
    <div>
      {filteredProducts.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imagen} alt={product.nombre} />
          <h3>{product.nombre}</h3>
          <p>{product.categoria}</p>
          <p>${product.precio}</p>
          <button onClick={() => addToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};
```

**¿Qué hace?**
- **Carga datos:** `useEffect` obtiene productos de la API al montar
- **Filtrado:** Filtra productos según `selectedCategory`
- **Renderizado:** Muestra cada producto en una tarjeta
- **Interacción:** Botón que llama a `addToCart` del contexto

### **4. CategorySelector.jsx - Filtro de Categorías**
```jsx
const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-selector">
      <button
        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        Todas las categorías
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
```

**¿Qué hace?**
- **Props:** Recibe categorías, categoría seleccionada y función de cambio
- **Botones:** Renderiza un botón por cada categoría
- **Estado visual:** Aplica clase `active` al botón seleccionado
- **Comunicación:** Llama a `onCategoryChange` cuando se hace clic

### **5. Cart.jsx - Carrito de Compras**
```jsx
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

  if (cartItems.length === 0) {
    return <div>Tu carrito está vacío</div>;
  }

  return (
    <div className="cart-sidebar">
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.imagen} alt={item.nombre} />
          <h4>{item.nombre}</h4>
          <p>${item.precio}</p>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
      <div>Total: ${getTotal().toFixed(2)}</div>
    </div>
  );
};
```

**¿Qué hace?**
- **Consume contexto:** Obtiene estado y funciones del carrito
- **Renderizado condicional:** Muestra mensaje si está vacío
- **Lista de items:** Muestra cada producto con controles de cantidad
- **Interacciones:** Botones para modificar cantidad y eliminar

---

## 🔄 Flujo de Datos

### **1. Carga Inicial**
```
App se monta → ProductList se monta → useEffect ejecuta fetch → 
API devuelve productos → setProducts actualiza estado → 
ProductList re-renderiza con productos
```

### **2. Selección de Categoría**
```
Usuario hace clic en CategorySelector → onCategoryChange se ejecuta → 
setSelectedCategory actualiza App → ProductList recibe nueva prop → 
filteredProducts se recalcula → ProductList re-renderiza productos filtrados
```

### **3. Agregar al Carrito**
```
Usuario hace clic en "Agregar al carrito" → addToCart se ejecuta → 
CartContext actualiza cartItems → Cart re-renderiza con nuevo item
```

---

## 🎨 Estilos CSS

### **Metodología:**
- **CSS Modules:** Cada componente tiene estilos específicos
- **Clases semánticas:** `.product-card`, `.cart-item`, `.category-btn`
- **Responsive:** Grid y Flexbox para adaptarse a diferentes pantallas
- **Estados visuales:** `.active`, `.hover` para feedback del usuario

---

## 🚀 API y Datos

### **JSON Server:**
```json
{
  "productos": [
    {
      "id": 1,
      "nombre": "Ray-Ban Aviator Classic",
      "precio": 189.99,
      "imagen": "https://picsum.photos/id/1059/800/600",
      "categoria": "Anteojos",
      "descripcion": "Lentes de sol clásicos..."
    }
  ]
}
```

**Endpoints:**
- `GET /productos` - Obtener todos los productos
- `GET /productos?categoria=Deportes` - Filtrar por categoría

---

## 📚 Conceptos Clave para el Profesor

### **1. React Hooks**
- **useState:** Estado local en componentes funcionales
- **useEffect:** Efectos secundarios y ciclo de vida
- **useContext:** Consumir contexto global

### **2. Context API**
- **Problema que resuelve:** Evitar "prop drilling"
- **Componentes:** Provider, Consumer, useContext
- **Patrón:** Estado global + funciones para modificarlo

### **3. Componentes**
- **Funcionales vs Clásicos:** Hooks permiten usar funciones
- **Props:** Comunicación padre → hijo
- **Estado:** Datos que cambian y causan re-render

### **4. JSX**
- **¿Qué es?** JavaScript XML - sintaxis que parece HTML
- **Expresiones:** `{variable}` para insertar JavaScript
- **Eventos:** `onClick={() => funcion()}`

### **5. Ciclo de Vida**
- **Montaje:** useEffect con array vacío `[]`
- **Actualización:** useEffect con dependencias `[variable]`
- **Desmontaje:** return función de limpieza

---

## 🎯 Puntos de Demostración

### **Para mostrar al profesor:**

1. **Estado Reactivo:** Cambiar categoría y ver cómo se actualiza la lista
2. **Context Global:** Agregar producto y ver cómo aparece en el carrito
3. **Componentes Reutilizables:** Mostrar cómo CategorySelector es independiente
4. **Props y Comunicación:** Explicar cómo App pasa datos a ProductList
5. **Hooks en Acción:** Mostrar useState, useEffect, useContext funcionando

### **Preguntas que puede hacer el profesor:**

**Q: ¿Por qué usar Context en lugar de props?**
A: Evita pasar props por muchos niveles (prop drilling). El carrito necesita ser accesible desde ProductList y Cart.

**Q: ¿Cuándo se ejecuta useEffect?**
A: Al montar el componente (array vacío) o cuando cambian las dependencias.

**Q: ¿Cómo funciona el filtrado?**
A: ProductList recibe selectedCategory como prop, filtra el array de productos y re-renderiza.

**Q: ¿Qué es JSX?**
A: Sintaxis que permite escribir HTML en JavaScript, se compila a React.createElement().

---

## 🔧 Comandos para Ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar API (Terminal 1)
npm run json-server

# Ejecutar React (Terminal 2)
npm run dev

# O ejecutar ambos juntos
npm start
```

---

## 📖 Recursos Adicionales

- **React Docs:** https://react.dev/
- **Hooks:** https://react.dev/reference/react
- **Context:** https://react.dev/reference/react/createContext
- **JSON Server:** https://github.com/typicode/json-server

---

*Este proyecto demuestra conceptos fundamentales de React: componentes, hooks, estado, props, contexto y comunicación entre componentes.*
