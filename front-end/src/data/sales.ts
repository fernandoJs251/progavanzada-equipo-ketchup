import { Sale } from '../types';

export const INITIAL_SALES: Sale[] = [
  {
    id: "VTA-001",
    cliente: "Carlos Mamani",
    clienteCI: "8472910 LP",
    fecha: "2026-09-24 14:32",
    cantidadProductos: 1,
    total: 750,
    estado: "Completada",
    metodoPago: "QR",
    items: [
      { cascoId: 1, nombre: "LS2 Stream Evo", cantidad: 1, precioUnitario: 750 }
    ]
  },
  {
    id: "VTA-002",
    cliente: "Alejandra Vargas",
    clienteCI: "6548123 SC",
    fecha: "2026-09-25 10:15",
    cantidadProductos: 1,
    total: 1685,
    estado: "En proceso",
    metodoPago: "Transferencia bancaria",
    items: [
      { cascoId: 2, nombre: "AGV K1 S", cantidad: 1, precioUnitario: 1650 }
    ]
  },
  {
    id: "VTA-003",
    cliente: "Rodrigo Fernández",
    clienteCI: "7891045 CB",
    fecha: "2026-09-25 18:40",
    cantidadProductos: 2,
    total: 1700,
    estado: "En proceso",
    metodoPago: "Efectivo",
    items: [
      { cascoId: 4, nombre: "MT Thunder 4 SV", cantidad: 2, precioUnitario: 850 }
    ]
  },
  {
    id: "VTA-004",
    cliente: "Mariana Quiroga",
    clienteCI: "5214890 LP",
    fecha: "2026-09-23 16:20",
    cantidadProductos: 1,
    total: 3600,
    estado: "Completada",
    metodoPago: "QR",
    items: [
      { cascoId: 6, nombre: "Shoei NXR2", cantidad: 1, precioUnitario: 3600 }
    ]
  },
  {
    id: "VTA-005",
    cliente: "Sebastián Roca",
    clienteCI: "7128904 TJ",
    fecha: "2026-09-21 11:05",
    cantidadProductos: 1,
    total: 1850,
    estado: "Completada",
    metodoPago: "QR",
    items: [
      { cascoId: 5, nombre: "Bell Qualifier DLX MIPS", cantidad: 1, precioUnitario: 1850 }
    ]
  },
  {
    id: "VTA-006",
    cliente: "Valeria Soliz",
    clienteCI: "6320914 CH",
    fecha: "2026-09-20 17:50",
    cantidadProductos: 1,
    total: 3200,
    estado: "Completada",
    metodoPago: "Transferencia bancaria",
    items: [
      { cascoId: 11, nombre: "Fox Racing V3 RS", cantidad: 1, precioUnitario: 3200 }
    ]
  }
];

export const MONTHLY_SALES_CHART = [
  { mes: "Abr", ventas: 14500, pedidos: 14 },
  { mes: "May", ventas: 21800, pedidos: 19 },
  { mes: "Jun", ventas: 18900, pedidos: 16 },
  { mes: "Jul", ventas: 26400, pedidos: 24 },
  { mes: "Ago", ventas: 31200, pedidos: 28 },
  { mes: "Sep", ventas: 35500, pedidos: 32 },
];

export const SALES_BY_CATEGORY_CHART = [
  { name: "Integral", valor: 45, color: "#ef4444" },
  { name: "Modular", valor: 25, color: "#f97316" },
  { name: "Off Road", valor: 20, color: "#eab308" },
  { name: "Abierto", valor: 10, color: "#3b82f6" },
];

export const TOP_SELLING_PRODUCTS = [
  { nombre: "LS2 Stream Evo", ventas: 42, ingresos: 31500 },
  { nombre: "AGV K1 S", ventas: 28, ingresos: 46200 },
  { nombre: "MT Thunder 4 SV", ventas: 24, ingresos: 20400 },
  { nombre: "Shoei NXR2", ventas: 12, ingresos: 43200 },
  { nombre: "Bell Qualifier DLX", ventas: 11, ingresos: 20350 },
];
