# Funcionamiento y finalidad de los routers
_Exported on 9/15/2025 at 20:28:44 GMT-3 from Cursor (1.5.11)_

---

**User**

podrias explicarme el funcionamiento de los Router y cual es la finalidad de los mismos?

---

**Cursor**

Te explico el funcionamiento de los routers y su finalidad. Primero, voy a revisar el archivo de router de tu proyecto para darte una explicación más específica y contextualizada.


## ¿Qué son los Routers y cuál es su finalidad?

Los **routers** son componentes fundamentales en las aplicaciones web modernas que permiten la **navegación del lado del cliente** (Client-Side Routing). Su finalidad principal es:

### �� **Finalidad Principal:**
- **Gestionar la navegación** entre diferentes páginas/vistas sin recargar la página completa
- **Mapear URLs** a componentes específicos de React
- **Mantener el estado** de la aplicación durante la navegación
- **Proporcionar una experiencia de usuario fluida** similar a una aplicación nativa

### �� **Funcionamiento en tu proyecto:**

En tu archivo `router.jsx`, estás usando **React Router v6** que funciona de la siguiente manera:

#### **1. Estructura básica:**
```jsx
<Routes>
  <Route path="/ruta" element={<Componente />} />
</Routes>
```

#### **2. Tipos de rutas en tu aplicación:**

**Rutas Públicas** (sin autenticación):
- `/login` → Componente `Login`
- `/register` → Componente `Register`

**Rutas Protegidas** (requieren autenticación):
- `/` → Página principal (`Home`)
- `/product/:id` → Detalle de producto (con parámetro dinámico)
- `/cart` → Carrito de compras
- `/dashboard/products` → Panel de administración
- `/dashboard/products/new` → Formulario para nuevo producto
- `/dashboard/products/:id/edit` → Formulario para editar producto

#### **3. Características especiales:**

**Rutas anidadas con Layout:**
```jsx
<Route path="/" element={
  <ProtectedRoute>
    <Layout>
      <Home />
    </Layout>
  </ProtectedRoute>
} />
```

**Parámetros dinámicos:**
- `:id` permite capturar valores de la URL (ej: `/product/123`)

**Componente ProtectedRoute:**
- Envuelve las rutas que requieren autenticación
- Verifica si el usuario está logueado antes de mostrar el contenido

### �� **Ventajas del Router:**

1. **Navegación instantánea** - No hay recarga de página
2. **URLs amigables** - Cada vista tiene su propia URL
3. **Navegación del navegador** - Botones atrás/adelante funcionan
4. **Compartir enlaces** - Los usuarios pueden compartir URLs específicas
5. **SEO friendly** - Los motores de búsqueda pueden indexar páginas
6. **Estado persistente** - El estado de la app se mantiene durante la navegación

### 📱 **Ejemplo práctico:**
Cuando un usuario hace clic en un producto, la URL cambia a `/product/123` y se muestra el componente `ProductDetail` sin recargar la página, manteniendo todo el estado de la aplicación (carrito, usuario logueado, etc.).

¿Te gustaría que profundice en algún aspecto específico del router o tienes alguna pregunta sobre su implementación en tu proyecto?

```javascriptreact
<Routes>
  <Route path="/ruta" element={<Componente />} />
</Routes>
```

```javascriptreact
<Route path="/" element={
  <ProtectedRoute>
    <Layout>
      <Home />
    </Layout>
  </ProtectedRoute>
} />
```

---

**User**

Explicame por ejemplo el Route del home.

---

**Cursor**

Te explico en detalle el Route del home que tienes en tu router:

```jsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Layout>
        <Home />
      </Layout>
    </ProtectedRoute>
  }
/>
```

## �� **Análisis detallado del Route del Home:**

### **1. Path: `"/"`**
- **Significado**: Esta es la ruta raíz de tu aplicación
- **URL**: Cuando el usuario visita `http://localhost:3000/` (o tu dominio), se activará esta ruta
- **Prioridad**: Es la ruta por defecto cuando no hay ninguna otra ruta específica

### **2. Element (Componente anidado):**
El `element` contiene una **jerarquía de componentes** que se renderizan en cascada:

#### **Nivel 1: `ProtectedRoute`**
```jsx
<ProtectedRoute>
```
- **Función**: Es un componente wrapper que **verifica la autenticación**
- **Comportamiento**: 
  - Si el usuario NO está logueado → redirige a `/login`
  - Si el usuario SÍ está logueado → permite continuar al siguiente nivel

#### **Nivel 2: `Layout`**
```jsx
<Layout>
```
- **Función**: Proporciona la **estructura común** de la aplicación
- **Contenido típico**: Header, navegación, footer, sidebar
- **Ventaja**: Evita repetir código en cada página

#### **Nivel 3: `Home`**
```jsx
<Home />
```
- **Función**: El **contenido específico** de la página principal
- **Responsabilidad**: Mostrar productos, categorías, carruseles, etc.

### **3. Flujo de ejecución:**

```
Usuario visita "/" 
    ↓
ProtectedRoute verifica autenticación
    ↓
Si está autenticado → Layout se renderiza
    ↓
Layout incluye Header, Footer, etc.
    ↓
Home se renderiza dentro del Layout
    ↓
Usuario ve la página principal completa
```

### **4. Ventajas de esta estructura:**

**Seguridad:**
- Solo usuarios autenticados pueden ver el home
- Protección automática sin código adicional

**Consistencia:**
- Todas las páginas protegidas comparten el mismo Layout
- Header y Footer siempre presentes

**Mantenibilidad:**
- Cambios en el Layout se aplican a todas las páginas
- Lógica de autenticación centralizada

### **5. Ejemplo práctico:**

Si un usuario no autenticado intenta acceder a `http://localhost:3000/`:
1. `ProtectedRoute` detecta que no hay usuario logueado
2. Redirige automáticamente a `/login`
3. El usuario ve el formulario de login

Si un usuario autenticado accede a `http://localhost:3000/`:
1. `ProtectedRoute` verifica que está logueado ✅
2. `Layout` se renderiza con Header, Footer, etc.
3. `Home` se renderiza mostrando productos y contenido principal

¿Te gustaría que profundice en algún componente específico como `ProtectedRoute` o `Layout`?

```javascriptreact
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Layout>
        <Home />
      </Layout>
    </ProtectedRoute>
  }
/>
```

```javascriptreact
<ProtectedRoute>
```

```javascriptreact
<Layout>
```

```javascriptreact
<Home />
```

```plaintext
Usuario visita "/" 
    ↓
ProtectedRoute verifica autenticación
    ↓
Si está autenticado → Layout se renderiza
    ↓
Layout incluye Header, Footer, etc.
    ↓
Home se renderiza dentro del Layout
    ↓
Usuario ve la página principal completa
```

---

**User**

Explicame el useEffect

---

**Cursor**

Te explico el **useEffect** de React, que es uno de los hooks más importantes para manejar efectos secundarios en componentes funcionales.

## **¿Qué es useEffect?**

`useEffect` es un hook de React que te permite **ejecutar código después de que el componente se renderiza** o cuando ciertas dependencias cambian. Es el lugar perfecto para:

- Hacer llamadas a APIs
- Configurar suscripciones
- Limpiar recursos
- Actualizar el DOM
- Ejecutar efectos secundarios

## **Sintaxis básica:**

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // Código que se ejecuta después del render
}, [dependencias]) // Array de dependencias (opcional)
```

## **Tipos de useEffect:**

### **1. Sin dependencias (se ejecuta en cada render):**
```jsx
useEffect(() => {
  console.log('Se ejecuta en cada render')
})
```

### **2. Con array vacío (solo se ejecuta una vez):**
```jsx
useEffect(() => {
  console.log('Solo se ejecuta al montar el componente')
}, [])
```

### **3. Con dependencias (se ejecuta cuando cambian las dependencias):**
```jsx
const [count, setCount] = useState(0)

useEffect(() => {
  console.log('Se ejecuta cuando count cambia')
}, [count])
```

## **Ejemplos prácticos en tu proyecto:**

### **Ejemplo 1: Cargar datos al montar el componente**
```jsx
const [products, setProducts] = useState([])

useEffect(() => {
  // Cargar productos cuando el componente se monta
  fetchProducts()
    .then(data => setProducts(data))
    .catch(error => console.error('Error:', error))
}, []) // Array vacío = solo al montar
```

### **Ejemplo 2: Actualizar cuando cambia un estado**
```jsx
const [searchTerm, setSearchTerm] = useState('')
const [filteredProducts, setFilteredProducts] = useState([])

useEffect(() => {
  // Filtrar productos cuando cambia el término de búsqueda
  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  setFilteredProducts(filtered)
}, [searchTerm, products]) // Se ejecuta cuando cambian estas dependencias
```

### **Ejemplo 3: Limpiar recursos (cleanup)**
```jsx
useEffect(() => {
  // Configurar un timer
  const timer = setInterval(() => {
    console.log('Timer ejecutándose...')
  }, 1000)

  // Función de limpieza
  return () => {
    clearInterval(timer) // Limpiar el timer
  }
}, [])
```

## **Casos de uso comunes:**

### **1. Llamadas a APIs:**
```jsx
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user')
      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      setError(error.message)
    }
  }

  fetchUserData()
}, [])
```

### **2. Suscripciones a eventos:**
```jsx
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

### **3. Actualizar el título de la página:**
```jsx
useEffect(() => {
  document.title = `Producto: ${product.name}`
}, [product.name])
```

## ⚠️ **Errores comunes:**

### **1. Dependencias faltantes:**
```jsx
// ❌ MAL - puede causar bugs
useEffect(() => {
  setCount(count + 1)
}, []) // Falta 'count' en las dependencias

// ✅ BIEN
useEffect(() => {
  setCount(count + 1)
}, [count])
```

### **2. Efectos infinitos:**
```jsx
// ❌ MAL - bucle infinito
useEffect(() => {
  setCount(count + 1)
}, [count]) // count cambia, se ejecuta de nuevo, count cambia...

// ✅ BIEN - usar función de actualización
useEffect(() => {
  setCount(prevCount => prevCount + 1)
}, [])
```

## **Mejores prácticas:**

1. **Siempre incluye las dependencias** que usas dentro del efecto
2. **Usa funciones de limpieza** para evitar memory leaks
3. **Separa efectos** que no están relacionados
4. **Usa useCallback y useMemo** para optimizar dependencias
5. **Evita efectos innecesarios** - no pongas todo en useEffect

¿Te gustaría que te muestre ejemplos específicos de useEffect en tu proyecto o tienes alguna duda sobre algún caso de uso particular?

```javascriptreact
import { useEffect } from 'react'

useEffect(() => {
  // Código que se ejecuta después del render
}, [dependencias]) // Array de dependencias (opcional)
```

```javascriptreact
useEffect(() => {
  console.log('Se ejecuta en cada render')
})
```

```javascriptreact
useEffect(() => {
  console.log('Solo se ejecuta al montar el componente')
}, [])
```

```javascriptreact
const [count, setCount] = useState(0)

useEffect(() => {
  console.log('Se ejecuta cuando count cambia')
}, [count])
```

```javascriptreact
const [products, setProducts] = useState([])

useEffect(() => {
  // Cargar productos cuando el componente se monta
  fetchProducts()
    .then(data => setProducts(data))
    .catch(error => console.error('Error:', error))
}, []) // Array vacío = solo al montar
```

```javascriptreact
const [searchTerm, setSearchTerm] = useState('')
const [filteredProducts, setFilteredProducts] = useState([])

useEffect(() => {
  // Filtrar productos cuando cambia el término de búsqueda
  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  setFilteredProducts(filtered)
}, [searchTerm, products]) // Se ejecuta cuando cambian estas dependencias
```

```javascriptreact
useEffect(() => {
  // Configurar un timer
  const timer = setInterval(() => {
    console.log('Timer ejecutándose...')
  }, 1000)

  // Función de limpieza
  return () => {
    clearInterval(timer) // Limpiar el timer
  }
}, [])
```

```javascriptreact
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user')
      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      setError(error.message)
    }
  }

  fetchUserData()
}, [])
```

```javascriptreact
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

```javascriptreact
useEffect(() => {
  document.title = `Producto: ${product.name}`
}, [product.name])
```

```javascriptreact
// ❌ MAL - puede causar bugs
useEffect(() => {
  setCount(count + 1)
}, []) // Falta 'count' en las dependencias

// ✅ BIEN
useEffect(() => {
  setCount(count + 1)
}, [count])
```

```javascriptreact
// ❌ MAL - bucle infinito
useEffect(() => {
  setCount(count + 1)
}, [count]) // count cambia, se ejecuta de nuevo, count cambia...

// ✅ BIEN - usar función de actualización
useEffect(() => {
  setCount(prevCount => prevCount + 1)
}, [])
```

---

**User**

Explicame todos y cada uno del los hooks que aparecen. (sin repetir obviamente)Dame un ejemplo de uso que exista en mi codigo para cada uno.

---

**Cursor**

Te explico todos los hooks que aparecen en tu código con ejemplos específicos de tu proyecto. Primero voy a revisar los archivos para encontrar todos los hooks utilizados.


Ahora voy a buscar más hooks en otros archivos para tener una visión completa:


Perfecto! Ahora tengo una visión completa de todos los hooks utilizados en tu proyecto. Te explico cada uno con ejemplos específicos de tu código:

## **Hooks de React (Built-in)**

### **1. useState**
**Función**: Maneja el estado local de un componente.

**Ejemplo de tu código** (`src/pages/Home.jsx`):
```jsx
const [searchTerm, setSearchTerm] = useState("")
const [selectedCategory, setSelectedCategory] = useState(null)
const [filteredProducts, setFilteredProducts] = useState([])
const [currentPage, setCurrentPage] = useState(1)
```

**Ejemplo con función inicializadora** (`src/pages/Home.jsx`):
```jsx
const [productsPerPage, setProductsPerPage] = useState(() => {
  const saved = localStorage.getItem('productsPerPage')
  return saved ? Number(saved) : 9
})
```

### **2. useEffect**
**Función**: Ejecuta efectos secundarios después del render.

**Ejemplo de tu código** (`src/context/CartContext.jsx`):
```jsx
// Restaurar carrito al cargar la app
useEffect(() => {
  const savedCart = localStorage.getItem("cart_items")
  if (savedCart) {
    dispatch({
      type: "RESTORE_CART",
      payload: JSON.parse(savedCart),
    })
  }
}, []) // Solo al montar

// Guardar carrito cuando cambia
useEffect(() => {
  localStorage.setItem("cart_items", JSON.stringify(state.items))
}, [state.items]) // Cuando cambian los items
```

### **3. useContext**
**Función**: Accede al contexto de React sin prop drilling.

**Ejemplo de tu código** (`src/context/AuthContext.jsx`):
```jsx
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

### **4. useReducer**
**Función**: Maneja estado complejo con lógica de actualización centralizada.

**Ejemplo de tu código** (`src/context/AuthContext.jsx`):
```jsx
const [state, dispatch] = useReducer(authReducer, authInitialState)

// Uso del dispatch
dispatch({
  type: "AUTH_SUCCESS",
  payload: response,
})
```

### **5. createContext**
**Función**: Crea un contexto para compartir datos entre componentes.

**Ejemplo de tu código** (`src/context/CartContext.jsx`):
```jsx
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // ... lógica del provider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
```

## **Hooks de React Router**

### **6. useNavigate**
**Función**: Permite navegar programáticamente entre rutas.

**Ejemplo de tu código** (`src/pages/Login.jsx`):
```jsx
const navigate = useNavigate()

const handleSubmit = async (e) => {
  // ... lógica de login
  if (isLoginMode) {
    await login(formData.email, formData.password, rememberMe)
    navigate("/") // Navegar al home después del login
  }
}
```

### **7. useParams**
**Función**: Extrae parámetros de la URL.

**Ejemplo de tu código** (`src/pages/ProductDetail.jsx`):
```jsx
const { id } = useParams()
const { data: product, loading, error: fetchError } = useFetch(
  () => api.getProduct(id), 
  [id]
)
```

## **Hooks Personalizados (Custom Hooks)**

### **8. useFetch**
**Función**: Hook personalizado para manejar llamadas a APIs con loading y error states.

**Ejemplo de tu código** (`src/hooks/useFetch.js`):
```jsx
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch }
}
```

**Uso en tu código** (`src/pages/Home.jsx`):
```jsx
const {
  data: products,
  loading: productsLoading,
  error: productsError,
  refetch: refetchProducts,
} = useFetch(
  () => api.getProducts({ search: searchTerm, categoryId: selectedCategory }),
  [searchTerm, selectedCategory]
)
```

### **9. useTheme**
**Función**: Hook personalizado para manejar el tema claro/oscuro.

**Ejemplo de tu código** (`src/hooks/useTheme.js`):
```jsx
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
```

## **Hooks de Contexto Personalizados**

### **10. useAuth**
**Función**: Hook personalizado para acceder al contexto de autenticación.

**Ejemplo de tu código** (`src/pages/Login.jsx`):
```jsx
const { login, register, loading } = useAuth()
const { error, success } = useToast()
```

### **11. useCart**
**Función**: Hook personalizado para acceder al contexto del carrito.

**Ejemplo de tu código** (`src/pages/Cart.jsx`):
```jsx
const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()
```

### **12. useToast**
**Función**: Hook personalizado para mostrar notificaciones.

**Ejemplo de tu código** (`src/pages/Login.jsx`):
```jsx
const { error, success } = useToast()

// Uso
try {
  await login(formData.email, formData.password, rememberMe)
  navigate("/")
} catch (err) {
  error(err.message) // Mostrar error
}
```

## **Resumen de Hooks en tu proyecto:**

| Hook | Tipo | Propósito | Ejemplo de uso |
|------|------|-----------|----------------|
| `useState` | Built-in | Estado local | `const [count, setCount] = useState(0)` |
| `useEffect` | Built-in | Efectos secundarios | Cargar datos, limpiar recursos |
| `useContext` | Built-in | Acceso a contexto | `const auth = useContext(AuthContext)` |
| `useReducer` | Built-in | Estado complejo | Manejo de estado del carrito/auth |
| `createContext` | Built-in | Crear contexto | `const CartContext = createContext()` |
| `useNavigate` | Router | Navegación | `navigate("/home")` |
| `useParams` | Router | Parámetros URL | `const { id } = useParams()` |
| `useFetch` | Custom | Llamadas API | `const { data, loading } = useFetch(api.getProducts)` |
| `useTheme` | Custom | Tema claro/oscuro | `const { theme, toggleTheme } = useTheme()` |
| `useAuth` | Custom | Autenticación | `const { user, login } = useAuth()` |
| `useCart` | Custom | Carrito | `const { items, addToCart } = useCart()` |
| `useToast` | Custom | Notificaciones | `const { success, error } = useToast()` |

¿Te gustaría que profundice en algún hook específico o tienes alguna pregunta sobre su implementación?

```javascriptreact
const [searchTerm, setSearchTerm] = useState("")
const [selectedCategory, setSelectedCategory] = useState(null)
const [filteredProducts, setFilteredProducts] = useState([])
const [currentPage, setCurrentPage] = useState(1)
```

```javascriptreact
const [productsPerPage, setProductsPerPage] = useState(() => {
  const saved = localStorage.getItem('productsPerPage')
  return saved ? Number(saved) : 9
})
```

```javascriptreact
// Restaurar carrito al cargar la app
useEffect(() => {
  const savedCart = localStorage.getItem("cart_items")
  if (savedCart) {
    dispatch({
      type: "RESTORE_CART",
      payload: JSON.parse(savedCart),
    })
  }
}, []) // Solo al montar

// Guardar carrito cuando cambia
useEffect(() => {
  localStorage.setItem("cart_items", JSON.stringify(state.items))
}, [state.items]) // Cuando cambian los items
```

```javascriptreact
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

```javascriptreact
const [state, dispatch] = useReducer(authReducer, authInitialState)

// Uso del dispatch
dispatch({
  type: "AUTH_SUCCESS",
  payload: response,
})
```

```javascriptreact
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // ... lógica del provider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
```

```javascriptreact
const navigate = useNavigate()

const handleSubmit = async (e) => {
  // ... lógica de login
  if (isLoginMode) {
    await login(formData.email, formData.password, rememberMe)
    navigate("/") // Navegar al home después del login
  }
}
```

```javascriptreact
const { id } = useParams()
const { data: product, loading, error: fetchError } = useFetch(
  () => api.getProduct(id), 
  [id]
)
```

```javascriptreact
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch }
}
```

```javascriptreact
const {
  data: products,
  loading: productsLoading,
  error: productsError,
  refetch: refetchProducts,
} = useFetch(
  () => api.getProducts({ search: searchTerm, categoryId: selectedCategory }),
  [searchTerm, selectedCategory]
)
```

```javascriptreact
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
```

```javascriptreact
const { login, register, loading } = useAuth()
const { error, success } = useToast()
```

```javascriptreact
const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()
```

```javascriptreact
const { error, success } = useToast()

// Uso
try {
  await login(formData.email, formData.password, rememberMe)
  navigate("/")
} catch (err) {
  error(err.message) // Mostrar error
}
```

---

**User**

Dame mejores explicaciones, no tan resumidas

---

**Cursor**

Te doy explicaciones más detalladas y completas de cada hook con ejemplos específicos de tu código:

## **Hooks de React (Built-in)**

### **1. useState - Gestión de Estado Local**

**¿Qué es?**
`useState` es el hook más fundamental de React que permite a los componentes funcionales tener estado interno. Cada vez que el estado cambia, React re-renderiza el componente automáticamente.

**Sintaxis:**
```jsx
const [valor, setValor] = useState(valorInicial)
```

**Ejemplos detallados de tu código:**

**Ejemplo 1 - Estado simple** (`src/pages/Home.jsx`):
```jsx
const [searchTerm, setSearchTerm] = useState("")
const [selectedCategory, setSelectedCategory] = useState(null)
const [filteredProducts, setFilteredProducts] = useState([])
const [currentPage, setCurrentPage] = useState(1)
```

**¿Cómo funciona?**
- `searchTerm` es el valor actual del estado
- `setSearchTerm` es la función para actualizar el estado
- `""` es el valor inicial (string vacío)
- Cuando llamas `setSearchTerm("nuevo valor")`, React actualiza el estado y re-renderiza el componente

**Ejemplo 2 - Estado con función inicializadora** (`src/pages/Home.jsx`):
```jsx
const [productsPerPage, setProductsPerPage] = useState(() => {
  const saved = localStorage.getItem('productsPerPage')
  return saved ? Number(saved) : 9
})
```

**¿Por qué usar función inicializadora?**
- La función solo se ejecuta **una vez** al montar el componente
- Evita ejecutar `localStorage.getItem()` en cada render
- Mejora el rendimiento cuando el cálculo inicial es costoso

**Ejemplo 3 - Estado de objeto** (`src/pages/Login.jsx`):
```jsx
const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
})

// Actualización del estado de objeto
const handleChange = (e) => {
  const { name, value } = e.target
  setFormData((prev) => ({
    ...prev,        // Mantener propiedades existentes
    [name]: value,  // Actualizar solo la propiedad específica
  }))
}
```

**¿Por qué usar función de actualización?**
- Garantiza que tienes el estado más reciente
- Evita problemas de actualizaciones asíncronas
- Es la práctica recomendada cuando el nuevo estado depende del anterior

### **2. useEffect - Efectos Secundarios**

**¿Qué es?**
`useEffect` permite ejecutar código después de que el componente se renderiza. Es perfecto para:
- Llamadas a APIs
- Configurar suscripciones
- Limpiar recursos
- Actualizar el DOM
- Sincronizar con sistemas externos

**Sintaxis:**
```jsx
useEffect(() => {
  // Código del efecto
  return () => {
    // Función de limpieza (opcional)
  }
}, [dependencias]) // Array de dependencias (opcional)
```

**Ejemplos detallados de tu código:**

**Ejemplo 1 - Efecto que se ejecuta solo al montar** (`src/context/CartContext.jsx`):
```jsx
useEffect(() => {
  const savedCart = localStorage.getItem("cart_items")
  if (savedCart) {
    dispatch({
      type: "RESTORE_CART",
      payload: JSON.parse(savedCart),
    })
  }
}, []) // Array vacío = solo al montar
```

**¿Qué hace?**
- Se ejecuta **una sola vez** cuando el componente se monta
- Restaura el carrito guardado en localStorage
- Si no hay carrito guardado, no hace nada

**Ejemplo 2 - Efecto que se ejecuta cuando cambian las dependencias** (`src/context/CartContext.jsx`):
```jsx
useEffect(() => {
  localStorage.setItem("cart_items", JSON.stringify(state.items))
}, [state.items]) // Se ejecuta cuando cambia state.items
```

**¿Qué hace?**
- Se ejecuta cada vez que `state.items` cambia
- Guarda automáticamente el carrito en localStorage
- Mantiene la persistencia del carrito entre sesiones

**Ejemplo 3 - Efecto con lógica compleja** (`src/context/AuthContext.jsx`):
```jsx
useEffect(() => {
  const restoreSession = () => {
    try {
      // Intentar localStorage primero (remember me)
      let token = localStorage.getItem("auth_token")
      let user = localStorage.getItem("auth_user")
      let storageType = "localStorage"
      
      // Si no hay localStorage, intentar sessionStorage
      if (!token || !user) {
        token = sessionStorage.getItem("auth_token")
        user = sessionStorage.getItem("auth_user")
        storageType = "sessionStorage"
      }
      
      if (token && user) {
        try {
          const userData = JSON.parse(user)
          
          // Validación de datos del usuario
          if (userData && userData.id && userData.email) {
            const userCopy = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role || 'user'
            }
            
            dispatch({
              type: "AUTH_RESTORE",
              payload: { token, user: userCopy, storageType },
            })
          } else {
            clearAllStorage()
          }
        } catch (parseError) {
          clearAllStorage()
        }
      }
    } catch (error) {
      clearAllStorage()
    }
  }
  
  const clearAllStorage = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
  }
  
  restoreSession()
}, []) // Solo al montar
```

**¿Qué hace este efecto?**
- Restaura la sesión del usuario al cargar la app
- Intenta localStorage primero (si el usuario marcó "recordarme")
- Si no encuentra nada, intenta sessionStorage
- Valida que los datos del usuario sean correctos
- Si hay errores, limpia todo el almacenamiento
- Maneja errores de parsing de JSON

**Ejemplo 4 - Efecto con dependencias** (`src/pages/Home.jsx`):
```jsx
useEffect(() => {
  if (products) {
    setFilteredProducts(products)
    setCurrentPage(1) // Reset a la primera página cuando cambian los filtros
  }
}, [products]) // Se ejecuta cuando cambia products
```

**¿Qué hace?**
- Se ejecuta cuando `products` cambia (nuevos datos de la API)
- Actualiza la lista de productos filtrados
- Resetea la página actual a la primera página
- Evita que el usuario esté en una página que ya no existe

### **3. useContext - Acceso a Contexto**

**¿Qué es?**
`useContext` permite acceder al valor de un contexto sin usar el componente `Consumer`. Es la forma moderna de consumir contextos en React.

**Sintaxis:**
```jsx
const valor = useContext(MiContexto)
```

**Ejemplo detallado de tu código** (`src/context/AuthContext.jsx`):
```jsx
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

**¿Por qué crear un hook personalizado?**
- **Validación**: Verifica que el hook se use dentro del Provider correcto
- **Manejo de errores**: Lanza un error claro si se usa fuera del contexto
- **API limpia**: Los componentes solo necesitan llamar `useAuth()` en lugar de `useContext(AuthContext)`
- **Reutilización**: Se puede usar en cualquier componente que necesite autenticación

**Uso en componentes** (`src/pages/Login.jsx`):
```jsx
const { login, register, loading } = useAuth()
const { error, success } = useToast()
```

**¿Qué pasa si se usa fuera del Provider?**
```jsx
// Si usas useAuth() fuera de AuthProvider, obtienes:
// Error: "useAuth must be used within an AuthProvider"
```

### **4. useReducer - Estado Complejo**

**¿Qué es?**
`useReducer` es como `useState` pero para estado complejo. Usa el patrón reducer (como Redux) para manejar actualizaciones de estado.

**Sintaxis:**
```jsx
const [state, dispatch] = useReducer(reducer, estadoInicial)
```

**Ejemplo detallado de tu código** (`src/context/CartContext.jsx`):
```jsx
const [state, dispatch] = useReducer(cartReducer, cartInitialState)

// Acciones del carrito
const addToCart = (product) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  })
}

const removeFromCart = (productId) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: productId,
  })
}

const updateQuantity = (productId, quantity) => {
  dispatch({
    type: "UPDATE_QUANTITY",
    payload: { id: productId, quantity },
  })
}

const clearCart = () => {
  dispatch({ type: "CLEAR_CART" })
}
```

**¿Por qué usar useReducer en lugar de useState?**
- **Estado complejo**: El carrito tiene múltiples propiedades (items, total, etc.)
- **Lógica centralizada**: Todas las actualizaciones pasan por el reducer
- **Predecibilidad**: El estado solo cambia a través de acciones definidas
- **Debugging**: Es más fácil rastrear cambios de estado
- **Reutilización**: El mismo reducer se puede usar en diferentes contextos

**¿Cómo funciona el dispatch?**
1. Llamas `dispatch({ type: "ADD_TO_CART", payload: product })`
2. React llama al `cartReducer` con el estado actual y la acción
3. El reducer devuelve el nuevo estado
4. React actualiza el estado y re-renderiza los componentes

### **5. createContext - Crear Contexto**

**¿Qué es?**
`createContext` crea un contexto que permite compartir datos entre componentes sin pasar props manualmente (evita prop drilling).

**Ejemplo detallado de tu código** (`src/context/CartContext.jsx`):
```jsx
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  
  // Funciones del carrito
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }
  
  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }
  
  // ... más funciones
  
  const value = {
    ...state,           // items, total, etc.
    addToCart,          // función para agregar
    removeFromCart,     // función para remover
    updateQuantity,     // función para actualizar cantidad
    clearCart,          // función para limpiar
    getCartItemsCount,  // función para contar items
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
```

**¿Cómo funciona el Provider?**
- **Envuelve** todos los componentes que necesitan acceso al carrito
- **Proporciona** el valor del contexto a todos los hijos
- **Se actualiza** automáticamente cuando el estado cambia
- **Re-renderiza** solo los componentes que consumen el contexto

**¿Dónde se usa el Provider?**
```jsx
// En App.jsx o main.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}
```

## **Hooks de React Router**

### **6. useNavigate - Navegación Programática**

**¿Qué es?**
`useNavigate` permite navegar entre rutas programáticamente, sin necesidad de usar componentes `Link`.

**Sintaxis:**
```jsx
const navigate = useNavigate()
navigate('/ruta', { replace: true, state: data })
```

**Ejemplo detallado de tu código** (`src/pages/Login.jsx`):
```jsx
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateForm()) {
    return
  }
  
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/") // Navegar al home después del login exitoso
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/") // Navegar al home después del registro exitoso
    }
  } catch (err) {
    error(err.message) // Mostrar error sin navegar
  }
}
```

**¿Por qué usar useNavigate?**
- **Navegación condicional**: Solo navega si el login es exitoso
- **Navegación después de operaciones asíncronas**: Espera a que termine la llamada a la API
- **Manejo de errores**: No navega si hay errores
- **Flexibilidad**: Puedes navegar desde cualquier función, no solo desde eventos

**Opciones de navigate:**
```jsx
navigate("/")                    // Navegación simple
navigate("/", { replace: true }) // Reemplaza la entrada actual en el historial
navigate(-1)                     // Ir a la página anterior
navigate("/product/123", { 
  state: { from: "search" }      // Pasar datos a la nueva ruta
})
```

### **7. useParams - Parámetros de URL**

**¿Qué es?**
`useParams` extrae los parámetros dinámicos de la URL actual.

**Sintaxis:**
```jsx
const params = useParams()
const { id } = useParams()
```

**Ejemplo detallado de tu código** (`src/pages/ProductDetail.jsx`):
```jsx
const { id } = useParams()
const { data: product, loading, error: fetchError } = useFetch(
  () => api.getProduct(id), 
  [id]
)
```

**¿Cómo funciona?**
- Si la URL es `/product/123`, `id` será `"123"`
- Si la URL es `/product/abc`, `id` será `"abc"`
- El parámetro debe coincidir con la ruta definida: `/product/:id`

**¿Por qué usar useParams?**
- **URLs dinámicas**: Cada producto tiene su propia URL
- **SEO friendly**: Los motores de búsqueda pueden indexar cada producto
- **Compartir enlaces**: Los usuarios pueden compartir enlaces específicos
- **Navegación del navegador**: Los botones atrás/adelante funcionan correctamente

**Ejemplo con múltiples parámetros:**
```jsx
// Ruta: /product/:id/edit
const { id, action } = useParams()
// URL: /product/123/edit
// id = "123", action = "edit"
```

## **Hooks Personalizados (Custom Hooks)**

### **8. useFetch - Hook para Llamadas a APIs**

**¿Qué es?**
`useFetch` es un hook personalizado que encapsula la lógica común de hacer llamadas a APIs con estados de loading, error y datos.

**Implementación completa** (`src/hooks/useFetch.js`):
```jsx
import { useState, useEffect } from "react"

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
```

**¿Cómo funciona?**
1. **Recibe** una función que hace la llamada a la API
2. **Recibe** un array de dependencias (como useEffect)
3. **Maneja** automáticamente los estados de loading, error y data
4. **Proporciona** una función `refetch` para volver a hacer la llamada
5. **Se ejecuta** automáticamente cuando cambian las dependencias

**Ejemplo de uso** (`src/pages/Home.jsx`):
```jsx
const {
  data: products,
  loading: productsLoading,
  error: productsError,
  refetch: refetchProducts,
} = useFetch(
  () => api.getProducts({ search: searchTerm, categoryId: selectedCategory }),
  [searchTerm, selectedCategory]
)
```

**¿Por qué es útil?**
- **Reutilización**: No repites la lógica de loading/error en cada componente
- **Consistencia**: Todos los componentes manejan las APIs de la misma manera
- **Simplicidad**: Los componentes solo se enfocan en mostrar los datos
- **Mantenibilidad**: Si necesitas cambiar la lógica, lo haces en un solo lugar

**Ejemplo con múltiples llamadas** (`src/pages/Home.jsx`):
```jsx
// Llamada para productos (con dependencias)
const {
  data: products,
  loading: productsLoading,
  error: productsError,
  refetch: refetchProducts,
} = useFetch(
  () => api.getProducts({ search: searchTerm, categoryId: selectedCategory }),
  [searchTerm, selectedCategory] // Se ejecuta cuando cambian estos valores
)

// Llamada para categorías (sin dependencias)
const {
  data: categories,
  loading: categoriesLoading,
  error: categoriesError,
} = useFetch(() => api.getCategories(), []) // Solo se ejecuta al montar
```

### **9. useTheme - Hook para Manejo de Tema**

**¿Qué es?**
`useTheme` es un hook personalizado que maneja el tema claro/oscuro de la aplicación con persistencia en localStorage.

**Implementación completa** (`src/hooks/useTheme.js`):
```jsx
import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Verificar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover clases anteriores
    root.classList.remove('light', 'dark')
    
    // Agregar clase del tema actual
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const setLightTheme = () => {
    setTheme('light')
  }

  const setDarkTheme = () => {
    setTheme('dark')
  }

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
```

**¿Cómo funciona?**
1. **Inicialización**: Verifica localStorage primero, luego la preferencia del sistema
2. **Aplicación**: Aplica la clase CSS al elemento root del documento
3. **Persistencia**: Guarda el tema en localStorage para la próxima visita
4. **API limpia**: Proporciona funciones fáciles de usar para cambiar el tema

**Ejemplo de uso** (`src/components/ThemeToggle.jsx`):
```jsx
const { theme, toggleTheme, isDark } = useTheme()

return (
  <button onClick={toggleTheme}>
    {isDark ? '☀️' : '🌙'}
  </button>
)
```

**¿Por qué es útil?**
- **Persistencia**: El tema se mantiene entre sesiones
- **Preferencia del sistema**: Respeta la configuración del usuario
- **API simple**: Fácil de usar en cualquier componente
- **Consistencia**: Todos los componentes usan el mismo tema

## **Hooks de Contexto Personalizados**

### **10. useAuth - Hook de Autenticación**

**¿Qué es?**
`useAuth` es un hook personalizado que proporciona acceso al contexto de autenticación con validación de uso.

**Implementación** (`src/context/AuthContext.jsx`):
```jsx
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

**¿Qué proporciona?**
```jsx
const {
  user,           // Datos del usuario actual
  isAuthenticated, // Boolean si está autenticado
  loading,        // Boolean si está cargando
  error,          // Mensaje de error si hay
  login,          // Función para hacer login
  register,       // Función para registrarse
  logout,         // Función para cerrar sesión
} = useAuth()
```

**Ejemplo de uso** (`src/pages/Login.jsx`):
```jsx
const { login, register, loading } = useAuth()

const handleSubmit = async (e) => {
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/")
    }
  } catch (err) {
    error(err.message)
  }
}
```

**¿Por qué crear un hook personalizado?**
- **Validación**: Verifica que se use dentro del Provider
- **API consistente**: Misma interfaz en todos los componentes
- **Manejo de errores**: Errores claros si se usa incorrectamente
- **Encapsulación**: Oculta la implementación del contexto

### **11. useCart - Hook del Carrito**

**¿Qué es?**
`useCart` proporciona acceso al contexto del carrito de compras con todas sus funcionalidades.

**¿Qué proporciona?**
```jsx
const {
  items,              // Array de items en el carrito
  total,              // Total del carrito
  addToCart,          // Función para agregar producto
  removeFromCart,     // Función para remover producto
  updateQuantity,     // Función para actualizar cantidad
  clearCart,          // Función para limpiar carrito
  getCartItemsCount,  // Función para contar items
} = useCart()
```

**Ejemplo de uso** (`src/pages/Cart.jsx`):
```jsx
const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()

const handleQuantityChange = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(productId)
  } else {
    updateQuantity(productId, newQuantity)
  }
}

const handleCheckout = () => {
  if (items.length === 0) {
    error("El carrito está vacío")
    return
  }
  
  setIsCheckingOut(true)
  // ... lógica de checkout
  clearCart()
  success("Compra realizada exitosamente")
  setIsCheckingOut(false)
}
```

**¿Por qué es útil?**
- **Estado global**: El carrito se mantiene entre navegaciones
- **Persistencia**: Se guarda automáticamente en localStorage
- **Funcionalidades completas**: Todas las operaciones del carrito en un lugar
- **Reutilización**: Se puede usar en cualquier componente

### **12. useToast - Hook de Notificaciones**

**¿Qué es?**
`useToast` proporciona un sistema de notificaciones para mostrar mensajes de éxito, error, etc.

**¿Qué proporciona?**
```jsx
const {
  success,  // Función para mostrar mensaje de éxito
  error,    // Función para mostrar mensaje de error
  info,     // Función para mostrar mensaje informativo
  warning,  // Función para mostrar mensaje de advertencia
} = useToast()
```

**Ejemplo de uso** (`src/pages/Login.jsx`):
```jsx
const { error, success } = useToast()

const handleSubmit = async (e) => {
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente") // Mostrar mensaje de éxito
      navigate("/")
    }
  } catch (err) {
    error(err.message) // Mostrar mensaje de error
  }
}
```

**¿Por qué es útil?**
- **Feedback visual**: Los usuarios saben si sus acciones fueron exitosas
- **Consistencia**: Todas las notificaciones se ven igual
- **No intrusivo**: Las notificaciones aparecen y desaparecen automáticamente
- **Reutilización**: Se puede usar en cualquier componente

## **Resumen de Mejores Prácticas**

### **1. Hooks Built-in**
- **useState**: Para estado local simple
- **useEffect**: Para efectos secundarios y sincronización
- **useContext**: Para acceder a contextos (mejor con hooks personalizados)
- **useReducer**: Para estado complejo con lógica centralizada

### **2. Hooks de Router**
- **useNavigate**: Para navegación programática
- **useParams**: Para parámetros de URL dinámicos

### **3. Hooks Personalizados**
- **useFetch**: Para llamadas a APIs con estados de loading/error
- **useTheme**: Para manejo de tema con persistencia
- **useAuth**: Para autenticación con validación
- **useCart**: Para carrito de compras con persistencia
- **useToast**: Para notificaciones del usuario

### **4. Patrones Recomendados**
- **Crear hooks personalizados** para lógica reutilizable
- **Usar funciones inicializadoras** en useState cuando sea costoso
- **Incluir dependencias correctas** en useEffect
- **Validar contexto** en hooks personalizados
- **Manejar errores** apropiadamente en todos los hooks

¿Te gustaría que profundice en algún hook específico o tienes alguna pregunta sobre su implementación?

```javascriptreact
const [valor, setValor] = useState(valorInicial)
```

```javascriptreact
const [searchTerm, setSearchTerm] = useState("")
const [selectedCategory, setSelectedCategory] = useState(null)
const [filteredProducts, setFilteredProducts] = useState([])
const [currentPage, setCurrentPage] = useState(1)
```

```javascriptreact
const [productsPerPage, setProductsPerPage] = useState(() => {
  const saved = localStorage.getItem('productsPerPage')
  return saved ? Number(saved) : 9
})
```

```javascriptreact
const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
})

// Actualización del estado de objeto
const handleChange = (e) => {
  const { name, value } = e.target
  setFormData((prev) => ({
    ...prev,        // Mantener propiedades existentes
    [name]: value,  // Actualizar solo la propiedad específica
  }))
}
```

```javascriptreact
useEffect(() => {
  // Código del efecto
  return () => {
    // Función de limpieza (opcional)
  }
}, [dependencias]) // Array de dependencias (opcional)
```

```javascriptreact
useEffect(() => {
  const savedCart = localStorage.getItem("cart_items")
  if (savedCart) {
    dispatch({
      type: "RESTORE_CART",
      payload: JSON.parse(savedCart),
    })
  }
}, []) // Array vacío = solo al montar
```

```javascriptreact
useEffect(() => {
  localStorage.setItem("cart_items", JSON.stringify(state.items))
}, [state.items]) // Se ejecuta cuando cambia state.items
```

```javascriptreact
useEffect(() => {
  const restoreSession = () => {
    try {
      // Intentar localStorage primero (remember me)
      let token = localStorage.getItem("auth_token")
      let user = localStorage.getItem("auth_user")
      let storageType = "localStorage"
      
      // Si no hay localStorage, intentar sessionStorage
      if (!token || !user) {
        token = sessionStorage.getItem("auth_token")
        user = sessionStorage.getItem("auth_user")
        storageType = "sessionStorage"
      }
      
      if (token && user) {
        try {
          const userData = JSON.parse(user)
          
          // Validación de datos del usuario
          if (userData && userData.id && userData.email) {
            const userCopy = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role || 'user'
            }
            
            dispatch({
              type: "AUTH_RESTORE",
              payload: { token, user: userCopy, storageType },
            })
          } else {
            clearAllStorage()
          }
        } catch (parseError) {
          clearAllStorage()
        }
      }
    } catch (error) {
      clearAllStorage()
    }
  }
  
  const clearAllStorage = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
  }
  
  restoreSession()
}, []) // Solo al montar
```

```javascriptreact
useEffect(() => {
  if (products) {
    setFilteredProducts(products)
    setCurrentPage(1) // Reset a la primera página cuando cambian los filtros
  }
}, [products]) // Se ejecuta cuando cambia products
```

```javascriptreact
const valor = useContext(MiContexto)
```

```javascriptreact
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

```javascriptreact
const { login, register, loading } = useAuth()
const { error, success } = useToast()
```

```javascriptreact
// Si usas useAuth() fuera de AuthProvider, obtienes:
// Error: "useAuth must be used within an AuthProvider"
```

```javascriptreact
const [state, dispatch] = useReducer(reducer, estadoInicial)
```

```javascriptreact
const [state, dispatch] = useReducer(cartReducer, cartInitialState)

// Acciones del carrito
const addToCart = (product) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  })
}

const removeFromCart = (productId) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: productId,
  })
}

const updateQuantity = (productId, quantity) => {
  dispatch({
    type: "UPDATE_QUANTITY",
    payload: { id: productId, quantity },
  })
}

const clearCart = () => {
  dispatch({ type: "CLEAR_CART" })
}
```

```javascriptreact
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  
  // Funciones del carrito
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }
  
  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }
  
  // ... más funciones
  
  const value = {
    ...state,           // items, total, etc.
    addToCart,          // función para agregar
    removeFromCart,     // función para remover
    updateQuantity,     // función para actualizar cantidad
    clearCart,          // función para limpiar
    getCartItemsCount,  // función para contar items
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
```

```javascriptreact
// En App.jsx o main.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}
```

```javascriptreact
const navigate = useNavigate()
navigate('/ruta', { replace: true, state: data })
```

```javascriptreact
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateForm()) {
    return
  }
  
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/") // Navegar al home después del login exitoso
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/") // Navegar al home después del registro exitoso
    }
  } catch (err) {
    error(err.message) // Mostrar error sin navegar
  }
}
```

```javascriptreact
navigate("/")                    // Navegación simple
navigate("/", { replace: true }) // Reemplaza la entrada actual en el historial
navigate(-1)                     // Ir a la página anterior
navigate("/product/123", { 
  state: { from: "search" }      // Pasar datos a la nueva ruta
})
```

```javascriptreact
const params = useParams()
const { id } = useParams()
```

```javascriptreact
const { id } = useParams()
const { data: product, loading, error: fetchError } = useFetch(
  () => api.getProduct(id), 
  [id]
)
```

```javascriptreact
// Ruta: /product/:id/edit
const { id, action } = useParams()
// URL: /product/123/edit
// id = "123", action = "edit"
```

```javascriptreact
import { useState, useEffect } from "react"

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
```

```javascriptreact
const {
  data: products,
  loading: productsLoading,
  error: productsError,
  refetch: refetchProducts,
} = useFetch(
  () => api.getProducts({ search: searchTerm, categoryId: selectedCategory }),
  [searchTerm, selectedCategory]
)
```

```javascriptreact
// Llamada para productos (con dependencias)
const {
  data: products,
  loading: productsLoading,
  error: productsError,
  refetch: refetchProducts,
} = useFetch(
  () => api.getProducts({ search: searchTerm, categoryId: selectedCategory }),
  [searchTerm, selectedCategory] // Se ejecuta cuando cambian estos valores
)

// Llamada para categorías (sin dependencias)
const {
  data: categories,
  loading: categoriesLoading,
  error: categoriesError,
} = useFetch(() => api.getCategories(), []) // Solo se ejecuta al montar
```

```javascriptreact
import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Verificar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover clases anteriores
    root.classList.remove('light', 'dark')
    
    // Agregar clase del tema actual
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const setLightTheme = () => {
    setTheme('light')
  }

  const setDarkTheme = () => {
    setTheme('dark')
  }

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
```

```javascriptreact
const { theme, toggleTheme, isDark } = useTheme()

return (
  <button onClick={toggleTheme}>
    {isDark ? '☀️' : '🌙'}
  </button>
)
```

```javascriptreact
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

```javascriptreact
const {
  user,           // Datos del usuario actual
  isAuthenticated, // Boolean si está autenticado
  loading,        // Boolean si está cargando
  error,          // Mensaje de error si hay
  login,          // Función para hacer login
  register,       // Función para registrarse
  logout,         // Función para cerrar sesión
} = useAuth()
```

```javascriptreact
const { login, register, loading } = useAuth()

const handleSubmit = async (e) => {
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/")
    }
  } catch (err) {
    error(err.message)
  }
}
```

```javascriptreact
const {
  items,              // Array de items en el carrito
  total,              // Total del carrito
  addToCart,          // Función para agregar producto
  removeFromCart,     // Función para remover producto
  updateQuantity,     // Función para actualizar cantidad
  clearCart,          // Función para limpiar carrito
  getCartItemsCount,  // Función para contar items
} = useCart()
```

```javascriptreact
const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()

const handleQuantityChange = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(productId)
  } else {
    updateQuantity(productId, newQuantity)
  }
}

const handleCheckout = () => {
  if (items.length === 0) {
    error("El carrito está vacío")
    return
  }
  
  setIsCheckingOut(true)
  // ... lógica de checkout
  clearCart()
  success("Compra realizada exitosamente")
  setIsCheckingOut(false)
}
```

```javascriptreact
const {
  success,  // Función para mostrar mensaje de éxito
  error,    // Función para mostrar mensaje de error
  info,     // Función para mostrar mensaje informativo
  warning,  // Función para mostrar mensaje de advertencia
} = useToast()
```

```javascriptreact
const { error, success } = useToast()

const handleSubmit = async (e) => {
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente") // Mostrar mensaje de éxito
      navigate("/")
    }
  } catch (err) {
    error(err.message) // Mostrar mensaje de error
  }
}
```

---

**User**

Decime que es Async y await?

---

**Cursor**

Te explico **async/await** de manera detallada con ejemplos específicos de tu código:

## **¿Qué es async/await?**

**async/await** es una forma moderna y más legible de manejar operaciones asíncronas en JavaScript. Es una alternativa más elegante a las Promises y los callbacks, que hace que el código asíncrono se vea y se comporte como código síncrono.

## **Conceptos Fundamentales**

### **1. async - Función Asíncrona**

**¿Qué hace?**
- Convierte una función en una función asíncrona
- Siempre devuelve una Promise
- Permite usar `await` dentro de la función

**Sintaxis:**
```jsx
async function miFuncion() {
  // Código asíncrono aquí
}

// O con arrow function
const miFuncion = async () => {
  // Código asíncrono aquí
}
```

### **2. await - Esperar Promesas**

**¿Qué hace?**
- Pausa la ejecución de la función hasta que la Promise se resuelva
- Solo se puede usar dentro de funciones `async`
- Devuelve el valor resuelto de la Promise

**Sintaxis:**
```jsx
const resultado = await miPromesa()
```

## **Ejemplos de tu código**

### **Ejemplo 1 - Login con async/await** (`src/pages/Login.jsx`)

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateForm()) {
    return
  }
  
  try {
    if (isLoginMode) {
      // await pausa aquí hasta que login termine
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      // await pausa aquí hasta que register termine
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/")
    }
  } catch (err) {
    // Si hay error, se ejecuta este bloque
    error(err.message)
  }
}
```

**¿Cómo funciona?**
1. `handleSubmit` es una función `async`
2. `await login(...)` pausa la ejecución hasta que el login termine
3. Si el login es exitoso, continúa con `navigate("/")`
4. Si hay error, se ejecuta el bloque `catch`

### **Ejemplo 2 - useFetch con async/await** (`src/hooks/useFetch.js`)

```jsx
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        // await pausa aquí hasta que la API responda
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      // await pausa aquí hasta que la API responda
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
```

**¿Cómo funciona?**
1. `fetchData` es una función `async` dentro de `useEffect`
2. `await fetchFunction()` pausa hasta que la API responda
3. Si es exitoso, guarda los datos en `setData(result)`
4. Si hay error, guarda el error en `setError(err.message)`
5. `finally` siempre se ejecuta, poniendo `loading` en `false`

### **Ejemplo 3 - AuthContext con async/await** (`src/context/AuthContext.jsx`)

```jsx
const login = async (email, password, rememberMe = false) => {
  dispatch({ type: "AUTH_START" })
  try {
    // await pausa aquí hasta que la API responda
    const response = await api.login(email, password)
    
    // Elegir almacenamiento basado en rememberMe
    const storage = rememberMe ? localStorage : sessionStorage
    
    // Guardar en el almacenamiento elegido
    storage.setItem("auth_token", response.token)
    storage.setItem("auth_user", JSON.stringify(response.user))
    
    // Limpiar el otro almacenamiento para evitar conflictos
    if (rememberMe) {
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_user")
    } else {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
    }
    
    dispatch({
      type: "AUTH_SUCCESS",
      payload: response,
    })
    return response
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    })
    throw error
  }
}
```

**¿Cómo funciona?**
1. `login` es una función `async`
2. `await api.login(email, password)` pausa hasta que la API responda
3. Si es exitoso, guarda el token y usuario en el almacenamiento
4. Si hay error, actualiza el estado con el error y lo relanza

## **Comparación: Promises vs async/await**

### **Con Promises (método antiguo):**
```jsx
const handleSubmit = (e) => {
  e.preventDefault()
  
  if (isLoginMode) {
    login(formData.email, formData.password, rememberMe)
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        error(err.message)
      })
  } else {
    register(formData, rememberMe)
      .then(() => {
        success("Cuenta creada exitosamente")
        navigate("/")
      })
      .catch((err) => {
        error(err.message)
      })
  }
}
```

### **Con async/await (método moderno):**
```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/")
    }
  } catch (err) {
    error(err.message)
  }
}
```

**¿Por qué async/await es mejor?**
- **Más legible**: Se lee como código síncrono
- **Menos anidamiento**: Evita el "callback hell"
- **Mejor manejo de errores**: Un solo bloque `try/catch`
- **Más fácil de debuggear**: Stack traces más claros

## **Manejo de Errores con async/await**

### **Ejemplo de tu código** (`src/pages/ProductForm.jsx`)

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) {
    return
  }
  
  setIsSubmitting(true)
  
  try {
    if (id) {
      // Editar producto existente
      await api.updateProduct(id, formData)
      success("Producto actualizado exitosamente")
    } else {
      // Crear nuevo producto
      await api.createProduct(formData)
      success("Producto creado exitosamente")
    }
    
    navigate("/dashboard/products")
  } catch (err) {
    error(err.message || "Error al guardar el producto")
  } finally {
    setIsSubmitting(false)
  }
}
```

**¿Cómo funciona el manejo de errores?**
1. **try**: Intenta ejecutar las operaciones asíncronas
2. **catch**: Si hay error, lo captura y muestra al usuario
3. **finally**: Siempre se ejecuta, limpiando el estado de loading

## **Múltiples operaciones asíncronas**

### **Ejemplo con múltiples await:**

```jsx
const handleBulkOperations = async () => {
  try {
    // Ejecutar operaciones en secuencia
    const user = await api.getCurrentUser()
    const products = await api.getUserProducts(user.id)
    const categories = await api.getCategories()
    
    // Procesar datos
    const processedData = processData(user, products, categories)
    
    // Guardar resultado
    await api.saveProcessedData(processedData)
    
    success("Operaciones completadas exitosamente")
  } catch (err) {
    error(`Error en operaciones: ${err.message}`)
  }
}
```

### **Ejemplo con Promise.all (operaciones paralelas):**

```jsx
const handleParallelOperations = async () => {
  try {
    // Ejecutar operaciones en paralelo
    const [user, products, categories] = await Promise.all([
      api.getCurrentUser(),
      api.getUserProducts(),
      api.getCategories()
    ])
    
    // Procesar datos
    const processedData = processData(user, products, categories)
    
    success("Datos cargados exitosamente")
  } catch (err) {
    error(`Error al cargar datos: ${err.message}`)
  }
}
```

## **Ventajas de async/await**

### **1. Legibilidad**
```jsx
// ❌ Con Promises (difícil de leer)
fetch('/api/users')
  .then(response => response.json())
  .then(users => {
    return fetch(`/api/posts?userId=${users[0].id}`)
  })
  .then(response => response.json())
  .then(posts => {
    console.log(posts)
  })
  .catch(error => {
    console.error(error)
  })

// ✅ Con async/await (fácil de leer)
try {
  const usersResponse = await fetch('/api/users')
  const users = await usersResponse.json()
  
  const postsResponse = await fetch(`/api/posts?userId=${users[0].id}`)
  const posts = await postsResponse.json()
  
  console.log(posts)
} catch (error) {
  console.error(error)
}
```

### **2. Manejo de errores**
```jsx
// ❌ Con Promises (múltiples catch)
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(data => {
    // Procesar datos
  })
  .catch(error => {
    console.error('Error:', error)
  })

// ✅ Con async/await (un solo try/catch)
try {
  const response = await fetch('/api/data')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  // Procesar datos
} catch (error) {
  console.error('Error:', error)
}
```

### **3. Debugging**
```jsx
// Con async/await puedes poner breakpoints fácilmente
const processData = async () => {
  const data = await fetchData()        // Breakpoint aquí
  const processed = await processData(data)  // Breakpoint aquí
  const result = await saveData(processed)  // Breakpoint aquí
  return result
}
```

## **Mejores Prácticas**

### **1. Siempre usar try/catch**
```jsx
// ❌ Malo - sin manejo de errores
const badExample = async () => {
  const data = await api.getData()
  return data
}

// ✅ Bueno - con manejo de errores
const goodExample = async () => {
  try {
    const data = await api.getData()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
```

### **2. Usar finally para limpieza**
```jsx
const loadData = async () => {
  setLoading(true)
  try {
    const data = await api.getData()
    setData(data)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false) // Siempre se ejecuta
  }
}
```

### **3. No usar await innecesariamente**
```jsx
// ❌ Malo - await innecesario
const badExample = async () => {
  const data1 = await api.getData1()
  const data2 = await api.getData2() // Espera a que data1 termine
  return { data1, data2 }
}

// ✅ Bueno - operaciones paralelas
const goodExample = async () => {
  const [data1, data2] = await Promise.all([
    api.getData1(),
    api.getData2()
  ])
  return { data1, data2 }
}
```

## **Resumen**

**async/await** es la forma moderna y recomendada de manejar operaciones asíncronas en JavaScript porque:

- **Es más legible** que Promises y callbacks
- **Manejo de errores más simple** con try/catch
- **Mejor debugging** y stack traces
- **Código más mantenible** y fácil de entender
- **Se integra perfectamente** con React y sus hooks

En tu proyecto, lo usas principalmente para:
- Llamadas a APIs (login, register, productos)
- Operaciones del carrito
- Carga de datos en useFetch
- Manejo de formularios asíncronos

¿Te gustaría que profundice en algún aspecto específico de async/await o tienes alguna pregunta sobre su implementación en tu proyecto?

```javascriptreact
async function miFuncion() {
  // Código asíncrono aquí
}

// O con arrow function
const miFuncion = async () => {
  // Código asíncrono aquí
}
```

```javascriptreact
const resultado = await miPromesa()
```

```javascriptreact
const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateForm()) {
    return
  }
  
  try {
    if (isLoginMode) {
      // await pausa aquí hasta que login termine
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      // await pausa aquí hasta que register termine
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/")
    }
  } catch (err) {
    // Si hay error, se ejecuta este bloque
    error(err.message)
  }
}
```

```javascriptreact
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        // await pausa aquí hasta que la API responda
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      // await pausa aquí hasta que la API responda
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
```

```javascriptreact
const login = async (email, password, rememberMe = false) => {
  dispatch({ type: "AUTH_START" })
  try {
    // await pausa aquí hasta que la API responda
    const response = await api.login(email, password)
    
    // Elegir almacenamiento basado en rememberMe
    const storage = rememberMe ? localStorage : sessionStorage
    
    // Guardar en el almacenamiento elegido
    storage.setItem("auth_token", response.token)
    storage.setItem("auth_user", JSON.stringify(response.user))
    
    // Limpiar el otro almacenamiento para evitar conflictos
    if (rememberMe) {
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_user")
    } else {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
    }
    
    dispatch({
      type: "AUTH_SUCCESS",
      payload: response,
    })
    return response
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    })
    throw error
  }
}
```

```javascriptreact
const handleSubmit = (e) => {
  e.preventDefault()
  
  if (isLoginMode) {
    login(formData.email, formData.password, rememberMe)
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        error(err.message)
      })
  } else {
    register(formData, rememberMe)
      .then(() => {
        success("Cuenta creada exitosamente")
        navigate("/")
      })
      .catch((err) => {
        error(err.message)
      })
  }
}
```

```javascriptreact
const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente")
      navigate("/")
    }
  } catch (err) {
    error(err.message)
  }
}
```

```javascriptreact
const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) {
    return
  }
  
  setIsSubmitting(true)
  
  try {
    if (id) {
      // Editar producto existente
      await api.updateProduct(id, formData)
      success("Producto actualizado exitosamente")
    } else {
      // Crear nuevo producto
      await api.createProduct(formData)
      success("Producto creado exitosamente")
    }
    
    navigate("/dashboard/products")
  } catch (err) {
    error(err.message || "Error al guardar el producto")
  } finally {
    setIsSubmitting(false)
  }
}
```

```javascriptreact
const handleBulkOperations = async () => {
  try {
    // Ejecutar operaciones en secuencia
    const user = await api.getCurrentUser()
    const products = await api.getUserProducts(user.id)
    const categories = await api.getCategories()
    
    // Procesar datos
    const processedData = processData(user, products, categories)
    
    // Guardar resultado
    await api.saveProcessedData(processedData)
    
    success("Operaciones completadas exitosamente")
  } catch (err) {
    error(`Error en operaciones: ${err.message}`)
  }
}
```

```javascriptreact
const handleParallelOperations = async () => {
  try {
    // Ejecutar operaciones en paralelo
    const [user, products, categories] = await Promise.all([
      api.getCurrentUser(),
      api.getUserProducts(),
      api.getCategories()
    ])
    
    // Procesar datos
    const processedData = processData(user, products, categories)
    
    success("Datos cargados exitosamente")
  } catch (err) {
    error(`Error al cargar datos: ${err.message}`)
  }
}
```

```javascriptreact
// ❌ Con Promises (difícil de leer)
fetch('/api/users')
  .then(response => response.json())
  .then(users => {
    return fetch(`/api/posts?userId=${users[0].id}`)
  })
  .then(response => response.json())
  .then(posts => {
    console.log(posts)
  })
  .catch(error => {
    console.error(error)
  })

// ✅ Con async/await (fácil de leer)
try {
  const usersResponse = await fetch('/api/users')
  const users = await usersResponse.json()
  
  const postsResponse = await fetch(`/api/posts?userId=${users[0].id}`)
  const posts = await postsResponse.json()
  
  console.log(posts)
} catch (error) {
  console.error(error)
}
```

```javascriptreact
// ❌ Con Promises (múltiples catch)
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(data => {
    // Procesar datos
  })
  .catch(error => {
    console.error('Error:', error)
  })

// ✅ Con async/await (un solo try/catch)
try {
  const response = await fetch('/api/data')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  // Procesar datos
} catch (error) {
  console.error('Error:', error)
}
```

```javascriptreact
// Con async/await puedes poner breakpoints fácilmente
const processData = async () => {
  const data = await fetchData()        // Breakpoint aquí
  const processed = await processData(data)  // Breakpoint aquí
  const result = await saveData(processed)  // Breakpoint aquí
  return result
}
```

```javascriptreact
// ❌ Malo - sin manejo de errores
const badExample = async () => {
  const data = await api.getData()
  return data
}

// ✅ Bueno - con manejo de errores
const goodExample = async () => {
  try {
    const data = await api.getData()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
```

```javascriptreact
const loadData = async () => {
  setLoading(true)
  try {
    const data = await api.getData()
    setData(data)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false) // Siempre se ejecuta
  }
}
```

```javascriptreact
// ❌ Malo - await innecesario
const badExample = async () => {
  const data1 = await api.getData1()
  const data2 = await api.getData2() // Espera a que data1 termine
  return { data1, data2 }
}

// ✅ Bueno - operaciones paralelas
const goodExample = async () => {
  const [data1, data2] = await Promise.all([
    api.getData1(),
    api.getData2()
  ])
  return { data1, data2 }
}
```

---

**User**

Decime la diferencia entre una funcion async y una funcion async con await

---

**Cursor**

Excelente pregunta! Te explico la diferencia entre una función `async` y una función `async` con `await`:

## **Función async SIN await**

### **¿Qué es?**
Una función marcada con `async` que **no usa** `await` en su interior.

### **Características:**
- **Siempre devuelve una Promise**
- **No pausa la ejecución** en ningún punto
- **Se ejecuta de forma síncrona** (aunque devuelve una Promise)
- **Útil para** mantener consistencia en la API o cuando planeas agregar `await` más tarde

### **Ejemplo:**
```jsx
// Función async SIN await
const miFuncionAsync = async () => {
  console.log("Paso 1")
  console.log("Paso 2")
  console.log("Paso 3")
  return "Resultado"
}

// Uso
miFuncionAsync().then(resultado => {
  console.log(resultado) // "Resultado"
})

// O con await
const resultado = await miFuncionAsync()
console.log(resultado) // "Resultado"
```

### **¿Qué devuelve?**
```jsx
const resultado = miFuncionAsync()
console.log(resultado) // Promise { "Resultado" }
```

## **Función async CON await**

### **¿Qué es?**
Una función marcada con `async` que **usa** `await` en su interior.

### **Características:**
- **Pausa la ejecución** en cada `await`
- **Espera** a que las Promises se resuelvan
- **Maneja operaciones asíncronas** de forma secuencial
- **Útil para** operaciones que dependen de APIs, timers, etc.

### **Ejemplo:**
```jsx
// Función async CON await
const miFuncionAsyncConAwait = async () => {
  console.log("Paso 1")
  
  // Pausa aquí hasta que la Promise se resuelva
  const resultado = await fetch('/api/datos')
  console.log("Paso 2 - después de fetch")
  
  // Pausa aquí hasta que la Promise se resuelva
  const datos = await resultado.json()
  console.log("Paso 3 - después de json")
  
  return datos
}
```

## **Comparación Práctica**

### **Ejemplo 1 - Sin await (síncrono)**
```jsx
const funcionSinAwait = async () => {
  console.log("Inicio")
  
  // Esto NO pausa la ejecución
  const promesa = fetch('/api/datos')
  console.log("Después de fetch") // Se ejecuta inmediatamente
  
  return promesa
}

// Ejecución:
// "Inicio"
// "Después de fetch"
// (la Promise se devuelve sin esperar)
```

### **Ejemplo 2 - Con await (asíncrono)**
```jsx
const funcionConAwait = async () => {
  console.log("Inicio")
  
  // Esto SÍ pausa la ejecución
  const resultado = await fetch('/api/datos')
  console.log("Después de fetch") // Se ejecuta solo cuando fetch termina
  
  const datos = await resultado.json()
  console.log("Después de json") // Se ejecuta solo cuando json termina
  
  return datos
}

// Ejecución:
// "Inicio"
// (pausa hasta que fetch termine)
// "Después de fetch"
// (pausa hasta que json termine)
// "Después de json"
```

## **Ejemplos de tu código**

### **Ejemplo 1 - useFetch (CON await)**
```jsx
// src/hooks/useFetch.js
const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    
    // await pausa aquí hasta que la API responda
    const result = await fetchFunction()
    setData(result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

**¿Por qué usa await?**
- Necesita **esperar** a que la API responda
- Debe **pausar** la ejecución hasta tener los datos
- Quiere **manejar errores** de forma secuencial

### **Ejemplo 2 - AuthContext (CON await)**
```jsx
// src/context/AuthContext.jsx
const login = async (email, password, rememberMe = false) => {
  dispatch({ type: "AUTH_START" })
  try {
    // await pausa aquí hasta que la API responda
    const response = await api.login(email, password)
    
    // Solo se ejecuta después de que login termine
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("auth_token", response.token)
    storage.setItem("auth_user", JSON.stringify(response.user))
    
    dispatch({
      type: "AUTH_SUCCESS",
      payload: response,
    })
    return response
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    })
    throw error
  }
}
```

**¿Por qué usa await?**
- Necesita **esperar** a que el login termine
- Debe **pausar** hasta tener la respuesta de la API
- Quiere **procesar** la respuesta antes de continuar

### **Ejemplo 3 - Función async SIN await (hipotética)**
```jsx
// Ejemplo de función async sin await
const getConfiguracion = async () => {
  // No usa await, solo devuelve una Promise
  return {
    apiUrl: process.env.REACT_APP_API_URL,
    version: "1.0.0",
    features: ["auth", "cart", "products"]
  }
}

// Uso
const config = await getConfiguracion()
// O
getConfiguracion().then(config => {
  console.log(config)
})
```

**¿Por qué es async sin await?**
- **Consistencia**: Mantiene la misma API que otras funciones
- **Futuro**: Puede que más tarde necesite operaciones asíncronas
- **Interfaz**: Los consumidores pueden usar `await` o `.then()`

## **Casos de Uso**

### **Función async SIN await - Usar cuando:**
- **Solo devuelves datos síncronos** pero quieres consistencia
- **Planeas agregar await más tarde**
- **Quieres que los consumidores usen await**
- **No necesitas pausar la ejecución**

```jsx
const getUsuarioActual = async () => {
  // Datos síncronos, pero función async para consistencia
  return {
    id: 1,
    nombre: "Juan",
    email: "juan@email.com"
  }
}
```

### **Función async CON await - Usar cuando:**
- **Necesitas esperar operaciones asíncronas**
- **Quieres manejar errores secuencialmente**
- **Tienes dependencias entre operaciones**
- **Necesitas pausar la ejecución**

```jsx
const cargarDatosUsuario = async (userId) => {
  try {
    // Esperar a que termine
    const usuario = await api.getUsuario(userId)
    
    // Esperar a que termine (depende del usuario)
    const productos = await api.getProductosUsuario(usuario.id)
    
    // Esperar a que termine (depende de los productos)
    const categorias = await api.getCategoriasProductos(productos)
    
    return { usuario, productos, categorias }
  } catch (error) {
    throw new Error(`Error cargando datos: ${error.message}`)
  }
}
```

## **Resumen de Diferencias**

| Aspecto | async SIN await | async CON await |
|---------|-----------------|-----------------|
| **Ejecución** | Síncrona | Asíncrona (pausa en await) |
| **Devuelve** | Promise inmediatamente | Promise que se resuelve cuando termina |
| **Uso de await** | No pausa nada | Pausa en cada await |
| **Casos de uso** | Datos síncronos, consistencia | Operaciones asíncronas, APIs |
| **Manejo de errores** | try/catch no necesario | try/catch recomendado |
| **Performance** | Más rápido | Más lento (espera operaciones) |

## **Ejemplo Final - Comparación**

```jsx
// ❌ async SIN await - Confuso
const cargarDatos = async () => {
  const promesa = fetch('/api/datos')
  console.log("Esto se ejecuta inmediatamente")
  return promesa // Devuelve Promise, no datos
}

// ✅ async CON await - Claro
const cargarDatos = async () => {
  const respuesta = await fetch('/api/datos')
  const datos = await respuesta.json()
  console.log("Esto se ejecuta después de cargar datos")
  return datos // Devuelve los datos reales
}

// Uso
const datos = await cargarDatos() // Funciona correctamente
```

**En resumen:**
- **async sin await**: Función que devuelve Promise pero no pausa
- **async con await**: Función que pausa en cada await para esperar operaciones asíncronas

¿Te gustaría que profundice en algún aspecto específico o tienes alguna pregunta sobre cuándo usar cada uno?

```javascriptreact
// Función async SIN await
const miFuncionAsync = async () => {
  console.log("Paso 1")
  console.log("Paso 2")
  console.log("Paso 3")
  return "Resultado"
}

// Uso
miFuncionAsync().then(resultado => {
  console.log(resultado) // "Resultado"
})

// O con await
const resultado = await miFuncionAsync()
console.log(resultado) // "Resultado"
```

```javascriptreact
const resultado = miFuncionAsync()
console.log(resultado) // Promise { "Resultado" }
```

```javascriptreact
// Función async CON await
const miFuncionAsyncConAwait = async () => {
  console.log("Paso 1")
  
  // Pausa aquí hasta que la Promise se resuelva
  const resultado = await fetch('/api/datos')
  console.log("Paso 2 - después de fetch")
  
  // Pausa aquí hasta que la Promise se resuelva
  const datos = await resultado.json()
  console.log("Paso 3 - después de json")
  
  return datos
}
```

```javascriptreact
const funcionSinAwait = async () => {
  console.log("Inicio")
  
  // Esto NO pausa la ejecución
  const promesa = fetch('/api/datos')
  console.log("Después de fetch") // Se ejecuta inmediatamente
  
  return promesa
}

// Ejecución:
// "Inicio"
// "Después de fetch"
// (la Promise se devuelve sin esperar)
```

```javascriptreact
const funcionConAwait = async () => {
  console.log("Inicio")
  
  // Esto SÍ pausa la ejecución
  const resultado = await fetch('/api/datos')
  console.log("Después de fetch") // Se ejecuta solo cuando fetch termina
  
  const datos = await resultado.json()
  console.log("Después de json") // Se ejecuta solo cuando json termina
  
  return datos
}

// Ejecución:
// "Inicio"
// (pausa hasta que fetch termine)
// "Después de fetch"
// (pausa hasta que json termine)
// "Después de json"
```

```javascriptreact
// src/hooks/useFetch.js
const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    
    // await pausa aquí hasta que la API responda
    const result = await fetchFunction()
    setData(result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

```javascriptreact
// src/context/AuthContext.jsx
const login = async (email, password, rememberMe = false) => {
  dispatch({ type: "AUTH_START" })
  try {
    // await pausa aquí hasta que la API responda
    const response = await api.login(email, password)
    
    // Solo se ejecuta después de que login termine
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("auth_token", response.token)
    storage.setItem("auth_user", JSON.stringify(response.user))
    
    dispatch({
      type: "AUTH_SUCCESS",
      payload: response,
    })
    return response
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    })
    throw error
  }
}
```

```javascriptreact
// Ejemplo de función async sin await
const getConfiguracion = async () => {
  // No usa await, solo devuelve una Promise
  return {
    apiUrl: process.env.REACT_APP_API_URL,
    version: "1.0.0",
    features: ["auth", "cart", "products"]
  }
}

// Uso
const config = await getConfiguracion()
// O
getConfiguracion().then(config => {
  console.log(config)
})
```

```javascriptreact
const getUsuarioActual = async () => {
  // Datos síncronos, pero función async para consistencia
  return {
    id: 1,
    nombre: "Juan",
    email: "juan@email.com"
  }
}
```

```javascriptreact
const cargarDatosUsuario = async (userId) => {
  try {
    // Esperar a que termine
    const usuario = await api.getUsuario(userId)
    
    // Esperar a que termine (depende del usuario)
    const productos = await api.getProductosUsuario(usuario.id)
    
    // Esperar a que termine (depende de los productos)
    const categorias = await api.getCategoriasProductos(productos)
    
    return { usuario, productos, categorias }
  } catch (error) {
    throw new Error(`Error cargando datos: ${error.message}`)
  }
}
```

```javascriptreact
// ❌ async SIN await - Confuso
const cargarDatos = async () => {
  const promesa = fetch('/api/datos')
  console.log("Esto se ejecuta inmediatamente")
  return promesa // Devuelve Promise, no datos
}

// ✅ async CON await - Claro
const cargarDatos = async () => {
  const respuesta = await fetch('/api/datos')
  const datos = await respuesta.json()
  console.log("Esto se ejecuta después de cargar datos")
  return datos // Devuelve los datos reales
}

// Uso
const datos = await cargarDatos() // Funciona correctamente
```

---

**User**

Qué son los toasts?

---

**Cursor**

Te explico qué son los **toasts** y cómo funcionan en tu proyecto. Primero voy a revisar tu implementación específica:


## **¿Qué son los Toasts?**

Los **toasts** son notificaciones temporales que aparecen en la pantalla para informar al usuario sobre el resultado de una acción. Son como "pop-ups" pequeños que:

- **Aparecen automáticamente** cuando ocurre algo
- **Desaparecen solos** después de unos segundos
- **No interrumpen** el flujo de trabajo del usuario
- **Proporcionan feedback visual** inmediato

## **Características de los Toasts**

### **1. Temporales**
- Se muestran por un tiempo limitado (en tu caso, 3 segundos)
- Desaparecen automáticamente
- No requieren interacción del usuario

### **2. No intrusivos**
- No bloquean la interfaz
- Aparecen en una esquina de la pantalla
- El usuario puede seguir trabajando normalmente

### **3. Informativos**
- Muestran mensajes de éxito, error, o información
- Proporcionan feedback inmediato
- Ayudan al usuario a entender qué pasó

## **Tipos de Toasts en tu proyecto**

### **1. Success (Éxito)**
```jsx
const { success } = useToast()
success("Producto agregado al carrito")
```

### **2. Error (Error)**
```jsx
const { error } = useToast()
error("Error al cargar los productos")
```

### **3. Info (Información)**
```jsx
const { info } = useToast()
info("Buscando productos...")
```

## **Cómo funciona tu implementación**

### **1. Contexto de Toasts**
```jsx
// src/context/ToastContext.jsx
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]) // Array de toasts activos
  
  const addToast = (message, type = "info") => {
    const id = Date.now() // ID único basado en timestamp
    const toast = { id, message, type }
    setToasts((prev) => [...prev, toast]) // Agregar nuevo toast
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }
  
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }
  
  // Funciones de conveniencia
  const value = {
    toasts,
    addToast,
    removeToast,
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    info: (message) => addToast(message, "info"),
  }
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}
```

### **2. Componente de Visualización**
```jsx
const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} flex items-center justify-between min-w-80`}>
          <span>{toast.message}</span>
          <button onClick={() => onRemove(toast.id)} className="ml-4 text-lg font-bold opacity-70 hover:opacity-100">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
```

## **Ejemplos de uso en tu proyecto**

### **Ejemplo 1 - Login exitoso** (`src/pages/Login.jsx`)
```jsx
const { success, error } = useToast()

const handleSubmit = async (e) => {
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente") // Toast de éxito
      navigate("/")
    }
  } catch (err) {
    error(err.message) // Toast de error
  }
}
```

### **Ejemplo 2 - Agregar al carrito** (`src/components/ProductCard.jsx`)
```jsx
const { success, error } = useToast()

const handleAddToCart = () => {
  try {
    addToCart(product)
    success("Producto agregado al carrito") // Toast de éxito
  } catch (err) {
    error("Error al agregar el producto") // Toast de error
  }
}
```

### **Ejemplo 3 - Checkout** (`src/pages/Cart.jsx`)
```jsx
const { success, error } = useToast()

const handleCheckout = () => {
  if (items.length === 0) {
    error("El carrito está vacío") // Toast de error
    return
  }
  
  // ... lógica de checkout
  clearCart()
  success("Compra realizada exitosamente") // Toast de éxito
}
```

## **Ventajas de los Toasts**

### **1. Feedback inmediato**
- El usuario sabe inmediatamente si su acción fue exitosa
- No necesita buscar en la interfaz para ver el resultado

### **2. No interrumpe el flujo**
- El usuario puede seguir trabajando
- No bloquea la interfaz como un modal

### **3. Fácil de implementar**
- Un solo hook `useToast()` en cualquier componente
- Funciones simples: `success()`, `error()`, `info()`

### **4. Consistente**
- Todos los toasts se ven igual
- Mismo comportamiento en toda la aplicación

## **Comparación con otras notificaciones**

| Tipo | Cuándo usar | Duración | Interacción |
|------|-------------|----------|-------------|
| **Toast** | Feedback inmediato | 3-5 segundos | Opcional (cerrar) |
| **Modal** | Confirmación importante | Hasta que el usuario responda | Requerida |
| **Alert** | Error crítico | Hasta que el usuario lo cierre | Requerida |
| **Banner** | Información persistente | Hasta que el usuario lo cierre | Requerida |

## **Mejores prácticas para Toasts**

### **1. Mensajes claros y concisos**
```jsx
// ❌ Malo
success("OK")

// ✅ Bueno
success("Producto agregado al carrito")
```

### **2. Usar el tipo correcto**
```jsx
// ✅ Éxito
success("Operación completada")

// ✅ Error
error("Error al procesar la solicitud")

// ✅ Información
info("Cargando datos...")
```

### **3. No abusar de los toasts**
```jsx
// ❌ Malo - demasiados toasts
success("Datos cargados")
success("Filtros aplicados")
success("Vista actualizada")

// ✅ Bueno - solo cuando es necesario
success("Filtros aplicados exitosamente")
```

## **Personalización de Toasts**

### **Estilos CSS** (probablemente en tu `global.css`)
```css
.toast {
  @apply px-4 py-3 rounded-lg shadow-lg border;
}

.toast-success {
  @apply bg-green-100 border-green-300 text-green-800;
}

.toast-error {
  @apply bg-red-100 border-red-300 text-red-800;
}

.toast-info {
  @apply bg-blue-100 border-blue-300 text-blue-800;
}
```

### **Posicionamiento**
```jsx
// En ToastContainer
<div className="fixed top-4 right-4 z-50 space-y-2">
  {/* Toasts aparecen en la esquina superior derecha */}
</div>
```

## **Resumen**

Los **toasts** en tu proyecto son:

- **Notificaciones temporales** que aparecen en la esquina superior derecha
- **Se muestran por 3 segundos** y desaparecen automáticamente
- **Proporcionan feedback inmediato** sobre acciones del usuario
- **No interrumpen** el flujo de trabajo
- **Fáciles de usar** con el hook `useToast()`
- **Consistentes** en toda la aplicación

Son perfectos para confirmar acciones exitosas, mostrar errores, o informar al usuario sobre el estado de la aplicación sin ser intrusivos.

¿Te gustaría que profundice en algún aspecto específico de los toasts o tienes alguna pregunta sobre su implementación?

```javascriptreact
const { success } = useToast()
success("Producto agregado al carrito")
```

```javascriptreact
const { error } = useToast()
error("Error al cargar los productos")
```

```javascriptreact
const { info } = useToast()
info("Buscando productos...")
```

```javascriptreact
// src/context/ToastContext.jsx
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]) // Array de toasts activos
  
  const addToast = (message, type = "info") => {
    const id = Date.now() // ID único basado en timestamp
    const toast = { id, message, type }
    setToasts((prev) => [...prev, toast]) // Agregar nuevo toast
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }
  
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }
  
  // Funciones de conveniencia
  const value = {
    toasts,
    addToast,
    removeToast,
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    info: (message) => addToast(message, "info"),
  }
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}
```

```javascriptreact
const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} flex items-center justify-between min-w-80`}>
          <span>{toast.message}</span>
          <button onClick={() => onRemove(toast.id)} className="ml-4 text-lg font-bold opacity-70 hover:opacity-100">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
```

```javascriptreact
const { success, error } = useToast()

const handleSubmit = async (e) => {
  try {
    if (isLoginMode) {
      await login(formData.email, formData.password, rememberMe)
      navigate("/")
    } else {
      await register(formData, rememberMe)
      success("Cuenta creada exitosamente") // Toast de éxito
      navigate("/")
    }
  } catch (err) {
    error(err.message) // Toast de error
  }
}
```

```javascriptreact
const { success, error } = useToast()

const handleAddToCart = () => {
  try {
    addToCart(product)
    success("Producto agregado al carrito") // Toast de éxito
  } catch (err) {
    error("Error al agregar el producto") // Toast de error
  }
}
```

```javascriptreact
const { success, error } = useToast()

const handleCheckout = () => {
  if (items.length === 0) {
    error("El carrito está vacío") // Toast de error
    return
  }
  
  // ... lógica de checkout
  clearCart()
  success("Compra realizada exitosamente") // Toast de éxito
}
```

```javascriptreact
// ❌ Malo
success("OK")

// ✅ Bueno
success("Producto agregado al carrito")
```

```javascriptreact
// ✅ Éxito
success("Operación completada")

// ✅ Error
error("Error al procesar la solicitud")

// ✅ Información
info("Cargando datos...")
```

```javascriptreact
// ❌ Malo - demasiados toasts
success("Datos cargados")
success("Filtros aplicados")
success("Vista actualizada")

// ✅ Bueno - solo cuando es necesario
success("Filtros aplicados exitosamente")
```

```css
.toast {
  @apply px-4 py-3 rounded-lg shadow-lg border;
}

.toast-success {
  @apply bg-green-100 border-green-300 text-green-800;
}

.toast-error {
  @apply bg-red-100 border-red-300 text-red-800;
}

.toast-info {
  @apply bg-blue-100 border-blue-300 text-blue-800;
}
```

```javascriptreact
// En ToastContainer
<div className="fixed top-4 right-4 z-50 space-y-2">
  {/* Toasts aparecen en la esquina superior derecha */}
</div>
```

---

**User**

Que es una Promise? Y por que es un objeto?

---

**Cursor**

Te explico qué es una **Promise** y por qué es un objeto en JavaScript:

## **¿Qué es una Promise?**

Una **Promise** es un objeto que representa el resultado eventual de una operación asíncrona. Es como un "vale" que promete darte un resultado en el futuro, pero no necesariamente ahora.

### **Analogía del mundo real:**
Imagina que vas a un restaurante y pides comida:
- **Promise** = El ticket que te dan (promesa de que te traerán la comida)
- **Pending** = Estás esperando (la comida se está preparando)
- **Fulfilled** = Te traen la comida (la promesa se cumplió)
- **Rejected** = Te dicen que no tienen ingredientes (la promesa se rechazó)

## **¿Por qué es un objeto?**

### **1. Tiene propiedades y métodos**
```jsx
const miPromesa = fetch('/api/datos')

console.log(miPromesa) // Promise { <pending> }
console.log(typeof miPromesa) // "object"

// Propiedades
console.log(miPromesa.state) // "pending", "fulfilled", o "rejected"

// Métodos
miPromesa.then(resultado => console.log(resultado))
miPromesa.catch(error => console.error(error))
miPromesa.finally(() => console.log("Terminó"))
```

### **2. Se puede pasar como parámetro**
```jsx
function procesarPromesa(promesa) {
  return promesa.then(datos => datos.toUpperCase())
}

const promesa = fetch('/api/datos')
procesarPromesa(promesa)
```

### **3. Se puede almacenar en variables**
```jsx
const promesa1 = fetch('/api/usuarios')
const promesa2 = fetch('/api/productos')
const promesa3 = fetch('/api/categorias')

// Se pueden combinar
Promise.all([promesa1, promesa2, promesa3])
```

## **Estados de una Promise**

### **1. Pending (Pendiente)**
```jsx
const promesa = fetch('/api/datos')
console.log(promesa) // Promise { <pending> }
```

### **2. Fulfilled (Cumplida)**
```jsx
const promesa = fetch('/api/datos')
promesa.then(resultado => {
  console.log(promesa) // Promise { <fulfilled> }
  console.log(resultado) // Los datos de la API
})
```

### **3. Rejected (Rechazada)**
```jsx
const promesa = fetch('/api/datos-inexistente')
promesa.catch(error => {
  console.log(promesa) // Promise { <rejected> }
  console.log(error) // Error de la API
})
```

## **Ejemplos de tu código**

### **Ejemplo 1 - useFetch con Promises**
```jsx
// src/hooks/useFetch.js
const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    
    // fetch() devuelve una Promise
    const result = await fetchFunction() // Esta función devuelve una Promise
    setData(result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

**¿Qué pasa aquí?**
1. `fetchFunction()` devuelve una **Promise**
2. `await` espera a que la Promise se resuelva
3. Si se resuelve exitosamente, `result` contiene los datos
4. Si se rechaza, se ejecuta el `catch`

### **Ejemplo 2 - AuthContext con Promises**
```jsx
// src/context/AuthContext.jsx
const login = async (email, password, rememberMe = false) => {
  dispatch({ type: "AUTH_START" })
  try {
    // api.login() devuelve una Promise
    const response = await api.login(email, password)
    
    // Solo se ejecuta si la Promise se resuelve exitosamente
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("auth_token", response.token)
    storage.setItem("auth_user", JSON.stringify(response.user))
    
    dispatch({
      type: "AUTH_SUCCESS",
      payload: response,
    })
    return response
  } catch (error) {
    // Se ejecuta si la Promise se rechaza
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    })
    throw error
  }
}
```

## **¿Por qué las Promises son objetos?**

### **1. Tienen estado interno**
```jsx
const promesa = new Promise((resolve, reject) => {
  // Estado interno: pending
  setTimeout(() => {
    resolve("¡Éxito!") // Cambia a fulfilled
  }, 1000)
})

console.log(promesa) // Promise { <pending> }
```

### **2. Tienen métodos**
```jsx
const promesa = fetch('/api/datos')

// Métodos de la Promise
promesa.then(resultado => console.log(resultado))
promesa.catch(error => console.error(error))
promesa.finally(() => console.log("Terminó"))
```

### **3. Se pueden encadenar**
```jsx
const promesa = fetch('/api/datos')
  .then(response => response.json()) // Devuelve otra Promise
  .then(data => data.usuarios) // Devuelve otra Promise
  .then(usuarios => usuarios.map(u => u.nombre)) // Devuelve otra Promise
  .catch(error => console.error(error))
```

## **Crear una Promise**

### **Sintaxis básica:**
```jsx
const miPromesa = new Promise((resolve, reject) => {
  // Código asíncrono aquí
  if (exito) {
    resolve("Resultado exitoso")
  } else {
    reject("Error ocurrido")
  }
})
```

### **Ejemplo práctico:**
```jsx
const cargarDatos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5
      if (exito) {
        resolve({ datos: "Información cargada" })
      } else {
        reject(new Error("Error al cargar datos"))
      }
    }, 2000)
  })
}

// Uso
cargarDatos()
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error))
```

## **Métodos de Promise**

### **1. .then() - Cuando se resuelve**
```jsx
const promesa = fetch('/api/datos')
promesa.then(response => {
  console.log("Promise resuelta:", response)
  return response.json()
})
```

### **2. .catch() - Cuando se rechaza**
```jsx
const promesa = fetch('/api/datos')
promesa.catch(error => {
  console.error("Promise rechazada:", error)
})
```

### **3. .finally() - Siempre se ejecuta**
```jsx
const promesa = fetch('/api/datos')
promesa.finally(() => {
  console.log("Promise terminó (exitosa o con error)")
})
```

### **4. Promise.all() - Múltiples Promises**
```jsx
const promesa1 = fetch('/api/usuarios')
const promesa2 = fetch('/api/productos')
const promesa3 = fetch('/api/categorias')

Promise.all([promesa1, promesa2, promesa3])
  .then(([usuarios, productos, categorias]) => {
    console.log("Todas las Promises se resolvieron")
    console.log(usuarios, productos, categorias)
  })
  .catch(error => {
    console.error("Alguna Promise falló:", error)
  })
```

## **¿Por qué usar Promises?**

### **1. Evitan el "Callback Hell"**
```jsx
// ❌ Con callbacks (difícil de leer)
getData(function(data) {
  processData(data, function(processed) {
    saveData(processed, function(saved) {
      console.log("Terminó")
    })
  })
})

// ✅ Con Promises (fácil de leer)
getData()
  .then(processData)
  .then(saveData)
  .then(() => console.log("Terminó"))
```

### **2. Manejo de errores centralizado**
```jsx
// ❌ Con callbacks (múltiples try/catch)
try {
  getData(function(data) {
    try {
      processData(data, function(processed) {
        try {
          saveData(processed, function(saved) {
            console.log("Terminó")
          })
        } catch (error) {
          console.error("Error en saveData:", error)
        }
      })
    } catch (error) {
      console.error("Error en processData:", error)
    }
  })
} catch (error) {
  console.error("Error en getData:", error)
}

// ✅ Con Promises (un solo catch)
getData()
  .then(processData)
  .then(saveData)
  .then(() => console.log("Terminó"))
  .catch(error => console.error("Error:", error))
```

## **Promises vs async/await**

### **Con Promises:**
```jsx
const cargarDatos = () => {
  return fetch('/api/datos')
    .then(response => response.json())
    .then(data => {
      console.log("Datos cargados:", data)
      return data
    })
    .catch(error => {
      console.error("Error:", error)
      throw error
    })
}
```

### **Con async/await:**
```jsx
const cargarDatos = async () => {
  try {
    const response = await fetch('/api/datos')
    const data = await response.json()
    console.log("Datos cargados:", data)
    return data
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
```

## **Resumen**

**Promise** es un objeto porque:

1. **Tiene propiedades** (estado, valor)
2. **Tiene métodos** (.then(), .catch(), .finally())
3. **Se puede pasar como parámetro**
4. **Se puede almacenar en variables**
5. **Se puede encadenar** con otras Promises
6. **Mantiene estado interno** (pending, fulfilled, rejected)

**¿Por qué es útil?**
- **Maneja operaciones asíncronas** de forma elegante
- **Evita el callback hell**
- **Permite encadenar operaciones**
- **Manejo de errores centralizado**
- **Se integra perfectamente** con async/await

En tu proyecto, las Promises se usan principalmente para:
- Llamadas a APIs (fetch)
- Operaciones de autenticación
- Carga de datos
- Operaciones del carrito

¿Te gustaría que profundice en algún aspecto específico de las Promises o tienes alguna pregunta sobre su implementación?

```javascriptreact
const miPromesa = fetch('/api/datos')

console.log(miPromesa) // Promise { <pending> }
console.log(typeof miPromesa) // "object"

// Propiedades
console.log(miPromesa.state) // "pending", "fulfilled", o "rejected"

// Métodos
miPromesa.then(resultado => console.log(resultado))
miPromesa.catch(error => console.error(error))
miPromesa.finally(() => console.log("Terminó"))
```

```javascriptreact
function procesarPromesa(promesa) {
  return promesa.then(datos => datos.toUpperCase())
}

const promesa = fetch('/api/datos')
procesarPromesa(promesa)
```

```javascriptreact
const promesa1 = fetch('/api/usuarios')
const promesa2 = fetch('/api/productos')
const promesa3 = fetch('/api/categorias')

// Se pueden combinar
Promise.all([promesa1, promesa2, promesa3])
```

```javascriptreact
const promesa = fetch('/api/datos')
console.log(promesa) // Promise { <pending> }
```

```javascriptreact
const promesa = fetch('/api/datos')
promesa.then(resultado => {
  console.log(promesa) // Promise { <fulfilled> }
  console.log(resultado) // Los datos de la API
})
```

```javascriptreact
const promesa = fetch('/api/datos-inexistente')
promesa.catch(error => {
  console.log(promesa) // Promise { <rejected> }
  console.log(error) // Error de la API
})
```

```javascriptreact
// src/hooks/useFetch.js
const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    
    // fetch() devuelve una Promise
    const result = await fetchFunction() // Esta función devuelve una Promise
    setData(result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

```javascriptreact
// src/context/AuthContext.jsx
const login = async (email, password, rememberMe = false) => {
  dispatch({ type: "AUTH_START" })
  try {
    // api.login() devuelve una Promise
    const response = await api.login(email, password)
    
    // Solo se ejecuta si la Promise se resuelve exitosamente
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("auth_token", response.token)
    storage.setItem("auth_user", JSON.stringify(response.user))
    
    dispatch({
      type: "AUTH_SUCCESS",
      payload: response,
    })
    return response
  } catch (error) {
    // Se ejecuta si la Promise se rechaza
    dispatch({
      type: "AUTH_ERROR",
      payload: error.message,
    })
    throw error
  }
}
```

```javascriptreact
const promesa = new Promise((resolve, reject) => {
  // Estado interno: pending
  setTimeout(() => {
    resolve("¡Éxito!") // Cambia a fulfilled
  }, 1000)
})

console.log(promesa) // Promise { <pending> }
```

```javascriptreact
const promesa = fetch('/api/datos')

// Métodos de la Promise
promesa.then(resultado => console.log(resultado))
promesa.catch(error => console.error(error))
promesa.finally(() => console.log("Terminó"))
```

```javascriptreact
const promesa = fetch('/api/datos')
  .then(response => response.json()) // Devuelve otra Promise
  .then(data => data.usuarios) // Devuelve otra Promise
  .then(usuarios => usuarios.map(u => u.nombre)) // Devuelve otra Promise
  .catch(error => console.error(error))
```

```javascriptreact
const miPromesa = new Promise((resolve, reject) => {
  // Código asíncrono aquí
  if (exito) {
    resolve("Resultado exitoso")
  } else {
    reject("Error ocurrido")
  }
})
```

```javascriptreact
const cargarDatos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5
      if (exito) {
        resolve({ datos: "Información cargada" })
      } else {
        reject(new Error("Error al cargar datos"))
      }
    }, 2000)
  })
}

// Uso
cargarDatos()
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error))
```

```javascriptreact
const promesa = fetch('/api/datos')
promesa.then(response => {
  console.log("Promise resuelta:", response)
  return response.json()
})
```

```javascriptreact
const promesa = fetch('/api/datos')
promesa.catch(error => {
  console.error("Promise rechazada:", error)
})
```

```javascriptreact
const promesa = fetch('/api/datos')
promesa.finally(() => {
  console.log("Promise terminó (exitosa o con error)")
})
```

```javascriptreact
const promesa1 = fetch('/api/usuarios')
const promesa2 = fetch('/api/productos')
const promesa3 = fetch('/api/categorias')

Promise.all([promesa1, promesa2, promesa3])
  .then(([usuarios, productos, categorias]) => {
    console.log("Todas las Promises se resolvieron")
    console.log(usuarios, productos, categorias)
  })
  .catch(error => {
    console.error("Alguna Promise falló:", error)
  })
```

```javascriptreact
// ❌ Con callbacks (difícil de leer)
getData(function(data) {
  processData(data, function(processed) {
    saveData(processed, function(saved) {
      console.log("Terminó")
    })
  })
})

// ✅ Con Promises (fácil de leer)
getData()
  .then(processData)
  .then(saveData)
  .then(() => console.log("Terminó"))
```

```javascriptreact
// ❌ Con callbacks (múltiples try/catch)
try {
  getData(function(data) {
    try {
      processData(data, function(processed) {
        try {
          saveData(processed, function(saved) {
            console.log("Terminó")
          })
        } catch (error) {
          console.error("Error en saveData:", error)
        }
      })
    } catch (error) {
      console.error("Error en processData:", error)
    }
  })
} catch (error) {
  console.error("Error en getData:", error)
}

// ✅ Con Promises (un solo catch)
getData()
  .then(processData)
  .then(saveData)
  .then(() => console.log("Terminó"))
  .catch(error => console.error("Error:", error))
```

```javascriptreact
const cargarDatos = () => {
  return fetch('/api/datos')
    .then(response => response.json())
    .then(data => {
      console.log("Datos cargados:", data)
      return data
    })
    .catch(error => {
      console.error("Error:", error)
      throw error
    })
}
```

```javascriptreact
const cargarDatos = async () => {
  try {
    const response = await fetch('/api/datos')
    const data = await response.json()
    console.log("Datos cargados:", data)
    return data
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
```

---

**User**

Explicame el useEffect, qué es, cómo se usa y donde lo utilizamos?

---

**Cursor**

Te explico **useEffect** de manera detallada con ejemplos específicos de tu proyecto:

## **¿Qué es useEffect?**

`useEffect` es un hook de React que te permite **ejecutar código después de que el componente se renderiza** o cuando ciertas dependencias cambian. Es el lugar perfecto para manejar **efectos secundarios** como:

- Llamadas a APIs
- Configurar suscripciones
- Limpiar recursos
- Actualizar el DOM
- Sincronizar con sistemas externos

## **Sintaxis básica**

```jsx
useEffect(() => {
  // Código del efecto
  return () => {
    // Función de limpieza (opcional)
  }
}, [dependencias]) // Array de dependencias (opcional)
```

## **Tipos de useEffect**

### **1. Sin dependencias - Se ejecuta en cada render**
```jsx
useEffect(() => {
  console.log("Se ejecuta en cada render")
})
```

### **2. Con array vacío - Solo al montar**
```jsx
useEffect(() => {
  console.log("Solo se ejecuta al montar el componente")
}, [])
```

### **3. Con dependencias - Cuando cambian las dependencias**
```jsx
useEffect(() => {
  console.log("Se ejecuta cuando 'count' cambia")
}, [count])
```

## **Ejemplos de tu código**

### **Ejemplo 1 - Restaurar carrito al cargar la app** (`src/context/CartContext.jsx`)

```jsx
// Restore cart from localStorage on app load
useEffect(() => {
  const savedCart = localStorage.getItem("cart_items")
  if (savedCart) {
    dispatch({
      type: "RESTORE_CART",
      payload: JSON.parse(savedCart),
    })
  }
}, []) // Array vacío = solo al montar
```

**¿Qué hace?**
- Se ejecuta **una sola vez** cuando el componente se monta
- Restaura el carrito guardado en localStorage
- Si no hay carrito guardado, no hace nada
- **¿Por qué array vacío?** Porque solo queremos que se ejecute al cargar la app

### **Ejemplo 2 - Guardar carrito cuando cambia** (`src/context/CartContext.jsx`)

```jsx
// Save cart to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("cart_items", JSON.stringify(state.items))
}, [state.items]) // Se ejecuta cuando cambia state.items
```

**¿Qué hace?**
- Se ejecuta cada vez que `state.items` cambia
- Guarda automáticamente el carrito en localStorage
- Mantiene la persistencia del carrito entre sesiones
- **¿Por qué `[state.items]`?** Porque queremos que se ejecute cada vez que el carrito cambie

### **Ejemplo 3 - Restaurar sesión de usuario** (`src/context/AuthContext.jsx`)

```jsx
// Restore session on app load
useEffect(() => {
  const restoreSession = () => {
    try {
      // Intentar localStorage primero (remember me)
      let token = localStorage.getItem("auth_token")
      let user = localStorage.getItem("auth_user")
      let storageType = "localStorage"
      
      // Si no hay localStorage, intentar sessionStorage
      if (!token || !user) {
        token = sessionStorage.getItem("auth_token")
        user = sessionStorage.getItem("auth_user")
        storageType = "sessionStorage"
      }
      
      if (token && user) {
        try {
          const userData = JSON.parse(user)
          
          // Validación de datos del usuario
          if (userData && userData.id && userData.email) {
            const userCopy = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role || 'user'
            }
            
            dispatch({
              type: "AUTH_RESTORE",
              payload: { token, user: userCopy, storageType },
            })
          } else {
            clearAllStorage()
          }
        } catch (parseError) {
          clearAllStorage()
        }
      }
    } catch (error) {
      clearAllStorage()
    }
  }
  
  const clearAllStorage = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
  }
  
  restoreSession()
}, []) // Solo al montar
```

**¿Qué hace?**
- Se ejecuta **una sola vez** al cargar la app
- Intenta restaurar la sesión del usuario
- Verifica localStorage primero (si el usuario marcó "recordarme")
- Si no encuentra nada, intenta sessionStorage
- Valida que los datos del usuario sean correctos
- Si hay errores, limpia todo el almacenamiento

### **Ejemplo 4 - Actualizar productos filtrados** (`src/pages/Home.jsx`)

```jsx
useEffect(() => {
  if (products) {
    setFilteredProducts(products)
    setCurrentPage(1) // Reset a la primera página cuando cambian los filtros
  }
}, [products]) // Se ejecuta cuando cambia products
```

**¿Qué hace?**
- Se ejecuta cuando `products` cambia (nuevos datos de la API)
- Actualiza la lista de productos filtrados
- Resetea la página actual a la primera página
- Evita que el usuario esté en una página que ya no existe

### **Ejemplo 5 - useFetch con useEffect** (`src/hooks/useFetch.js`)

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, dependencies) // Se ejecuta cuando cambian las dependencias
```

**¿Qué hace?**
- Se ejecuta cuando cambian las dependencias
- Hace la llamada a la API
- Maneja los estados de loading, error y data
- Se puede reutilizar en cualquier componente

## **Función de limpieza (Cleanup)**

### **Ejemplo con limpieza** (`src/components/ProductCarousel.jsx`)

```jsx
useEffect(() => {
  let intervalId
  
  if (isAutoPlaying && products.length > 1) {
    intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)
  }
  
  // Función de limpieza
  return () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }
}, [isAutoPlaying, products.length])
```

**¿Qué hace?**
- Configura un timer para el carrusel automático
- La función de limpieza se ejecuta antes de que el componente se desmonte
- Limpia el timer para evitar memory leaks
- **¿Por qué es importante?** Evita que el timer siga ejecutándose después de que el componente se desmonte

## **Casos de uso comunes**

### **1. Llamadas a APIs**
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/datos')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    }
  }
  
  fetchData()
}, [])
```

### **2. Suscripciones a eventos**
```jsx
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

### **3. Actualizar el título de la página**
```jsx
useEffect(() => {
  document.title = `Producto: ${product.name}`
}, [product.name])
```

### **4. Sincronizar con localStorage**
```jsx
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

## **Errores comunes**

### **1. Dependencias faltantes**
```jsx
// ❌ MAL - puede causar bugs
useEffect(() => {
  setCount(count + 1)
}, []) // Falta 'count' en las dependencias

// ✅ BIEN
useEffect(() => {
  setCount(count + 1)
}, [count])
```

### **2. Efectos infinitos**
```jsx
// ❌ MAL - bucle infinito
useEffect(() => {
  setCount(count + 1)
}, [count]) // count cambia, se ejecuta de nuevo, count cambia...

// ✅ BIEN - usar función de actualización
useEffect(() => {
  setCount(prevCount => prevCount + 1)
}, [])
```

### **3. No limpiar recursos**
```jsx
// ❌ MAL - memory leak
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer ejecutándose...")
  }, 1000)
}, [])

// ✅ BIEN - limpiar recursos
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer ejecutándose...")
  }, 1000)
  
  return () => {
    clearInterval(timer)
  }
}, [])
```

## **Mejores prácticas**

### **1. Siempre incluye las dependencias**
```jsx
// Si usas una variable dentro del efecto, inclúyela en las dependencias
useEffect(() => {
  console.log(searchTerm)
}, [searchTerm])
```

### **2. Usa funciones de limpieza**
```jsx
useEffect(() => {
  const subscription = api.subscribe()
  
  return () => {
    subscription.unsubscribe()
  }
}, [])
```

### **3. Separa efectos que no están relacionados**
```jsx
// ❌ MAL - mezclar efectos
useEffect(() => {
  // Cargar datos
  fetchData()
  // Configurar timer
  const timer = setInterval(() => {}, 1000)
  
  return () => {
    clearInterval(timer)
  }
}, [])

// ✅ BIEN - separar efectos
useEffect(() => {
  fetchData()
}, [])

useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  
  return () => {
    clearInterval(timer)
  }
}, [])
```

### **4. Usa useCallback y useMemo para optimizar dependencias**
```jsx
const fetchData = useCallback(() => {
  return api.getData(searchTerm)
}, [searchTerm])

useEffect(() => {
  fetchData()
}, [fetchData])
```

## **Resumen**

**useEffect** es esencial en React porque:

- **Maneja efectos secundarios** de forma controlada
- **Se ejecuta en momentos específicos** del ciclo de vida
- **Permite limpiar recursos** para evitar memory leaks
- **Se integra perfectamente** con el sistema de dependencias de React
- **Es la forma recomendada** de hacer llamadas a APIs en React

**En tu proyecto se usa para:**
- Restaurar datos del localStorage
- Hacer llamadas a APIs
- Configurar timers y suscripciones
- Sincronizar estado con sistemas externos
- Limpiar recursos cuando el componente se desmonta

¿Te gustaría que profundice en algún aspecto específico de useEffect o tienes alguna pregunta sobre su implementación?

```javascriptreact
useEffect(() => {
  // Código del efecto
  return () => {
    // Función de limpieza (opcional)
  }
}, [dependencias]) // Array de dependencias (opcional)
```

```javascriptreact
useEffect(() => {
  console.log("Se ejecuta en cada render")
})
```

```javascriptreact
useEffect(() => {
  console.log("Solo se ejecuta al montar el componente")
}, [])
```

```javascriptreact
useEffect(() => {
  console.log("Se ejecuta cuando 'count' cambia")
}, [count])
```

```javascriptreact
// Restore cart from localStorage on app load
useEffect(() => {
  const savedCart = localStorage.getItem("cart_items")
  if (savedCart) {
    dispatch({
      type: "RESTORE_CART",
      payload: JSON.parse(savedCart),
    })
  }
}, []) // Array vacío = solo al montar
```

```javascriptreact
// Save cart to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("cart_items", JSON.stringify(state.items))
}, [state.items]) // Se ejecuta cuando cambia state.items
```

```javascriptreact
// Restore session on app load
useEffect(() => {
  const restoreSession = () => {
    try {
      // Intentar localStorage primero (remember me)
      let token = localStorage.getItem("auth_token")
      let user = localStorage.getItem("auth_user")
      let storageType = "localStorage"
      
      // Si no hay localStorage, intentar sessionStorage
      if (!token || !user) {
        token = sessionStorage.getItem("auth_token")
        user = sessionStorage.getItem("auth_user")
        storageType = "sessionStorage"
      }
      
      if (token && user) {
        try {
          const userData = JSON.parse(user)
          
          // Validación de datos del usuario
          if (userData && userData.id && userData.email) {
            const userCopy = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role || 'user'
            }
            
            dispatch({
              type: "AUTH_RESTORE",
              payload: { token, user: userCopy, storageType },
            })
          } else {
            clearAllStorage()
          }
        } catch (parseError) {
          clearAllStorage()
        }
      }
    } catch (error) {
      clearAllStorage()
    }
  }
  
  const clearAllStorage = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
  }
  
  restoreSession()
}, []) // Solo al montar
```

```javascriptreact
useEffect(() => {
  if (products) {
    setFilteredProducts(products)
    setCurrentPage(1) // Reset a la primera página cuando cambian los filtros
  }
}, [products]) // Se ejecuta cuando cambia products
```

```javascriptreact
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, dependencies) // Se ejecuta cuando cambian las dependencias
```

```javascriptreact
useEffect(() => {
  let intervalId
  
  if (isAutoPlaying && products.length > 1) {
    intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)
  }
  
  // Función de limpieza
  return () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }
}, [isAutoPlaying, products.length])
```

```javascriptreact
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/datos')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    }
  }
  
  fetchData()
}, [])
```

```javascriptreact
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

```javascriptreact
useEffect(() => {
  document.title = `Producto: ${product.name}`
}, [product.name])
```

```javascriptreact
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

```javascriptreact
// ❌ MAL - puede causar bugs
useEffect(() => {
  setCount(count + 1)
}, []) // Falta 'count' en las dependencias

// ✅ BIEN
useEffect(() => {
  setCount(count + 1)
}, [count])
```

```javascriptreact
// ❌ MAL - bucle infinito
useEffect(() => {
  setCount(count + 1)
}, [count]) // count cambia, se ejecuta de nuevo, count cambia...

// ✅ BIEN - usar función de actualización
useEffect(() => {
  setCount(prevCount => prevCount + 1)
}, [])
```

```javascriptreact
// ❌ MAL - memory leak
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer ejecutándose...")
  }, 1000)
}, [])

// ✅ BIEN - limpiar recursos
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer ejecutándose...")
  }, 1000)
  
  return () => {
    clearInterval(timer)
  }
}, [])
```

```javascriptreact
// Si usas una variable dentro del efecto, inclúyela en las dependencias
useEffect(() => {
  console.log(searchTerm)
}, [searchTerm])
```

```javascriptreact
useEffect(() => {
  const subscription = api.subscribe()
  
  return () => {
    subscription.unsubscribe()
  }
}, [])
```

```javascriptreact
// ❌ MAL - mezclar efectos
useEffect(() => {
  // Cargar datos
  fetchData()
  // Configurar timer
  const timer = setInterval(() => {}, 1000)
  
  return () => {
    clearInterval(timer)
  }
}, [])

// ✅ BIEN - separar efectos
useEffect(() => {
  fetchData()
}, [])

useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  
  return () => {
    clearInterval(timer)
  }
}, [])
```

```javascriptreact
const fetchData = useCallback(() => {
  return api.getData(searchTerm)
}, [searchTerm])

useEffect(() => {
  fetchData()
}, [fetchData])
```

---

**User**

Qué es prop drilling?

---

**Cursor**

Te explico qué es **prop drilling** y cómo se soluciona en tu proyecto:

## **¿Qué es Prop Drilling?**

**Prop drilling** es un problema en React donde tienes que **pasar props a través de múltiples componentes** que no necesitan esos datos, solo para llegar al componente que sí los necesita.

### **Analogía del mundo real:**
Imagina que tienes un paquete que debe llegar del **Piso 1** al **Piso 5**, pero el ascensor solo va del 1 al 3, y del 3 al 5. Entonces:
- Piso 1 → Piso 2 → Piso 3 → Piso 4 → Piso 5
- Cada piso intermedio debe "transportar" el paquete sin usarlo

## **Ejemplo de Prop Drilling**

### **Estructura de componentes:**
```
App
├── Header
│   ├── Navigation
│   └── UserMenu
├── MainContent
│   ├── Sidebar
│   └── ProductList
│       └── ProductCard
└── Footer
```

### **Sin Context (Prop Drilling):**
```jsx
// App.jsx
function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  
  return (
    <div>
      <Header user={user} cart={cart} />
      <MainContent user={user} cart={cart} />
      <Footer user={user} />
    </div>
  )
}

// Header.jsx
function Header({ user, cart }) {
  return (
    <header>
      <Navigation user={user} cart={cart} />
      <UserMenu user={user} />
    </header>
  )
}

// Navigation.jsx
function Navigation({ user, cart }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  )
}

// MainContent.jsx
function MainContent({ user, cart }) {
  return (
    <main>
      <Sidebar user={user} />
      <ProductList user={user} cart={cart} />
    </main>
  )
}

// ProductList.jsx
function ProductList({ user, cart }) {
  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          user={user} 
          cart={cart} 
        />
      ))}
    </div>
  )
}

// ProductCard.jsx
function ProductCard({ product, user, cart }) {
  const addToCart = () => {
    // Finalmente usamos cart aquí
    setCart([...cart, product])
  }
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}
```

### **Problemas del Prop Drilling:**

1. **Código repetitivo**: Cada componente intermedio debe recibir y pasar las props
2. **Difícil de mantener**: Si cambias la estructura, debes actualizar muchos componentes
3. **Props innecesarias**: Los componentes intermedios reciben props que no usan
4. **Acoplamiento**: Los componentes están fuertemente acoplados
5. **Difícil de debuggear**: Es difícil rastrear de dónde vienen las props

## **Solución: Context API**

### **Con Context (Sin Prop Drilling):**
```jsx
// App.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div>
            <Header />
            <MainContent />
            <Footer />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

// Header.jsx
function Header() {
  return (
    <header>
      <Navigation />
      <UserMenu />
    </header>
  )
}

// Navigation.jsx
function Navigation() {
  const { cart } = useCart() // Acceso directo al contexto
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  )
}

// ProductCard.jsx
function ProductCard({ product }) {
  const { addToCart } = useCart() // Acceso directo al contexto
  
  const handleAddToCart = () => {
    addToCart(product) // Usar función del contexto
  }
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
```

## **Ejemplo de tu proyecto**

### **Sin Context (Prop Drilling):**
```jsx
// App.jsx
function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [toasts, setToasts] = useState([])
  
  return (
    <div>
      <Header 
        user={user} 
        cart={cart} 
        toasts={toasts}
        setUser={setUser}
        setCart={setCart}
        setToasts={setToasts}
      />
      <MainContent 
        user={user} 
        cart={cart} 
        toasts={toasts}
        setUser={setUser}
        setCart={setCart}
        setToasts={setToasts}
      />
    </div>
  )
}

// Header.jsx
function Header({ user, cart, toasts, setUser, setCart, setToasts }) {
  return (
    <header>
      <Navigation 
        user={user} 
        cart={cart} 
        toasts={toasts}
        setUser={setUser}
        setCart={setCart}
        setToasts={setToasts}
      />
      <UserMenu 
        user={user} 
        setUser={setUser}
        toasts={toasts}
        setToasts={setToasts}
      />
    </header>
  )
}

// Navigation.jsx
function Navigation({ user, cart, toasts, setUser, setCart, setToasts }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      <CartSummary 
        cart={cart} 
        setCart={setCart}
        toasts={toasts}
        setToasts={setToasts}
      />
    </nav>
  )
}

// CartSummary.jsx
function CartSummary({ cart, setCart, toasts, setToasts }) {
  const addToCart = (product) => {
    setCart([...cart, product])
    setToasts([...toasts, { message: "Producto agregado", type: "success" }])
  }
  
  return (
    <div>
      <span>Items: {cart.length}</span>
      <button onClick={() => addToCart(someProduct)}>Add Item</button>
    </div>
  )
}
```

### **Con Context (Sin Prop Drilling):**
```jsx
// App.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div>
            <Header />
            <MainContent />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

// Header.jsx
function Header() {
  return (
    <header>
      <Navigation />
      <UserMenu />
    </header>
  )
}

// Navigation.jsx
function Navigation() {
  const { getCartItemsCount } = useCart()
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({getCartItemsCount()})</Link>
      <CartSummary />
    </nav>
  )
}

// CartSummary.jsx
function CartSummary() {
  const { addToCart } = useCart()
  const { success } = useToast()
  
  const handleAddToCart = (product) => {
    addToCart(product)
    success("Producto agregado al carrito")
  }
  
  return (
    <div>
      <button onClick={() => handleAddToCart(someProduct)}>Add Item</button>
    </div>
  )
}
```

## **Ventajas de usar Context**

### **1. Elimina Prop Drilling**
- Los componentes acceden directamente a los datos que necesitan
- No necesitan recibir props que no usan

### **2. Código más limpio**
- Menos props en los componentes
- Funciones más simples y enfocadas

### **3. Fácil de mantener**
- Cambios en el estado se reflejan automáticamente
- No necesitas actualizar múltiples componentes

### **4. Mejor separación de responsabilidades**
- Cada contexto maneja su propio estado
- Los componentes se enfocan en su funcionalidad

## **Cuándo usar Context vs Props**

### **Usar Props cuando:**
- Los datos se usan en **pocos componentes**
- Los componentes están **cerca** en el árbol
- Los datos son **específicos** del componente padre

```jsx
// ✅ Bueno para props
function ProductCard({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  )
}
```

### **Usar Context cuando:**
- Los datos se usan en **muchos componentes**
- Los componentes están **lejos** en el árbol
- Los datos son **globales** de la aplicación

```jsx
// ✅ Bueno para context
function ProductCard({ product }) {
  const { addToCart } = useCart() // Acceso global
  const { success } = useToast() // Acceso global
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}
```

## **Resumen**

**Prop Drilling** es un problema donde:
- Tienes que pasar props a través de múltiples componentes
- Los componentes intermedios reciben props que no usan
- El código se vuelve repetitivo y difícil de mantener

**Context API** es la solución porque:
- Elimina la necesidad de pasar props manualmente
- Los componentes acceden directamente a los datos que necesitan
- El código es más limpio y mantenible
- Mejor separación de responsabilidades

**En tu proyecto:**
- `AuthContext` maneja la autenticación globalmente
- `CartContext` maneja el carrito globalmente
- `ToastContext` maneja las notificaciones globalmente
- Los componentes acceden directamente con hooks como `useAuth()`, `useCart()`, `useToast()`

¿Te gustaría que profundice en algún aspecto específico del Context API o tienes alguna pregunta sobre su implementación?

```plaintext
App
├── Header
│   ├── Navigation
│   └── UserMenu
├── MainContent
│   ├── Sidebar
│   └── ProductList
│       └── ProductCard
└── Footer
```

```javascriptreact
// App.jsx
function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  
  return (
    <div>
      <Header user={user} cart={cart} />
      <MainContent user={user} cart={cart} />
      <Footer user={user} />
    </div>
  )
}

// Header.jsx
function Header({ user, cart }) {
  return (
    <header>
      <Navigation user={user} cart={cart} />
      <UserMenu user={user} />
    </header>
  )
}

// Navigation.jsx
function Navigation({ user, cart }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  )
}

// MainContent.jsx
function MainContent({ user, cart }) {
  return (
    <main>
      <Sidebar user={user} />
      <ProductList user={user} cart={cart} />
    </main>
  )
}

// ProductList.jsx
function ProductList({ user, cart }) {
  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          user={user} 
          cart={cart} 
        />
      ))}
    </div>
  )
}

// ProductCard.jsx
function ProductCard({ product, user, cart }) {
  const addToCart = () => {
    // Finalmente usamos cart aquí
    setCart([...cart, product])
  }
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}
```

```javascriptreact
// App.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div>
            <Header />
            <MainContent />
            <Footer />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

// Header.jsx
function Header() {
  return (
    <header>
      <Navigation />
      <UserMenu />
    </header>
  )
}

// Navigation.jsx
function Navigation() {
  const { cart } = useCart() // Acceso directo al contexto
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  )
}

// ProductCard.jsx
function ProductCard({ product }) {
  const { addToCart } = useCart() // Acceso directo al contexto
  
  const handleAddToCart = () => {
    addToCart(product) // Usar función del contexto
  }
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
```

```javascriptreact
// App.jsx
function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [toasts, setToasts] = useState([])
  
  return (
    <div>
      <Header 
        user={user} 
        cart={cart} 
        toasts={toasts}
        setUser={setUser}
        setCart={setCart}
        setToasts={setToasts}
      />
      <MainContent 
        user={user} 
        cart={cart} 
        toasts={toasts}
        setUser={setUser}
        setCart={setCart}
        setToasts={setToasts}
      />
    </div>
  )
}

// Header.jsx
function Header({ user, cart, toasts, setUser, setCart, setToasts }) {
  return (
    <header>
      <Navigation 
        user={user} 
        cart={cart} 
        toasts={toasts}
        setUser={setUser}
        setCart={setCart}
        setToasts={setToasts}
      />
      <UserMenu 
        user={user} 
        setUser={setUser}
        toasts={toasts}
        setToasts={setToasts}
      />
    </header>
  )
}

// Navigation.jsx
function Navigation({ user, cart, toasts, setUser, setCart, setToasts }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      <CartSummary 
        cart={cart} 
        setCart={setCart}
        toasts={toasts}
        setToasts={setToasts}
      />
    </nav>
  )
}

// CartSummary.jsx
function CartSummary({ cart, setCart, toasts, setToasts }) {
  const addToCart = (product) => {
    setCart([...cart, product])
    setToasts([...toasts, { message: "Producto agregado", type: "success" }])
  }
  
  return (
    <div>
      <span>Items: {cart.length}</span>
      <button onClick={() => addToCart(someProduct)}>Add Item</button>
    </div>
  )
}
```

```javascriptreact
// App.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div>
            <Header />
            <MainContent />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

// Header.jsx
function Header() {
  return (
    <header>
      <Navigation />
      <UserMenu />
    </header>
  )
}

// Navigation.jsx
function Navigation() {
  const { getCartItemsCount } = useCart()
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({getCartItemsCount()})</Link>
      <CartSummary />
    </nav>
  )
}

// CartSummary.jsx
function CartSummary() {
  const { addToCart } = useCart()
  const { success } = useToast()
  
  const handleAddToCart = (product) => {
    addToCart(product)
    success("Producto agregado al carrito")
  }
  
  return (
    <div>
      <button onClick={() => handleAddToCart(someProduct)}>Add Item</button>
    </div>
  )
}
```

```javascriptreact
// ✅ Bueno para props
function ProductCard({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  )
}
```

```javascriptreact
// ✅ Bueno para context
function ProductCard({ product }) {
  const { addToCart } = useCart() // Acceso global
  const { success } = useToast() // Acceso global
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}
```

