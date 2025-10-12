package com.ecommerce.initializer;

import com.ecommerce.entity.Categoria;
import com.ecommerce.entity.Producto;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.Usuario;
import com.ecommerce.repository.CategoriaRepository;
import com.ecommerce.repository.ProductoRepository;
import com.ecommerce.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public void run(String... args) throws Exception {
        // Solo inicializar si no hay datos
        if (categoriaRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Crear categorías
        Categoria electronica = Categoria.builder()
                .nombre("Electrónica")
                .descripcion("Dispositivos electrónicos y tecnología")
                .build();

        Categoria ropa = Categoria.builder()
                .nombre("Ropa")
                .descripcion("Prendas de vestir y accesorios")
                .build();

        Categoria hogar = Categoria.builder()
                .nombre("Hogar")
                .descripcion("Artículos para el hogar y decoración")
                .build();

        Categoria deportes = Categoria.builder()
                .nombre("Deportes")
                .descripcion("Artículos deportivos y fitness")
                .build();

        Categoria libros = Categoria.builder()
                .nombre("Libros")
                .descripcion("Libros y material educativo")
                .build();

        categoriaRepository.saveAll(Arrays.asList(electronica, ropa, hogar, deportes, libros));

        // Crear usuarios
        Usuario admin = Usuario.builder()
                .nombre("Administrador")
                .email("admin@ecommerce.com")
                .password("admin123")  // Se encriptará en el service
                .role(Role.ADMIN)
                .build();

        Usuario usuario1 = Usuario.builder()
                .nombre("Juan Pérez")
                .email("juan@email.com")
                .password("password123")  // Se encriptará en el service
                .role(Role.USER)
                .build();

        Usuario usuario2 = Usuario.builder()
                .nombre("María García")
                .email("maria@email.com")
                .password("password123")  // Se encriptará en el service
                .role(Role.USER)
                .build();

        // Guardar usuarios usando el service para encriptar contraseñas
        usuarioService.saveUsuario(admin);
        usuarioService.saveUsuario(usuario1);
        usuarioService.saveUsuario(usuario2);

        // Crear productos de ejemplo
        Producto iphone = Producto.builder()
                .name("iPhone 15 Pro Max")
                .description("El iPhone más avanzado con chip A17 Pro, cámara de 48MP, pantalla Super Retina XDR de 6.7 pulgadas")
                .price(new BigDecimal("1299.99"))
                .stock(8)
                .images(Arrays.asList("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&crop=center"))
                .categoria(electronica)
                .ownerUser(usuario1)
                .build();

        Producto macbook = Producto.builder()
                .name("MacBook Air M2")
                .description("Laptop ultradelgada con chip M2 de Apple, pantalla Liquid Retina de 13.6 pulgadas")
                .price(new BigDecimal("1199.99"))
                .stock(12)
                .images(Arrays.asList("https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center"))
                .categoria(electronica)
                .ownerUser(usuario1)
                .build();

        Producto nike = Producto.builder()
                .name("Nike Air Max 270")
                .description("Zapatillas deportivas con tecnología Air Max, suela visible de 270 grados")
                .price(new BigDecimal("149.99"))
                .stock(20)
                .images(Arrays.asList("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&crop=center"))
                .categoria(ropa)
                .ownerUser(usuario2)
                .build();

        Producto sofa = Producto.builder()
                .name("Sofá 3 Plazas Moderno")
                .description("Sofá de 3 plazas con tapizado en tela gris, estructura de madera maciza")
                .price(new BigDecimal("899.99"))
                .stock(3)
                .images(Arrays.asList("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"))
                .categoria(hogar)
                .ownerUser(usuario2)
                .build();

        Producto balon = Producto.builder()
                .name("Balón de Fútbol Adidas Al Rihla")
                .description("Balón oficial de la Copa Mundial FIFA 2022, diseñado con tecnología aerodinámica avanzada")
                .price(new BigDecimal("89.99"))
                .stock(18)
                .images(Arrays.asList("https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&crop=center"))
                .categoria(deportes)
                .ownerUser(usuario1)
                .build();

        Producto libro = Producto.builder()
                .name("Don Quijote de la Mancha - Edición Anotada")
                .description("Clásico de la literatura española de Miguel de Cervantes en edición anotada")
                .price(new BigDecimal("24.99"))
                .stock(25)
                .images(Arrays.asList("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center"))
                .categoria(libros)
                .ownerUser(usuario2)
                .build();

        productoRepository.saveAll(Arrays.asList(iphone, macbook, nike, sofa, balon, libro));
    }
}
