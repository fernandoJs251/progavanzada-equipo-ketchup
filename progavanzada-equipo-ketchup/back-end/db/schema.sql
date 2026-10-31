-- ============================================================
-- BIKERSTOCK3D - Esquema de Base de Datos PostgreSQL
-- Proyecto: Sistema de Control de Inventario y Gestión de Ventas de Cascos 3D
-- ============================================================

-- Tabla de Usuarios y Roles
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'CLIENTE' CHECK (rol IN ('ADMIN', 'VENDEDOR', 'CLIENTE')),
    avatar TEXT,
    telefono VARCHAR(40),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Categorías de Cascos
CREATE TABLE IF NOT EXISTS categorias (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    descripcion TEXT,
    imagen TEXT,
    icono VARCHAR(40)
);

-- Tabla de Cascos (Inventario / Productos)
CREATE TABLE IF NOT EXISTS cascos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    marca VARCHAR(80) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    precio_anterior NUMERIC(10, 2),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    stock_minimo INT NOT NULL DEFAULT 3,
    talla VARCHAR(10) NOT NULL DEFAULT 'M',
    tallas_disponibles TEXT[] NOT NULL DEFAULT '{"M"}',
    color VARCHAR(80) NOT NULL,
    colores_disponibles TEXT[] NOT NULL DEFAULT '{"Negro Mate"}',
    imagen TEXT NOT NULL,
    imagenes TEXT[] NOT NULL DEFAULT '{}',
    descripcion TEXT,
    caracteristicas TEXT[] NOT NULL DEFAULT '{}',
    modelo_3d VARCHAR(255) DEFAULT '/models/casco.glb',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    homologacion VARCHAR(80) DEFAULT 'ECE 22.06',
    peso VARCHAR(50) DEFAULT '1500g',
    destacado BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Pedidos / Órdenes de Venta
CREATE TABLE IF NOT EXISTS pedidos (
    id VARCHAR(50) PRIMARY KEY,
    numero_pedido VARCHAR(50) UNIQUE NOT NULL,
    cliente_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    cliente_nombre VARCHAR(120) NOT NULL,
    cliente_apellido VARCHAR(120) NOT NULL,
    cliente_ci VARCHAR(40) NOT NULL,
    cliente_telefono VARCHAR(40) NOT NULL,
    cliente_correo VARCHAR(150),
    cliente_direccion TEXT NOT NULL,
    cliente_ciudad VARCHAR(60) NOT NULL DEFAULT 'La Paz',
    cliente_notas TEXT,
    subtotal NUMERIC(10, 2) NOT NULL,
    envio NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'Confirmado' CHECK (estado IN ('Pendiente', 'Confirmado', 'Preparando', 'Entregado', 'Cancelado')),
    metodo_pago VARCHAR(50) NOT NULL DEFAULT 'QR',
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Items del Pedido
CREATE TABLE IF NOT EXISTS pedido_items (
    id SERIAL PRIMARY KEY,
    pedido_id VARCHAR(50) NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    casco_id INT REFERENCES cascos(id) ON DELETE SET NULL,
    nombre VARCHAR(150) NOT NULL,
    marca VARCHAR(80) NOT NULL,
    imagen TEXT,
    talla VARCHAR(10) NOT NULL,
    color VARCHAR(80) NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    subtotal NUMERIC(10, 2) NOT NULL
);

-- Índices de Rendimiento
CREATE INDEX IF NOT EXISTS idx_cascos_categoria ON cascos(categoria);
CREATE INDEX IF NOT EXISTS idx_cascos_marca ON cascos(marca);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente_id ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedido_items_pedido_id ON pedido_items(pedido_id);
