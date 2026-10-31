// Tipos principales para BIKERSTOCK3D

export type HelmetCategory = 'Integral' | 'Modular' | 'Abierto' | 'Off Road';
export type HelmetSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type StockStatus = 'Disponible' | 'Stock bajo' | 'Agotado';

export interface Helmet {
  id: number;
  nombre: string;
  marca: string;
  categoria: HelmetCategory;
  precio: number; // En Bolivianos (Bs.)
  precioAnterior?: number;
  stock: number;
  stockMinimo: number;
  talla: HelmetSize;
  tallasDisponibles: HelmetSize[];
  color: string;
  coloresDisponibles: string[];
  imagen: string;
  imagenes: string[];
  descripcion: string;
  caracteristicas?: string[];
  modelo3D?: string;
  rating: number;
  reviewsCount: number;
  homologacion: string; // ej. ECE 22.06, DOT
  peso: string; // ej. 1450g
  destacado?: boolean;
}

export interface CategoryInfo {
  id: string;
  nombre: HelmetCategory;
  descripcion: string;
  imagen: string;
  icono: string;
  cantidad: number;
}

export interface CartItem {
  id: string; // cascoId-talla-color
  helmet: Helmet;
  cantidad: number;
  tallaSeleccionada: HelmetSize;
  colorSeleccionado: string;
}

export type OrderStatus = 'Pendiente' | 'Confirmado' | 'Preparando' | 'Entregado' | 'Cancelado';
export type PaymentMethod = 'Efectivo' | 'Transferencia bancaria' | 'QR';

export interface CustomerInfo {
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string;
  correo: string;
  direccion: string;
  ciudad?: string;
  notas?: string;
}

export interface Order {
  id: string;
  numeroPedido: string;
  fecha: string;
  cliente: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  envio: number;
  total: number;
  estado: OrderStatus;
  metodoPago: PaymentMethod;
}

export interface Customer {
  id: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string;
  correo: string;
  numeroCompras: number;
  totalGastado: number;
  fechaRegistro: string;
  estado: 'Activo' | 'Inactivo';
}

export interface Sale {
  id: string;
  cliente: string;
  clienteCI: string;
  fecha: string;
  cantidadProductos: number;
  total: number;
  estado: 'Completada' | 'En proceso' | 'Anulada';
  metodoPago: PaymentMethod;
  items: {
    cascoId: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];
}

export interface StockAlert {
  id: string;
  cascoId: number;
  cascoNombre: string;
  marca: string;
  stockActual: number;
  stockMinimo: number;
  nivel: 'Stock bajo' | 'Agotado' | 'Pedido pendiente';
  fecha: string;
  resuelto: boolean;
  mensaje: string;
}

export type UserRole = 'ADMIN' | 'VENDEDOR' | 'CLIENTE';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  avatar?: string;
  telefono?: string;
}
