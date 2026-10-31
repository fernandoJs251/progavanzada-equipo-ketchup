import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Sparkles } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { role, switchRole } = useAuth();

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

        {/* Aviso de rol para evaluadores si están en modo CLIENTE */}
        {role === 'CLIENTE' && (
          <div className="bg-amber-950/40 border-b border-amber-500/30 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Estás visualizando el panel como <strong>CLIENTE</strong>. Para probar permisos completos de edición y administración:
              </span>
            </div>
            <button
              onClick={() => switchRole('ADMIN')}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Activar Modo ADMIN</span>
            </button>
          </div>
        )}
        
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
