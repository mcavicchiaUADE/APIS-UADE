# 🚀 Quick Start: Publicar Imágenes Docker

Guía rápida para que cada miembro del equipo publique sus propias imágenes Docker.

## ⚡ 3 Pasos

### 1️⃣ Crear cuenta en Docker Hub

Ve a [hub.docker.com](https://hub.docker.com/) y crea una cuenta gratuita.

### 2️⃣ Ejecutar el script

**En Windows (PowerShell):**
```powershell
.\publish-docker-images.ps1 -DockerHubUsername TU_USUARIO
```

**En Mac/Linux/Git Bash:**
```bash
chmod +x publish-docker-images.sh
./publish-docker-images.sh -u TU_USUARIO
```

### 3️⃣ ¡Listo!

El script:
- ✅ Construye Backend y Frontend
- ✅ Los etiqueta con tu usuario
- ✅ Los publica en Docker Hub

## 📝 Ejemplo Real

```powershell
# Ejemplo para usuario "johndoe"
.\publish-docker-images.ps1 -DockerHubUsername johndoe
```

Tu Docker Hub quedaría así:
- `johndoe/ecommerce-backend:latest`
- `johndoe/ecommerce-frontend:latest`

## 🔗 URLs

- Docker Hub: `https://hub.docker.com/u/TU_USUARIO`
- Ver mis imágenes: `https://hub.docker.com/u/bautistabozzer` (ejemplo)

## ❓ ¿Problemas?

Lee la guía completa: [PUBLISH-DOCKER-README.md](./PUBLISH-DOCKER-README.md)

## 🎯 ¿Qué hace el script?

```
[1/7] Verificar Docker ✓
[2/7] Verificar directorio ✓
[3/7] Verificar login ✓
[4/7] Construir imágenes ✓
[5/7] Etiquetar imágenes ✓
[6/7] Publicar en Docker Hub ✓
[7/7] Verificar publicación ✓
```

✅ Todo automático, sin intervención manual.

---

**Tiempo estimado**: 10-15 minutos (primera vez)

**Nota**: Las primeras 5 imágenes son gratis en Docker Hub.

