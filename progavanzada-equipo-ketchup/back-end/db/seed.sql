-- ============================================================
-- BIKERSTOCK3D - Semilla de Datos PostgreSQL
-- Inserta usuarios, categorías, cascos y pedidos iniciales
-- ============================================================

-- 1. Insertar Usuarios Demo
INSERT INTO usuarios (id, nombre, email, password_hash, rol, avatar, telefono)
VALUES
(1, 'Alejandro Morales', 'admin@bikerstock3d.com', '$2a$10$w00K0cE5s7BfB2xZlE9kxe4yS6bKk6mR8Gg8N2vT8Z8L8R8L8R8L8', 'ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', '+591 71002233'),
(2, 'Patricia Méndez', 'ventas@bikerstock3d.com', '$2a$10$w00K0cE5s7BfB2xZlE9kxe4yS6bKk6mR8Gg8N2vT8Z8L8R8L8R8L8', 'VENDEDOR', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', '+591 72334455'),
(3, 'Carlos Mamani', 'carlos.mamani@email.com', '$2a$10$w00K0cE5s7BfB2xZlE9kxe4yS6bKk6mR8Gg8N2vT8Z8L8R8L8R8L8', 'CLIENTE', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', '+591 76543210')
ON CONFLICT (id) DO UPDATE SET
    nombre = EXCLUDED.nombre,
    email = EXCLUDED.email,
    rol = EXCLUDED.rol;

-- Ajustar secuencia de usuarios
SELECT setval(pg_get_serial_sequence('usuarios', 'id'), (SELECT MAX(id) FROM usuarios));

-- 2. Insertar Categorías
INSERT INTO categorias (id, nombre, descripcion, imagen, icono)
VALUES
('integral', 'Integral', 'Máxima protección y aerodinámica deportiva para circuito y carretera.', 'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80', 'Shield'),
('modular', 'Modular', 'Versatilidad touring con mentonera abatible para viajes largos y ciudad.', 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80', 'RotateCw'),
('abierto', 'Abierto', 'Estilo retro, custom y libertad urbana con ventilación directa y ligereza.', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80', 'Wind'),
('off-road', 'Off Road', 'Diseñados para resistir el barro, saltos y desafíos de Motocross y Enduro.', 'https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80', 'Compass')
ON CONFLICT (id) DO UPDATE SET
    nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    imagen = EXCLUDED.imagen;

-- 3. Insertar Cascos Reales con especificaciones y fotos de Unsplash
INSERT INTO cascos (id, nombre, marca, categoria, precio, precio_anterior, stock, stock_minimo, talla, tallas_disponibles, color, colores_disponibles, imagen, imagenes, descripcion, caracteristicas, modelo_3d, rating, reviews_count, homologacion, peso, destacado)
VALUES
(
    1, 'LS2 Stream Evo', 'LS2', 'Integral', 750.00, 820.00, 8, 3, 'M',
    ARRAY['S', 'M', 'L', 'XL'], 'Negro Mate', ARRAY['Negro Mate', 'Titanio', 'Rojo Brillo'],
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80'
    ],
    'Casco aerodinámico integral fabricado en policarbonato HPTT de alta resistencia. Cuenta con visor solar retráctil integrado, ventilación dinámica y forro hipoalergénico desmontable y lavable.',
    ARRAY['Calota de HPTT', 'Visor solar interior', 'Cierre micrométrico metálico', 'Preparado para Pinlock 70 MaxVision'],
    '/models/casco.glb', 4.70, 42, 'ECE 22.06 / DOT', '15+50 ± 50g', true
),
(
    2, 'AGV K1 S', 'AGV', 'Integral', 1650.00, 1790.00, 2, 4, 'L',
    ARRAY['XS', 'S', 'M', 'L', 'XL'], 'Rojo Racing / Negro', ARRAY['Rojo Racing / Negro', 'Negro Mate', 'Azul Corsa'],
    'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=800&auto=format&fit=crop&q=80'
    ],
    'Nacido de la experiencia de AGV en MotoGP™. Spoiler aerodinámico probado en túnel de viento para máxima estabilidad a altas velocidades. Ventilación frontal optimizada con canales de aire EPS profundos.',
    ARRAY['Spoiler biplano aerodinámico', 'Campo de visión de 190°', 'Cierre anilla Doble D', 'Interior Dry-Comfort lavable'],
    '/models/casco.glb', 4.90, 88, 'ECE 22.06', '1500 ± 50g', true
),
(
    3, 'HJC i70', 'HJC', 'Integral', 1100.00, NULL, 0, 3, 'M',
    ARRAY['S', 'M', 'L'], 'Gris Nardo', ARRAY['Gris Nardo', 'Negro Brillante'],
    'https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80'
    ],
    'Casco de turismo deportivo ligero y compacto con una avanzada calota de policarbonato. Equipado con gafa solar desplegable con visión extendida y ventilación ACS.',
    ARRAY['Calota avanzada CAD', 'Visor solar integrado', 'Canales de aire ACS', 'Pinlock 100% Max Vision incluido'],
    '/models/casco.glb', 4.60, 35, 'ECE 22.05 / DOT', '1480 ± 45g', true
),
(
    4, 'MT Thunder 4 SV', 'MT Helmets', 'Integral', 850.00, 920.00, 14, 5, 'L',
    ARRAY['S', 'M', 'L', 'XL'], 'Negro y Rojo Flúor', ARRAY['Negro y Rojo Flúor', 'Negro Mate', 'Blanco Perla'],
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80'
    ],
    'El primer casco de gama accesible del mercado certificado bajo la estricta normativa europea ECE 22.06. Gran spoiler trasero de extracción rápida y gafa solar retráctil.',
    ARRAY['Homologación ECE 22.06', 'Extracción rápida de pantalla', 'Cierre micrométrico reforzado'],
    '/models/casco.glb', 4.80, 64, 'ECE 22.06', '1500 ± 50g', true
),
(
    5, 'Bell Qualifier DLX MIPS', 'Bell', 'Integral', 1850.00, NULL, 5, 2, 'XL',
    ARRAY['M', 'L', 'XL', 'XXL'], 'Blackout Carbon', ARRAY['Blackout Carbon', 'Gris Titanio'],
    'https://images.unsplash.com/photo-1606907568152-58fcb0a0a4e5?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1606907568152-58fcb0a0a4e5?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80'
    ],
    'Equipado con la tecnología MIPS® (Multi-Directional Impact Protection System) que reduce las fuerzas rotacionales transmitidas al cerebro en caso de impacto angular.',
    ARRAY['Sistema MIPS', 'Pantalla Transitions fotosensible', 'Compatibilidad Sena y Cardo'],
    '/models/casco.glb', 4.90, 52, 'DOT / ECE 22.05', '1550g', true
),
(
    6, 'Shoei NXR2', 'Shoei', 'Integral', 3600.00, 3850.00, 3, 2, 'M',
    ARRAY['S', 'M', 'L'], 'Basalt Grey', ARRAY['Basalt Grey', 'Negro Brillante', 'Blanco Puro'],
    'https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'
    ],
    'La cúspide del diseño japonés para cascos deportivos de calle. Calota AIM de fibra orgánica y multi-composite con aislamiento acústico de primera clase.',
    ARRAY['Calota de 5 capas AIM', 'Sistema médico E.Q.R.S.', 'Pantalla CWR-F2 Pinlock EVO', 'Hecho en Japón'],
    '/models/casco.glb', 5.00, 110, 'ECE 22.06', '1390 ± 50g', true
),
(
    7, 'LS2 FF900 Valiant II', 'LS2', 'Modular', 1950.00, NULL, 6, 3, 'L',
    ARRAY['M', 'L', 'XL'], 'Titanio Mate', ARRAY['Titanio Mate', 'Negro Brillo', 'Amarillo Neón'],
    'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80'
    ],
    'Casco modular convertible con mentonera abatible 180 grados hacia la nuca. Doble homologación P/J para circular en posición abierta o cerrada.',
    ARRAY['Doble homologación P/J', 'Mentonera 180°', 'Calota KPA', 'Visor solar Twin Shield'],
    '/models/casco.glb', 4.80, 73, 'ECE 22.05 P/J', '1700 ± 50g', false
),
(
    8, 'HJC RPHA 91', 'HJC', 'Modular', 2900.00, NULL, 4, 2, 'M',
    ARRAY['S', 'M', 'L', 'XL'], 'Negro Perlado', ARRAY['Negro Perlado', 'Plata Metal'],
    'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80'
    ],
    'El nuevo modular touring insignia de HJC. Diseñado para un silencio extraordinario en ruta con calota P.I.M. EVO de fibra de carbono-aramida.',
    ARRAY['Carbono y Fibra P.I.M. EVO', 'Interior 3D bajo ruido', 'Certificado ECE 22.06 P/J'],
    '/models/casco.glb', 4.90, 39, 'ECE 22.06 P/J', '1650 ± 50g', false
),
(
    9, 'Bell Custom 500', 'Bell', 'Abierto', 950.00, NULL, 9, 3, 'M',
    ARRAY['S', 'M', 'L'], 'Negro Clásico / Cuero', ARRAY['Negro Clásico / Cuero', 'Vintage White'],
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'
    ],
    'Homenaje al diseño original de Roy Richter en 1954. Estilo retro custom cafe-racer con calota de perfil bajo y acabados en símil cuero.',
    ARRAY['Fibra de vidrio compacta', 'Broches universales frontales', 'Cierre Doble D acolchado'],
    '/models/casco.glb', 4.60, 29, 'DOT / ECE 22.05', '1100 ± 50g', false
),
(
    10, 'MT Streetfighter SV', 'MT Helmets', 'Abierto', 790.00, 860.00, 11, 4, 'L',
    ARRAY['M', 'L', 'XL'], 'Gris Militar Mate', ARRAY['Gris Militar Mate', 'Negro Mate'],
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80'
    ],
    'Casco convertible estilo Streetfighter con máscara frontal extraíble. Ideal para desplazamientos urbanos agresivos con soporte para cámara.',
    ARRAY['Máscara desmontable con clip', 'Soporte para GoPro integrado', 'Gafa solar ahumada interior'],
    '/models/casco.glb', 4.70, 47, 'ECE 22.05 / DOT', '1350 ± 50g', false
),
(
    11, 'Fox Racing V3 RS', 'Fox', 'Off Road', 3200.00, NULL, 3, 2, 'L',
    ARRAY['M', 'L', 'XL'], 'Rojo / Blanco Team', ARRAY['Rojo / Blanco Team', 'Negro Carbono'],
    'https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80'
    ],
    'El pináculo del Motocross y Enduro profesional. Incorpora el sistema MIPS Integra Split y visera magnetizada con liberación inteligente.',
    ARRAY['Fibra de carbono 4K', 'MIPS Integra Split', 'Visera MVRS de liberación rápida'],
    '/models/casco.glb', 4.90, 31, 'ECE 22.06 / DOT', '1280 ± 50g', true
),
(
    12, 'Airoh Aviator 3', 'Airoh', 'Off Road', 3450.00, NULL, 5, 2, 'M',
    ARRAY['S', 'M', 'L'], 'Six Days Edition', ARRAY['Six Days Edition', 'Negro Mate'],
    'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80'
    ],
    'Campeón indiscutible del Campeonato Mundial de Motocross MXGP. Desarrollado en túnel de viento aerodinámico con sistema magnético AMS2 Plus.',
    ARRAY['Carbon Kevlar HPC', 'Sistema magnético AMLS', 'Canalización de hidratación integrada AHS'],
    '/models/casco.glb', 5.00, 56, 'ECE 22.06', '1330 ± 50g', false
)
ON CONFLICT (id) DO UPDATE SET
    nombre = EXCLUDED.nombre,
    precio = EXCLUDED.precio,
    stock = EXCLUDED.stock,
    imagen = EXCLUDED.imagen,
    imagenes = EXCLUDED.imagenes;

-- Ajustar secuencia de cascos
SELECT setval(pg_get_serial_sequence('cascos', 'id'), (SELECT MAX(id) FROM cascos));

-- 4. Insertar Pedidos Iniciales
INSERT INTO pedidos (id, numero_pedido, cliente_id, cliente_nombre, cliente_apellido, cliente_ci, cliente_telefono, cliente_correo, cliente_direccion, cliente_ciudad, cliente_notas, subtotal, envio, total, estado, metodo_pago, fecha)
VALUES
('ord-101', 'BKS-2026-001', 3, 'Carlos', 'Mamani', '8472910 LP', '+591 76543210', 'carlos.mamani@email.com', 'Av. Arce #2430, Edif. Torre Azul', 'La Paz', 'Entregar por la tarde', 750.00, 0.00, 750.00, 'Confirmado', 'QR', '2026-09-24 14:30:00'),
('ord-102', 'BKS-2026-002', NULL, 'Alejandra', 'Vargas', '6548123 SC', '+591 78912345', 'alejandra.v@gmail.com', 'Calle Beni #410', 'Santa Cruz', 'Llamar antes de entregar', 1650.00, 35.00, 1685.00, 'Preparando', 'Transferencia bancaria', '2026-09-25 10:15:00')
ON CONFLICT (id) DO NOTHING;

-- 5. Insertar Items de los Pedidos Iniciales
INSERT INTO pedido_items (pedido_id, casco_id, nombre, marca, imagen, talla, color, precio_unitario, cantidad, subtotal)
VALUES
('ord-101', 1, 'LS2 Stream Evo', 'LS2', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80', 'M', 'Negro Mate', 750.00, 1, 750.00),
('ord-102', 2, 'AGV K1 S', 'AGV', 'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80', 'L', 'Rojo Racing / Negro', 1650.00, 1, 1650.00);
