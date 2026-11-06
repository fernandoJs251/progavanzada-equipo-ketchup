# 🏍️ BIKERSTOCK3D - Backend en Flask & Base de Datos Relacional

API REST desarrollada con **Python, Flask y Flask-SQLAlchemy** para la gestión de catálogo de cascos con visualización 3D, inventario, usuarios con roles (ADMIN, VENDEDOR, CLIENTE), carrito y pedidos.

---

## 🚀 Inicio Rápido del Servidor Flask

```bash
# 1. Ingresar a la carpeta del backend
cd back-end

# 2. Iniciar el servidor
python app.py
```

El servidor se iniciará automáticamente en:
👉 **[http://localhost:5000](http://localhost:5000)**

> **Nota:** Al arrancar por primera vez, Flask creará automáticamente todas las tablas relacionales y cargará los **Seeders** con los 12 cascos con imágenes reales de alta resolución (Unsplash), categorías, usuarios y órdenes demo.

---

## 🗄️ Base de Datos: SQLite / PostgreSQL

* **Por defecto (Cero configuración):** Utiliza SQLite persistente en `back-end/bikerstock3d.db`.
* **Para conectar con PostgreSQL:** Define la variable de entorno `DATABASE_URL`:
  ```bash
  # En Windows PowerShell:
  $env:DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/bikerstock3d"
  python app.py
  ```

---

## 👥 Credenciales de Acceso Demo

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **ADMIN** | `admin@bikerstock3d.com` | `password123` |
| **VENDEDOR** | `ventas@bikerstock3d.com` | `password123` |
| **CLIENTE** | `carlos.mamani@email.com` | `password123` |

---

## 📡 Endpoints Principales de la API

### Autenticación
* `POST /api/auth/register` - Registro de nuevos clientes
* `POST /api/auth/login` - Inicio de sesión con generación de JWT
* `GET  /api/auth/me` - Perfil del usuario autenticado
* `POST /api/auth/switch-role` - Simulador de cambio de rol para evaluadores

### Catálogo y Cascos
* `GET    /api/cascos` - Listar cascos (filtros: `q`, `categoria`, `marca`, `talla`, `inStock`)
* `GET    /api/cascos/<id>` - Detalle completo del casco
* `POST   /api/cascos` - Crear nuevo casco en inventario (Admin/Vendedor)
* `PUT    /api/cascos/<id>` - Actualizar datos del casco
* `PATCH  /api/cascos/<id>/stock` - Ajuste rápido de existencias (`+1`, `-1`, o cantidad)
* `DELETE /api/cascos/<id>` - Eliminar casco del catálogo
* `GET    /api/categorias` - Listado de las 4 categorías principales con conteo de modelos

### Carrito y Pedidos
* `GET   /api/pedidos` - Historial de pedidos
* `POST  /api/pedidos` - Procesar orden desde el Checkout (descuenta stock automáticamente)
* `PATCH /api/pedidos/<id>/estado` - Cambiar estado logístico (*Pendiente*, *Confirmado*, *Preparando*, *Entregado*, *Cancelado*)

### Panel Administrativo
* `GET /api/dashboard/metrics` - Métricas operativas, alertas de stock bajo y distribución
* `GET /api/clientes` - Directorio de clientes con historial de compras
* `GET /api/ventas` - Registro de ventas para emisión de comprobantes

