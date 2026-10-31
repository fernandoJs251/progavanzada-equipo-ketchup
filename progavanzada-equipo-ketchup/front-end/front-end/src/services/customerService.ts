import { Customer } from '../types';
import { INITIAL_CUSTOMERS } from '../data/customers';

// NOTA DE ARQUITECTURA:
// Capa de servicios para clientes
// FUTURO BACKEND:
// GET  /api/clientes
// POST /api/clientes
// GET  /api/clientes/:id

const CUSTOMERS_KEY = 'bikerstock3d_customers';

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
   * Obtiene todos los clientes
   * FUTURO BACKEND: GET /api/clientes
   */
  async getCustomers(): Promise<Customer[]> {
    await new Promise(res => setTimeout(res, 50));
    return getStoredCustomers();
  }
};
