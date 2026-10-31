import { Order } from '../types';
import { INITIAL_PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    numeroPedido: "BKS-2026-001",
    fecha: "2026-09-24",
    cliente: {
      nombre: "Carlos",
      apellido: "Mamani",
      ci: "8472910 LP",
      telefono: "+591 76543210",
      correo: "carlos.mamani@email.com",
      direccion: "Av. Arce #2430, Edif. Torre Azul Piso 4",
      ciudad: "La Paz"
    },
    items: [
      {
        id: "1-M-Negro Mate",
        helmet: INITIAL_PRODUCTS[0],
        cantidad: 1,
        tallaSeleccionada: "M",
        colorSeleccionado: "Negro Mate"
      }
    ],
    subtotal: 750,
    envio: 0,
    total: 750,
    estado: "Confirmado",
    metodoPago: "QR"
  },
  {
    id: "ord-102",
    numeroPedido: "BKS-2026-002",
    fecha: "2026-09-25",
    cliente: {
      nombre: "Alejandra",
      apellido: "Vargas",
      ci: "6548123 SC",
      telefono: "+591 78912345",
      correo: "alejandra.v@gmail.com",
      direccion: "Calle Beni #410, Barrio Equipetrol",
      ciudad: "Santa Cruz"
    },
    items: [
      {
        id: "2-L-Rojo Racing / Negro",
        helmet: INITIAL_PRODUCTS[1],
        cantidad: 1,
        tallaSeleccionada: "L",
        colorSeleccionado: "Rojo Racing / Negro"
      }
    ],
    subtotal: 1650,
    envio: 35,
    total: 1685,
    estado: "Preparando",
    metodoPago: "Transferencia bancaria"
  },
  {
    id: "ord-103",
    numeroPedido: "BKS-2026-003",
    fecha: "2026-09-25",
    cliente: {
      nombre: "Rodrigo",
      apellido: "Fernández",
      ci: "7891045 CB",
      telefono: "+591 71239874",
      correo: "rodrigo.motero@yahoo.com",
      direccion: "Av. América Este #1289",
      ciudad: "Cochabamba"
    },
    items: [
      {
        id: "4-L-Negro y Rojo Flúor",
        helmet: INITIAL_PRODUCTS[3],
        cantidad: 2,
        tallaSeleccionada: "L",
        colorSeleccionado: "Negro y Rojo Flúor"
      }
    ],
    subtotal: 1700,
    envio: 0,
    total: 1700,
    estado: "Pendiente",
    metodoPago: "Efectivo"
  },
  {
    id: "ord-104",
    numeroPedido: "BKS-2026-004",
    fecha: "2026-09-23",
    cliente: {
      nombre: "Mariana",
      apellido: "Quiroga",
      ci: "5214890 LP",
      telefono: "+591 70123456",
      correo: "mariana.q@outlook.com",
      direccion: "Zona Calacoto, Calle 15 #8020",
      ciudad: "La Paz"
    },
    items: [
      {
        id: "6-M-Basalt Grey",
        helmet: INITIAL_PRODUCTS[5],
        cantidad: 1,
        tallaSeleccionada: "M",
        colorSeleccionado: "Basalt Grey"
      }
    ],
    subtotal: 3600,
    envio: 0,
    total: 3600,
    estado: "Entregado",
    metodoPago: "QR"
  },
  {
    id: "ord-105",
    numeroPedido: "BKS-2026-005",
    fecha: "2026-09-22",
    cliente: {
      nombre: "Gabriel",
      apellido: "Torrico",
      ci: "4920182 OR",
      telefono: "+591 73456789",
      correo: "gtorrico@gmail.com",
      direccion: "Calle Pagador #150",
      ciudad: "Oruro"
    },
    items: [
      {
        id: "7-L-Titanio Mate",
        helmet: INITIAL_PRODUCTS[6],
        cantidad: 1,
        tallaSeleccionada: "L",
        colorSeleccionado: "Titanio Mate"
      }
    ],
    subtotal: 1950,
    envio: 40,
    total: 1990,
    estado: "Cancelado",
    metodoPago: "Transferencia bancaria"
  }
];
