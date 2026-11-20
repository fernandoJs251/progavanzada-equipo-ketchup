import { Customer } from '../types';
import { INITIAL_CUSTOMERS } from '../data/customers';

/**
 * Capa de servicios para clientes y usuarios conectada con Flask (/api/usuarios y /api/clientes)
 * con operaciones CRUD completas y persistencia en LocalStorage como respaldo.
 */

const CUSTOMERS_KEY = 'bikerstock3d_customers';
const TOKEN_KEY = 'bikerstock3d_token';

const getStoredCustomers = (): Customer[] => {
  const stored = localStorage.getItem(CUSTOMERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_CUSTOMERS;
    }
  }
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
  return INITIAL_CUSTOMERS;
};

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const customerService = {
  /**
   * Obtiene todos los clientes/usuarios desde la API Flask
   * GET /api/usuarios
   */
  async getCustomers(): Promise<Customer[]> {
    try {
      const res = await fetch('/api/usuarios', {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Fallback a clientes de respaldo si el backend no está activo
    }
    return getStoredCustomers();
  },

  /**
   * Crea un nuevo usuario o cliente desde el panel de administración
   * POST /api/usuarios
   */
  async createUser(userData: {
    nombre: string;
    email: string;
    password?: string;
    rol: 'ADMIN' | 'VENDEDOR' | 'CLIENTE';
    telefono?: string;
  }): Promise<Customer> {
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const created = await res.json();
        const userObj = created.user || created;
        const mapped: Customer = {
          id: userObj.id,
          nombre: userObj.nombre.split(' ')[0],
          apellido: userObj.nombre.split(' ').slice(1).join(' ') || '',
          ci: userObj.ci || '8472910 LP',
          telefono: userObj.telefono || '+591 76543210',
          correo: userObj.email,
          numeroCompras: 0,
          totalGastado: 0,
          fechaRegistro: new Date().toISOString().split('T')[0],
          estado: 'Activo'
        };
        const current = getStoredCustomers();
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify([mapped, ...current]));
        return mapped;
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al crear usuario');
      }
    } catch (e: any) {
      if (e?.message && e.message !== 'Failed to fetch') {
        throw e;
      }
    }

    // Fallback local
    const current = getStoredCustomers();
    const newId = current.length > 0 ? Math.max(...current.map(c => c.id)) + 1 : 1;
    const localUser: Customer = {
      id: newId,
      nombre: userData.nombre.split(' ')[0],
      apellido: userData.nombre.split(' ').slice(1).join(' ') || '',
      ci: '8472910 LP',
      telefono: userData.telefono || '+591 76543210',
      correo: userData.email,
      numeroCompras: 0,
      totalGastado: 0,
      fechaRegistro: new Date().toISOString().split('T')[0],
      estado: 'Activo'
    };
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify([localUser, ...current]));
    return localUser;
  },

  /**
   * Actualiza los datos de un usuario o cliente
   * PUT /api/usuarios/:id
   */
  async updateUser(id: number, updates: Partial<Customer> & { rol?: string }): Promise<Customer> {
    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        const userObj = data.user || data;
        const current = getStoredCustomers();
        const updatedList = current.map(c => c.id === id ? { ...c, ...updates } : c);
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updatedList));
        return {
          id,
          nombre: userObj.nombre?.split(' ')[0] || updates.nombre || '',
          apellido: userObj.nombre?.split(' ').slice(1).join(' ') || updates.apellido || '',
          ci: updates.ci || '8472910 LP',
          telefono: userObj.telefono || updates.telefono || '',
          correo: userObj.email || updates.correo || '',
          numeroCompras: updates.numeroCompras ?? 0,
          totalGastado: updates.totalGastado ?? 0,
          fechaRegistro: updates.fechaRegistro || '2026-03-15',
          estado: updates.estado || 'Activo'
        };
      }
    } catch {
      // Fallback local
    }

    const current = getStoredCustomers();
    const updatedList = current.map(c => c.id === id ? { ...c, ...updates } : c);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updatedList));
    return updatedList.find(c => c.id === id)!;
  },

  /**
   * Elimina un usuario o cliente de la base de datos
   * DELETE /api/usuarios/:id
   */
  async deleteUser(id: number): Promise<boolean> {
    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const current = getStoredCustomers();
        const filtered = current.filter(c => c.id !== id);
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(filtered));
        return true;
      }
    } catch {
      // Fallback local
    }

    const current = getStoredCustomers();
    const filtered = current.filter(c => c.id !== id);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(filtered));
    return true;
  }
};
