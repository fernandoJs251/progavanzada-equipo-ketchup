import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Obtener título según la ruta actual
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/admin':
        return 'Dashboard General';
      case '/admin/productos':
        return 'Gestión de Productos';
      case '/admin/inventario':
        return 'Control de Inventario';
      case '/admin/ventas':
        return 'Historial de Ventas';
      case '/admin/pedidos':
        return 'Gestión de Pedidos';
      case '/admin/clientes':
        return 'Directorio de Clientes';
      case '/admin/reportes':
        return 'Reportes y Analítica';
      case '/admin/alertas':
        return 'Alertas del Sistema';
      case '/admin/configuracion':
        return 'Configuración General';
      default:
        return 'Panel Administrativo';
    }
  };

  const title = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen bg-[#09090c] text-zinc-100 flex">
      {/* Sidebar fijo a la izquierda */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal desplazado por el sidebar en desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={title} />
        
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
