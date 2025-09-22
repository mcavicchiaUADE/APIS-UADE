package com.ecommerce.service;

import com.ecommerce.entity.Producto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductoService {

    // Simulamos almacenamiento en memoria usando una List
    private final List<Producto> productos = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    // Inicializamos con todos los productos del db.json
    public ProductoService() {
        // Agregamos todos los productos del db.json
        productos.add(crearProductoDesdeJson(1L, "iPhone 15 Pro Max",
            "El iPhone más avanzado con chip A17 Pro, cámara de 48MP, pantalla Super Retina XDR de 6.7 pulgadas y hasta 1TB de almacenamiento. Incluye Dynamic Island y sistema de cámaras Pro.",
            new BigDecimal("1299.99"), 8,
            Arrays.asList("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&crop=center"),
            1L, 1L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(2L, "MacBook Air M2",
            "Laptop ultradelgada con chip M2 de Apple, pantalla Liquid Retina de 13.6 pulgadas, hasta 24GB de memoria unificada y hasta 2TB de almacenamiento SSD. Hasta 18 horas de duración de batería.",
            new BigDecimal("1199.99"), 12,
            Arrays.asList("https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center"),
            1L, 1L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(3L, "Nike Air Max 270",
            "Zapatillas deportivas con tecnología Air Max, suela visible de 270 grados y diseño moderno. Perfectas para running y uso diario. Disponibles en múltiples colores.",
            new BigDecimal("149.99"), 20,
            Arrays.asList("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&crop=center"),
            2L, 1L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(5L, "Philips Hue White & Color Ambiance",
            "Kit de iluminación inteligente con 3 bombillas LED que cambian de color, control por app y compatibilidad con Alexa y Google Assistant. Perfecto para crear ambientes únicos.",
            new BigDecimal("199.99"), 6,
            Arrays.asList("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center"),
            3L, 1L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(6L, "Sofá 3 Plazas Moderno",
            "Sofá de 3 plazas con tapizado en tela gris, estructura de madera maciza y cojines desenfundables. Diseño moderno y cómodo para salas de estar contemporáneas.",
            new BigDecimal("899.99"), 3,
            Arrays.asList("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"),
            3L, 2L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(7L, "Balón de Fútbol Adidas Al Rihla",
            "Balón oficial de la Copa Mundial FIFA 2022, diseñado con tecnología aerodinámica avanzada y superficie texturizada para máximo control y precisión en el juego.",
            new BigDecimal("89.99"), 18,
            Arrays.asList("https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&crop=center"),
            4L, 1L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(8L, "Pelota de Baloncesto Spalding NBA",
            "Pelota oficial de la NBA con cuero premium, diseño clásico con líneas negras y naranja. Perfecta para jugadores profesionales y aficionados serios.",
            new BigDecimal("69.99"), 12,
            Arrays.asList("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&crop=center"),
            4L, 2L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(9L, "Don Quijote de la Mancha - Edición Anotada",
            "Clásico de la literatura española de Miguel de Cervantes en edición anotada con prólogo de Francisco Rico. Incluye notas explicativas y contexto histórico.",
            new BigDecimal("24.99"), 25,
            Arrays.asList("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center"),
            5L, 1L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(10L, "Cien Años de Soledad - Gabriel García Márquez",
            "Obra maestra del realismo mágico, ganadora del Premio Nobel de Literatura. La historia épica de la familia Buendía en el pueblo ficticio de Macondo.",
            new BigDecimal("19.99"), 30,
            Arrays.asList("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rae.es%2Fobras-academicas%2Fediciones-conmemorativas%2Fcien-anos-de-soledad&psig=AOvVaw2FVLONmeAAQyIB-44ShGfY&ust=1757358187568000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPCy-cerx48DFQAAAAAdAAAAABAE"),
            5L, 2L, "2024-01-15T10:30:00.000Z"));
        productos.add(crearProductoDesdeJson(11L, "Smartphone Nova X",
            "Smartphone Nova X. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("1282.45"), 1,
            Arrays.asList("https://picsum.photos/seed/product1/800/600"),
            1L, 2L, "2024-04-05T10:33:27Z"));
        productos.add(crearProductoDesdeJson(12L, "Laptop AeroBook 14",
            "Laptop AeroBook 14. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("454.18"), 6,
            Arrays.asList("https://picsum.photos/seed/product2/800/600"),
            1L, 1L, "2024-08-17T15:47:20Z"));
        productos.add(crearProductoDesdeJson(13L, "Auriculares Inalámbricos WavePods",
            "Auriculares Inalámbricos WavePods. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("849.61"), 0,
            Arrays.asList("https://picsum.photos/seed/product3/800/600"),
            1L, 1L, "2024-03-26T05:51:13Z"));
        productos.add(crearProductoDesdeJson(14L, "Monitor 27'' QHD Vision",
            "Monitor 27'' QHD Vision. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("472.99"), 38,
            Arrays.asList("https://picsum.photos/seed/product4/800/600"),
            1L, 1L, "2024-08-06T07:10:59Z"));
        productos.add(crearProductoDesdeJson(15L, "Smartwatch Pulse Pro",
            "Smartwatch Pulse Pro. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("405.68"), 34,
            Arrays.asList("https://picsum.photos/seed/product5/800/600"),
            1L, 2L, "2024-03-26T22:39:19Z"));
        productos.add(crearProductoDesdeJson(16L, "Tablet Orion 11",
            "Tablet Orion 11. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("903.92"), 17,
            Arrays.asList("https://picsum.photos/seed/product6/800/600"),
            1L, 1L, "2024-10-22T00:35:50Z"));
        productos.add(crearProductoDesdeJson(17L, "Cámara Mirrorless Alpha M",
            "Cámara Mirrorless Alpha M. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("1613.57"), 27,
            Arrays.asList("https://picsum.photos/seed/product7/800/600"),
            1L, 2L, "2024-04-18T05:56:55Z"));
        productos.add(crearProductoDesdeJson(18L, "Router Wi‑Fi 6 TurboLink",
            "Router Wi‑Fi 6 TurboLink. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("319.39"), 21,
            Arrays.asList("https://picsum.photos/seed/product8/800/600"),
            1L, 1L, "2024-02-06T08:27:14Z"));
        productos.add(crearProductoDesdeJson(19L, "Teclado Mecánico Hexa",
            "Teclado Mecánico Hexa. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("766.05"), 22,
            Arrays.asList("https://picsum.photos/seed/product9/800/600"),
            1L, 2L, "2024-08-22T19:08:04Z"));
        productos.add(crearProductoDesdeJson(20L, "Mouse Inalámbrico Vector",
            "Mouse Inalámbrico Vector. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("536.39"), 2,
            Arrays.asList("https://picsum.photos/seed/product10/800/600"),
            1L, 2L, "2024-07-27T14:00:29Z"));
        productos.add(crearProductoDesdeJson(21L, "Barra de Sonido CinemaOne",
            "Barra de Sonido CinemaOne. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("258.39"), 24,
            Arrays.asList("https://picsum.photos/seed/product11/800/600"),
            1L, 1L, "2024-08-02T17:23:29Z"));
        productos.add(crearProductoDesdeJson(22L, "SSD NVMe 1TB FlashMax",
            "SSD NVMe 1TB FlashMax. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("593.41"), 40,
            Arrays.asList("https://picsum.photos/seed/product12/800/600"),
            1L, 2L, "2024-08-12T13:18:43Z"));
        productos.add(crearProductoDesdeJson(23L, "Disco Externo 2TB SafeDrive",
            "Disco Externo 2TB SafeDrive. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("392.64"), 4,
            Arrays.asList("https://picsum.photos/seed/product13/800/600"),
            1L, 1L, "2024-09-14T03:25:15Z"));
        productos.add(crearProductoDesdeJson(24L, "Cargador GaN 65W NanoCharge",
            "Cargador GaN 65W NanoCharge. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("463.51"), 18,
            Arrays.asList("https://picsum.photos/seed/product14/800/600"),
            1L, 1L, "2024-11-28T12:08:20Z"));
        productos.add(crearProductoDesdeJson(25L, "Hub USB‑C 8‑en‑1 Matrix",
            "Hub USB‑C 8‑en‑1 Matrix. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("473.24"), 6,
            Arrays.asList("https://picsum.photos/seed/product15/800/600"),
            1L, 2L, "2024-04-18T06:54:06Z"));
        productos.add(crearProductoDesdeJson(26L, "Microfono USB Podcast Pro",
            "Microfono USB Podcast Pro. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("912.28"), 23,
            Arrays.asList("https://picsum.photos/seed/product16/800/600"),
            1L, 1L, "2024-05-24T02:20:12Z"));
        productos.add(crearProductoDesdeJson(27L, "Webcam 4K ClearView",
            "Webcam 4K ClearView. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("716.98"), 17,
            Arrays.asList("https://picsum.photos/seed/product17/800/600"),
            1L, 1L, "2024-08-24T21:30:44Z"));
        productos.add(crearProductoDesdeJson(28L, "Proyector LED HomeBeam",
            "Proyector LED HomeBeam. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("1273.6"), 34,
            Arrays.asList("https://picsum.photos/seed/product18/800/600"),
            1L, 1L, "2024-03-04T19:01:17Z"));
        productos.add(crearProductoDesdeJson(29L, "Dron SkyEye 4K",
            "Dron SkyEye 4K. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("929.89"), 17,
            Arrays.asList("https://picsum.photos/seed/product19/800/600"),
            1L, 1L, "2024-09-23T05:04:02Z"));
        productos.add(crearProductoDesdeJson(30L, "Impresora Láser Mono SpeedPrint",
            "Impresora Láser Mono SpeedPrint. Producto electrónico de alta calidad con excelente relación rendimiento/consumo. Ideal para uso diario y profesional.",
            new BigDecimal("655.31"), 3,
            Arrays.asList("https://picsum.photos/seed/product20/800/600"),
            1L, 1L, "2024-11-15T11:45:19Z"));
        productos.add(crearProductoDesdeJson(31L, "Remera Básica Algodón",
            "Remera Básica Algodón. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("73.87"), 20,
            Arrays.asList("https://picsum.photos/seed/product21/800/600"),
            2L, 2L, "2024-04-14T07:31:33Z"));
        productos.add(crearProductoDesdeJson(32L, "Buzo Hoodie Urban",
            "Buzo Hoodie Urban. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("141.71"), 36,
            Arrays.asList("https://picsum.photos/seed/product22/800/600"),
            2L, 2L, "2024-03-23T21:49:22Z"));
        productos.add(crearProductoDesdeJson(33L, "Campera Rompeviento Sport",
            "Campera Rompeviento Sport. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("1314.31"), 25,
            Arrays.asList("https://picsum.photos/seed/product23/800/600"),
            2L, 2L, "2024-02-25T19:39:35Z"));
        productos.add(crearProductoDesdeJson(34L, "Pantalón Chino Classic",
            "Pantalón Chino Classic. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("537.1"), 15,
            Arrays.asList("https://picsum.photos/seed/product24/800/600"),
            2L, 2L, "2024-10-17T10:40:24Z"));
        productos.add(crearProductoDesdeJson(35L, "Jean Slim Azul",
            "Jean Slim Azul. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("1173.32"), 37,
            Arrays.asList("https://picsum.photos/seed/product25/800/600"),
            2L, 2L, "2024-05-20T22:03:05Z"));
        productos.add(crearProductoDesdeJson(36L, "Camisa Oxford Blanca",
            "Camisa Oxford Blanca. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("446.44"), 8,
            Arrays.asList("https://picsum.photos/seed/product26/800/600"),
            2L, 2L, "2024-02-05T15:20:13Z"));
        productos.add(crearProductoDesdeJson(37L, "Zapatillas Urban Street",
            "Zapatillas Urban Street. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("1514"), 7,
            Arrays.asList("https://picsum.photos/seed/product27/800/600"),
            2L, 1L, "2024-09-01T00:13:15Z"));
        productos.add(crearProductoDesdeJson(38L, "Short Deportivo DryFit",
            "Short Deportivo DryFit. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("328.35"), 27,
            Arrays.asList("https://picsum.photos/seed/product28/800/600"),
            2L, 1L, "2024-05-29T18:17:28Z"));
        productos.add(crearProductoDesdeJson(39L, "Medias Pack x3 Comfort",
            "Medias Pack x3 Comfort. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("769.41"), 29,
            Arrays.asList("https://picsum.photos/seed/product29/800/600"),
            2L, 2L, "2024-08-03T04:26:20Z"));
        productos.add(crearProductoDesdeJson(40L, "Gorra Snapback Black",
            "Gorra Snapback Black. Prenda cómoda y resistente, pensada para uso urbano y deportivo. Materiales de primera calidad.",
            new BigDecimal("1722.94"), 0,
            Arrays.asList("https://picsum.photos/seed/product30/800/600"),
            2L, 1L, "2024-09-22T02:00:04Z"));
        productos.add(crearProductoDesdeJson(41L, "Sofá 3 Cuerpos Lino",
            "Sofá 3 Cuerpos Lino. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1322.89"), 35,
            Arrays.asList("https://picsum.photos/seed/product41/800/600"),
            3L, 1L, "2024-04-13T06:30:24Z"));
        productos.add(crearProductoDesdeJson(42L, "Lámpara de Pie Minimal",
            "Lámpara de Pie Minimal. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1060.06"), 38,
            Arrays.asList("https://picsum.photos/seed/product42/800/600"),
            3L, 2L, "2024-03-23T14:06:08Z"));
        productos.add(crearProductoDesdeJson(43L, "Mesa de Centro Roble",
            "Mesa de Centro Roble. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1858.53"), 12,
            Arrays.asList("https://picsum.photos/seed/product43/800/600"),
            3L, 2L, "2024-06-04T06:52:39Z"));
        productos.add(crearProductoDesdeJson(44L, "Silla Ergonómica Office",
            "Silla Ergonómica Office. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1990.34"), 23,
            Arrays.asList("https://picsum.photos/seed/product44/800/600"),
            3L, 2L, "2024-12-15T17:00:39Z"));
        productos.add(crearProductoDesdeJson(45L, "Cafetera Espresso HomeBar",
            "Cafetera Espresso HomeBar. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1039.97"), 7,
            Arrays.asList("https://picsum.photos/seed/product45/800/600"),
            3L, 1L, "2024-03-28T14:19:51Z"));
        productos.add(crearProductoDesdeJson(46L, "Aspiradora Ciclónica Pro",
            "Aspiradora Ciclónica Pro. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("137.4"), 16,
            Arrays.asList("https://picsum.photos/seed/product46/800/600"),
            3L, 1L, "2024-08-16T20:39:33Z"));
        productos.add(crearProductoDesdeJson(47L, "Microondas 28L SmartHeat",
            "Microondas 28L SmartHeat. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("448.22"), 4,
            Arrays.asList("https://picsum.photos/seed/product47/800/600"),
            3L, 1L, "2024-03-30T05:53:31Z"));
        productos.add(crearProductoDesdeJson(48L, "Batidora de Mano ChefMix",
            "Batidora de Mano ChefMix. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("144.12"), 2,
            Arrays.asList("https://picsum.photos/seed/product48/800/600"),
            3L, 2L, "2024-01-28T20:26:18Z"));
        productos.add(crearProductoDesdeJson(49L, "Juego de Sábanas Queen",
            "Juego de Sábanas Queen. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1033.16"), 17,
            Arrays.asList("https://picsum.photos/seed/product49/800/600"),
            3L, 2L, "2024-03-24T12:49:54Z"));
        productos.add(crearProductoDesdeJson(50L, "Cortinas Blackout 2 Paneles",
            "Cortinas Blackout 2 Paneles. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1083.07"), 36,
            Arrays.asList("https://picsum.photos/seed/product50/800/600"),
            3L, 2L, "2024-04-04T16:53:54Z"));
        productos.add(crearProductoDesdeJson(51L, "Almohadas Viscoelásticas x2",
            "Almohadas Viscoelásticas x2. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1571.38"), 30,
            Arrays.asList("https://picsum.photos/seed/product51/800/600"),
            3L, 1L, "2024-02-06T23:10:48Z"));
        productos.add(crearProductoDesdeJson(52L, "Organizador de Ropa 6C",
            "Organizador de Ropa 6C. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("202.88"), 27,
            Arrays.asList("https://picsum.photos/seed/product52/800/600"),
            3L, 2L, "2024-06-13T20:02:20Z"));
        productos.add(crearProductoDesdeJson(53L, "Juego de Ollas Acero 7p",
            "Juego de Ollas Acero 7p. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("828.08"), 3,
            Arrays.asList("https://picsum.photos/seed/product53/800/600"),
            3L, 1L, "2024-01-24T20:57:03Z"));
        productos.add(crearProductoDesdeJson(54L, "Set Cuchillos Chef 6p",
            "Set Cuchillos Chef 6p. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("811.21"), 21,
            Arrays.asList("https://picsum.photos/seed/product54/800/600"),
            3L, 1L, "2024-04-06T21:38:42Z"));
        productos.add(crearProductoDesdeJson(55L, "Parrilla Eléctrica GrillMax",
            "Parrilla Eléctrica GrillMax. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("391.25"), 34,
            Arrays.asList("https://picsum.photos/seed/product55/800/600"),
            3L, 2L, "2024-02-24T18:35:37Z"));
        productos.add(crearProductoDesdeJson(56L, "Humidificador SilentAir",
            "Humidificador SilentAir. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("849.53"), 17,
            Arrays.asList("https://picsum.photos/seed/product56/800/600"),
            3L, 2L, "2024-04-07T08:21:53Z"));
        productos.add(crearProductoDesdeJson(57L, "Purificador de Aire PureHome",
            "Purificador de Aire PureHome. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1750.22"), 4,
            Arrays.asList("https://picsum.photos/seed/product57/800/600"),
            3L, 2L, "2024-11-10T03:18:47Z"));
        productos.add(crearProductoDesdeJson(58L, "Espejo Redondo 60cm",
            "Espejo Redondo 60cm. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1724.07"), 35,
            Arrays.asList("https://picsum.photos/seed/product58/800/600"),
            3L, 1L, "2024-01-20T23:31:02Z"));
        productos.add(crearProductoDesdeJson(59L, "Estante Flotante Doble",
            "Estante Flotante Doble. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1307.76"), 34,
            Arrays.asList("https://picsum.photos/seed/product59/800/600"),
            3L, 1L, "2024-02-06T13:16:19Z"));
        productos.add(crearProductoDesdeJson(60L, "Ropero 2 Puertas Nordic",
            "Ropero 2 Puertas Nordic. Elemento para el hogar con diseño moderno y funcional, fácil de mantener y duradero.",
            new BigDecimal("1853.46"), 15,
            Arrays.asList("https://picsum.photos/seed/product60/800/600"),
            3L, 1L, "2024-06-07T04:03:12Z"));
        productos.add(crearProductoDesdeJson(61L, "Pelota Fútbol Pro",
            "Pelota Fútbol Pro. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("976.42"), 13,
            Arrays.asList("https://picsum.photos/seed/product61/800/600"),
            4L, 2L, "2024-12-16T19:22:37Z"));
        productos.add(crearProductoDesdeJson(62L, "Pelota Basket Outdoor",
            "Pelota Basket Outdoor. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("126.67"), 24,
            Arrays.asList("https://picsum.photos/seed/product62/800/600"),
            4L, 1L, "2024-05-31T22:59:40Z"));
        productos.add(crearProductoDesdeJson(63L, "Raqueta Tenis Graphite",
            "Raqueta Tenis Graphite. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("537.74"), 29,
            Arrays.asList("https://picsum.photos/seed/product63/800/600"),
            4L, 2L, "2024-06-13T14:42:55Z"));
        productos.add(crearProductoDesdeJson(64L, "Bicicleta MTB 29'' TrailX",
            "Bicicleta MTB 29'' TrailX. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1396.21"), 35,
            Arrays.asList("https://picsum.photos/seed/product64/800/600"),
            4L, 2L, "2024-03-01T10:48:39Z"));
        productos.add(crearProductoDesdeJson(65L, "Guantes Gym Grip",
            "Guantes Gym Grip. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("387.89"), 13,
            Arrays.asList("https://picsum.photos/seed/product65/800/600"),
            4L, 1L, "2024-08-13T06:21:05Z"));
        productos.add(crearProductoDesdeJson(66L, "Colchoneta Yoga Antideslizante",
            "Colchoneta Yoga Antideslizante. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1474.11"), 3,
            Arrays.asList("https://picsum.photos/seed/product66/800/600"),
            4L, 2L, "2024-01-23T12:49:08Z"));
        productos.add(crearProductoDesdeJson(67L, "Mancuernas Ajustables 24kg",
            "Mancuernas Ajustables 24kg. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("109.77"), 30,
            Arrays.asList("https://picsum.photos/seed/product67/800/600"),
            4L, 1L, "2024-01-23T10:09:21Z"));
        productos.add(crearProductoDesdeJson(68L, "Casco Ciclismo Aero",
            "Casco Ciclismo Aero. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1921.94"), 5,
            Arrays.asList("https://picsum.photos/seed/product68/800/600"),
            4L, 1L, "2024-01-27T22:39:54Z"));
        productos.add(crearProductoDesdeJson(69L, "Rollers Urban Glide",
            "Rollers Urban Glide. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1194.11"), 15,
            Arrays.asList("https://picsum.photos/seed/product69/800/600"),
            4L, 2L, "2024-02-16T21:25:27Z"));
        productos.add(crearProductoDesdeJson(70L, "Zapatillas Running Light",
            "Zapatillas Running Light. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1883.77"), 36,
            Arrays.asList("https://picsum.photos/seed/product70/800/600"),
            4L, 1L, "2024-08-13T03:55:00Z"));
        productos.add(crearProductoDesdeJson(71L, "Camiseta Ciclismo Dry",
            "Camiseta Ciclismo Dry. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1193.08"), 39,
            Arrays.asList("https://picsum.photos/seed/product71/800/600"),
            4L, 1L, "2024-06-12T03:27:33Z"));
        productos.add(crearProductoDesdeJson(72L, "Soga de Saltar Pro",
            "Soga de Saltar Pro. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1318.16"), 36,
            Arrays.asList("https://picsum.photos/seed/product72/800/600"),
            4L, 2L, "2024-12-29T08:05:37Z"));
        productos.add(crearProductoDesdeJson(73L, "Proteína Whey 2lb Vainilla",
            "Proteína Whey 2lb Vainilla. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("528.91"), 20,
            Arrays.asList("https://picsum.photos/seed/product73/800/600"),
            4L, 1L, "2024-04-13T11:42:24Z"));
        productos.add(crearProductoDesdeJson(74L, "Set Bandas Elásticas 5p",
            "Set Bandas Elásticas 5p. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("797.6"), 19,
            Arrays.asList("https://picsum.photos/seed/product74/800/600"),
            4L, 2L, "2024-05-03T02:59:06Z"));
        productos.add(crearProductoDesdeJson(75L, "Gafas Natación Anti‑Fog",
            "Gafas Natación Anti‑Fog. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1858.74"), 4,
            Arrays.asList("https://picsum.photos/seed/product75/800/600"),
            4L, 1L, "2024-06-27T07:31:50Z"));
        productos.add(crearProductoDesdeJson(76L, "Pelota Vóley Beach",
            "Pelota Vóley Beach. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1246.1"), 36,
            Arrays.asList("https://picsum.photos/seed/product76/800/600"),
            4L, 1L, "2024-01-29T18:50:21Z"));
        productos.add(crearProductoDesdeJson(77L, "Paleta Pádel Carbon",
            "Paleta Pádel Carbon. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1079.88"), 32,
            Arrays.asList("https://picsum.photos/seed/product77/800/600"),
            4L, 2L, "2024-02-21T18:35:04Z"));
        productos.add(crearProductoDesdeJson(78L, "Botella Térmica 1L",
            "Botella Térmica 1L. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1867.18"), 4,
            Arrays.asList("https://picsum.photos/seed/product78/800/600"),
            4L, 1L, "2024-05-23T20:14:31Z"));
        productos.add(crearProductoDesdeJson(79L, "Protector Bucal Boxeo",
            "Protector Bucal Boxeo. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("577.11"), 28,
            Arrays.asList("https://picsum.photos/seed/product79/800/600"),
            4L, 2L, "2024-08-25T21:14:59Z"));
        productos.add(crearProductoDesdeJson(80L, "Bolso Deportivo 40L",
            "Bolso Deportivo 40L. Artículo deportivo diseñado para entrenamiento y competencia, proporciona gran desempeño y comodidad.",
            new BigDecimal("1967.86"), 33,
            Arrays.asList("https://picsum.photos/seed/product80/800/600"),
            4L, 1L, "2024-09-16T16:56:10Z"));
        productos.add(crearProductoDesdeJson(81L, "Introducción a la Programación en Python",
            "Introducción a la Programación en Python. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1636.03"), 19,
            Arrays.asList("https://picsum.photos/seed/product81/800/600"),
            5L, 1L, "2024-12-30T23:27:42Z"));
        productos.add(crearProductoDesdeJson(82L, "Algoritmos y Estructuras de Datos",
            "Algoritmos y Estructuras de Datos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1757.46"), 15,
            Arrays.asList("https://picsum.photos/seed/product82/800/600"),
            5L, 1L, "2024-12-11T20:43:24Z"));
        productos.add(crearProductoDesdeJson(83L, "Bases de Datos Relacionales: SQL Práctico",
            "Bases de Datos Relacionales: SQL Práctico. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("222.99"), 35,
            Arrays.asList("https://picsum.photos/seed/product83/800/600"),
            5L, 1L, "2024-04-16T02:28:09Z"));
        productos.add(crearProductoDesdeJson(84L, "Diseño de Sistemas con UML",
            "Diseño de Sistemas con UML. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("570.68"), 13,
            Arrays.asList("https://picsum.photos/seed/product84/800/600"),
            5L, 2L, "2024-03-20T09:39:52Z"));
        productos.add(crearProductoDesdeJson(85L, "Redes de Computadoras Fundamentos",
            "Redes de Computadoras Fundamentos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1378.11"), 16,
            Arrays.asList("https://picsum.photos/seed/product85/800/600"),
            5L, 2L, "2024-04-07T20:37:10Z"));
        productos.add(crearProductoDesdeJson(86L, "Ingeniería de Software Moderna",
            "Ingeniería de Software Moderna. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1811.61"), 3,
            Arrays.asList("https://picsum.photos/seed/product86/800/600"),
            5L, 1L, "2024-09-03T15:57:34Z"));
        productos.add(crearProductoDesdeJson(87L, "Arquitectura de Computadoras",
            "Arquitectura de Computadoras. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("852.91"), 29,
            Arrays.asList("https://picsum.photos/seed/product87/800/600"),
            5L, 1L, "2024-01-02T17:02:53Z"));
        productos.add(crearProductoDesdeJson(88L, "Criptografía y Seguridad",
            "Criptografía y Seguridad. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("673.77"), 8,
            Arrays.asList("https://picsum.photos/seed/product88/800/600"),
            5L, 2L, "2024-03-04T02:03:11Z"));
        productos.add(crearProductoDesdeJson(89L, "Machine Learning para Principiantes",
            "Machine Learning para Principiantes. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1485.04"), 35,
            Arrays.asList("https://picsum.photos/seed/product89/800/600"),
            5L, 2L, "2024-08-06T04:01:51Z"));
        productos.add(crearProductoDesdeJson(90L, "Sistemas Operativos: Conceptos",
            "Sistemas Operativos: Conceptos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("29.23"), 4,
            Arrays.asList("https://picsum.photos/seed/product90/800/600"),
            5L, 1L, "2024-07-31T05:16:12Z"));
        productos.add(crearProductoDesdeJson(91L, "Clean Code (Ed. Español)",
            "Clean Code (Ed. Español). Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("81.69"), 23,
            Arrays.asList("https://picsum.photos/seed/product91/800/600"),
            5L, 1L, "2024-06-16T05:54:09Z"));
        productos.add(crearProductoDesdeJson(92L, "El Arte de la Guerra",
            "El Arte de la Guerra. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("263.61"), 19,
            Arrays.asList("https://picsum.photos/seed/product92/800/600"),
            5L, 2L, "2024-12-15T11:06:53Z"));
        productos.add(crearProductoDesdeJson(93L, "Cien Años de Soledad",
            "Cien Años de Soledad. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1866.84"), 2,
            Arrays.asList("https://picsum.photos/seed/product93/800/600"),
            5L, 2L, "2024-03-22T22:03:18Z"));
        productos.add(crearProductoDesdeJson(94L, "Don Quijote de la Mancha",
            "Don Quijote de la Mancha. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1367.3"), 6,
            Arrays.asList("https://picsum.photos/seed/product94/800/600"),
            5L, 2L, "2024-10-30T07:12:37Z"));
        productos.add(crearProductoDesdeJson(95L, "El Principito (Ed. Ilustrada)",
            "El Principito (Ed. Ilustrada). Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1124.16"), 26,
            Arrays.asList("https://picsum.photos/seed/product95/800/600"),
            5L, 1L, "2024-12-25T20:44:39Z"));
        productos.add(crearProductoDesdeJson(96L, "Hábitos Atómicos",
            "Hábitos Atómicos. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1860.45"), 10,
            Arrays.asList("https://picsum.photos/seed/product96/800/600"),
            5L, 1L, "2024-12-08T15:23:40Z"));
        productos.add(crearProductoDesdeJson(97L, "Sapiens: De Animales a Dioses",
            "Sapiens: De Animales a Dioses. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("830.46"), 11,
            Arrays.asList("https://picsum.photos/seed/product97/800/600"),
            5L, 2L, "2024-10-31T04:22:14Z"));
        productos.add(crearProductoDesdeJson(98L, "Kafka en la Orilla",
            "Kafka en la Orilla. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1862.31"), 15,
            Arrays.asList("https://picsum.photos/seed/product98/800/600"),
            5L, 2L, "2024-03-03T03:49:53Z"));
        productos.add(crearProductoDesdeJson(99L, "Fundación (Asimov)",
            "Fundación (Asimov). Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("1576.87"), 6,
            Arrays.asList("https://picsum.photos/seed/product99/800/600"),
            5L, 2L, "2024-12-05T01:11:01Z"));
        productos.add(crearProductoDesdeJson(100L, "Rayuela",
            "Rayuela. Libro recomendado, edición en español, ideal para estudiantes y entusiastas. Tapa blanda.",
            new BigDecimal("87.05"), 30,
            Arrays.asList("https://picsum.photos/seed/product100/800/600"),
            5L, 1L, "2024-03-18T20:09:12Z"));

        
        // Configuramos el generador de IDs para que continúe desde el último ID usado
        idGenerator.set(101L);
    }

    // Método auxiliar para crear productos desde JSON
    private Producto crearProductoDesdeJson(Long id, String name, String description, BigDecimal price, 
                                           Integer stock, List<String> images, Long categoryId, 
                                           Long ownerUserId, String createdAt) {
        Producto producto = new Producto();
        producto.setId(id);
        producto.setName(name);
        producto.setDescription(description);
        producto.setPrice(price);
        producto.setStock(stock);
        producto.setImages(images);
        producto.setCategoryId(categoryId);
        producto.setOwnerUserId(ownerUserId);
        
        // Parsear fecha de creación
        try {
            LocalDateTime created = LocalDateTime.parse(createdAt.replace("Z", ""));
            producto.setCreatedAt(created);
        } catch (Exception e) {
            producto.setCreatedAt(LocalDateTime.now());
        }
        
        return producto;
    }

    /**
     * Obtener todos los productos
     */
    public List<Producto> obtenerTodosLosProductos() {
        return new ArrayList<>(productos);
    }

    /**
     * Obtener producto por ID
     */
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst();
    }

    /**
     * Crear nuevo producto
     */
    public Producto crearProducto(Producto producto) {
        producto.setId(idGenerator.getAndIncrement());
        producto.setCreatedAt(LocalDateTime.now());
        productos.add(producto);
        return producto;
    }

    /**
     * Actualizar producto existente
     */
    public Optional<Producto> actualizarProducto(Long id, Producto productoActualizado) {
        for (int i = 0; i < productos.size(); i++) {
            if (productos.get(i).getId().equals(id)) {
                productoActualizado.setId(id);
                productoActualizado.setUpdatedAt(LocalDateTime.now());
                productos.set(i, productoActualizado);
                return Optional.of(productoActualizado);
            }
        }
        return Optional.empty();
    }

    /**
     * Eliminar producto
     */
    public boolean eliminarProducto(Long id) {
        return productos.removeIf(producto -> producto.getId().equals(id));
    }

    /**
     * Buscar productos por nombre
     */
    public List<Producto> buscarProductosPorNombre(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return obtenerTodosLosProductos();
        }
        
        return productos.stream()
                .filter(producto -> producto.getName().toLowerCase().contains(nombre.toLowerCase()))
                .toList();
    }

    /**
     * Buscar productos por categoría
     */
    public List<Producto> buscarProductosPorCategoria(Long categoryId) {
        return productos.stream()
                .filter(producto -> producto.getCategoryId() != null && producto.getCategoryId().equals(categoryId))
                .toList();
    }

    /**
     * Buscar productos por disponibilidad de stock
     */
    public List<Producto> buscarProductosPorStock(boolean disponible) {
        return productos.stream()
                .filter(producto -> disponible ? producto.getStock() > 0 : producto.getStock() == 0)
                .toList();
    }
}