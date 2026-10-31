import { Helmet } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

// NOTA DE ARQUITECTURA:
// Esta capa de servicios está preparada para conectar posteriormente con una API REST real.
// En el futuro, se sustituirán estas funciones por llamadas reales con fetch() o axios.
// Ejemplo: const response = await fetch(`${API_BASE_URL}/cascos`); return response.json();

const STORAGE_KEY = 'bikerstock3d_products_v2';

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

export const productService = {
  /**
   * Obtiene todos los cascos
   * FUTURO BACKEND: GET /api/cascos
   */
  async getProducts(): Promise<Helmet[]> {
    // Simula retardo de red leve (50ms)
    await new Promise(res => setTimeout(res, 50));
    return getStoredProducts();
  },

  /**
   * Obtiene un casco por su ID
   * FUTURO BACKEND: GET /api/cascos/:id
   */
  async getProductById(id: number): Promise<Helmet | undefined> {
    await new Promise(res => setTimeout(res, 50));
    const products = getStoredProducts();
    return products.find(p => p.id === id);
  },

  /**
   * Crea un nuevo casco en inventario
   * FUTURO BACKEND: POST /api/cascos
   */
  async createProduct(newProduct: Omit<Helmet, 'id'>): Promise<Helmet> {
    await new Promise(res => setTimeout(res, 80));
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
   * FUTURO BACKEND: PUT /api/cascos/:id
   */
  async updateProduct(id: number, updates: Partial<Helmet>): Promise<Helmet> {
    await new Promise(res => setTimeout(res, 80));
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
   * FUTURO BACKEND: DELETE /api/cascos/:id
   */
  async deleteProduct(id: number): Promise<boolean> {
    await new Promise(res => setTimeout(res, 80));
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
