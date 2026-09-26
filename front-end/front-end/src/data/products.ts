import { Helmet } from '../types';

export const INITIAL_PRODUCTS: Helmet[] = [
  {
    id: 1,
    nombre: "LS2 Stream Evo",
    marca: "LS2",
    categoria: "Integral",
    precio: 750,
    precioAnterior: 820,
    stock: 8,
    stockMinimo: 3,
    talla: "M",
    tallasDisponibles: ["S", "M", "L", "XL"],
    color: "Negro Mate",
    coloresDisponibles: ["Negro Mate", "Titanio", "Rojo Brillo"],
    imagen: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Casco aerodinámico integral fabricado en policarbonato HPTT de alta resistencia. Cuenta con visor solar retráctil integrado, ventilación dinámica y forro hipoalergénico desmontable y lavable.",
    caracteristicas: [
      "Calota de HPTT (High Pressure Thermoplastic Technology)",
      "Pantalla con tratamiento antirrayas y protección UV",
      "Visor solar interior desplegable con pulsador lateral",
      "Cierre micrométrico metálico de rápida liberación",
      "Preparado para sistema antivaho Pinlock 70 MaxVision"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.7,
    reviewsCount: 42,
    homologacion: "ECE 22.06 / DOT",
    peso: "1550 ± 50g",
    destacado: true
  },
  {
    id: 2,
    nombre: "AGV K1 S",
    marca: "AGV",
    categoria: "Integral",
    precio: 1650,
    precioAnterior: 1790,
    stock: 2, // Alerta: Stock bajo
    stockMinimo: 4,
    talla: "L",
    tallasDisponibles: ["XS", "S", "M", "L", "XL"],
    color: "Rojo Racing / Negro",
    coloresDisponibles: ["Rojo Racing / Negro", "Negro Mate", "Azul Corsa"],
    imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Nacido de la experiencia de AGV en MotoGP™. Spoiler aerodinámico probado en túnel de viento para máxima estabilidad a altas velocidades. Ventilación frontal optimizada con canales de aire EPS profundos.",
    caracteristicas: [
      "Diseño derivado directamente de la pista Pista GP RR",
      "Spoiler biplano aerodinámico que reduce turbulencias",
      "Pantalla panorámica con campo de visión horizontal de 190°",
      "Cierre de seguridad con anilla Doble D",
      "Interior Dry-Comfort transpirable y lavable"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.9,
    reviewsCount: 88,
    homologacion: "ECE 22.06",
    peso: "1500 ± 50g",
    destacado: true
  },
  {
    id: 3,
    nombre: "HJC i70",
    marca: "HJC",
    categoria: "Integral",
    precio: 1100,
    stock: 0, // Alerta: Agotado
    stockMinimo: 3,
    talla: "M",
    tallasDisponibles: ["S", "M", "L"],
    color: "Gris Nardo",
    coloresDisponibles: ["Gris Nardo", "Negro Brillante"],
    imagen: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Casco de turismo deportivo ligero y compacto con una avanzada calota de policarbonato. Equipado con gafa solar desplegable con visión extendida y ventilación ACS (Advanced Channeling Ventilation System).",
    caracteristicas: [
      "Calota avanzada de compuesto de policarbonato CAD",
      "Visor solar interior con accionamiento en el borde inferior",
      "Canalizaciones de aire ACS que evacuan humedad y calor",
      "Ranuras interiores para usuarios de gafas graduadas",
      "Pinlock 100% Max Vision incluido de serie"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.6,
    reviewsCount: 35,
    homologacion: "ECE 22.05 / DOT",
    peso: "1480 ± 45g",
    destacado: true
  },
  {
    id: 4,
    nombre: "MT Thunder 4 SV",
    marca: "MT Helmets",
    categoria: "Integral",
    precio: 850,
    precioAnterior: 920,
    stock: 14,
    stockMinimo: 5,
    talla: "L",
    tallasDisponibles: ["S", "M", "L", "XL"],
    color: "Negro y Rojo Flúor",
    coloresDisponibles: ["Negro y Rojo Flúor", "Negro Mate", "Blanco Perla"],
    imagen: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "El primer casco de gama accesible del mercado certificado bajo la estricta normativa europea ECE 22.06. Gran spoiler trasero de extracción rápida y gafa solar retráctil de alta definición.",
    caracteristicas: [
      "Homologación ECE 22.06 con absorción de impacto rotacional",
      "Sistema de extracción rápida de pantalla sin herramientas",
      "Gafa solar ahumada de policarbonato óptico",
      "Cierre micrométrico reforzado con anclaje metálico",
      "Interiores hipoalergénicos ignífugos desmontables"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.8,
    reviewsCount: 64,
    homologacion: "ECE 22.06",
    peso: "1500 ± 50g",
    destacado: true
  },
  {
    id: 5,
    nombre: "Bell Qualifier DLX MIPS",
    marca: "Bell",
    categoria: "Integral",
    precio: 1850,
    stock: 5,
    stockMinimo: 2,
    talla: "XL",
    tallasDisponibles: ["M", "L", "XL", "XXL"],
    color: "Blackout Carbon",
    coloresDisponibles: ["Blackout Carbon", "Gris Titanio"],
    imagen: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Equipado con la tecnología MIPS® (Multi-Directional Impact Protection System) que reduce las fuerzas rotacionales transmitidas al cerebro en caso de impacto angular. Incluye pantalla fotosensible Transitions® adaptativa.",
    caracteristicas: [
      "Sistema MIPS de protección de impacto rotacional",
      "Pantalla Transitions que se oscurece automáticamente con el sol",
      "Puerto de comunicación compatible con Sena y Cardo",
      "Ventilación Velocity Flow con regulación precisa",
      "Cierre con doble anilla en D acolchada"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.9,
    reviewsCount: 52,
    homologacion: "DOT / ECE 22.05",
    peso: "1550g",
    destacado: true
  },
  {
    id: 6,
    nombre: "Shoei NXR2",
    marca: "Shoei",
    categoria: "Integral",
    precio: 3600,
    precioAnterior: 3850,
    stock: 3,
    stockMinimo: 2,
    talla: "M",
    tallasDisponibles: ["S", "M", "L"],
    color: "Basalt Grey",
    coloresDisponibles: ["Basalt Grey", "Negro Brillante", "Blanco Puro"],
    imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "La cúspide del diseño japonés para cascos deportivos de calle. Calota AIM (Advanced Integrated Matrix) de fibra orgánica y multi-composite, aerodinámica probada en laboratorio con mínimo coeficiente de fricción sonora.",
    caracteristicas: [
      "Calota de fibra AIM multifibra de 5 capas",
      "Sistema E.Q.R.S. de extracción rápida de emergencia para médicos",
      "Pantalla CWR-F2 con pasadores para Pinlock EVO antivaho",
      "Aislamiento acústico de primera clase para largos viajes",
      "Fabricado a mano en Japón"
    ],
    modelo3D: "/models/casco.glb",
    rating: 5.0,
    reviewsCount: 110,
    homologacion: "ECE 22.06",
    peso: "1390 ± 50g",
    destacado: true
  },
  {
    id: 7,
    nombre: "LS2 FF900 Valiant II",
    marca: "LS2",
    categoria: "Modular",
    precio: 1950,
    stock: 6,
    stockMinimo: 3,
    talla: "L",
    tallasDisponibles: ["M", "L", "XL"],
    color: "Titanio Mate",
    coloresDisponibles: ["Titanio Mate", "Negro Brillo", "Amarillo Neón"],
    imagen: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Casco modular convertible con mentonera abatible 180 grados hacia la nuca. Doble homologación P/J para circular legalmente tanto en posición cerrada como abierta sin resistencia aerodinámica.",
    caracteristicas: [
      "Doble homologación P/J (Jet e Integral)",
      "Mecanismo de mentonera elíptica de 180° que optimiza el centro de gravedad",
      "Calota KPA (Kinetic Polymer Alloy)",
      "Visor solar integrado Twin Shield System",
      "Pinlock Max Vision incluido"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.8,
    reviewsCount: 73,
    homologacion: "ECE 22.05 P/J",
    peso: "1700 ± 50g",
    destacado: false
  },
  {
    id: 8,
    nombre: "HJC RPHA 91",
    marca: "HJC",
    categoria: "Modular",
    precio: 2900,
    stock: 4,
    stockMinimo: 2,
    talla: "M",
    tallasDisponibles: ["S", "M", "L", "XL"],
    color: "Negro Perlado",
    coloresDisponibles: ["Negro Perlado", "Plata Metal"],
    imagen: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "El nuevo modular touring insignia de HJC. Diseñado para un silencio extraordinario en ruta con calota P.I.M. EVO de fibra de carbono-aramida y sistema de bloqueo de mentonera patentado.",
    caracteristicas: [
      "Matriz Premium P.I.M. EVO Carbono y Fibra de Vidrio",
      "Interior 3D de bajo ruido para touring de larga distancia",
      "Gafa solar con profundidad ajustable en 3 posiciones",
      "Certificado bajo norma ECE 22.06 P/J",
      "Preinstalación para intercomunicador SMART HJC Bluetooth"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.9,
    reviewsCount: 39,
    homologacion: "ECE 22.06 P/J",
    peso: "1650 ± 50g",
    destacado: false
  },
  {
    id: 9,
    nombre: "Bell Custom 500",
    marca: "Bell",
    categoria: "Abierto",
    precio: 950,
    stock: 9,
    stockMinimo: 3,
    talla: "M",
    tallasDisponibles: ["S", "M", "L"],
    color: "Negro Clásico / Cuero",
    coloresDisponibles: ["Negro Clásico / Cuero", "Vintage White"],
    imagen: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Homenaje al diseño original de Roy Richter en 1954. Estilo retro custom cafe-racer con calota de perfil bajo y 5 tamaños de calota para un ajuste milimétrico y elegante.",
    caracteristicas: [
      "Calota de fibra de vidrio compacta de bajo perfil",
      "Broches universales frontales para pantallas burbuja y viseras",
      "Interiores en símil cuero con pespuntes artesanales",
      "Correa de barbilla acolchada con anilla Doble D",
      "Garantía de fabricante de 5 años"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.6,
    reviewsCount: 29,
    homologacion: "DOT / ECE 22.05",
    peso: "1100 ± 50g",
    destacado: false
  },
  {
    id: 10,
    nombre: "MT Streetfighter SV",
    marca: "MT Helmets",
    categoria: "Abierto",
    precio: 790,
    precioAnterior: 860,
    stock: 11,
    stockMinimo: 4,
    talla: "L",
    tallasDisponibles: ["M", "L", "XL"],
    color: "Gris Militar Mate",
    coloresDisponibles: ["Gris Militar Mate", "Negro Mate"],
    imagen: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Casco convertible estilo Streetfighter con máscara frontal extraíble. Ideal para desplazamientos urbanos agresivos con soporte integrado para cámara de acción tipo GoPro.",
    caracteristicas: [
      "Máscara delantera desmontable con clip de un toque",
      "Visera parasol desmontable y gafa solar interior ahumada",
      "Soporte superior para cámara deportiva integrado",
      "Calota de polímero inyectado de alta densidad HIRP",
      "Cierre micrométrico metálico rápido"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.7,
    reviewsCount: 47,
    homologacion: "ECE 22.05 / DOT",
    peso: "1350 ± 50g",
    destacado: false
  },
  {
    id: 11,
    nombre: "Fox Racing V3 RS",
    marca: "Fox",
    categoria: "Off Road",
    precio: 3200,
    stock: 3,
    stockMinimo: 2,
    talla: "L",
    tallasDisponibles: ["M", "L", "XL"],
    color: "Rojo / Blanco Team",
    coloresDisponibles: ["Rojo / Blanco Team", "Negro Carbono"],
    imagen: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "El pináculo del Motocross y Enduro profesional. Incorpora el sistema MIPS Integra Split y visera magnetizada con liberación de choque MVRS para evitar lesiones cervicales.",
    caracteristicas: [
      "Construcción en fibra de carbono 4K ultraligera",
      "Sistema de protección cerebral MIPS Integra Split",
      "Visera MVRS regulable con tornillos de cizallamiento inteligente",
      "Almohadillas de mejilla de extracción de emergencia antimicrobianas",
      "Doble anilla en D de fibra de carbono y titanio"
    ],
    modelo3D: "/models/casco.glb",
    rating: 4.9,
    reviewsCount: 31,
    homologacion: "ECE 22.06 / DOT",
    peso: "1280 ± 50g",
    destacado: true
  },
  {
    id: 12,
    nombre: "Airoh Aviator 3",
    marca: "Airoh",
    categoria: "Off Road",
    precio: 3450,
    stock: 5,
    stockMinimo: 2,
    talla: "M",
    tallasDisponibles: ["S", "M", "L"],
    color: "Six Days Edition",
    coloresDisponibles: ["Six Days Edition", "Negro Mate"],
    imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
    ],
    descripcion: "Campeón indiscutible del Campeonato Mundial de Motocross MXGP. Desarrollado en túnel de viento aerodinámico con sistema magnético AMS2 Plus y calota de carbono HPC.",
    caracteristicas: [
      "Calota 100% Carbon Kevlar HPC",
      "Sistema AMS2 Plus (Airoh Multiaction Safety System)",
      "Forros interiores magnéticos AMLS de extracción en 1 segundo",
      "Canalización de hidratación integrada AHS",
      "8 tomas de ventilación y extractores de calor integrados"
    ],
    modelo3D: "/models/casco.glb",
    rating: 5.0,
    reviewsCount: 56,
    homologacion: "ECE 22.06",
    peso: "1330 ± 50g",
    destacado: false
  }
];
