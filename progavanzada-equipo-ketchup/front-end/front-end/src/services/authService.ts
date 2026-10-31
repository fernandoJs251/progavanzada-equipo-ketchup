import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/users';

// NOTA DE ARQUITECTURA:
// Capa de autenticación visual simulada
// FUTURO BACKEND:
// POST /api/auth/login -> { token, user }
// POST /api/auth/register
// GET  /api/auth/me

const AUTH_USER_KEY = 'bikerstock3d_auth_user';

export const authService = {
  getCurrentUser(): User {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_USERS[0]; // Admin por defecto para probar todo
      }
    }
    return MOCK_USERS[0];
  },

  setCurrentUser(user: User) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  switchRole(role: UserRole): User {
    const target = MOCK_USERS.find(u => u.rol === role) || MOCK_USERS[0];
    this.setCurrentUser(target);
    return target;
  },

  async login(email: string): Promise<User> {
    await new Promise(res => setTimeout(res, 100));
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    const user = found || {
      id: `usr-${Date.now()}`,
      nombre: email.split('@')[0],
      email: email,
      rol: 'CLIENTE' as UserRole
    };
    this.setCurrentUser(user);
    return user;
  },

  logout() {
    localStorage.removeItem(AUTH_USER_KEY);
  }
};
