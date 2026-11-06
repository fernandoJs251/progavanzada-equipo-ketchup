import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/orders';

/**
 * Capa de servicios para pedidos conectada con Backend Flask (/api/pedidos)
 * y persistencia en LocalStorage con fallback.
 */

const ORDERS_KEY = 'bikerstock3d_orders_v2';
const TOKEN_KEY = 'bikerstock3d_token';

const getStoredOrders = (): Order[] => {
  const stored = localStorage.getItem(ORDERS_KEY);
  if (stored) {
    try {
      const parsed: Order[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

const saveStoredOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const orderService = {
  /**
   * Obtiene todos los pedidos desde Flask API o fallback local
   * GET /api/pedidos
   */
  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch('/api/pedidos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          saveStoredOrders(data);
          return data;
        }
      }
    } catch {
      // Fallback silencioso
    }
    return getStoredOrders();
  },

  /**
   * Crea un nuevo pedido desde checkout
   * POST /api/pedidos
   */
  async createOrder(orderData: Omit<Order, 'id' | 'numeroPedido' | 'fecha'>): Promise<Order> {
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const created: Order = await res.json();
        const orders = getStoredOrders();
        saveStoredOrders([created, ...orders]);
        return created;
      }
    } catch {
      // Fallback local
    }

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
   * PATCH /api/pedidos/:id/estado
   */
  async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<Order> {
    try {
      const res = await fetch(`/api/pedidos/${orderId}/estado`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ estado: newStatus })
      });
      if (res.ok) {
        const updated: Order = await res.json();
        const orders = getStoredOrders();
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
          orders[idx] = updated;
          saveStoredOrders(orders);
        }
        return updated;
      }
    } catch {
      // Fallback local
    }

    const orders = getStoredOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) {
      throw new Error(`Pedido ${orderId} no encontrado`);
    }

    orders[index] = { ...orders[index], estado: newStatus };
    saveStoredOrders(orders);
    return orders[index];
  }
};
