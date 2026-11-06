import { Customer } from '../types';
import { INITIAL_CUSTOMERS } from '../data/customers';

/**
 * Capa de servicios para clientes conectada con Flask (/api/clientes)
 * y persistencia en LocalStorage con fallback.
 */

const CUSTOMERS_KEY = 'bikerstock3d_customers';
const TOKEN_KEY = 'bikerstock3d_token';

const getStoredCustomers = (): Customer[] => {
  const stored = localStorage.getItem(CUSTOMERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_CUSTOMERS;
    }
  }
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
  return INITIAL_CUSTOMERS;
};

export const customerService = {
  /**
   * Obtiene todos los clientes desde Flask API o fallback local
   * GET /api/clientes
   */
  async getCustomers(): Promise<Customer[]> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch('/api/clientes', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Fallback local
    }
    return getStoredCustomers();
  }
};
