import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/users';

/**
 * Capa de autenticación con soporte para Backend Flask (/api/auth)
 * y persistencia en LocalStorage con fallback local garantizado.
 */

const AUTH_USER_KEY = 'bikerstock3d_auth_user_v2';
const REGISTERED_USERS_KEY = 'bikerstock3d_registered_users_v2';
const LOGGED_OUT_KEY = 'bikerstock3d_logged_out';
const TOKEN_KEY = 'bikerstock3d_token';

export const authService = {
  /**
   * Obtiene la lista combinada de usuarios demo y registrados
   */
  getRegisteredUsers(): User[] {
    const saved = localStorage.getItem(REGISTERED_USERS_KEY);
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        return [...MOCK_USERS, ...parsed];
      } catch {
        return MOCK_USERS;
      }
    }
    return MOCK_USERS;
  },

  /**
   * Obtiene el token de autenticación JWT
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Guarda el token de autenticación JWT
   */
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Obtiene el usuario autenticado actual con persistencia
   */
  getCurrentUser(): User | null {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }

    // Si el usuario cerró sesión expresamente, respetar su estado
    if (localStorage.getItem(LOGGED_OUT_KEY) === 'true') {
      return null;
    }

    // Para la primera visita de demostración, iniciar con el usuario Admin para permitir explorar todo
    this.setCurrentUser(MOCK_USERS[0]);
    return MOCK_USERS[0];
  },

  /**
   * Guarda el usuario activo en LocalStorage
   */
  setCurrentUser(user: User) {
    localStorage.removeItem(LOGGED_OUT_KEY);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  /**
   * Permite alternar roles para fines evaluativos y demostrativos
   */
  switchRole(role: UserRole): User {
    // Sincronizar en segundo plano con la API de Flask si está disponible
    fetch('/api/auth/switch-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rol: role })
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.token) {
          this.setToken(data.token);
        }
      })
      .catch(() => {
        // Fallback silencioso
      });

    const allUsers = this.getRegisteredUsers();
    let target = allUsers.find(u => u.rol === role);
    if (!target) {
      target = MOCK_USERS.find(u => u.rol === role) || MOCK_USERS[0];
    }
    this.setCurrentUser(target);
    return target;
  },

  /**
   * Inicia sesión por correo o credenciales
   * POST /api/auth/login
   */
  async login(email: string, password: string = 'demo123'): Promise<User> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          this.setToken(data.token);
        }
        if (data.user) {
          this.setCurrentUser(data.user);
          return data.user;
        }
      }
    } catch {
      // Fallback local ante caída de red o modo offline
    }

    const allUsers = this.getRegisteredUsers();
    const found = allUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    const user: User = found || {
      id: `usr-${Date.now()}`,
      nombre: email.split('@')[0],
      email: email.trim(),
      rol: email.toLowerCase().includes('admin') ? 'ADMIN' : 'CLIENTE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      telefono: '+591 76543210'
    };

    this.setCurrentUser(user);
    return user;
  },

  /**
   * Registra una nueva cuenta de usuario
   * POST /api/auth/register
   */
  async register(nombre: string, email: string, password: string = 'demo123'): Promise<User> {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedNombre = nombre.trim();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: trimmedNombre,
          email: trimmedEmail,
          password
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          this.setToken(data.token);
        }
        if (data.user) {
          this.setCurrentUser(data.user);
          return data.user;
        }
      }
    } catch {
      // Fallback local
    }

    // Crear nuevo usuario local
    const newUser: User = {
      id: `usr-${Date.now()}`,
      nombre: trimmedNombre,
      email: trimmedEmail,
      rol: trimmedEmail.includes('admin') ? 'ADMIN' : 'CLIENTE',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      telefono: '+591 70000000'
    };

    // Guardar en la lista de registrados
    const saved = localStorage.getItem(REGISTERED_USERS_KEY);
    const existingRegistered: User[] = saved ? JSON.parse(saved) : [];
    const updated = [newUser, ...existingRegistered.filter(u => u.email.toLowerCase() !== trimmedEmail)];
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updated));

    // Establecer como sesión activa
    this.setCurrentUser(newUser);
    return newUser;
  },

  /**
   * Cierra la sesión activa
   */
  logout() {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(LOGGED_OUT_KEY, 'true');
  }
};
