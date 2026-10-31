import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/orders';

// NOTA DE ARQUITECTURA:
// Capa de servicios para pedidos.
// FUTURO BACKEND:
// GET  /api/pedidos
// POST /api/pedidos
// PATCH /api/pedidos/:id/estado

const ORDERS_KEY = 'bikerstock3d_orders';

const getStoredOrders = (): Order[] => {
  const stored = localStorage.getItem(ORDERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_ORDERS;
    }
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

const saveStoredOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const orderService = {
  /**
   * Obtiene todos los pedidos
   * FUTURO BACKEND: GET /api/pedidos
   */
  async getOrders(): Promise<Order[]> {
    await new Promise(res => setTimeout(res, 50));
    return getStoredOrders();
  },

  /**
   * Crea un nuevo pedido desde checkout
   * FUTURO BACKEND: POST /api/pedidos
   */
  async createOrder(orderData: Omit<Order, 'id' | 'numeroPedido' | 'fecha'>): Promise<Order> {
    await new Promise(res => setTimeout(res, 80));
    const orders = getStoredOrders();
    const count = orders.length + 1;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      numeroPedido: `BKS-2026-${String(count).padStart(3, '0')}`,
      fecha: new Date().toISOString().split('T')[0]
    };
    const updated = [newOrder, ...orders];
    saveStoredOrders(updated);
    return newOrder;
  },

  /**
   * Cambia el estado de un pedido (Administración)
   * FUTURO BACKEND: PATCH /api/pedidos/:id/estado
   */
  async updateOrderStatus(id: string, nuevoEstado: OrderStatus): Promise<Order> {
    await new Promise(res => setTimeout(res, 80));
    const orders = getStoredOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error("Pedido no encontrado");

    orders[index].estado = nuevoEstado;
    saveStoredOrders(orders);
    return orders[index];
  }
};
