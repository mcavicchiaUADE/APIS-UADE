# 🔐 CREDENCIALES DE ACCESO

## 👥 **USUARIOS DEL SISTEMA**

### **1. Administrador**
- **Email**: `admin@test.com`
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: ADMIN
- **Permisos**: Crear, editar y eliminar productos y categorías

### **2. Usuario 1**
- **Email**: `user1@test.com`
- **Username**: `user1`
- **Password**: `user123`
- **Role**: USER
- **Permisos**: Ver productos, agregar al carrito, realizar compras

### **3. Usuario Test**
- **Email**: `test@test.com`
- **Username**: `testuser`
- **Password**: `test123`
- **Role**: USER
- **Permisos**: Ver productos, agregar al carrito, realizar compras

---

## 🎯 **CÓMO INICIAR SESIÓN**

### **Opción 1: Usando Email**
```
Email: admin@test.com
Password: admin123
```

### **Opción 2: Usando Username**
```
Username: admin
Password: admin123
```

**Ambas opciones funcionan igual** - el backend acepta email o username.

---

## 🗄️ **VERIFICAR USUARIOS EN LA BASE DE DATOS**

```powershell
# Ver todos los usuarios
docker exec mysql-ecommerce mysql -u root -ppassword -e "USE ecommerce_db; SELECT id, email, username, nombre, apellido, role FROM usuarios;"
```

**Salida esperada:**
```
+----+------------------+-----------+--------+----------+-------+
| id | email            | username  | nombre | apellido | role  |
+----+------------------+-----------+--------+----------+-------+
|  1 | admin@test.com   | admin     | Admin  | User     | ADMIN |
|  2 | user1@test.com   | user1     | User   | One      | USER  |
|  3 | test@test.com    | testuser  | Test   | User     | USER  |
+----+------------------+-----------+--------+----------+-------+
```

---

## 🚀 **INICIO RÁPIDO**

### **1. Asegurar que MySQL esté corriendo**
```powershell
docker start mysql-ecommerce
```

### **2. Iniciar la aplicación**
```powershell
cd TPO-Ecommerce
npm run start
```

### **3. Abrir el navegador**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8081`

### **4. Hacer login**
En la página de login, usar cualquiera de estas credenciales:
- `admin@test.com` / `admin123`
- `user1@test.com` / `user123`
- `test@test.com` / `test123`

---

## ⚠️ **SOLUCIÓN DE PROBLEMAS**

### **Error: "Credenciales inválidas"**

**Causa**: La base de datos no tiene los usuarios cargados.

**Solución**:
```powershell
# 1. Detener cualquier proceso Java
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Recrear la base de datos
docker exec mysql-ecommerce mysql -u root -ppassword -e "DROP DATABASE IF EXISTS ecommerce_db; CREATE DATABASE ecommerce_db;"

# 3. Iniciar el backend (esto creará las tablas y usuarios automáticamente)
cd TPO-Ecommerce
npm run start
```

### **Verificar que los usuarios existen**
```powershell
docker exec mysql-ecommerce mysql -u root -ppassword -e "USE ecommerce_db; SELECT COUNT(*) as total_usuarios FROM usuarios;"
```

**Debe mostrar**: `total_usuarios: 3`

---

## 📊 **DATOS INICIALES**

Al iniciar el backend por primera vez, se cargan automáticamente:
- ✅ **3 usuarios** (admin, user1, testuser)
- ✅ **5 categorías** (Electrónicos, Ropa, Hogar, Deportes, Libros)
- ✅ **7 productos** de ejemplo con imágenes y descripciones

---

## 🔒 **SEGURIDAD**

- Las contraseñas están **encriptadas con BCrypt** en la base de datos
- Se usa **JWT (JSON Web Token)** para la autenticación
- Los tokens tienen una **validez de 24 horas**
- Las contraseñas **nunca se envían sin encriptar**

---

## 📝 **NOTAS**

1. **Primera vez**: Al ejecutar `npm run start` por primera vez, espera 10-15 segundos para que:
   - El backend compile
   - Se conecte a MySQL
   - Cree las tablas
   - Cargue los datos iniciales

2. **Cambiar contraseña**: Si necesitas cambiar una contraseña, edita el archivo:
   ```
   TPO-Ecommerce/backend/src/main/java/com/ecommerce/initializer/DataInitializer.java
   ```
   Y recrea la base de datos.

3. **Agregar más usuarios**: Puedes registrar nuevos usuarios desde la página de registro del frontend.

