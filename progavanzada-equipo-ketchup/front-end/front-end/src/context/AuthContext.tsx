import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAdmin: boolean;
  isSeller: boolean;
  login: (email: string) => Promise<void>;
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const current = authService.getCurrentUser();
    setUser(current);
  }, []);

  const login = async (email: string) => {
    const logged = await authService.login(email);
    setUser(logged);
    showToast(`Bienvenido a BikerStock3D, ${logged.nombre}`, 'success', 'Sesión iniciada');
  };

  const switchRole = (newRole: UserRole) => {
    const switched = authService.switchRole(newRole);
    setUser(switched);
    showToast(`Modo cambiado a perfil: ${newRole}`, 'info', 'Perfil activo');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    showToast('Has cerrado sesión correctamente', 'info');
  };

  const role: UserRole = user?.rol || 'CLIENTE';
  const isAdmin = role === 'ADMIN';
  const isSeller = role === 'VENDEDOR' || role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin,
        isSeller,
        login,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
