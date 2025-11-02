# 🚀 Guía de Publicación de Imágenes Docker

Este documento explica cómo publicar las imágenes Docker del proyecto E-commerce en tu propio Docker Hub.

## 📋 Requisitos Previos

1. **Cuenta de Docker Hub**: Crea una cuenta gratuita en [hub.docker.com](https://hub.docker.com/)
2. **Docker Desktop**: Instala Docker Desktop en tu máquina
3. **Script PowerShell**: El script `publish-docker-images.ps1` está configurado

## 🎯 Uso Básico

### Publicar todas las imágenes

```powershell
# Desde el directorio TPO-Ecommerce
.\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO_DOCKERHUB

# Ejemplo
.\publish-docker-images.ps1 -DockerHubUsername johndoe
```

Este comando:
1. ✅ Construye las imágenes Backend y Frontend
2. ✅ Las etiqueta con tu usuario de Docker Hub
3. ✅ Las publica en Docker Hub

### Opciones Adicionales

#### Solo construir sin publicar

```powershell
.\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO -BuildOnly
```

#### Publicar solo una imagen

```powershell
# Solo Backend
.\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO -SkipFrontend

# Solo Frontend
.\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO -SkipBackend
```

## 📝 Proceso Paso a Paso

### 1. Primera Ejecución

En tu primera ejecución, Docker te pedirá hacer login:

```powershell
> .\publish-docker-images.ps1 -DockerHubUsername johndoe

[3/7] Verificando login en Docker Hub...
Username: johndoe
Password: **********
Login Succeeded
```

### 2. Construcción de Imágenes

El script construye las imágenes usando `docker-compose build`:

```
[4/7] Construyendo imágenes...
  Construyendo Backend...
  ✓ Backend construido correctamente
  Construyendo Frontend...
  ✓ Frontend construido correctamente
```

### 3. Etiquetado

Etiqueta las imágenes con tu usuario de Docker Hub:

```
[5/7] Etiquetando imágenes...
  Etiquetando Backend...
  ✓ Backend etiquetado como: johndoe/ecommerce-backend:latest
  Etiquetando Frontend...
  ✓ Frontend etiquetado como: johndoe/ecommerce-frontend:latest
```

### 4. Publicación

Las imágenes se suben a Docker Hub:

```
[6/7] Publicando imágenes en Docker Hub...
  Publicando Backend... (esto puede tardar varios minutos)
  ✓ Backend publicado en Docker Hub
  Publicando Frontend... (esto puede tardar varios minutos)
  ✓ Frontend publicado en Docker Hub
```

### 5. Verificación

El script verifica que todo se publicó correctamente:

```
[7/7] Verificando imágenes publicadas...
  ✓ Backend verificado: johndoe/ecommerce-backend:latest
  ✓ Frontend verificado: johndoe/ecommerce-frontend:latest
```

## 🔧 Usar tus Imágenes

Una vez publicadas, puedes usar tus imágenes de dos formas:

### Opción A: Usar tus imágenes en docker-compose.prod.yml

1. Edita `docker-compose.prod.yml`:

```yaml
backend:
  image: TU_USUARIO/ecommerce-backend:latest  # Cambia esta línea

frontend:
  image: TU_USUARIO/ecommerce-frontend:latest # Cambia esta línea
```

2. Usa docker-compose para producción:

```powershell
docker-compose -f docker-compose.prod.yml up -d
```

### Opción B: Usar docker pull manualmente

```powershell
docker pull TU_USUARIO/ecommerce-backend:latest
docker pull TU_USUARIO/ecommerce-frontend:latest
```

## 📊 Miembros del Equipo

Cada miembro tiene sus propias imágenes en Docker Hub:

| Miembro | Usuario Docker Hub | Imágenes |
|---------|-------------------|----------|
| Bautista Bozzer | `bautistabozzer` | ✅ Backend, Frontend |
| Marcos Cavicchia | `marcoscavicchia` | ⏳ Por publicar |
| Nahuel Milanesi | `nahuelmilanesi` | ⏳ Por publicar |
| Rodrigo Larrart | `rodrigolarrart` | ⏳ Por publicar |
| Luca Perez | `lucaperez` | ⏳ Por publicar |
| Borja Talavera | `borjatalavera` | ⏳ Por publicar |
| Nicolas Dos Santos | `nicolasdos` | ⏳ Por publicar |
| Santino Mariani | `santinomariani` | ⏳ Por publicar |

## 🔄 Actualizar Imágenes

Cuando hagas cambios en el código:

1. Ejecuta el script nuevamente:

```powershell
.\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO
```

2. Docker detectará los cambios y reconstruirá las imágenes

3. Las nuevas versiones se publicarán automáticamente

## ⚠️ Solución de Problemas

### Error: "Authentication required"

**Solución**: Inicia sesión en Docker Hub:

```powershell
docker login
```

### Error: "docker-compose not found"

**Solución**: Asegúrate de tener Docker Desktop instalado con Docker Compose v2

### Error: "denied: requested access to the resource is denied"

**Solución**: Verifica que estés usando tu propio usuario de Docker Hub

### Error: "no space left on device"

**Solución**: Limpia imágenes Docker antiguas:

```powershell
docker system prune -a
```

### Las imágenes tardan mucho en subir

**Causa**: Dependiendo de tu conexión a internet, esto es normal

**Solución**: 
- Backend: ~359MB
- Frontend: ~80MB

Total: ~439MB

Con una conexión de 10 Mbps, esto toma aproximadamente 6-8 minutos

## 📚 Comandos Útiles

```powershell
# Ver tus imágenes locales
docker images

# Ver imágenes remotas en Docker Hub
docker search TU_USUARIO

# Eliminar una imagen
docker rmi TU_USUARIO/ecommerce-backend:latest

# Ver logs de construcción
docker-compose build --progress=plain backend

# Limpiar todo
docker system prune -a --volumes
```

## ✅ Checklist de Publicación

- [ ] Cuenta creada en Docker Hub
- [ ] Docker Desktop instalado
- [ ] Login en Docker Hub (`docker login`)
- [ ] Script ejecutado exitosamente
- [ ] Imágenes verificadas en Docker Hub
- [ ] `docker-compose.prod.yml` actualizado (opcional)
- [ ] Imágenes funcionando correctamente

## 🎉 ¡Listo!

Una vez completado, tus imágenes estarán disponibles públicamente en Docker Hub y cualquier persona podrá descargarlas y usarlas.

**URL de tus imágenes**: `https://hub.docker.com/u/TU_USUARIO`

---

**Nota**: Las primeras 5 imágenes son gratis en Docker Hub. Después hay límites según el plan.

