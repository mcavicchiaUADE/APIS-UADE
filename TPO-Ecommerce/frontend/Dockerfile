# ========================================
# STAGE 1: Build - Construir la aplicación React
# ========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar TODAS las dependencias (necesitamos devDependencies para build)
# Forzamos producción = false para que instale todo
RUN NODE_ENV=development npm install

# Copiar código fuente
COPY . .

# Construir la aplicación en modo producción
ENV NODE_ENV=production
ENV VITE_API_URL=/api
RUN npm run build

# ========================================
# STAGE 2: Production - Servir con Nginx
# ========================================
FROM nginx:alpine

# Copiar archivos estáticos desde el build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

