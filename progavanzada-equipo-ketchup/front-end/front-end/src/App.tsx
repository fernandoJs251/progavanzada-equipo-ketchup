import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

// Layouts
import { StoreLayout } from './layouts/StoreLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Páginas Públicas de la Tienda
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Login } from './pages/Login';

// Páginas del Panel Administrativo
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminSales } from './pages/admin/AdminSales';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminAlerts } from './pages/admin/AdminAlerts';

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* 1. RUTAS DE LA TIENDA PÚBLICA */}
                <Route element={<StoreLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/cascos" element={<Catalog />} />
                  <Route path="/cascos/:id" element={<ProductDetail />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pedidos" element={<Orders />} />
                  <Route path="/login" element={<Login />} />
                </Route>

                {/* 2. RUTAS DEL PANEL ADMINISTRATIVO (/admin) */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="productos" element={<AdminProducts />} />
                  <Route path="inventario" element={<AdminInventory />} />
                  <Route path="ventas" element={<AdminSales />} />
                  <Route path="pedidos" element={<AdminOrders />} />
                  <Route path="clientes" element={<AdminCustomers />} />
                  <Route path="reportes" element={<AdminReports />} />
                  <Route path="alertas" element={<AdminAlerts />} />
                  <Route path="configuracion" element={<AdminDashboard />} />
                </Route>

                {/* Fallback de redirección */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
