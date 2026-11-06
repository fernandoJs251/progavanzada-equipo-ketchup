import { Sale } from '../types';
import { INITIAL_SALES, MONTHLY_SALES_CHART, SALES_BY_CATEGORY_CHART, TOP_SELLING_PRODUCTS } from '../data/sales';

/**
 * Capa de servicios para ventas y analítica conectada con Flask
 * (/api/ventas y /api/dashboard/metrics) con fallback local.
 */

const SALES_KEY = 'bikerstock3d_sales';
const TOKEN_KEY = 'bikerstock3d_token';

const getStoredSales = (): Sale[] => {
  const stored = localStorage.getItem(SALES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_SALES;
    }
  }
  localStorage.setItem(SALES_KEY, JSON.stringify(INITIAL_SALES));
  return INITIAL_SALES;
};

export const salesService = {
  /**
   * Obtiene el listado de ventas
   * GET /api/ventas
   */
  async getSales(): Promise<Sale[]> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch('/api/ventas', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(SALES_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Fallback local
    }
    return getStoredSales();
  },

  /**
   * Obtiene métricas agregadas del dashboard
   * GET /api/dashboard/metrics
   */
  async getDashboardMetrics() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch('/api/dashboard/metrics', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          return data;
        }
      }
    } catch {
      // Fallback local
    }

    return {
      monthlySales: MONTHLY_SALES_CHART,
      categoryShare: SALES_BY_CATEGORY_CHART,
      topProducts: TOP_SELLING_PRODUCTS,
      totalRevenue: 35500,
      totalSalesCount: 128,
      activeClientsCount: 67,
      totalOrdersCount: 21,
      lowStockCount: 5,
      totalProductsCount: 45
    };
  }
};
