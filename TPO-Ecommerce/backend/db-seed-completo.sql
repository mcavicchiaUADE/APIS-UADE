-- ============================================
-- SCRIPT COMPLETO DE SEED - MARKETPLACE E-COMMERCE
-- ============================================
-- 
-- INSTRUCCIONES DE USO:
-- 
-- Opción 1 - Desde PowerShell (Windows):
--   Get-Content db-seed-completo.sql | docker exec -i mysql-ecommerce mysql -u root -ppassword ecommerce_db
-- 
-- Opción 2 - Desde Bash/Terminal (Linux/Mac):
--   docker exec -i mysql-ecommerce mysql -u root -ppassword ecommerce_db < db-seed-completo.sql
-- 
-- Opción 3 - Desde MySQL Workbench:
--   Copiar y pegar todo el contenido de este archivo y ejecutar
-- 
-- ============================================

USE ecommerce_db;

-- ============================================
-- PASO 1: LIMPIAR DATOS EXISTENTES
-- ============================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE detalle_pedidos;
TRUNCATE TABLE pedidos;
TRUNCATE TABLE producto_imagenes;
TRUNCATE TABLE productos;
TRUNCATE TABLE categorias;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- PASO 2: MIGRACIÓN MARKETPLACE - AGREGAR COLUMNAS
-- ============================================

-- 1. Agregar columna vendedor_id a la tabla detalle_pedidos (si no existe)
SET @dbname = DATABASE();
SET @tablename = 'detalle_pedidos';
SET @columnname = 'vendedor_id';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' BIGINT')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 2. Agregar columna estado_item a la tabla detalle_pedidos (si no existe)
SET @columnname = 'estado_item';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(50) NOT NULL DEFAULT "PENDIENTE"')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 3. Actualizar enums para incluir todos los estados del marketplace
ALTER TABLE pedidos 
MODIFY COLUMN estado ENUM(
    'PENDIENTE','CONFIRMADO','PREPARANDO','ENVIADO','EN_TRANSITO',
    'ENTREGADO','CANCELADO','CANCELADO_COMPRADOR','CANCELADO_VENDEDOR',
    'DEVOLUCION_SOLICITADA','DEVUELTO'
) NOT NULL DEFAULT 'PENDIENTE';

ALTER TABLE detalle_pedidos 
MODIFY COLUMN estado_item ENUM(
    'PENDIENTE','CONFIRMADO','PREPARANDO','ENVIADO','EN_TRANSITO',
    'ENTREGADO','CANCELADO','CANCELADO_COMPRADOR','CANCELADO_VENDEDOR',
    'DEVOLUCION_SOLICITADA','DEVUELTO'
) NOT NULL DEFAULT 'PENDIENTE';

-- ============================================
-- PASO 3: INSERTAR DATOS INICIALES
-- ============================================

-- USUARIOS
-- NOTA: Los usuarios de prueba se crean automáticamente al compilar el backend
-- No es necesario insertarlos manualmente aquí

-- CATEGORÍAS
INSERT INTO categorias (id, nombre, descripcion) VALUES
(1, 'Electrónicos', 'Dispositivos electrónicos y tecnología'),
(2, 'Ropa', 'Prendas de vestir y accesorios'),
(3, 'Hogar', 'Artículos para el hogar y decoración'),
(4, 'Deportes', 'Artículos deportivos y fitness'),
(5, 'Libros', 'Libros y material educativo');

-- PRODUCTOS (100 productos del db.json)
-- NOTA: owner_user_id se establecerá después de crear los usuarios
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
-- Productos iniciales (1-10)
(1, 'iPhone 15 Pro Max', 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP, pantalla Super Retina XDR de 6.7 pulgadas y hasta 1TB de almacenamiento. Incluye Dynamic Island y sistema de cámaras Pro.', 1299.99, 8, 1, NULL, '2024-01-15 10:30:00'),
(2, 'MacBook Air M2', 'Laptop ultradelgada con chip M2 de Apple, pantalla Liquid Retina de 13.6 pulgadas, hasta 24GB de memoria unificada y hasta 2TB de almacenamiento SSD. Hasta 18 horas de duración de batería.', 1199.99, 12, 1, NULL, '2024-01-15 10:30:00'),
(3, 'Nike Air Max 270', 'Zapatillas deportivas con tecnología Air Max, suela visible de 270 grados y diseño moderno. Perfectas para running y uso diario. Disponibles en múltiples colores.', 149.99, 20, 2, NULL, '2024-01-15 10:30:00'),
(5, 'Philips Hue White & Color Ambiance', 'Kit de iluminación inteligente con 3 bombillas LED que cambian de color, control por app y compatibilidad con Alexa y Google Assistant. Perfecto para crear ambientes únicos.', 199.99, 6, 3, NULL, '2024-01-15 10:30:00'),
(6, 'Sofá 3 Plazas Moderno', 'Sofá de 3 plazas con tapizado en tela gris, estructura de madera maciza y cojines desenfundables. Diseño moderno y cómodo para salas de estar contemporáneas.', 899.99, 3, 3, NULL, '2024-01-15 10:30:00'),
(7, 'Balón de Fútbol Adidas Al Rihla', 'Balón oficial de la Copa Mundial FIFA 2022, diseñado con tecnología aerodinámica avanzada y superficie texturizada para máximo control y precisión en el juego.', 89.99, 18, 4, NULL, '2024-01-15 10:30:00'),
(8, 'Pelota de Baloncesto Spalding NBA', 'Pelota oficial de la NBA con cuero premium, diseño clásico con líneas negras y naranja. Perfecta para jugadores profesionales y aficionados serios.', 69.99, 12, 4, NULL, '2024-01-15 10:30:00'),
(9, 'Don Quijote de la Mancha - Edición Anotada', 'Clásico de la literatura española de Miguel de Cervantes en edición anotada con prólogo de Francisco Rico. Incluye notas explicativas y contexto histórico.', 24.99, 25, 5, NULL, '2024-01-15 10:30:00'),
(10, 'Cien Años de Soledad - Gabriel García Márquez', 'Obra maestra del realismo mágico, ganadora del Premio Nobel de Literatura. La historia épica de la familia Buendía en el pueblo ficticio de Macondo.', 19.99, 30, 5, NULL, '2024-01-15 10:30:00'),

-- Electrónicos (11-30)
(11, 'Smartphone Nova X', 'Smartphone Nova X. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 1282.45, 1, 1, NULL, '2024-04-05 10:33:27'),
(12, 'Laptop AeroBook 14', 'Laptop AeroBook 14. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 454.18, 6, 1, NULL, '2024-08-17 15:47:20'),
(13, 'Auriculares Inalámbricos WavePods', 'Auriculares Inalámbricos WavePods. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 849.61, 0, 1, NULL, '2024-03-26 05:51:13'),
(14, 'Monitor 27'' QHD Vision', 'Monitor 27'' QHD Vision. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 472.99, 38, 1, NULL, '2024-08-06 07:10:59'),
(15, 'Smartwatch Pulse Pro', 'Smartwatch Pulse Pro. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 405.68, 34, 1, NULL, '2024-03-26 22:39:19'),
(16, 'Tablet Orion 11', 'Tablet Orion 11. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 903.92, 17, 1, NULL, '2024-10-22 00:35:50'),
(17, 'Cámara Mirrorless Alpha M', 'Cámara Mirrorless Alpha M. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 1613.57, 27, 1, NULL, '2024-04-18 05:56:55'),
(18, 'Router Wi‑Fi 6 TurboLink', 'Router Wi‑Fi 6 TurboLink. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 319.39, 21, 1, NULL, '2024-02-06 08:27:14'),
(19, 'Teclado Mecánico Hexa', 'Teclado Mecánico Hexa. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 766.05, 22, 1, NULL, '2024-08-22 19:08:04'),
(20, 'Mouse Inalámbrico Vector', 'Mouse Inalámbrico Vector. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 536.39, 2, 1, NULL, '2024-07-27 14:00:29'),
(21, 'Barra de Sonido CinemaOne', 'Barra de Sonido CinemaOne. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 258.39, 24, 1, NULL, '2024-08-02 17:23:29'),
(22, 'SSD NVMe 1TB FlashMax', 'SSD NVMe 1TB FlashMax. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 593.41, 40, 1, NULL, '2024-08-12 13:18:43'),
(23, 'Disco Externo 2TB SafeDrive', 'Disco Externo 2TB SafeDrive. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 392.64, 4, 1, NULL, '2024-09-14 03:25:15'),
(24, 'Cargador GaN 65W NanoCharge', 'Cargador GaN 65W NanoCharge. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 463.51, 18, 1, NULL, '2024-11-28 12:08:20'),
(25, 'Hub USB‑C 8‑en‑1 Matrix', 'Hub USB‑C 8‑en‑1 Matrix. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 473.24, 6, 1, NULL, '2024-04-18 06:54:06'),
(26, 'Microfono USB Podcast Pro', 'Microfono USB Podcast Pro. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 912.28, 23, 1, NULL, '2024-05-24 02:20:12'),
(27, 'Webcam 4K ClearView', 'Webcam 4K ClearView. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 716.98, 17, 1, NULL, '2024-08-24 21:30:44'),
(28, 'Proyector LED HomeBeam', 'Proyector LED HomeBeam. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 1273.6, 34, 1, NULL, '2024-03-04 19:01:17'),
(29, 'Dron SkyEye 4K', 'Dron SkyEye 4K. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 929.89, 17, 1, NULL, '2024-09-23 05:04:02'),
(30, 'Impresora Láser Mono SpeedPrint', 'Impresora Láser Mono SpeedPrint. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.', 655.31, 3, 1, NULL, '2024-11-15 11:45:19');

-- Ropa (31-40)
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(31, 'Remera Básica Algodón', 'Remera Básica Algodón. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 73.87, 20, 2, NULL, '2024-04-14 07:31:33'),
(32, 'Buzo Hoodie Urban', 'Buzo Hoodie Urban. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 141.71, 36, 2, NULL, '2024-03-23 21:49:22'),
(33, 'Campera Rompeviento Sport', 'Campera Rompeviento Sport. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 1314.31, 25, 2, NULL, '2024-02-25 19:39:35'),
(34, 'Pantalón Chino Classic', 'Pantalón Chino Classic. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 537.1, 15, 2, NULL, '2024-10-17 10:40:24'),
(35, 'Jean Slim Azul', 'Jean Slim Azul. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 1173.32, 37, 2, NULL, '2024-05-20 22:03:05'),
(36, 'Camisa Oxford Blanca', 'Camisa Oxford Blanca. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 446.44, 8, 2, NULL, '2024-02-05 15:20:13'),
(37, 'Zapatillas Urban Street', 'Zapatillas Urban Street. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 1514, 7, 2, NULL, '2024-09-01 00:13:15'),
(38, 'Short Deportivo DryFit', 'Short Deportivo DryFit. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 328.35, 27, 2, NULL, '2024-05-29 18:17:28'),
(39, 'Medias Pack x3 Comfort', 'Medias Pack x3 Comfort. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 769.41, 29, 2, NULL, '2024-08-03 04:26:20'),
(40, 'Gorra Snapback Black', 'Gorra Snapback Black. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.', 1722.94, 0, 2, NULL, '2024-09-22 02:00:04');

-- Hogar (41-60)
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(41, 'Sofá 3 Cuerpos Lino', 'Sofá 3 Cuerpos Lino. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1322.89, 35, 3, NULL, '2024-04-13 06:30:24'),
(42, 'Lámpara de Pie Minimal', 'Lámpara de Pie Minimal. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1060.06, 38, 3, NULL, '2024-03-23 14:06:08'),
(43, 'Mesa de Centro Roble', 'Mesa de Centro Roble. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1858.53, 12, 3, NULL, '2024-06-04 06:52:39'),
(44, 'Silla Ergonómica Office', 'Silla Ergonómica Office. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1990.34, 23, 3, NULL, '2024-12-15 17:00:39'),
(45, 'Cafetera Espresso HomeBar', 'Cafetera Espresso HomeBar. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1039.97, 7, 3, NULL, '2024-03-28 14:19:51'),
(46, 'Aspiradora Ciclónica Pro', 'Aspiradora Ciclónica Pro. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 137.4, 16, 3, NULL, '2024-08-16 20:39:33'),
(47, 'Microondas 28L SmartHeat', 'Microondas 28L SmartHeat. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 448.22, 4, 3, NULL, '2024-03-30 05:53:31'),
(48, 'Batidora de Mano ChefMix', 'Batidora de Mano ChefMix. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 144.12, 2, 3, NULL, '2024-01-28 20:26:18'),
(49, 'Juego de Sábanas Queen', 'Juego de Sábanas Queen. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1033.16, 17, 3, NULL, '2024-03-24 12:49:54'),
(50, 'Cortinas Blackout 2 Paneles', 'Cortinas Blackout 2 Paneles. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1083.07, 36, 3, NULL, '2024-04-04 16:53:54'),
(51, 'Almohadas Viscoelásticas x2', 'Almohadas Viscoelásticas x2. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1571.38, 30, 3, NULL, '2024-02-06 23:10:48'),
(52, 'Organizador de Ropa 6C', 'Organizador de Ropa 6C. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 202.88, 27, 3, NULL, '2024-06-13 20:02:20'),
(53, 'Juego de Ollas Acero 7p', 'Juego de Ollas Acero 7p. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 828.08, 3, 3, NULL, '2024-01-24 20:57:03'),
(54, 'Set Cuchillos Chef 6p', 'Set Cuchillos Chef 6p. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 811.21, 21, 3, NULL, '2024-04-06 21:38:42'),
(55, 'Parrilla Eléctrica GrillMax', 'Parrilla Eléctrica GrillMax. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 391.25, 34, 3, NULL, '2024-02-24 18:35:37'),
(56, 'Humidificador SilentAir', 'Humidificador SilentAir. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 849.53, 17, 3, NULL, '2024-04-07 08:21:53'),
(57, 'Purificador de Aire PureHome', 'Purificador de Aire PureHome. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1750.22, 4, 3, NULL, '2024-11-10 03:18:47'),
(58, 'Espejo Redondo 60cm', 'Espejo Redondo 60cm. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1724.07, 35, 3, NULL, '2024-01-20 23:31:02'),
(59, 'Estante Flotante Doble', 'Estante Flotante Doble. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1307.76, 34, 3, NULL, '2024-02-06 13:16:19'),
(60, 'Ropero 2 Puertas Nordic', 'Ropero 2 Puertas Nordic. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.', 1853.46, 15, 3, NULL, '2024-06-07 04:03:12');

-- Deportes (61-80)
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(61, 'Pelota Fútbol Pro', 'Pelota Fútbol Pro. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 976.42, 13, 4, NULL, '2024-12-16 19:22:37'),
(62, 'Pelota Basket Outdoor', 'Pelota Basket Outdoor. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 126.67, 24, 4, NULL, '2024-05-31 22:59:40'),
(63, 'Raqueta Tenis Graphite', 'Raqueta Tenis Graphite. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 537.74, 29, 4, NULL, '2024-06-13 14:42:55'),
(64, 'Bicicleta MTB 29'' TrailX', 'Bicicleta MTB 29'' TrailX. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1396.21, 35, 4, NULL, '2024-03-01 10:48:39'),
(65, 'Guantes Gym Grip', 'Guantes Gym Grip. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 387.89, 13, 4, NULL, '2024-08-13 06:21:05'),
(66, 'Colchoneta Yoga Antideslizante', 'Colchoneta Yoga Antideslizante. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1474.11, 3, 4, NULL, '2024-01-23 12:49:08'),
(67, 'Mancuernas Ajustables 24kg', 'Mancuernas Ajustables 24kg. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 109.77, 30, 4, NULL, '2024-01-23 10:09:21'),
(68, 'Casco Ciclismo Aero', 'Casco Ciclismo Aero. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1921.94, 5, 4, NULL, '2024-01-27 22:39:54'),
(69, 'Rollers Urban Glide', 'Rollers Urban Glide. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1194.11, 15, 4, NULL, '2024-02-16 21:25:27'),
(70, 'Zapatillas Running Light', 'Zapatillas Running Light. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1883.77, 36, 4, NULL, '2024-08-13 03:55:00'),
(71, 'Camiseta Ciclismo Dry', 'Camiseta Ciclismo Dry. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1193.08, 39, 4, NULL, '2024-06-12 03:27:33'),
(72, 'Soga de Saltar Pro', 'Soga de Saltar Pro. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1318.16, 36, 4, NULL, '2024-12-29 08:05:37'),
(73, 'Proteína Whey 2lb Vainilla', 'Proteína Whey 2lb Vainilla. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 528.91, 20, 4, NULL, '2024-04-13 11:42:24'),
(74, 'Set Bandas Elásticas 5p', 'Set Bandas Elásticas 5p. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 797.6, 19, 4, NULL, '2024-05-03 02:59:06'),
(75, 'Gafas Natación Anti‑Fog', 'Gafas Natación Anti‑Fog. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1858.74, 4, 4, NULL, '2024-06-27 07:31:50'),
(76, 'Pelota Vóley Beach', 'Pelota Vóley Beach. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1246.1, 36, 4, NULL, '2024-01-29 18:50:21'),
(77, 'Paleta Pádel Carbon', 'Paleta Pádel Carbon. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1079.88, 32, 4, NULL, '2024-02-21 18:35:04'),
(78, 'Botella Térmica 1L', 'Botella Térmica 1L. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1867.18, 4, 4, NULL, '2024-05-23 20:14:31'),
(79, 'Protector Bucal Boxeo', 'Protector Bucal Boxeo. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 577.11, 28, 4, NULL, '2024-08-25 21:14:59'),
(80, 'Bolso Deportivo 40L', 'Bolso Deportivo 40L. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.', 1967.86, 33, 4, NULL, '2024-09-16 16:56:10');

-- Libros (81-100)
INSERT INTO productos (id, name, description, price, stock, category_id, owner_user_id, created_at) VALUES
(81, 'Introducción a la Programación en Python', 'Introducción a la Programación en Python. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1636.03, 19, 5, NULL, '2024-12-30 23:27:42'),
(82, 'Algoritmos y Estructuras de Datos', 'Algoritmos y Estructuras de Datos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1757.46, 15, 5, NULL, '2024-12-11 20:43:24'),
(83, 'Bases de Datos Relacionales: SQL Práctico', 'Bases de Datos Relacionales: SQL Práctico. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 222.99, 35, 5, NULL, '2024-04-16 02:28:09'),
(84, 'Diseño de Sistemas con UML', 'Diseño de Sistemas con UML. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 570.68, 13, 5, NULL, '2024-03-20 09:39:52'),
(85, 'Redes de Computadoras Fundamentos', 'Redes de Computadoras Fundamentos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1378.11, 16, 5, NULL, '2024-04-07 20:37:10'),
(86, 'Ingeniería de Software Moderna', 'Ingeniería de Software Moderna. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1811.61, 3, 5, NULL, '2024-09-03 15:57:34'),
(87, 'Arquitectura de Computadoras', 'Arquitectura de Computadoras. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 852.91, 29, 5, NULL, '2024-01-02 17:02:53'),
(88, 'Criptografía y Seguridad', 'Criptografía y Seguridad. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 673.77, 8, 5, NULL, '2024-03-04 02:03:11'),
(89, 'Machine Learning para Principiantes', 'Machine Learning para Principiantes. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1485.04, 35, 5, NULL, '2024-08-06 04:01:51'),
(90, 'Sistemas Operativos: Conceptos', 'Sistemas Operativos: Conceptos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 29.23, 4, 5, NULL, '2024-07-31 05:16:12'),
(91, 'Clean Code (Ed. Español)', 'Clean Code (Ed. Español). Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 81.69, 23, 5, NULL, '2024-06-16 05:54:09'),
(92, 'El Arte de la Guerra', 'El Arte de la Guerra. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 263.61, 19, 5, NULL, '2024-12-15 11:06:53'),
(93, 'Cien Años de Soledad', 'Cien Años de Soledad. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1866.84, 2, 5, NULL, '2024-03-22 22:03:18'),
(94, 'Don Quijote de la Mancha', 'Don Quijote de la Mancha. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1367.3, 6, 5, NULL, '2024-10-30 07:12:37'),
(95, 'El Principito (Ed. Ilustrada)', 'El Principito (Ed. Ilustrada). Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1124.16, 26, 5, NULL, '2024-12-25 20:44:39'),
(96, 'Hábitos Atómicos', 'Hábitos Atómicos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1860.45, 10, 5, NULL, '2024-12-08 15:23:40'),
(97, 'Sapiens: De Animales a Dioses', 'Sapiens: De Animales a Dioses. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 830.46, 11, 5, NULL, '2024-10-31 04:22:14'),
(98, 'Kafka en la Orilla', 'Kafka en la Orilla. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1862.31, 15, 5, NULL, '2024-03-03 03:49:53'),
(99, 'Fundación (Asimov)', 'Fundación (Asimov). Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 1576.87, 6, 5, NULL, '2024-12-05 01:11:01'),
(100, 'Rayuela', 'Rayuela. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.', 87.05, 30, 5, NULL, '2024-03-18 20:09:12');

-- IMÁGENES DE PRODUCTOS
INSERT INTO producto_imagenes (producto_id, imagen_url) VALUES
-- Productos 1-10 (imágenes originales)
(1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&crop=center'),
(2, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center'),
(3, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&crop=center'),
(5, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center'),
(6, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center'),
(7, 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&crop=center'),
(8, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&crop=center'),
(9, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center');

-- Resto de productos con imágenes de picsum
INSERT INTO producto_imagenes (producto_id, imagen_url)
SELECT id, CONCAT('https://picsum.photos/seed/product', id, '/800/600')
FROM productos
WHERE id >= 11 AND id <= 100;

-- ============================================
-- PASO 4: FINALIZAR MIGRACIÓN MARKETPLACE
-- ============================================

-- 4. Agregar constraint de foreign key para vendedor_id (si no existe)
SET @constraintname = 'fk_detalle_pedido_vendedor';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (constraint_name = @constraintname)
  ) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD CONSTRAINT ', @constraintname, ' FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 5. Crear índices para mejorar el rendimiento de las consultas de ventas
-- Verificar si los índices existen antes de crearlos
SET @index_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS 
                     WHERE TABLE_SCHEMA = DATABASE() 
                     AND TABLE_NAME = 'detalle_pedidos' 
                     AND INDEX_NAME = 'idx_detalle_pedido_vendedor');

SET @sql = IF(@index_exists = 0, 
              'CREATE INDEX idx_detalle_pedido_vendedor ON detalle_pedidos(vendedor_id)', 
              'SELECT "Índice idx_detalle_pedido_vendedor ya existe"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS 
                     WHERE TABLE_SCHEMA = DATABASE() 
                     AND TABLE_NAME = 'detalle_pedidos' 
                     AND INDEX_NAME = 'idx_detalle_pedido_estado_item');

SET @sql = IF(@index_exists = 0, 
              'CREATE INDEX idx_detalle_pedido_estado_item ON detalle_pedidos(estado_item)', 
              'SELECT "Índice idx_detalle_pedido_estado_item ya existe"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS 
                     WHERE TABLE_SCHEMA = DATABASE() 
                     AND TABLE_NAME = 'detalle_pedidos' 
                     AND INDEX_NAME = 'idx_detalle_pedido_vendedor_estado');

SET @sql = IF(@index_exists = 0, 
              'CREATE INDEX idx_detalle_pedido_vendedor_estado ON detalle_pedidos(vendedor_id, estado_item)', 
              'SELECT "Índice idx_detalle_pedido_vendedor_estado ya existe"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================
-- PASO 5: RESETEAR AUTO_INCREMENT
-- ============================================
-- NOTA: AUTO_INCREMENT de usuarios se maneja automáticamente por el backend
ALTER TABLE categorias AUTO_INCREMENT = 6;
ALTER TABLE productos AUTO_INCREMENT = 101;

-- ============================================
-- PASO 6: VERIFICACIÓN FINAL
-- ============================================
-- NOTA: Los usuarios se crean automáticamente al compilar el backend
SELECT 'Categorías cargadas:' AS tipo, COUNT(*) AS cantidad FROM categorias
UNION ALL
SELECT 'Productos cargados:' AS tipo, COUNT(*) AS cantidad FROM productos
UNION ALL
SELECT 'Imágenes cargadas:' AS tipo, COUNT(*) AS cantidad FROM producto_imagenes;

-- Distribución de productos por categoría
SELECT 'Distribución por categoría:' AS info, '' AS categoria, '' AS total
UNION ALL
SELECT '', c.nombre, CAST(COUNT(p.id) AS CHAR)
FROM categorias c
LEFT JOIN productos p ON c.id = p.category_id
GROUP BY c.id, c.nombre;

-- Distribución de productos por usuario (después de que se creen los usuarios)
-- SELECT 'Distribución por vendedor:' AS info, '' AS vendedor, '' AS total
-- UNION ALL
-- SELECT '', u.username, CAST(COUNT(p.id) AS CHAR)
-- FROM usuarios u
-- LEFT JOIN productos p ON u.id = p.owner_user_id
-- GROUP BY u.id, u.username
-- ORDER BY COUNT(p.id) DESC;

-- Verificar estructura de marketplace
SELECT 'Verificación Marketplace:' AS info, '' AS descripcion, '' AS cantidad
UNION ALL
SELECT '', 'Columnas agregadas a detalle_pedidos', 
       CASE WHEN EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'detalle_pedidos' AND COLUMN_NAME = 'vendedor_id') 
            THEN 'vendedor_id: ✅' ELSE 'vendedor_id: ❌' END
UNION ALL
SELECT '', 'Columnas agregadas a detalle_pedidos', 
       CASE WHEN EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'detalle_pedidos' AND COLUMN_NAME = 'estado_item') 
            THEN 'estado_item: ✅' ELSE 'estado_item: ❌' END
UNION ALL
SELECT '', 'Índices creados', 
       CASE WHEN EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_NAME = 'detalle_pedidos' AND INDEX_NAME = 'idx_detalle_pedido_vendedor') 
            THEN 'idx_vendedor: ✅' ELSE 'idx_vendedor: ❌' END;

-- ============================================
-- PASO 7: ACTUALIZAR OWNER_USER_ID DESPUÉS DE CREAR USUARIOS
-- ============================================
-- NOTA: Ejecutar estas consultas DESPUÉS de que el backend cree los usuarios
-- 
-- Asignar productos a usuarios existentes (Usuario 1 sin productos, solo usuarios 2 y 3):

-- Usuario 1: sin productos (no se asignan productos al usuario 1)

-- Usuario 2: productos 1-50 (50 productos)
UPDATE productos SET owner_user_id = 2 WHERE id BETWEEN 1 AND 50;

-- Usuario 3: productos 51-100 (50 productos)
UPDATE productos SET owner_user_id = 3 WHERE id BETWEEN 51 AND 100;

-- ============================================
-- FINALIZADO
-- ============================================
SELECT '🎉 ¡BASE DE DATOS MARKETPLACE CARGADA EXITOSAMENTE!' AS mensaje;
SELECT '📊 Resumen:' AS tipo, 
       '👥 Usuarios se crean automáticamente al compilar el backend' AS usuarios,
       CONCAT('📦 ', (SELECT COUNT(*) FROM productos), ' productos') AS productos,
       CONCAT('🏷️ ', (SELECT COUNT(*) FROM categorias), ' categorías') AS categorias,
       CONCAT('🖼️ ', (SELECT COUNT(*) FROM producto_imagenes), ' imágenes') AS imagenes;

-- Estados disponibles en el marketplace
SELECT '🔄 Estados disponibles en el marketplace:' AS info
UNION ALL
SELECT '• PENDIENTE - Pedido/item recién creado'
UNION ALL
SELECT '• CONFIRMADO - Vendedor confirma el pedido'
UNION ALL
SELECT '• PREPARANDO - Vendedor preparando el envío'
UNION ALL
SELECT '• ENVIADO - Item enviado al comprador'
UNION ALL
SELECT '• EN_TRANSITO - Item en camino'
UNION ALL
SELECT '• ENTREGADO - Item entregado al comprador'
UNION ALL
SELECT '• CANCELADO_COMPRADOR - Cancelado por el comprador'
UNION ALL
SELECT '• CANCELADO_VENDEDOR - Cancelado por el vendedor'
UNION ALL
SELECT '• DEVOLUCION_SOLICITADA - Solicitud de devolución'
UNION ALL
SELECT '• DEVUELTO - Item devuelto al vendedor';

-- ============================================
-- INSTRUCCIONES POST-INSTALACIÓN
-- ============================================
SELECT '🚀 PRÓXIMOS PASOS:' AS instrucciones
UNION ALL
SELECT '1. Reinicia el backend Spring Boot'
UNION ALL
SELECT '2. Reinicia el frontend React'
UNION ALL
SELECT '3. Inicia sesión como admin (admin/password)'
UNION ALL
SELECT '4. Crea pedidos con productos de múltiples vendedores'
UNION ALL
SELECT '5. Prueba el sistema de marketplace completo'
UNION ALL
SELECT ''
UNION ALL
SELECT '👤 USUARIOS DE PRUEBA:'
UNION ALL
SELECT '• Los usuarios se crean automáticamente al compilar el backend'
UNION ALL
SELECT '• Revisa el código del backend para ver las credenciales';
