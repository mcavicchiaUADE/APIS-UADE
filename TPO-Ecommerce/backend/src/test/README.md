# Tests Unitarios - Ecommerce Backend

Este directorio contiene la suite completa de tests unitarios implementados con **JUnit 5** y **Mockito**.

## 📁 Estructura de Tests

```
src/test/java/com/ecommerce/
├── service/
│   ├── ProductoServiceTest.java      ✅ 11 tests
│   ├── CategoriaServiceTest.java      ✅ 7 tests
│   ├── UsuarioServiceTest.java        ✅ 11 tests
│   └── PedidoServiceTest.java         ✅ 7 tests
├── controller/
│   ├── ProductoControllerTest.java    ✅ 6 tests
│   ├── CategoriaControllerTest.java   ✅ 6 tests
│   └── AuthControllerTest.java        ✅ 8 tests
└── util/
    └── JwtUtilTest.java               ✅ 10 tests

Total: 66 tests unitarios
```

## 🛠️ Tecnologías Utilizadas

- **JUnit 5** - Framework de testing
- **Mockito** - Mocking framework
- **MockitoExtension** - Integración con JUnit 5

## 📊 Cobertura de Tests

### Servicios (36 tests)
- ✅ **ProductoService** - Operaciones CRUD, búsquedas, validaciones
- ✅ **CategoriaService** - Operaciones CRUD, validaciones de existencia
- ✅ **UsuarioService** - Gestión de usuarios, encriptación de contraseñas, búsquedas
- ✅ **PedidoService** - Creación de pedidos, validación de stock, gestión de estados

### Controladores (20 tests)
- ✅ **ProductoController** - Endpoints REST, respuestas HTTP correctas
- ✅ **CategoriaController** - Endpoints REST, manejo de excepciones
- ✅ **AuthController** - Login, registro, validación de tokens JWT

### Utilidades (10 tests)
- ✅ **JwtUtil** - Generación y validación de tokens JWT

## 🚀 Ejecutar Tests

### Ejecutar todos los tests
```bash
cd backend
mvn test
```

### Ejecutar tests de un paquete específico
```bash
mvn test -Dtest=ProductoServiceTest
```

### Ejecutar un test específico
```bash
mvn test -Dtest=ProductoServiceTest#testObtenerTodosLosProductos
```

### Ejecutar tests con cobertura
```bash
mvn test jacoco:report
```

## 📝 Características de los Tests

### ✅ Buenas Prácticas Implementadas

1. **Arrange-Act-Assert (AAA)** - Estructura clara en todos los tests
2. **@DisplayName** - Nombres descriptivos en español para cada test
3. **@BeforeEach** - Setup de datos de prueba reutilizable
4. **Mocking apropiado** - Solo se mockean dependencias externas
5. **Verificación de comportamientos** - Uso de `verify()` para validar llamadas
6. **Tests de casos límite** - Incluyen casos de éxito y fallo

### 🎯 Tipos de Tests Incluidos

- **Tests de éxito** - Validan comportamiento normal
- **Tests de error** - Validan manejo de excepciones
- **Tests de casos límite** - Validan valores nulos, vacíos, inexistentes
- **Tests de validación** - Validan reglas de negocio

## 📋 Ejemplos de Tests

### Test de Servicio
```java
@Test
@DisplayName("Debería obtener todos los productos")
void testObtenerTodosLosProductos() {
    // Arrange
    List<Producto> productos = Arrays.asList(producto);
    when(productoRepository.findAll()).thenReturn(productos);

    // Act
    List<Producto> resultado = productoService.obtenerTodosLosProductos();

    // Assert
    assertNotNull(resultado);
    assertEquals(1, resultado.size());
    verify(productoRepository, times(1)).findAll();
}
```

### Test de Controlador
```java
@Test
@DisplayName("Debería crear un nuevo producto")
void testCrearProducto() {
    // Arrange
    when(productoService.crearProducto(any(Producto.class))).thenReturn(producto);

    // Act
    ResponseEntity<ProductoDTO> respuesta = productoController.crearProducto(producto);

    // Assert
    assertEquals(HttpStatus.CREATED, respuesta.getStatusCode());
    assertNotNull(respuesta.getBody());
}
```

## ✅ Checklist de Validación

- [x] Tests para todos los servicios principales
- [x] Tests para todos los controladores principales
- [x] Tests para utilidades (JWT)
- [x] Tests de casos de éxito
- [x] Tests de casos de error
- [x] Tests de validaciones
- [x] Uso correcto de mocks
- [x] Verificación de llamadas con `verify()`
- [x] Nombres descriptivos con `@DisplayName`
- [x] Estructura AAA (Arrange-Act-Assert)

## 📈 Mejoras Futuras

- [ ] Tests de integración
- [ ] Tests de repositorios con base de datos en memoria (H2)
- [ ] Tests de SecurityConfig
- [ ] Cobertura de código con JaCoCo
- [ ] Tests de performance

## 🔧 Configuración

Los tests utilizan las dependencias ya configuradas en `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

Esta dependencia incluye:
- JUnit 5
- Mockito
- AssertJ
- Hamcrest

---

**Total de tests implementados: 66** ✅

