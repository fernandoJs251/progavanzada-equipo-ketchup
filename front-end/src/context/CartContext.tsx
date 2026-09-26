import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Helmet, HelmetSize } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (helmet: Helmet, quantity?: number, size?: HelmetSize, color?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  envio: number;
  total: number;
}

const CART_STORAGE_KEY = 'bikerstock3d_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (
    helmet: Helmet,
    quantity: number = 1,
    size: HelmetSize = helmet.talla,
    color: string = helmet.color
  ) => {
    if (helmet.stock <= 0) {
      showToast(`El casco ${helmet.nombre} está agotado actualmente.`, 'warning');
      return;
    }

    const itemId = `${helmet.id}-${size}-${color}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        const nextQty = existing.cantidad + quantity;
        if (nextQty > helmet.stock) {
          showToast(`Solo quedan ${helmet.stock} unidades disponibles de este casco.`, 'warning');
          return prevItems.map(item => item.id === itemId ? { ...item, cantidad: helmet.stock } : item);
        }
        return prevItems.map(item => item.id === itemId ? { ...item, cantidad: nextQty } : item);
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            helmet,
            cantidad: Math.min(quantity, helmet.stock),
            tallaSeleccionada: size,
            colorSeleccionado: color
          }
        ];
      }
    });

    showToast(`"${helmet.nombre}" fue añadido al carrito`, 'success', '¡Añadido con éxito!');
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => {
      const target = prev.find(i => i.id === itemId);
      if (target) {
        showToast(`"${target.helmet.nombre}" eliminado del carrito`, 'info');
      }
      return prev.filter(item => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const maxStock = item.helmet.stock;
        const validQty = Math.min(quantity, maxStock);
        if (quantity > maxStock) {
          showToast(`Stock máximo alcanzado (${maxStock} unidades)`, 'warning');
        }
        return { ...item, cantidad: validQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.cantidad, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.helmet.precio * item.cantidad, 0);
  }, [items]);

  // Envío gratis a partir de Bs. 1000
  const envio = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= 1000 ? 0 : 35;
  }, [items.length, subtotal]);

  const total = useMemo(() => {
    return subtotal + envio;
  }, [subtotal, envio]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        envio,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
