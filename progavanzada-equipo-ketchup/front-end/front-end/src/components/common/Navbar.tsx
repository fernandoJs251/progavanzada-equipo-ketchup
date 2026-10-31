import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  ShieldCheck, 
  LayoutDashboard, 
  Layers, 
  Flame, 
  PhoneCall, 
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { user, role, switchRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cascos?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Cascos', path: '/cascos' },
    { name: 'Mis Pedidos', path: '/pedidos' },
  ];

  const roles: UserRole[] = ['ADMIN', 'VENDEDOR', 'CLIENTE'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090c]/90 backdrop-blur-md border-b border-[#22222d] transition-all">
      {/* Top Banner sutil con beneficios */}
      <div className="bg-gradient-to-r from-red-950/40 via-red-900/30 to-black border-b border-red-900/20 py-1.5 px-4 text-center text-xs font-medium text-zinc-300">
        <span className="inline-flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>¡Envío <strong>GRATIS</strong> en toda Bolivia por compras mayores a Bs. 1.000!</span>
          <span className="hidden sm:inline text-zinc-500">•</span>
          <span className="hidden sm:inline text-zinc-400">Cascos certificados con norma europea ECE 22.06</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-900 text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-300">
              {/* Helmet icon */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 3.8 2.2 7.1 5.4 8.7L8 18c-2.4-1.2-4-3.7-4-6.5 0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.6 5.3-4 6.5l.6 2.7C19.8 19.1 22 15.8 22 12c0-5.5-4.5-10-10-10z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M7 12h10l-2 5H9l-2-5z" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold tracking-wider text-white flex items-center gap-1">
                BIKER<span className="text-red-500">STOCK</span><span className="text-xs bg-red-600/20 text-red-400 px-1.5 py-0.5 rounded font-mono font-semibold ml-0.5 border border-red-500/30">3D</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase -mt-1 font-mono">
                Protección & Rendimiento
              </span>
            </div>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ACCIONES Y BOTONES DERECHA */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Buscador expandible */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Buscar casco, marca..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-48 sm:w-64 bg-[#161622] text-sm text-white px-3 py-2 rounded-lg border border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1 text-zinc-400 hover:text-white p-1.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded-xl transition-colors"
                  aria-label="Buscar casco"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Botón Acceso Rápido a Panel Admin */}
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-red-950/60 hover:to-zinc-800 text-zinc-300 hover:text-white border border-[#2f303f] hover:border-red-500/40 text-xs font-semibold transition-all shadow-sm"
              title="Panel Administrativo"
            >
              <LayoutDashboard className="w-4 h-4 text-red-500" />
              <span>Admin</span>
            </Link>

            {/* Selector de Perfil / Usuario Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded-xl transition-colors border border-transparent hover:border-[#2f303f]"
              >
                <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 border border-zinc-700">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight">
                    {user ? user.nombre.split(' ')[0] : 'Ingresar'}
                  </span>
                  <span className="text-[10px] text-red-400 uppercase font-mono">
                    {role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
              </button>

              {/* Menu desplegable de usuario */}
              {isUserDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#161622] rounded-xl border border-[#2c2d3c] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#2c2d3c] mb-1">
                    <p className="text-xs font-semibold text-white">{user?.nombre || 'Usuario Demo'}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user?.email || 'demo@bikerstock.com'}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded bg-red-600/20 text-red-400 border border-red-500/30">
                      Rol: {role}
                    </span>
                  </div>

                  <div className="py-1">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 px-3 py-1">
                      Simulador de Roles:
                    </p>
                    {roles.map(r => (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setIsUserDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                          role === r ? 'bg-red-600 text-white font-semibold' : 'text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        <span>{r}</span>
                        {role === r && <ShieldCheck className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-[#2c2d3c] pt-1 mt-1">
                    <Link
                      to="/login"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      Página de Login
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors font-medium"
                    >
                      Ir al Panel Admin
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* CARRITO DE COMPRAS */}
            <Link
              to="/carrito"
              className="relative p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded-xl transition-all group"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="w-6 h-6 text-zinc-200 group-hover:text-red-500 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-extrabold text-white bg-red-600 rounded-full shadow-lg shadow-red-600/50 animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* BOTÓN MENÚ MÓVIL */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded-xl transition-colors"
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0d0d14] border-b border-[#22222d] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Buscar casco..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161622] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#2f303f] focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          </form>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-red-500" />
              <span>Panel Administrativo</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-[#22222d]">
            <p className="text-xs text-zinc-400 uppercase font-mono mb-2">Simular Rol Usuario:</p>
            <div className="flex gap-2">
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${
                    role === r 
                      ? 'bg-red-600 text-white border-red-500' 
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
