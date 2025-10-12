-- ============================================
-- Cargar Productos Adicionales (7-100)
-- ============================================
-- Ejecutar: Get-Content cargar-productos.sql | docker exec -i mysql-ecommerce mysql -u root -ppassword ecommerce_db
-- ============================================

USE ecommerce_db;

-- Nota: usuarios 2 y 3 ya existen (user1 y testuser)

-- Electrónicos (11-30) - asignar a usuario 2
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(11, 'Smartphone Nova X', 'Smartphone Nova X. Producto electrónico de alta calidad con excelente relación rendimiento/consumo.', 1282.45, 1, 1, 2, NOW()),
(12, 'Laptop AeroBook 14', 'Laptop AeroBook 14. Producto electrónico de alta calidad con excelente relación rendimiento/consumo.', 454.18, 6, 1, 2, NOW()),
(13, 'Auriculares Inalámbricos WavePods', 'Auriculares Inalámbricos WavePods. Producto electrónico de alta calidad.', 849.61, 5, 1, 2, NOW()),
(14, 'Monitor 27 QHD Vision', 'Monitor 27 QHD Vision. Producto electrónico de alta calidad.', 472.99, 38, 1, 2, NOW()),
(15, 'Smartwatch Pulse Pro', 'Smartwatch Pulse Pro. Producto electrónico de alta calidad.', 405.68, 34, 1, 2, NOW()),
(16, 'Tablet Orion 11', 'Tablet Orion 11. Producto electrónico de alta calidad.', 903.92, 17, 1, 2, NOW()),
(17, 'Cámara Mirrorless Alpha M', 'Cámara Mirrorless Alpha M. Producto electrónico de alta calidad.', 1613.57, 27, 1, 2, NOW()),
(18, 'Router Wi-Fi 6 TurboLink', 'Router Wi-Fi 6 TurboLink. Producto electrónico de alta calidad.', 319.39, 21, 1, 2, NOW()),
(19, 'Teclado Mecánico Hexa', 'Teclado Mecánico Hexa. Producto electrónico de alta calidad.', 766.05, 22, 1, 2, NOW()),
(20, 'Mouse Inalámbrico Vector', 'Mouse Inalámbrico Vector. Producto electrónico de alta calidad.', 536.39, 2, 1, 2, NOW()),
(21, 'Barra de Sonido CinemaOne', 'Barra de Sonido CinemaOne. Producto electrónico de alta calidad.', 258.39, 24, 1, 2, NOW()),
(22, 'SSD NVMe 1TB FlashMax', 'SSD NVMe 1TB FlashMax. Producto electrónico de alta calidad.', 593.41, 40, 1, 2, NOW()),
(23, 'Disco Externo 2TB SafeDrive', 'Disco Externo 2TB SafeDrive. Producto electrónico de alta calidad.', 392.64, 4, 1, 2, NOW()),
(24, 'Cargador GaN 65W NanoCharge', 'Cargador GaN 65W NanoCharge. Producto electrónico de alta calidad.', 463.51, 18, 1, 2, NOW()),
(25, 'Hub USB-C 8-en-1 Matrix', 'Hub USB-C 8-en-1 Matrix. Producto electrónico de alta calidad.', 473.24, 6, 1, 2, NOW()),
(26, 'Microfono USB Podcast Pro', 'Microfono USB Podcast Pro. Producto electrónico de alta calidad.', 912.28, 23, 1, 2, NOW()),
(27, 'Webcam 4K ClearView', 'Webcam 4K ClearView. Producto electrónico de alta calidad.', 716.98, 17, 1, 2, NOW()),
(28, 'Proyector LED HomeBeam', 'Proyector LED HomeBeam. Producto electrónico de alta calidad.', 1273.6, 34, 1, 2, NOW()),
(29, 'Dron SkyEye 4K', 'Dron SkyEye 4K. Producto electrónico de alta calidad.', 929.89, 17, 1, 2, NOW()),
(30, 'Impresora Láser Mono SpeedPrint', 'Impresora Láser Mono SpeedPrint. Producto electrónico de alta calidad.', 655.31, 3, 1, 2, NOW());

-- Ropa (31-40) - mezclar entre usuario 2 y 3
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(31, 'Remera Básica Algodón', 'Remera Básica Algodón. Prenda cómoda y resistente.', 73.87, 20, 2, 3, NOW()),
(32, 'Buzo Hoodie Urban', 'Buzo Hoodie Urban. Prenda cómoda y resistente.', 141.71, 36, 2, 3, NOW()),
(33, 'Campera Rompeviento Sport', 'Campera Rompeviento Sport. Prenda cómoda y resistente.', 1314.31, 25, 2, 3, NOW()),
(34, 'Pantalón Chino Classic', 'Pantalón Chino Classic. Prenda cómoda y resistente.', 537.1, 15, 2, 2, NOW()),
(35, 'Jean Slim Azul', 'Jean Slim Azul. Prenda cómoda y resistente.', 1173.32, 37, 2, 2, NOW()),
(36, 'Camisa Oxford Blanca', 'Camisa Oxford Blanca. Prenda cómoda y resistente.', 446.44, 8, 2, 3, NOW()),
(37, 'Zapatillas Urban Street', 'Zapatillas Urban Street. Prenda cómoda y resistente.', 1514, 7, 2, 2, NOW()),
(38, 'Short Deportivo DryFit', 'Short Deportivo DryFit. Prenda cómoda y resistente.', 328.35, 27, 2, 2, NOW()),
(39, 'Medias Pack x3 Comfort', 'Medias Pack x3 Comfort. Prenda cómoda y resistente.', 769.41, 29, 2, 3, NOW()),
(40, 'Gorra Snapback Black', 'Gorra Snapback Black. Prenda cómoda y resistente.', 1722.94, 12, 2, 2, NOW());

-- Hogar (41-60) - mezclar entre usuario 2 y 3
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(41, 'Sofá 3 Cuerpos Lino', 'Sofá 3 Cuerpos Lino. Elemento para el hogar moderno.', 1322.89, 35, 3, 2, NOW()),
(42, 'Lámpara de Pie Minimal', 'Lámpara de Pie Minimal. Elemento para el hogar moderno.', 1060.06, 38, 3, 3, NOW()),
(43, 'Mesa de Centro Roble', 'Mesa de Centro Roble. Elemento para el hogar moderno.', 1858.53, 12, 3, 3, NOW()),
(44, 'Silla Ergonómica Office', 'Silla Ergonómica Office. Elemento para el hogar moderno.', 1990.34, 23, 3, 2, NOW()),
(45, 'Cafetera Espresso HomeBar', 'Cafetera Espresso HomeBar. Elemento para el hogar moderno.', 1039.97, 7, 3, 2, NOW()),
(46, 'Aspiradora Ciclónica Pro', 'Aspiradora Ciclónica Pro. Elemento para el hogar moderno.', 137.4, 16, 3, 3, NOW()),
(47, 'Microondas 28L SmartHeat', 'Microondas 28L SmartHeat. Elemento para el hogar moderno.', 448.22, 4, 3, 2, NOW()),
(48, 'Batidora de Mano ChefMix', 'Batidora de Mano ChefMix. Elemento para el hogar moderno.', 144.12, 2, 3, 3, NOW()),
(49, 'Juego de Sábanas Queen', 'Juego de Sábanas Queen. Elemento para el hogar moderno.', 1033.16, 17, 3, 3, NOW()),
(50, 'Cortinas Blackout 2 Paneles', 'Cortinas Blackout 2 Paneles. Elemento para el hogar moderno.', 1083.07, 36, 3, 2, NOW()),
(51, 'Almohadas Viscoelásticas x2', 'Almohadas Viscoelásticas x2. Elemento para el hogar moderno.', 1571.38, 30, 3, 2, NOW()),
(52, 'Organizador de Ropa 6C', 'Organizador de Ropa 6C. Elemento para el hogar moderno.', 202.88, 27, 3, 3, NOW()),
(53, 'Juego de Ollas Acero 7p', 'Juego de Ollas Acero 7p. Elemento para el hogar moderno.', 828.08, 3, 3, 2, NOW()),
(54, 'Set Cuchillos Chef 6p', 'Set Cuchillos Chef 6p. Elemento para el hogar moderno.', 811.21, 21, 3, 2, NOW()),
(55, 'Parrilla Eléctrica GrillMax', 'Parrilla Eléctrica GrillMax. Elemento para el hogar moderno.', 391.25, 34, 3, 3, NOW()),
(56, 'Humidificador SilentAir', 'Humidificador SilentAir. Elemento para el hogar moderno.', 849.53, 17, 3, 3, NOW()),
(57, 'Purificador de Aire PureHome', 'Purificador de Aire PureHome. Elemento para el hogar moderno.', 1750.22, 4, 3, 2, NOW()),
(58, 'Espejo Redondo 60cm', 'Espejo Redondo 60cm. Elemento para el hogar moderno.', 1724.07, 35, 3, 2, NOW()),
(59, 'Estante Flotante Doble', 'Estante Flotante Doble. Elemento para el hogar moderno.', 1307.76, 34, 3, 2, NOW()),
(60, 'Ropero 2 Puertas Nordic', 'Ropero 2 Puertas Nordic. Elemento para el hogar moderno.', 1853.46, 15, 3, 3, NOW());

-- Deportes (61-80) - mezclar entre usuario 2 y 3
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(61, 'Pelota Fútbol Pro', 'Pelota Fútbol Pro. Artículo deportivo de calidad.', 976.42, 13, 4, 3, NOW()),
(62, 'Pelota Basket Outdoor', 'Pelota Basket Outdoor. Artículo deportivo de calidad.', 126.67, 24, 4, 2, NOW()),
(63, 'Raqueta Tenis Graphite', 'Raqueta Tenis Graphite. Artículo deportivo de calidad.', 537.74, 29, 4, 3, NOW()),
(64, 'Bicicleta MTB 29 TrailX', 'Bicicleta MTB 29 TrailX. Artículo deportivo de calidad.', 1396.21, 35, 4, 2, NOW()),
(65, 'Guantes Gym Grip', 'Guantes Gym Grip. Artículo deportivo de calidad.', 387.89, 13, 4, 2, NOW()),
(66, 'Colchoneta Yoga Antideslizante', 'Colchoneta Yoga Antideslizante. Artículo deportivo de calidad.', 1474.11, 3, 4, 3, NOW()),
(67, 'Mancuernas Ajustables 24kg', 'Mancuernas Ajustables 24kg. Artículo deportivo de calidad.', 109.77, 30, 4, 2, NOW()),
(68, 'Casco Ciclismo Aero', 'Casco Ciclismo Aero. Artículo deportivo de calidad.', 1921.94, 5, 4, 2, NOW()),
(69, 'Rollers Urban Glide', 'Rollers Urban Glide. Artículo deportivo de calidad.', 1194.11, 15, 4, 3, NOW()),
(70, 'Zapatillas Running Light', 'Zapatillas Running Light. Artículo deportivo de calidad.', 1883.77, 36, 4, 2, NOW()),
(71, 'Camiseta Ciclismo Dry', 'Camiseta Ciclismo Dry. Artículo deportivo de calidad.', 1193.08, 39, 4, 2, NOW()),
(72, 'Soga de Saltar Pro', 'Soga de Saltar Pro. Artículo deportivo de calidad.', 1318.16, 36, 4, 3, NOW()),
(73, 'Proteína Whey 2lb Vainilla', 'Proteína Whey 2lb Vainilla. Artículo deportivo de calidad.', 528.91, 20, 4, 2, NOW()),
(74, 'Set Bandas Elásticas 5p', 'Set Bandas Elásticas 5p. Artículo deportivo de calidad.', 797.6, 19, 4, 3, NOW()),
(75, 'Gafas Natación Anti-Fog', 'Gafas Natación Anti-Fog. Artículo deportivo de calidad.', 1858.74, 4, 4, 2, NOW()),
(76, 'Pelota Vóley Beach', 'Pelota Vóley Beach. Artículo deportivo de calidad.', 1246.1, 36, 4, 2, NOW()),
(77, 'Paleta Pádel Carbon', 'Paleta Pádel Carbon. Artículo deportivo de calidad.', 1079.88, 32, 4, 3, NOW()),
(78, 'Botella Térmica 1L', 'Botella Térmica 1L. Artículo deportivo de calidad.', 1867.18, 4, 4, 2, NOW()),
(79, 'Protector Bucal Boxeo', 'Protector Bucal Boxeo. Artículo deportivo de calidad.', 577.11, 28, 4, 3, NOW()),
(80, 'Bolso Deportivo 40L', 'Bolso Deportivo 40L. Artículo deportivo de calidad.', 1967.86, 33, 4, 2, NOW());

-- Libros (81-100) - mezclar entre usuario 2 y 3
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(81, 'Introducción a la Programación en Python', 'Libro recomendado, edición en español.', 1636.03, 19, 5, 2, NOW()),
(82, 'Algoritmos y Estructuras de Datos', 'Libro recomendado, edición en español.', 1757.46, 15, 5, 2, NOW()),
(83, 'Bases de Datos Relacionales: SQL Práctico', 'Libro recomendado, edición en español.', 222.99, 35, 5, 3, NOW()),
(84, 'Diseño de Sistemas con UML', 'Libro recomendado, edición en español.', 570.68, 13, 5, 3, NOW()),
(85, 'Redes de Computadoras Fundamentos', 'Libro recomendado, edición en español.', 1378.11, 16, 5, 2, NOW()),
(86, 'Ingeniería de Software Moderna', 'Libro recomendado, edición en español.', 1811.61, 3, 5, 2, NOW()),
(87, 'Arquitectura de Computadoras', 'Libro recomendado, edición en español.', 852.91, 29, 5, 3, NOW()),
(88, 'Criptografía y Seguridad', 'Libro recomendado, edición en español.', 673.77, 8, 5, 3, NOW()),
(89, 'Machine Learning para Principiantes', 'Libro recomendado, edición en español.', 1485.04, 35, 5, 2, NOW()),
(90, 'Sistemas Operativos: Conceptos', 'Libro recomendado, edición en español.', 29.23, 4, 5, 2, NOW()),
(91, 'Clean Code (Ed. Español)', 'Libro recomendado, edición en español.', 81.69, 23, 5, 2, NOW()),
(92, 'El Arte de la Guerra', 'Libro recomendado, edición en español.', 263.61, 19, 5, 3, NOW()),
(93, 'Cien Años de Soledad', 'Libro recomendado, edición en español.', 1866.84, 2, 5, 3, NOW()),
(94, 'Don Quijote de la Mancha', 'Libro recomendado, edición en español.', 1367.3, 6, 5, 2, NOW()),
(95, 'El Principito (Ed. Ilustrada)', 'Libro recomendado, edición en español.', 1124.16, 26, 5, 2, NOW()),
(96, 'Hábitos Atómicos', 'Libro recomendado, edición en español.', 1860.45, 10, 5, 2, NOW()),
(97, 'Sapiens: De Animales a Dioses', 'Libro recomendado, edición en español.', 830.46, 11, 5, 3, NOW()),
(98, 'Kafka en la Orilla', 'Libro recomendado, edición en español.', 1862.31, 15, 5, 3, NOW()),
(99, 'Fundación (Asimov)', 'Libro recomendado, edición en español.', 1576.87, 6, 5, 2, NOW()),
(100, 'Rayuela', 'Libro recomendado, edición en español.', 87.05, 30, 5, 2, NOW());

-- Cargar imágenes (picsum)
INSERT INTO producto_imagenes (producto_id, imagen_url)
SELECT id, CONCAT('https://picsum.photos/seed/product', id, '/800/600')
FROM productos
WHERE id >= 11 AND id <= 100;

-- Verificación
SELECT '✅ Productos cargados exitosamente!' AS resultado;
SELECT COUNT(*) as total_productos FROM productos;
SELECT c.nombre AS categoria, COUNT(p.id) AS total
FROM categorias c
LEFT JOIN productos p ON c.id = p.category_id
GROUP BY c.id, c.nombre;

