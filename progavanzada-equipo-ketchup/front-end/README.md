# 🏍️ BIKERSTOCK3D - Tienda de Cascos de Motocicleta & Gestión 3D

Prototipo Frontend desarrollado para proyecto universitario con **React + TypeScript + Vite + Tailwind CSS**, visualización 3D mediante **Three.js / React Three Fiber / Drei**, analítica con **Recharts** y arquitectura modular desacoplada lista para conectar con API REST.

---

## 🚀 Inicio Rápido

Para ejecutar el proyecto en tu máquina local:

```bash
# 1. Acceder a la carpeta del proyecto
cd front-end

# 2. Instalar dependencias (si no se han instalado)
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre en tu navegador:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 📦 Estructura del Proyecto

```text
src/
├── types/             # Interfaces de TypeScript (Helmet, Order, Customer, Sale, User, etc.)
├── data/              # Datasets simulados (Cascos, Pedidos, Clientes, Ventas, Alertas)
├── services/          # Capa de servicios asíncrona lista para conectar a API REST (fetch/axios)
│   ├── productService.ts
│   ├── orderService.ts
│   ├── salesService.ts
│   ├── customerService.ts
│   └── authService.ts
├── context/           # Estado reactivo global
│   ├── CartContext.tsx      # Carrito persistente en localStorage y cálculos
│   ├── AuthContext.tsx      # Simulación de roles (ADMIN, VENDEDOR, CLIENTE)
│   ├── ProductContext.tsx   # Inventario en tiempo real y CRUD de cascos
│   └── ToastContext.tsx     # Notificaciones visuales tipo toast
├── components/
│   ├── common/        # Navbar, Footer, Badge, Modal, etc.
│   ├── home/          # Hero, CategoryGrid, FeaturedHelmets
│   ├── catalog/       # ProductCard, FilterSidebar
│   ├── product/       # Helmet3DViewer, Helmet3DModel (Three.js/R3F)
│   └── admin/         # AdminSidebar, AdminHeader
├── layouts/
│   ├── StoreLayout.tsx      # Layout público de la tienda web
│   └── AdminLayout.tsx      # Layout administrativo con sidebar
├── pages/
│   ├── Home.tsx             # Inicio con composición de casco deportivo
│   ├── Catalog.tsx          # Catálogo con filtros y ordenamiento (/cascos)
│   ├── ProductDetail.tsx    # Detalle del producto y visor 3D (/cascos/:id)
│   ├── Cart.tsx             # Carrito de compras (/carrito)
│   ├── Checkout.tsx         # Finalizar pedido simulado (/checkout)
│   ├── Orders.tsx           # Historial y seguimiento de pedidos (/pedidos)
│   ├── Login.tsx            # Login visual con selector de roles (/login)
│   └── admin/               # Suite Administrativa
│       ├── AdminDashboard.tsx   # Dashboard con KPIs y gráficos Recharts (/admin)
│       ├── AdminProducts.tsx    # CRUD de cascos con modal (/admin/productos)
│       ├── AdminInventory.tsx   # Semáforo de stock y barras (/admin/inventario)
│       ├── AdminSales.tsx       # Registro de ventas y facturación (/admin/ventas)
│       ├── AdminOrders.tsx      # Despacho y cambio de estados (/admin/pedidos)
│       ├── AdminCustomers.tsx   # Directorio de clientes (/admin/clientes)
│       ├── AdminReports.tsx     # Reportes con opción de impresión (/admin/reportes)
│       └── AdminAlerts.tsx      # Alertas de stock crítico (/admin/alertas)
├── App.tsx            # Enrutamiento de React Router DOM
└── main.tsx           # Punto de entrada de la aplicación web
```

---

## 🎮 Características Destacadas

### 1. Visualizador 3D Interactivo (Three.js + R3F + Drei)
- **Rotación 360°, zoom y paneo** con `OrbitControls`.
- **Apertura y cierre animado de la visera** con reflejos de policarbonato translúcido.
- **Selector de acabados en vivo**: Negro Mate, Rojo Racing, Titanio y Blanco Perla.
- **Preparado para modelos .glb**: Si colocas tu propio archivo en `public/models/casco.glb`, el visor lo detecta y renderiza automáticamente con `useGLTF`.

### 2. Tienda Web Completa (Área Pública)
- **Catálogo de Cascos**: Filtros combinados por Marca (LS2, AGV, HJC, Bell, Shoei, Fox, Airoh, MT), Categoría (Integral, Modular, Abierto, Off Road), Talla (XS a XXL), Rango de Precio y Disponibilidad en Stock.
- **Buscador y Ordenamiento**: Búsqueda en tiempo real y ordenación por popularidad, precio menor/mayor o nombre.
- **Carrito Reactivo**: Persistencia en `localStorage`, control de cantidades con límite de stock y cálculo automático de envío gratis a partir de Bs. 1.000.
- **Checkout Simulado**: Formulario completo con opciones de pago en Efectivo, Transferencia Bancaria y QR Simple con animación de confeti.
- **Mis Pedidos**: Seguimiento de estados: *Pendiente*, *Confirmado*, *Preparando*, *Entregado*, *Cancelado*.

### 3. Suite Administrativa (`/admin`)
- **Dashboard Gerencial**: 6 tarjetas KPI con métricas operativas y gráficos analíticos responsivos con **Recharts** (ventas mensuales, porcentaje por categoría y top productos).
- **Gestión de Cascos (CRUD)**: Modal para crear y editar cascos con descripción, precios, marcas, tallas, colores, stock mínimo y ruta 3D.
- **Control de Inventario**: Barras de nivel de stock, semaforización (Disponible, Stock bajo, Agotado) y botones rápidos de ajuste `+/-`.
- **Alertas del Sistema**: Detección automática de stock bajo el umbral mínimo con botón para marcar como resuelta.
- **Ventas y Facturación**: Listado con visor de comprobante de compra.
- **Gestión de Pedidos**: Selector directo para actualizar el estado logístico de cualquier pedido de cliente.
- **Reportes Financieros**: Análisis con tablas ordenables e informe listo para imprimir.

### 4. Demostración para Evaluadores (Simulador de Roles)
En el Navbar y en `/login`, puedes cambiar de rol con un solo clic entre:
- **ADMIN**: Acceso total al panel administrativo y métricas.
- **VENDEDOR**: Vista orientada a inventario y ventas.
- **CLIENTE**: Vista del comprador con carrito y pedidos.

---

## 🔌 Preparación para Conexión con Backend REST API
El código en `src/services/` está completamente desacoplado de la UI. Para conectar con un backend futuro (Node.js, Express, NestJS, FastAPI, Spring Boot, etc.), simplemente reemplaza las funciones simuladas por llamadas HTTP reales:

```typescript
// Ejemplo en src/services/productService.ts
async getProducts(): Promise<Helmet[]> {
  const res = await fetch('http://localhost:3000/api/cascos');
  return res.json();
}
```
