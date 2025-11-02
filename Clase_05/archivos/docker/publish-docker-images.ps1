# Script para publicar imágenes Docker del E-commerce en Docker Hub
# Por favor, personaliza tu nombre de usuario de Docker Hub

param(
    [string]$DockerHubUsername = "",
    [switch]$BuildOnly = $false,
    [switch]$SkipBackend = $false,
    [switch]$SkipFrontend = $false
)

# ========================================
# CONFIGURACIÓN
# ========================================
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   PUBLISH DOCKER IMAGES TO DOCKER HUB  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si el usuario proporcionó su nombre de Docker Hub
if ([string]::IsNullOrWhiteSpace($DockerHubUsername)) {
    Write-Host "Por favor, proporciona tu nombre de usuario de Docker Hub:" -ForegroundColor Yellow
    Write-Host "Uso: .\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ejemplo: .\publish-docker-images.ps1 -DockerHubUsername johndoe" -ForegroundColor Yellow
    exit 1
}

# Configuración de imágenes
$BackendImage = "$DockerHubUsername/ecommerce-backend:latest"
$FrontendImage = "$DockerHubUsername/ecommerce-frontend:latest"

Write-Host "Usuario de Docker Hub: $DockerHubUsername" -ForegroundColor Green
Write-Host "Imagen Backend: $BackendImage" -ForegroundColor Green
Write-Host "Imagen Frontend: $FrontendImage" -ForegroundColor Green
Write-Host ""

# ========================================
# VERIFICACIONES
# ========================================

# Verificar que Docker esté instalado
Write-Host "[1/7] Verificando Docker..." -ForegroundColor Cyan
try {
    docker --version | Out-Null
    Write-Host "✓ Docker instalado correctamente" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker no está instalado o no está en PATH" -ForegroundColor Red
    exit 1
}

# Verificar que estamos en el directorio correcto
Write-Host ""
Write-Host "[2/7] Verificando directorio..." -ForegroundColor Cyan
if (-not (Test-Path ".\docker-compose.yml")) {
    Write-Host "✗ No se encontró docker-compose.yml. Asegúrate de ejecutar este script desde TPO-Ecommerce/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Directorio correcto" -ForegroundColor Green

# Verificar login en Docker Hub
Write-Host ""
Write-Host "[3/7] Verificando login en Docker Hub..." -ForegroundColor Cyan
$dockerConfig = "$env:USERPROFILE\.docker\config.json"
if (-not (Test-Path $dockerConfig)) {
    Write-Host "⚠ No se encontró configuración de Docker. Iniciando login..." -ForegroundColor Yellow
    Write-Host "Por favor, ingresa tus credenciales de Docker Hub:" -ForegroundColor Yellow
    docker login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error en login de Docker Hub" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ Configuración de Docker encontrada" -ForegroundColor Green
}

# ========================================
# CONSTRUCCIÓN DE IMÁGENES
# ========================================

Write-Host ""
Write-Host "[4/7] Construyendo imágenes..." -ForegroundColor Cyan

# Construir Backend
if (-not $SkipBackend) {
    Write-Host ""
    Write-Host "  Construyendo Backend..." -ForegroundColor Yellow
    docker-compose build backend
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error construyendo Backend" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Backend construido correctamente" -ForegroundColor Green
} else {
    Write-Host "  ⏭ Saltando Backend..." -ForegroundColor Yellow
}

# Construir Frontend
if (-not $SkipFrontend) {
    Write-Host ""
    Write-Host "  Construyendo Frontend..." -ForegroundColor Yellow
    docker-compose build frontend
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error construyendo Frontend" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Frontend construido correctamente" -ForegroundColor Green
} else {
    Write-Host "  ⏭ Saltando Frontend..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✓ Todas las imágenes construidas correctamente" -ForegroundColor Green

# Si solo es build, terminar aquí
if ($BuildOnly) {
    Write-Host ""
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host "   BUILD COMPLETADO                      " -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host ""
    exit 0
}

# ========================================
# ETIQUETADO DE IMÁGENES
# ========================================

Write-Host ""
Write-Host "[5/7] Etiquetando imágenes..." -ForegroundColor Cyan

# Etiquetar Backend
if (-not $SkipBackend) {
    Write-Host ""
    Write-Host "  Etiquetando Backend..." -ForegroundColor Yellow
    docker tag tpo-ecommerce-backend:latest $BackendImage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error etiquetando Backend" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Backend etiquetado como: $BackendImage" -ForegroundColor Green
}

# Etiquetar Frontend
if (-not $SkipFrontend) {
    Write-Host ""
    Write-Host "  Etiquetando Frontend..." -ForegroundColor Yellow
    docker tag tpo-ecommerce-frontend:latest $FrontendImage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error etiquetando Frontend" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Frontend etiquetado como: $FrontendImage" -ForegroundColor Green
}

Write-Host ""
Write-Host "✓ Imágenes etiquetadas correctamente" -ForegroundColor Green

# ========================================
# PUBLICACIÓN EN DOCKER HUB
# ========================================

Write-Host ""
Write-Host "[6/7] Publicando imágenes en Docker Hub..." -ForegroundColor Cyan

# Publicar Backend
if (-not $SkipBackend) {
    Write-Host ""
    Write-Host "  Publicando Backend... (esto puede tardar varios minutos)" -ForegroundColor Yellow
    docker push $BackendImage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error publicando Backend" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Backend publicado en Docker Hub" -ForegroundColor Green
}

# Publicar Frontend
if (-not $SkipFrontend) {
    Write-Host ""
    Write-Host "  Publicando Frontend... (esto puede tardar varios minutos)" -ForegroundColor Yellow
    docker push $FrontendImage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error publicando Frontend" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Frontend publicado en Docker Hub" -ForegroundColor Green
}

Write-Host ""
Write-Host "✓ Imágenes publicadas correctamente" -ForegroundColor Green

# ========================================
# VERIFICACIÓN FINAL
# ========================================

Write-Host ""
Write-Host "[7/7] Verificando imágenes publicadas..." -ForegroundColor Cyan

# Verificar Backend
if (-not $SkipBackend) {
    docker images | Select-String $DockerHubUsername | Select-String "ecommerce-backend" | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Backend verificado: $BackendImage" -ForegroundColor Green
    }
}

# Verificar Frontend
if (-not $SkipFrontend) {
    docker images | Select-String $DockerHubUsername | Select-String "ecommerce-frontend" | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Frontend verificado: $FrontendImage" -ForegroundColor Green
    }
}

# ========================================
# RESULTADO FINAL
# ========================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   ✓ PUBLICACIÓN COMPLETADA              " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Tus imágenes están disponibles en:" -ForegroundColor Green
if (-not $SkipBackend) {
    Write-Host "  Backend:  docker pull $BackendImage" -ForegroundColor White
}
if (-not $SkipFrontend) {
    Write-Host "  Frontend: docker pull $FrontendImage" -ForegroundColor White
}

Write-Host ""
Write-Host "Para usar tus imágenes localmente, actualiza docker-compose.prod.yml:" -ForegroundColor Yellow
Write-Host "  backend:  $BackendImage" -ForegroundColor White
Write-Host "  frontend: $FrontendImage" -ForegroundColor White
Write-Host ""
Write-Host "Luego ejecuta: docker-compose -f docker-compose.prod.yml up -d" -ForegroundColor Yellow
Write-Host ""

# Mostrar URL de Docker Hub
$dockerHubUrl = "https://hub.docker.com/u/$DockerHubUsername"
Write-Host "Ver tus imágenes en: $dockerHubUrl" -ForegroundColor Cyan
Write-Host ""

