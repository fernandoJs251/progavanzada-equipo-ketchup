import { Sale } from '../types';
import { INITIAL_SALES, MONTHLY_SALES_CHART, SALES_BY_CATEGORY_CHART, TOP_SELLING_PRODUCTS } from '../data/sales';

// NOTA DE ARQUITECTURA:
// Capa de servicios para ventas y analítica
// FUTURO BACKEND:
// GET /api/ventas
// POST /api/ventas
// GET /api/reportes/dashboard

const SALES_KEY = 'bikerstock3d_sales';

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
   * FUTURO BACKEND: GET /api/ventas
   */
  async getSales(): Promise<Sale[]> {
    await new Promise(res => setTimeout(res, 50));
    return getStoredSales();
  },

  /**
   * Obtiene métricas agregadas del dashboard
   * FUTURO BACKEND: GET /api/reportes/kpis
   */
  async getDashboardMetrics() {
    await new Promise(res => setTimeout(res, 50));
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
