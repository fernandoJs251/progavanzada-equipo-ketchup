import React, { useState, useEffect } from 'react';
import { customerService } from '../../services/customerService';
import { Customer } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Users, Search, Award, Plus, Edit3, Trash2, Mail, Phone, Shield } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // Modal Crear Usuario
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'CLIENTE' as 'ADMIN' | 'VENDEDOR' | 'CLIENTE',
    telefono: '+591 76543210'
  });

  // Modal Editar Usuario
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    estado: 'Activo' as 'Activo' | 'Inactivo',
    ci: ''
  });

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch {
      showToast('Error al cargar la lista de usuarios', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(c =>
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.nombre.trim() || !newUser.email.trim()) {
      showToast('Nombre y correo electrónico son requeridos', 'warning');
      return;
    }
    try {
      await customerService.createUser({
        nombre: newUser.nombre.trim(),
        email: newUser.email.trim(),
        password: newUser.password || 'password123',
        rol: newUser.rol,
        telefono: newUser.telefono
      });
      showToast('Usuario creado exitosamente', 'success', '¡Registrado!');
      setIsCreateOpen(false);
      setNewUser({
        nombre: '',
        email: '',
        password: '',
        rol: 'CLIENTE',
        telefono: '+591 76543210'
      });
      await loadCustomers();
    } catch (err: any) {
      showToast(err?.message || 'Error al crear usuario', 'error');
    }
  };

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setEditFormData({
      nombre: customer.nombre,
      apellido: customer.apellido,
      telefono: customer.telefono,
      estado: customer.estado,
      ci: customer.ci
    });
    setIsEditOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    try {
      await customerService.updateUser(editingCustomer.id, {
        nombre: editFormData.nombre,
        apellido: editFormData.apellido,
        telefono: editFormData.telefono,
        estado: editFormData.estado,
        ci: editFormData.ci
      });
      showToast('Usuario actualizado correctamente', 'success', '¡Actualizado!');
      setIsEditOpen(false);
      setEditingCustomer(null);
      await loadCustomers();
    } catch (err: any) {
      showToast(err?.message || 'Error al actualizar usuario', 'error');
    }
  };

  const handleDeleteUser = async (customer: Customer) => {
    if (!window.confirm(`¿Estás seguro de eliminar al usuario ${customer.nombre} ${customer.apellido}?`)) {
      return;
    }
    try {
      await customerService.deleteUser(customer.id);
      showToast('Usuario eliminado del sistema', 'info', 'Eliminado');
      await loadCustomers();
    } catch (err: any) {
      showToast(err?.message || 'Error al eliminar usuario', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Directorio de Usuarios y Clientes</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Gestión completa de usuarios del sistema, compradores y roles operativos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Buscador */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por cliente, CI o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#12121a] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#232330] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Botón Nuevo Usuario */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* TABLA DE CLIENTES */}
      <div className="rounded-2xl bg-[#12121a] border border-[#232330] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Usuario / Cliente</th>
                <th className="py-3.5 px-4">C.I.</th>
                <th className="py-3.5 px-4">Contacto</th>
                <th className="py-3.5 px-4 text-center">N° Compras</th>
                <th className="py-3.5 px-4">Total Gastado</th>
                <th className="py-3.5 px-4">Registro</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-zinc-500 text-xs">
                    No se encontraron usuarios que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#181824] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-zinc-400">
                      #{customer.id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-white text-sm">{customer.nombre} {customer.apellido}</p>
                      <span className="text-[10px] text-zinc-500">{customer.correo}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-300">
                      {customer.ci}
                    </td>
                    <td className="py-3 px-4 font-mono text-red-400">
                      {customer.telefono}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-white bg-[#181824] px-2.5 py-1 rounded-lg border border-[#272738]">
                        <Award className="w-3 h-3 text-amber-400" />
                        {customer.numeroCompras}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-extrabold text-white">
                      Bs. {customer.totalGastado.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-500 text-[11px]">
                      {customer.fechaRegistro}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={customer.estado === 'Activo' ? 'success' : 'default'} size="sm">
                        {customer.estado}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(customer)}
                          className="p-1.5 rounded-lg bg-[#1e1e2d] hover:bg-blue-600/20 text-zinc-400 hover:text-blue-400 transition-colors"
                          title="Editar usuario"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(customer)}
                          className="p-1.5 rounded-lg bg-[#1e1e2d] hover:bg-red-600/20 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CREAR USUARIO */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Crear Nuevo Usuario"
        maxWidth="md"
      >
        <form onSubmit={handleCreateUser} className="space-y-4 p-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Ej. Rodrigo Morales"
              value={newUser.nombre}
              onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
              className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="usuario@ejemplo.com"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Rol de Acceso</label>
              <select
                value={newUser.rol}
                onChange={(e) => setNewUser({ ...newUser, rol: e.target.value as any })}
                className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="CLIENTE">Cliente</option>
                <option value="VENDEDOR">Vendedor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Teléfono</label>
              <input
                type="text"
                placeholder="+591 76543210"
                value={newUser.telefono}
                onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
                className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Contraseña Inicial</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres (default: password123)"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#232330]">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-colors"
            >
              Guardar Usuario
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL EDITAR USUARIO */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Editar Usuario #${editingCustomer?.id || ''}`}
        maxWidth="md"
      >
        <form onSubmit={handleUpdateUser} className="space-y-4 p-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={editFormData.nombre}
                onChange={(e) => setEditFormData({ ...editFormData, nombre: e.target.value })}
                className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Apellido</label>
              <input
                type="text"
                value={editFormData.apellido}
                onChange={(e) => setEditFormData({ ...editFormData, apellido: e.target.value })}
                className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">C.I. / Documento</label>
              <input
                type="text"
                value={editFormData.ci}
                onChange={(e) => setEditFormData({ ...editFormData, ci: e.target.value })}
                className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Teléfono</label>
              <input
                type="text"
                value={editFormData.telefono}
                onChange={(e) => setEditFormData({ ...editFormData, telefono: e.target.value })}
                className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Estado de la Cuenta</label>
            <select
              value={editFormData.estado}
              onChange={(e) => setEditFormData({ ...editFormData, estado: e.target.value as any })}
              className="w-full bg-[#161622] text-xs text-white px-3 py-2.5 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#232330]">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
