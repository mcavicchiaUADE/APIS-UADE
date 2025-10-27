# ========================================
# STAGE 1: Build - Compilar el proyecto
# ========================================
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar archivos de configuración Maven
COPY pom.xml .
COPY src ./src

# Descargar dependencias (esto se cachea si no cambia pom.xml)
RUN mvn dependency:go-offline -B

# Compilar y empaquetar (genera el JAR)
RUN mvn clean package -DskipTests

# ========================================
# STAGE 2: Runtime - Imagen final ligera
# ========================================
FROM eclipse-temurin:17-jre-alpine

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Crear usuario no-root para seguridad
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

WORKDIR /app

# Copiar el JAR desde la etapa de build
COPY --from=build /app/target/ecommerce-backend-0.0.1-SNAPSHOT.jar app.jar

# Puerto expuesto
EXPOSE 8081

# Healthcheck para verificar que la app está saludable
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8081/api/categorias || exit 1

# Ejecutar la aplicación con perfil docker activo
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]

