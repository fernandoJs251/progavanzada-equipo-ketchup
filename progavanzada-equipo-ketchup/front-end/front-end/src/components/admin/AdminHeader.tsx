import React from 'react';
import { Menu, Bell, Search, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, title }) => {
  const { user, role, switchRole } = useAuth();
  const { alerts } = useProducts();

  const unresolvedAlerts = alerts.filter(a => !a.resuelto);
  const roles: UserRole[] = ['ADMIN', 'VENDEDOR', 'CLIENTE'];

  return (
    <header className="sticky top-0 z-30 h-20 bg-[#0e0e14]/90 backdrop-blur-md border-b border-[#20212e] px-4 sm:px-8 flex items-center justify-between">
      
      {/* Izquierda: Botón hamburguesa y Título de la vista actual */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-zinc-400 hover:text-white lg:hidden rounded-xl bg-[#161622] border border-[#272738]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold hidden sm:block">
            Panel de Control BikerStock3D
          </span>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Derecha: Selector de Rol y Campana de Alertas */}
      <div className="flex items-center gap-3">
        
        {/* Selector de rol para cambiar en vivo */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#161622] px-3 py-1.5 rounded-xl border border-[#272738]">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Rol Activo:</span>
          <select
            value={role}
            onChange={(e) => switchRole(e.target.value as UserRole)}
            className="bg-transparent text-xs font-bold text-red-400 focus:outline-none cursor-pointer"
          >
            {roles.map(r => (
              <option key={r} value={r} className="bg-[#161622] text-white">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Campana de alertas */}
        <Link
          to="/admin/alertas"
          className="relative p-2.5 rounded-xl bg-[#161622] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#272738] transition-colors"
          title="Ver alertas del sistema"
        >
          <Bell className="w-5 h-5" />
          {unresolvedAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unresolvedAlerts.length}
            </span>
          )}
        </Link>

        {/* Avatar Usuario */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
            {user?.nombre.substring(0, 2).toUpperCase() || 'AD'}
          </div>
        </div>

      </div>

    </header>
  );
};
