import { Helmet } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

/**
 * Capa de servicios para productos con integración REST a Flask (/api/cascos)
 * y persistencia en LocalStorage con fallback ante caídas de red.
 */

const STORAGE_KEY = 'bikerstock3d_products_v2';
const TOKEN_KEY = 'bikerstock3d_token';

const getStoredProducts = (): Helmet[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed: Helmet[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

const saveStoredProducts = (products: Helmet[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
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

export const productService = {
  /**
   * Obtiene todos los cascos desde la API Flask o fallback local
   * GET /api/cascos
   */
  async getProducts(): Promise<Helmet[]> {
    try {
      const res = await fetch('/api/cascos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          saveStoredProducts(data);
          return data;
        }
      }
    } catch {
      // Fallback silencioso si el backend de Flask no está encendido
    }
    return getStoredProducts();
  },

  /**
   * Obtiene un casco por su ID
   * GET /api/cascos/:id
   */
  async getProductById(id: number): Promise<Helmet | undefined> {
    try {
      const res = await fetch(`/api/cascos/${id}`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Fallback silencioso
    }
    const products = getStoredProducts();
    return products.find(p => p.id === id);
  },

  /**
   * Crea un nuevo casco en inventario
   * POST /api/cascos
   */
  async createProduct(newProduct: Omit<Helmet, 'id'>): Promise<Helmet> {
    try {
      const res = await fetch('/api/cascos', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        const created: Helmet = await res.json();
        const products = getStoredProducts();
        saveStoredProducts([created, ...products]);
        return created;
      }
    } catch {
      // Fallback local
    }

    const products = getStoredProducts();
    const created: Helmet = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    const updated = [created, ...products];
    saveStoredProducts(updated);
    return created;
  },

  /**
   * Actualiza los datos o stock de un casco
   * PUT /api/cascos/:id
   */
  async updateProduct(id: number, updates: Partial<Helmet>): Promise<Helmet> {
    try {
      const res = await fetch(`/api/cascos/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updatedProduct: Helmet = await res.json();
        const products = getStoredProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          products[index] = updatedProduct;
          saveStoredProducts(products);
        }
        return updatedProduct;
      }
    } catch {
      // Fallback local
    }

    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Casco con ID ${id} no encontrado`);
    }

    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;
    saveStoredProducts(products);
    return updatedProduct;
  },

  /**
   * Elimina un casco del inventario
   * DELETE /api/cascos/:id
   */
  async deleteProduct(id: number): Promise<boolean> {
    try {
      const res = await fetch(`/api/cascos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const products = getStoredProducts();
        const filtered = products.filter(p => p.id !== id);
        saveStoredProducts(filtered);
        return true;
      }
    } catch {
      // Fallback local
    }

    const products = getStoredProducts();
    const filtered = products.filter(p => p.id !== id);
    saveStoredProducts(filtered);
    return true;
  },

  /**
   * Restablece el catálogo inicial
   */
  async resetToInitial(): Promise<Helmet[]> {
    saveStoredProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
};
