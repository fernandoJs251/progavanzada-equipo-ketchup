import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@bikerstock3d.com');
  const [password, setPassword] = useState('password123');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [nombre, setNombre] = useState('');

  const { login, switchRole } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Por favor introduce tu correo electrónico', 'warning');
      return;
    }
    await login(email);
    navigate(email.includes('admin') ? '/admin' : '/cascos');
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
    navigate(role === 'ADMIN' ? '/admin' : '/cascos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09090c] via-[#101017] to-[#09090c] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        
        {/* Logo / Encabezado */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-600 text-white font-bold text-xl shadow-lg shadow-red-600/30">
              3D
            </div>
            <span className="font-heading text-2xl font-extrabold tracking-wider text-white">
              BIKER<span className="text-red-500">STOCK</span>3D
            </span>
          </Link>
          <h2 className="text-lg font-bold text-white font-heading">
            {isRegisterMode ? 'Crear una Cuenta' : 'Iniciar Sesión en tu Cuenta'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Prototipo universitario con autenticación simulada
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="p-8 rounded-3xl bg-[#12121a] border border-[#232330] shadow-2xl space-y-6">
          
          {/* ACCESOS RÁPIDOS DEMO PARA EVALUADORES */}
          <div className="p-4 rounded-2xl bg-[#181824] border border-[#2b2c3c]">
            <span className="text-[11px] font-mono uppercase font-bold text-red-400 block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Acceso Rápido por Rol (Demostración):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('ADMIN')}
                className="py-2 px-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                ADMIN
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('VENDEDOR')}
                className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition-all"
              >
                VENDEDOR
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('CLIENTE')}
                className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition-all"
              >
                CLIENTE
              </button>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@bikerstock3d.com"
                  className="w-full bg-[#181824] text-white text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#181824] text-white text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>{isRegisterMode ? 'Registrarme' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle entre Iniciar sesión y Crear cuenta */}
          <div className="text-center pt-2 border-t border-[#232330]">
            {isRegisterMode ? (
              <p className="text-xs text-zinc-400">
                ¿Ya tienes una cuenta registrada?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="text-red-400 font-bold hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            ) : (
              <p className="text-xs text-zinc-400">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="text-red-400 font-bold hover:underline"
                >
                  Crear cuenta
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
