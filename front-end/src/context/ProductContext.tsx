import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Helmet, StockAlert } from '../types';
import { productService } from '../services/productService';
import { INITIAL_ALERTS } from '../data/alerts';

interface ProductContextType {
  products: Helmet[];
  alerts: StockAlert[];
  isLoading: boolean;
  addProduct: (helmet: Omit<Helmet, 'id'>) => Promise<Helmet>;
  updateProduct: (id: number, updates: Partial<Helmet>) => Promise<Helmet>;
  deleteProduct: (id: number) => Promise<boolean>;
  getProductById: (id: number) => Helmet | undefined;
  resolveAlert: (alertId: string) => void;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Helmet[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>(INITIAL_ALERTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const items = await productService.getProducts();
      setProducts(items);

      // Sincronizar alertas con stock real
      const generatedAlerts: StockAlert[] = [];
      items.forEach(p => {
        if (p.stock === 0) {
          generatedAlerts.push({
            id: `alert-out-${p.id}`,
            cascoId: p.id,
            cascoNombre: p.nombre,
            marca: p.marca,
            stockActual: 0,
            stockMinimo: p.stockMinimo,
            nivel: 'Agotado',
            fecha: new Date().toISOString().split('T')[0],
            resuelto: false,
            mensaje: `¡ATENCIÓN! El casco ${p.marca} ${p.nombre} está AGOTADO (0 unidades en almacén).`
          });
        } else if (p.stock <= p.stockMinimo) {
          generatedAlerts.push({
            id: `alert-low-${p.id}`,
            cascoId: p.id,
            cascoNombre: p.nombre,
            marca: p.marca,
            stockActual: p.stock,
            stockMinimo: p.stockMinimo,
            nivel: 'Stock bajo',
            fecha: new Date().toISOString().split('T')[0],
            resuelto: false,
            mensaje: `${p.marca} ${p.nombre} tiene solamente ${p.stock} unidades disponibles (mínimo de seguridad: ${p.stockMinimo}).`
          });
        }
      });

      // Combinar con alertas existentes si no están duplicadas
      setAlerts(prev => {
        const existingUnresolved = prev.filter(a => a.resuelto);
        return [...generatedAlerts, ...existingUnresolved];
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addProduct = async (data: Omit<Helmet, 'id'>): Promise<Helmet> => {
    const created = await productService.createProduct(data);
    await loadData();
    return created;
  };

  const updateProduct = async (id: number, updates: Partial<Helmet>): Promise<Helmet> => {
    const updated = await productService.updateProduct(id, updates);
    await loadData();
    return updated;
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    const success = await productService.deleteProduct(id);
    await loadData();
    return success;
  };

  const getProductById = (id: number): Helmet | undefined => {
    return products.find(p => p.id === id);
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resuelto: true } : a));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        alerts,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        resolveAlert,
        refreshProducts: loadData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de ProductProvider');
  }
  return context;
};
