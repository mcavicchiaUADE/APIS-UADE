# 🔍 Pokédex Simple - PokeAPI

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semántico-orange.svg)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue.svg)](https://developer.mozilla.org/es/docs/Web/CSS)
[![API](https://img.shields.io/badge/API-PokeAPI-green.svg)](https://pokeapi.co/)
[![Status](https://img.shields.io/badge/Status-Completado-brightgreen.svg)](https://github.com/bautistabozzer/Clase03Ejercicio)

Una aplicación web completa que consume la **PokeAPI** para explorar, buscar y filtrar Pokémon con interfaz moderna y responsive. Desarrollada como ejercicio de APIs para la Clase 03.

## 🚀 Demo en Vivo

**Abre el archivo `index.html` en tu navegador para probar la aplicación**

## 📁 Estructura del Proyecto

```
Clase03Ejercicio/
├── 📄 index.html          # Estructura HTML principal
├── 🎨 styles.css          # Estilos CSS responsive
├── ⚙️  config.js          # Configuración de endpoints API
├── 🔄 state.js            # Estado global de la aplicación
├── 🌐 api.js              # Funciones de API y fetch
├── 🖥️  ui.js              # Funciones de interfaz y renderizado
├── 🧠 app.js              # Lógica principal y event listeners
└── 📖 README.md           # Documentación del proyecto
```

## ✨ Características Principales

### 🔍 **Búsqueda Inteligente**
- ✅ Búsqueda por nombre exacto con manejo de errores 404
- ✅ Filtro por tipo con 18 tipos Pokémon estándar
- ✅ Búsqueda combinada (nombre + tipo)
- ✅ Debounce de 300ms para búsquedas en tiempo real

### 📱 **Interfaz Responsive**
- ✅ Diseño adaptable de 1 a 4 columnas según ancho de pantalla
- ✅ Grid fluido con CSS Grid y Flexbox
- ✅ Colores de tipos auténticos para cada elemento Pokémon
- ✅ Modal centrado con overlay para detalles

### 🔄 **Navegación y Paginación**
- ✅ Paginación con límites configurables (12, 20, 50 por página)
- ✅ Navegación intuitiva entre páginas
- ✅ Límites personalizables según preferencia del usuario

### 📊 **Información Detallada**
- ✅ Modal de detalles con sprites, stats y habilidades
- ✅ Estadísticas completas (HP, Attack, Defense, etc.)
- ✅ Características físicas (altura, peso)
- ✅ Lista de habilidades del Pokémon

## 🏗️ Arquitectura Modular

La aplicación está diseñada con una **arquitectura modular** para mejor mantenibilidad y escalabilidad:

### **Módulos JavaScript:**

| Módulo | Responsabilidad | Descripción |
|--------|----------------|-------------|
| **`config.js`** | Configuración | Endpoints de la API y constantes |
| **`state.js`** | Estado Global | Variables y estado de la aplicación |
| **`api.js`** | Comunicación API | Todas las funciones de fetch y consumo |
| **`ui.js`** | Interfaz | Renderizado y manejo de elementos DOM |
| **`app.js`** | Controlador | Lógica principal y coordinación |

### **Flujo de Datos:**
```
Usuario → app.js → api.js → PokeAPI
                ↓
            ui.js ← state.js
```

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | Semántico | Estructura y accesibilidad |
| **CSS3** | Grid + Flexbox | Diseño responsive y layout |
| **JavaScript** | ES6+ | Lógica y consumo de API |
| **PokeAPI** | v2 | Datos de Pokémon sin autenticación |

### **Características JavaScript:**
- `async/await` para operaciones asíncronas
- `fetch()` para consumo de API
- `Promise.all()` para múltiples requests
- Arrow functions y destructuring
- Template literals para HTML dinámico

## 🌐 API - PokeAPI

### **Base URL:** `https://pokeapi.co/api/v2/`

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/pokemon?limit={n}&offset={m}` | GET | Listado paginado de Pokémon |
| `/pokemon/{name\|id}` | GET | Detalle completo del Pokémon |
| `/type` | GET | Lista de tipos disponibles |
| `/type/{name}` | GET | Pokémon de un tipo específico |

### **Ejemplo de Uso:**
```javascript
// Obtener lista de Pokémon
const pokemon = await fetchPokemonList(20, 0);

// Buscar Pokémon específico
const pikachu = await fetchPokemonByName('pikachu');

// Filtrar por tipo
const firePokemon = await fetchPokemonByType('fire');
```

## 🎯 Casos de Prueba

### **1. Búsqueda por Nombre Exitosa**
```
Entrada: "pikachu"
Resultado: Tarjeta con sprite, nombre, ID y tipos
Estado: ✅ Funcional
```

### **2. Filtro por Tipo**
```
Entrada: Seleccionar tipo "fire"
Resultado: Lista filtrada de Pokémon de fuego
Estado: ✅ Funcional
```

### **3. Búsqueda Inexistente**
```
Entrada: "nombreinexistente"
Resultado: Mensaje de error 404 claro
Estado: ✅ Funcional
```

### **4. Paginación**
```
Entrada: Cambiar límite a 50 por página
Resultado: Navegación fluida entre páginas
Estado: ✅ Funcional
```

## 🎨 Características de UI/UX

### **Diseño Responsive:**
- **Mobile (< 768px):** 1 columna
- **Tablet (768px - 1024px):** 2 columnas  
- **Desktop (> 1024px):** 3-4 columnas

### **Elementos Visuales:**
- **Badges de tipos:** Colores oficiales Pokémon
- **Estados visuales:** Loading, error, sin resultados
- **Transiciones:** Animaciones suaves en hover
- **Modal:** Overlay centrado con información detallada

### **Accesibilidad:**
- ARIA labels para lectores de pantalla
- Navegación por teclado
- Contraste adecuado en colores
- Textos descriptivos para elementos

## 📊 Funcionalidades de Búsqueda

### **Tipos de Búsqueda:**
1. **Simple por nombre:** Búsqueda exacta
2. **Filtro por tipo:** Solo por elemento
3. **Combinada:** Nombre + tipo (intersección)
4. **Paginación:** Navegación por páginas

### **Límites Configurables:**
- **12 Pokémon:** Carga rápida, ideal para móviles
- **20 Pokémon:** Balance entre velocidad y cantidad
- **50 Pokémon:** Máxima información por página

## 📱 Datos del Pokémon

### **Información Básica:**
- Nombre e ID único
- Sprite frontal oficial
- Tipos con badges de colores

### **Características Físicas:**
- Altura en metros
- Peso en kilogramos
- Categoría del Pokémon

### **Estadísticas de Batalla:**
- **HP:** Puntos de vida
- **Attack:** Ataque físico
- **Defense:** Defensa física
- **Special Attack:** Ataque especial
- **Special Defense:** Defensa especial
- **Speed:** Velocidad

### **Habilidades:**
- Lista completa de habilidades
- Información sobre habilidades ocultas
- Efectos y descripciones

## 🚀 Cómo Usar

### **Instalación:**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/bautistabozzer/Clase03Ejercicio.git
   cd Clase03Ejercicio
   ```

2. Abre `index.html` en tu navegador

### **Uso Básico:**
1. **Explorar:** Navega por las páginas de Pokémon
2. **Buscar:** Escribe el nombre exacto (ej: pikachu, charizard)
3. **Filtrar:** Selecciona un tipo para ver Pokémon de ese elemento
4. **Detalles:** Haz clic en cualquier tarjeta para abrir el modal

## 🔍 Funcionalidades Avanzadas

### **Debounce de Búsqueda:**
- Espera 300ms después de dejar de escribir
- Evita múltiples requests innecesarios
- Mejora el rendimiento de la aplicación

### **Manejo de Errores:**
- Errores 404 para Pokémon no encontrados
- Timeout para requests lentos
- Mensajes claros y amigables para el usuario

### **Cache de Datos:**
- Almacenamiento temporal de Pokémon consultados
- Reducción de requests repetidos
- Mejora en la velocidad de respuesta

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 👨‍💻 Autor

**Bautista Bozzer** - [GitHub](https://github.com/bautistabozzer)

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** 1,340+
- **Archivos:** 8
- **Tecnologías:** 4 principales
- **Endpoints API:** 4 utilizados
- **Tipos Pokémon:** 18 soportados

---
 
*🏫 Desarrollado para ejercicios de APIs - Clase 03*  
*🎯 Arquitectura modular para mejor mantenibilidad y organización del código*
