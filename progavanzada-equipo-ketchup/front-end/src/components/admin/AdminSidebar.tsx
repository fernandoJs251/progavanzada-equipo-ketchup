import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut, 
  Store,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { alerts } = useProducts();
  const navigate = useNavigate();

  const unresolvedAlertsCount = alerts.filter(a => !a.resuelto).length;

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Productos', path: '/admin/productos', icon: Package },
    { name: 'Inventario', path: '/admin/inventario', icon: Boxes },
    { name: 'Ventas', path: '/admin/ventas', icon: TrendingUp },
    { name: 'Pedidos', path: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Clientes', path: '/admin/clientes', icon: Users },
    { name: 'Reportes', path: '/admin/reportes', icon: BarChart3 },
    { 
      name: 'Alertas', 
      path: '/admin/alertas', 
      icon: Bell, 
      badge: unresolvedAlertsCount > 0 ? unresolvedAlertsCount : undefined 
    },
    { name: 'Configuración', path: '/admin/configuracion', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Backdrop en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0e0e14] border-r border-[#20212e] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Cabecera del Sidebar con Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#20212e]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-600 text-white font-bold text-base shadow-md shadow-red-600/30">
              3D
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white tracking-wide block leading-none">
                BIKER<span className="text-red-500">STOCK</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Panel Admin
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Enlaces de Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold'
                    : 'text-zinc-400 hover:bg-[#181824] hover:text-zinc-200'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <link.icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </div>
              {link.badge !== undefined && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Pie del Sidebar: Usuario y Enlace a la Tienda */}
        <div className="p-4 border-t border-[#20212e] space-y-3 bg-[#0a0a0f]">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#161622] hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-[#272738] text-xs font-semibold transition-colors"
          >
            <Store className="w-4 h-4 text-red-500" />
            <span>Volver a la Tienda</span>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">
                {user ? user.nombre.charAt(0) : 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.nombre || 'Administrador'}</p>
                <p className="text-[10px] text-zinc-400 uppercase font-mono">{user?.rol || 'ADMIN'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};
