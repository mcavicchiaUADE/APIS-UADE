#!/bin/bash

# Script para publicar imágenes Docker del E-commerce en Docker Hub
# Por favor, personaliza tu nombre de usuario de Docker Hub

set -e  # Detener en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Variables
DOCKER_HUB_USERNAME=""
BUILD_ONLY=false
SKIP_BACKEND=false
SKIP_FRONTEND=false

# Parsear argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        -u|--username)
            DOCKER_HUB_USERNAME="$2"
            shift 2
            ;;
        --build-only)
            BUILD_ONLY=true
            shift
            ;;
        --skip-backend)
            SKIP_BACKEND=true
            shift
            ;;
        --skip-frontend)
            SKIP_FRONTEND=true
            shift
            ;;
        -h|--help)
            echo "Uso: $0 -u TU_USUARIO_DOCKERHUB [opciones]"
            echo ""
            echo "Opciones:"
            echo "  -u, --username USUARIO    Tu usuario de Docker Hub (requerido)"
            echo "  --build-only              Solo construir, no publicar"
            echo "  --skip-backend            Omitir Backend"
            echo "  --skip-frontend           Omitir Frontend"
            echo "  -h, --help                Mostrar esta ayuda"
            echo ""
            echo "Ejemplo:"
            echo "  $0 -u johndoe"
            exit 0
            ;;
        *)
            echo -e "${RED}Opción desconocida: $1${NC}"
            exit 1
            ;;
    esac
done

# Encabezado
echo ""
echo "========================================="
echo -e "${CYAN}   PUBLISH DOCKER IMAGES TO DOCKER HUB  ${NC}"
echo "========================================="
echo ""

# Verificar que se proporcionó el usuario
if [ -z "$DOCKER_HUB_USERNAME" ]; then
    echo -e "${YELLOW}Por favor, proporciona tu nombre de usuario de Docker Hub${NC}"
    echo ""
    echo "Uso: $0 -u TU_USUARIO"
    echo "Ejemplo: $0 -u johndoe"
    exit 1
fi

# Configuración de imágenes
BACKEND_IMAGE="$DOCKER_HUB_USERNAME/ecommerce-backend:latest"
FRONTEND_IMAGE="$DOCKER_HUB_USERNAME/ecommerce-frontend:latest"

echo -e "${GREEN}Usuario de Docker Hub: $DOCKER_HUB_USERNAME${NC}"
echo -e "${GREEN}Imagen Backend: $BACKEND_IMAGE${NC}"
echo -e "${GREEN}Imagen Frontend: $FRONTEND_IMAGE${NC}"
echo ""

# Función para imprimir paso
print_step() {
    echo ""
    echo -e "${CYAN}[$1/7] $2${NC}"
}

# Función para imprimir éxito
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Función para imprimir error
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Función para imprimir advertencia
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Función para imprimir información
print_info() {
    echo -e "${YELLOW}  $1${NC}"
}

# ========================================
# VERIFICACIONES
# ========================================

print_step 1 "Verificando Docker..."
if command -v docker &> /dev/null; then
    print_success "Docker instalado correctamente"
else
    print_error "Docker no está instalado o no está en PATH"
    exit 1
fi

print_step 2 "Verificando directorio..."
if [ ! -f "docker-compose.yml" ]; then
    print_error "No se encontró docker-compose.yml. Asegúrate de ejecutar este script desde TPO-Ecommerce/"
    exit 1
fi
print_success "Directorio correcto"

print_step 3 "Verificando login en Docker Hub..."
if [ ! -f ~/.docker/config.json ]; then
    print_warning "No se encontró configuración de Docker. Iniciando login..."
    echo "Por favor, ingresa tus credenciales de Docker Hub:"
    docker login
    if [ $? -ne 0 ]; then
        print_error "Error en login de Docker Hub"
        exit 1
    fi
else
    print_success "Configuración de Docker encontrada"
fi

# ========================================
# CONSTRUCCIÓN DE IMÁGENES
# ========================================

print_step 4 "Construyendo imágenes..."

# Construir Backend
if [ "$SKIP_BACKEND" = false ]; then
    echo ""
    print_info "Construyendo Backend..."
    docker-compose build backend
    if [ $? -ne 0 ]; then
        print_error "Error construyendo Backend"
        exit 1
    fi
    print_success "Backend construido correctamente"
else
    print_info "⏭ Saltando Backend..."
fi

# Construir Frontend
if [ "$SKIP_FRONTEND" = false ]; then
    echo ""
    print_info "Construyendo Frontend..."
    docker-compose build frontend
    if [ $? -ne 0 ]; then
        print_error "Error construyendo Frontend"
        exit 1
    fi
    print_success "Frontend construido correctamente"
else
    print_info "⏭ Saltando Frontend..."
fi

echo ""
print_success "Todas las imágenes construidas correctamente"

# Si solo es build, terminar aquí
if [ "$BUILD_ONLY" = true ]; then
    echo ""
    echo "========================================="
    echo -e "${GREEN}   BUILD COMPLETADO                      ${NC}"
    echo "========================================="
    echo ""
    exit 0
fi

# ========================================
# ETIQUETADO DE IMÁGENES
# ========================================

print_step 5 "Etiquetando imágenes..."

# Etiquetar Backend
if [ "$SKIP_BACKEND" = false ]; then
    echo ""
    print_info "Etiquetando Backend..."
    docker tag tpo-ecommerce-backend:latest "$BACKEND_IMAGE"
    if [ $? -ne 0 ]; then
        print_error "Error etiquetando Backend"
        exit 1
    fi
    print_success "Backend etiquetado como: $BACKEND_IMAGE"
fi

# Etiquetar Frontend
if [ "$SKIP_FRONTEND" = false ]; then
    echo ""
    print_info "Etiquetando Frontend..."
    docker tag tpo-ecommerce-frontend:latest "$FRONTEND_IMAGE"
    if [ $? -ne 0 ]; then
        print_error "Error etiquetando Frontend"
        exit 1
    fi
    print_success "Frontend etiquetado como: $FRONTEND_IMAGE"
fi

echo ""
print_success "Imágenes etiquetadas correctamente"

# ========================================
# PUBLICACIÓN EN DOCKER HUB
# ========================================

print_step 6 "Publicando imágenes en Docker Hub..."

# Publicar Backend
if [ "$SKIP_BACKEND" = false ]; then
    echo ""
    print_info "Publicando Backend... (esto puede tardar varios minutos)"
    docker push "$BACKEND_IMAGE"
    if [ $? -ne 0 ]; then
        print_error "Error publicando Backend"
        exit 1
    fi
    print_success "Backend publicado en Docker Hub"
fi

# Publicar Frontend
if [ "$SKIP_FRONTEND" = false ]; then
    echo ""
    print_info "Publicando Frontend... (esto puede tardar varios minutos)"
    docker push "$FRONTEND_IMAGE"
    if [ $? -ne 0 ]; then
        print_error "Error publicando Frontend"
        exit 1
    fi
    print_success "Frontend publicado en Docker Hub"
fi

echo ""
print_success "Imágenes publicadas correctamente"

# ========================================
# VERIFICACIÓN FINAL
# ========================================

print_step 7 "Verificando imágenes publicadas..."

# Verificar Backend
if [ "$SKIP_BACKEND" = false ]; then
    if docker images | grep -q "$DOCKER_HUB_USERNAME.*ecommerce-backend"; then
        print_success "Backend verificado: $BACKEND_IMAGE"
    fi
fi

# Verificar Frontend
if [ "$SKIP_FRONTEND" = false ]; then
    if docker images | grep -q "$DOCKER_HUB_USERNAME.*ecommerce-frontend"; then
        print_success "Frontend verificado: $FRONTEND_IMAGE"
    fi
fi

# ========================================
# RESULTADO FINAL
# ========================================

echo ""
echo "========================================="
echo -e "${GREEN}   ✓ PUBLICACIÓN COMPLETADA              ${NC}"
echo "========================================="
echo ""

echo "Tus imágenes están disponibles en:"
if [ "$SKIP_BACKEND" = false ]; then
    echo "  Backend:  docker pull $BACKEND_IMAGE"
fi
if [ "$SKIP_FRONTEND" = false ]; then
    echo "  Frontend: docker pull $FRONTEND_IMAGE"
fi

echo ""
echo -e "${YELLOW}Para usar tus imágenes localmente, actualiza docker-compose.prod.yml:${NC}"
echo "  backend:  $BACKEND_IMAGE"
echo "  frontend: $FRONTEND_IMAGE"
echo ""
echo -e "${YELLOW}Luego ejecuta: docker-compose -f docker-compose.prod.yml up -d${NC}"
echo ""

# Mostrar URL de Docker Hub
echo -e "${CYAN}Ver tus imágenes en: https://hub.docker.com/u/$DOCKER_HUB_USERNAME${NC}"
echo ""

