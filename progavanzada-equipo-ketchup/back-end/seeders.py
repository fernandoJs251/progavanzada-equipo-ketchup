from werkzeug.security import generate_password_hash
from models import db, Usuario, Categoria, Casco, Pedido, PedidoItem
from datetime import datetime

def seed_database(force=False):
    """Pobla la base de datos con registros reales e iniciales si está vacía o si force=True"""
    if force:
        PedidoItem.query.delete()
        Pedido.query.delete()
        Casco.query.delete()
        Categoria.query.delete()
        Usuario.query.delete()
        db.session.commit()
    # 1. Semilla de Categorías
    if Categoria.query.count() == 0:
        categories = [
            Categoria(
                id="integral",
                nombre="Integral",
                descripcion="Máxima protección y aerodinámica deportiva para circuito y carretera.",
                imagen="https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80",
                icono="Shield"
            ),
            Categoria(
                id="modular",
                nombre="Modular",
                descripcion="Versatilidad touring con mentonera abatible para viajes largos y ciudad.",
                imagen="https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80",
                icono="RotateCw"
            ),
            Categoria(
                id="abierto",
                nombre="Abierto",
                descripcion="Estilo retro, custom y libertad urbana con ventilación directa y ligereza.",
                imagen="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80",
                icono="Wind"
            ),
            Categoria(
                id="off-road",
                nombre="Off Road",
                descripcion="Diseñados para resistir el barro, saltos y desafíos de Motocross y Enduro.",
                imagen="https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80",
                icono="Compass"
            )
        ]
        db.session.add_all(categories)
        db.session.commit()
        print("  ✓ Categorías inicializadas")

    # 2. Semilla de Usuarios Demo
    if Usuario.query.count() == 0:
        hashed_pw = generate_password_hash('password123')
        users = [
            Usuario(
                id=1,
                nombre="Alejandro Morales",
                email="admin@bikerstock3d.com",
                password_hash=hashed_pw,
                rol="ADMIN",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
                telefono="+591 71002233"
            ),
            Usuario(
                id=2,
                nombre="Patricia Méndez",
                email="ventas@bikerstock3d.com",
                password_hash=hashed_pw,
                rol="VENDEDOR",
                avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
                telefono="+591 72334455"
            ),
            Usuario(
                id=3,
                nombre="Carlos Mamani",
                email="carlos.mamani@email.com",
                password_hash=hashed_pw,
                rol="CLIENTE",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
                telefono="+591 76543210"
            )
        ]
        db.session.add_all(users)
        db.session.commit()
        print("  ✓ Usuarios demo inicializados")

    # 3. Semilla de Cascos con Fotos Reales de Unsplash
    if Casco.query.count() == 0:
        helmets = [
            Casco(
                id=1,
                nombre="LS2 Stream Evo",
                marca="LS2",
                categoria="Integral",
                precio=750.0,
                precio_anterior=820.0,
                stock=8,
                stock_minimo=3,
                talla="M",
                tallas_disponibles=["S", "M", "L", "XL"],
                color="Negro Mate",
                colores_disponibles=["Negro Mate", "Titanio", "Rojo Brillo"],
                imagen="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Casco aerodinámico integral fabricado en policarbonato HPTT de alta resistencia. Cuenta con visor solar retráctil integrado, ventilación dinámica y forro hipoalergénico desmontable y lavable.",
                caracteristicas=[
                    "Calota de HPTT (High Pressure Thermoplastic Technology)",
                    "Pantalla con tratamiento antirrayas y protección UV",
                    "Visor solar interior desplegable con pulsador lateral",
                    "Cierre micrométrico metálico de rápida liberación",
                    "Preparado para sistema antivaho Pinlock 70 MaxVision"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.7,
                reviews_count=42,
                homologacion="ECE 22.06 / DOT",
                peso="1550 ± 50g",
                destacado=True
            ),
            Casco(
                id=2,
                nombre="AGV K1 S",
                marca="AGV",
                categoria="Integral",
                precio=1650.0,
                precio_anterior=1790.0,
                stock=2,
                stock_minimo=4,
                talla="L",
                tallas_disponibles=["XS", "S", "M", "L", "XL"],
                color="Rojo Racing / Negro",
                colores_disponibles=["Rojo Racing / Negro", "Negro Mate", "Azul Corsa"],
                imagen="https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Nacido de la experiencia de AGV en MotoGP™. Spoiler aerodinámico probado en túnel de viento para máxima estabilidad a altas velocidades. Ventilación frontal optimizada con canales de aire EPS profundos.",
                caracteristicas=[
                    "Diseño derivado directamente de la pista Pista GP RR",
                    "Spoiler biplano aerodinámico que reduce turbulencias",
                    "Pantalla panorámica con campo de visión horizontal de 190°",
                    "Cierre de seguridad con anilla Doble D",
                    "Interior Dry-Comfort transpirable y lavable"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.9,
                reviews_count=88,
                homologacion="ECE 22.06",
                peso="1500 ± 50g",
                destacado=True
            ),
            Casco(
                id=3,
                nombre="HJC i70",
                marca="HJC",
                categoria="Integral",
                precio=1100.0,
                precio_anterior=None,
                stock=0,
                stock_minimo=3,
                talla="M",
                tallas_disponibles=["S", "M", "L"],
                color="Gris Nardo",
                colores_disponibles=["Gris Nardo", "Negro Brillante"],
                imagen="https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Casco de turismo deportivo ligero y compacto con una avanzada calota de policarbonato. Equipado con gafa solar desplegable con visión extendida y ventilación ACS (Advanced Channeling Ventilation System).",
                caracteristicas=[
                    "Calota avanzada de compuesto de policarbonato CAD",
                    "Visor solar interior con accionamiento en el borde inferior",
                    "Canalizaciones de aire ACS que evacuan humedad y calor",
                    "Ranuras interiores para usuarios de gafas graduadas",
                    "Pinlock 100% Max Vision incluido de serie"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.6,
                reviews_count=35,
                homologacion="ECE 22.05 / DOT",
                peso="1480 ± 45g",
                destacado=True
            ),
            Casco(
                id=4,
                nombre="MT Thunder 4 SV",
                marca="MT Helmets",
                categoria="Integral",
                precio=850.0,
                precio_anterior=920.0,
                stock=14,
                stock_minimo=5,
                talla="L",
                tallas_disponibles=["S", "M", "L", "XL"],
                color="Negro y Rojo Flúor",
                colores_disponibles=["Negro y Rojo Flúor", "Negro Mate", "Blanco Perla"],
                imagen="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="El primer casco de gama accesible del mercado certificado bajo la estricta normativa europea ECE 22.06. Gran spoiler trasero de extracción rápida y gafa solar retráctil de alta definición.",
                caracteristicas=[
                    "Homologación ECE 22.06 con absorción de impacto rotacional",
                    "Sistema de extracción rápida de pantalla sin herramientas",
                    "Gafa solar ahumada de policarbonato óptico",
                    "Cierre micrométrico reforzado con anclaje metálico",
                    "Interiores hipoalergénicos ignífugos desmontables"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.8,
                reviews_count=64,
                homologacion="ECE 22.06",
                peso="1500 ± 50g",
                destacado=True
            ),
            Casco(
                id=5,
                nombre="Bell Qualifier DLX MIPS",
                marca="Bell",
                categoria="Integral",
                precio=1850.0,
                precio_anterior=None,
                stock=5,
                stock_minimo=2,
                talla="XL",
                tallas_disponibles=["M", "L", "XL", "XXL"],
                color="Blackout Carbon",
                colores_disponibles=["Blackout Carbon", "Gris Titanio"],
                imagen="https://images.unsplash.com/photo-1606907568152-58fcb0a0a4e5?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1606907568152-58fcb0a0a4e5?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1704977733553-e3d7d92c4d66?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Equipado con la tecnología MIPS® (Multi-Directional Impact Protection System) que reduce las fuerzas rotacionales transmitidas al cerebro en caso de impacto angular. Incluye pantalla fotosensible Transitions® adaptativa.",
                caracteristicas=[
                    "Sistema MIPS de protección de impacto rotacional",
                    "Pantalla Transitions que se oscurece automáticamente con el sol",
                    "Puerto de comunicación compatible con Sena y Cardo",
                    "Ventilación Velocity Flow con regulación precisa",
                    "Cierre con doble anilla en D acolchada"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.9,
                reviews_count=52,
                homologacion="DOT / ECE 22.05",
                peso="1550g",
                destacado=True
            ),
            Casco(
                id=6,
                nombre="Shoei NXR2",
                marca="Shoei",
                categoria="Integral",
                precio=3600.0,
                precio_anterior=3850.0,
                stock=3,
                stock_minimo=2,
                talla="M",
                tallas_disponibles=["S", "M", "L"],
                color="Basalt Grey",
                colores_disponibles=["Basalt Grey", "Negro Brillante", "Blanco Puro"],
                imagen="https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="La cúspide del diseño japonés para cascos deportivos de calle. Calota AIM (Advanced Integrated Matrix) de fibra orgánica y multi-composite, aerodinámica probada en laboratorio con mínimo coeficiente de fricción sonora.",
                caracteristicas=[
                    "Calota de fibra AIM multifibra de 5 capas",
                    "Sistema E.Q.R.S. de extracción rápida de emergencia para médicos",
                    "Pantalla CWR-F2 con pasadores para Pinlock EVO antivaho",
                    "Aislamiento acústico de primera clase para largos viajes",
                    "Fabricado a mano en Japón"
                ],
                modelo_3d="/models/casco.glb",
                rating=5.0,
                reviews_count=110,
                homologacion="ECE 22.06",
                peso="1390 ± 50g",
                destacado=True
            ),
            Casco(
                id=7,
                nombre="LS2 FF900 Valiant II",
                marca="LS2",
                categoria="Modular",
                precio=1950.0,
                precio_anterior=None,
                stock=6,
                stock_minimo=3,
                talla="L",
                tallas_disponibles=["M", "L", "XL"],
                color="Titanio Mate",
                colores_disponibles=["Titanio Mate", "Negro Brillo", "Amarillo Neón"],
                imagen="https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Casco modular convertible con mentonera abatible 180 grados hacia la nuca. Doble homologación P/J para circular legalmente tanto en posición cerrada como abierta sin resistencia aerodinámica.",
                caracteristicas=[
                    "Doble homologación P/J (Jet e Integral)",
                    "Mecanismo de mentonera elíptica de 180° que optimiza el centro de gravedad",
                    "Calota KPA (Kinetic Polymer Alloy)",
                    "Visor solar integrado Twin Shield System",
                    "Pinlock Max Vision incluido"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.8,
                reviews_count=73,
                homologacion="ECE 22.05 P/J",
                peso="1700 ± 50g",
                destacado=False
            ),
            Casco(
                id=8,
                nombre="HJC RPHA 91",
                marca="HJC",
                categoria="Modular",
                precio=2900.0,
                precio_anterior=None,
                stock=4,
                stock_minimo=2,
                talla="M",
                tallas_disponibles=["S", "M", "L", "XL"],
                color="Negro Perlado",
                colores_disponibles=["Negro Perlado", "Plata Metal"],
                imagen="https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="El nuevo modular touring insignia de HJC. Diseñado para un silencio extraordinario en ruta con calota P.I.M. EVO de fibra de carbono-aramida y sistema de bloqueo de mentonera patentado.",
                caracteristicas=[
                    "Matriz Premium P.I.M. EVO Carbono y Fibra de Vidrio",
                    "Interior 3D de bajo ruido para touring de larga distancia",
                    "Gafa solar con profundidad ajustable en 3 posiciones",
                    "Certificado bajo norma ECE 22.06 P/J",
                    "Preinstalación para intercomunicador SMART HJC Bluetooth"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.9,
                reviews_count=39,
                homologacion="ECE 22.06 P/J",
                peso="1650 ± 50g",
                destacado=False
            ),
            Casco(
                id=9,
                nombre="Bell Custom 500",
                marca="Bell",
                categoria="Abierto",
                precio=950.0,
                precio_anterior=None,
                stock=9,
                stock_minimo=3,
                talla="M",
                tallas_disponibles=["S", "M", "L"],
                color="Negro Clásico / Cuero",
                colores_disponibles=["Negro Clásico / Cuero", "Vintage White"],
                imagen="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Homenaje al diseño original de Roy Richter en 1954. Estilo retro custom cafe-racer con calota de perfil bajo y 5 tamaños de calota para un ajuste milimétrico y elegante.",
                caracteristicas=[
                    "Calota de fibra de vidrio compacta de bajo perfil",
                    "Broches universales frontales para pantallas burbuja y viseras",
                    "Interiores en símil cuero con pespuntes artesanales",
                    "Correa de barbilla acolchada con anilla Doble D",
                    "Garantía de fabricante de 5 años"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.6,
                reviews_count=29,
                homologacion="DOT / ECE 22.05",
                peso="1100 ± 50g",
                destacado=False
            ),
            Casco(
                id=10,
                nombre="MT Streetfighter SV",
                marca="MT Helmets",
                categoria="Abierto",
                precio=790.0,
                precio_anterior=860.0,
                stock=11,
                stock_minimo=4,
                talla="L",
                tallas_disponibles=["M", "L", "XL"],
                color="Gris Militar Mate",
                colores_disponibles=["Gris Militar Mate", "Negro Mate"],
                imagen="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Casco convertible estilo Streetfighter con máscara frontal extraíble. Ideal para desplazamientos urbanos agresivos con soporte integrado para cámara de acción tipo GoPro.",
                caracteristicas=[
                    "Máscara delantera desmontable con clip de un toque",
                    "Visera parasol desmontable y gafa solar interior ahumada",
                    "Soporte superior para cámara deportiva integrado",
                    "Calota de polímero inyectado de alta densidad HIRP",
                    "Cierre micrométrico metálico rápido"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.7,
                reviews_count=47,
                homologacion="ECE 22.05 / DOT",
                peso="1350 ± 50g",
                destacado=False
            ),
            Casco(
                id=11,
                nombre="Fox Racing V3 RS",
                marca="Fox",
                categoria="Off Road",
                precio=3200.0,
                precio_anterior=None,
                stock=3,
                stock_minimo=2,
                talla="L",
                tallas_disponibles=["M", "L", "XL"],
                color="Rojo / Blanco Team",
                colores_disponibles=["Rojo / Blanco Team", "Negro Carbono"],
                imagen="https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="El pináculo del Motocross y Enduro profesional. Incorpora el sistema MIPS Integra Split y visera magnetizada con liberación de choque MVRS para evitar lesiones cervicales.",
                caracteristicas=[
                    "Construcción en fibra de carbono 4K ultraligera",
                    "Sistema de protección cerebral MIPS Integra Split",
                    "Visera MVRS regulable con tornillos de cizallamiento inteligente",
                    "Almohadillas de mejilla de extracción de emergencia antimicrobianas",
                    "Doble anilla en D de fibra de carbono y titanio"
                ],
                modelo_3d="/models/casco.glb",
                rating=4.9,
                reviews_count=31,
                homologacion="ECE 22.06 / DOT",
                peso="1280 ± 50g",
                destacado=True
            ),
            Casco(
                id=12,
                nombre="Airoh Aviator 3",
                marca="Airoh",
                categoria="Off Road",
                precio=3450.0,
                precio_anterior=None,
                stock=5,
                stock_minimo=2,
                talla="M",
                tallas_disponibles=["S", "M", "L"],
                color="Six Days Edition",
                colores_disponibles=["Six Days Edition", "Negro Mate"],
                imagen="https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800&auto=format&fit=crop&q=80",
                imagenes=[
                    "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1634071256596-b796307cf310?w=800&auto=format&fit=crop&q=80"
                ],
                descripcion="Campeón indiscutible del Campeonato Mundial de Motocross MXGP. Desarrollado en túnel de viento aerodinámico con sistema magnético AMS2 Plus y calota de carbono HPC.",
                caracteristicas=[
                    "Calota 100% Carbon Kevlar HPC",
                    "Sistema AMS2 Plus (Airoh Multiaction Safety System)",
                    "Forros interiores magnéticos AMLS de extracción en 1 segundo",
                    "Canalización de hidratación integrada AHS",
                    "8 tomas de ventilación y extractores de calor integrados"
                ],
                modelo_3d="/models/casco.glb",
                rating=5.0,
                reviews_count=56,
                homologacion="ECE 22.06",
                peso="1330 ± 50g",
                destacado=False
            )
        ]
        db.session.add_all(helmets)
        db.session.commit()
        print("  ✓ Catálogo de cascos con imágenes reales inicializado (12 cascos)")

    # 4. Semilla de Pedidos Iniciales
    if Pedido.query.count() == 0:
        order1 = Pedido(
            id="ord-101",
            numero_pedido="BKS-2026-001",
            cliente_id=3,
            cliente_nombre="Carlos",
            cliente_apellido="Mamani",
            cliente_ci="8472910 LP",
            cliente_telefono="+591 76543210",
            cliente_correo="carlos.mamani@email.com",
            cliente_direccion="Av. Arce #2430, Edif. Torre Azul Piso 4",
            cliente_ciudad="La Paz",
            cliente_notas="Entregar por la tarde",
            subtotal=750.0,
            envio=0.0,
            total=750.0,
            estado="Confirmado",
            metodo_pago="QR",
            fecha=datetime(2026, 9, 24, 14, 30)
        )
        item1 = PedidoItem(
            pedido_id="ord-101",
            casco_id=1,
            nombre="LS2 Stream Evo",
            marca="LS2",
            imagen="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80",
            talla="M",
            color="Negro Mate",
            precio_unitario=750.0,
            cantidad=1,
            subtotal=750.0
        )
        order1.items.append(item1)

        order2 = Pedido(
            id="ord-102",
            numero_pedido="BKS-2026-002",
            cliente_id=None,
            cliente_nombre="Alejandra",
            cliente_apellido="Vargas",
            cliente_ci="6548123 SC",
            cliente_telefono="+591 78912345",
            cliente_correo="alejandra.v@gmail.com",
            cliente_direccion="Calle Beni #410, Barrio Equipetrol",
            cliente_ciudad="Santa Cruz",
            cliente_notas="Llamar antes de entregar",
            subtotal=1650.0,
            envio=35.0,
            total=1685.0,
            estado="Preparando",
            metodo_pago="Transferencia bancaria",
            fecha=datetime(2026, 9, 25, 10, 15)
        )
        item2 = PedidoItem(
            pedido_id="ord-102",
            casco_id=2,
            nombre="AGV K1 S",
            marca="AGV",
            imagen="https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80",
            talla="L",
            color="Rojo Racing / Negro",
            precio_unitario=1650.0,
            cantidad=1,
            subtotal=1650.0
        )
        order2.items.append(item2)

        db.session.add_all([order1, order2])
        db.session.commit()
        print("  ✓ Pedidos iniciales inicializados")
