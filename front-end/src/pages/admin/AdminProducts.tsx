import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';
import { Helmet, HelmetCategory, HelmetSize } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Box, 
  Check, 
  AlertTriangle,
  Upload,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Modal de crear/editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Helmet | null>(null);

  // Modal de confirmación de eliminación
  const [productToDelete, setProductToDelete] = useState<Helmet | null>(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    marca: 'LS2',
    categoria: 'Integral' as HelmetCategory,
    precio: 850,
    precioAnterior: 0,
    stock: 10,
    stockMinimo: 3,
    talla: 'M' as HelmetSize,
    color: 'Negro Mate',
    imagen: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
    descripcion: 'Casco deportivo de alta protección.',
    modelo3D: '/models/casco.glb',
    homologacion: 'ECE 22.06',
    peso: '1500g',
    destacado: false
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      nombre: '',
      marca: 'LS2',
      categoria: 'Integral',
      precio: 850,
      precioAnterior: 0,
      stock: 10,
      stockMinimo: 3,
      talla: 'M',
      color: 'Negro Mate',
      imagen: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      descripcion: 'Casco deportivo de alta protección.',
      modelo3D: '/models/casco.glb',
      homologacion: 'ECE 22.06',
      peso: '1500g',
      destacado: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (helmet: Helmet) => {
    setEditingProduct(helmet);
    setFormData({
      nombre: helmet.nombre,
      marca: helmet.marca,
      categoria: helmet.categoria,
      precio: helmet.precio,
      precioAnterior: helmet.precioAnterior || 0,
      stock: helmet.stock,
      stockMinimo: helmet.stockMinimo,
      talla: helmet.talla,
      color: helmet.color,
      imagen: helmet.imagen,
      descripcion: helmet.descripcion,
      modelo3D: helmet.modelo3D || '/models/casco.glb',
      homologacion: helmet.homologacion,
      peso: helmet.peso,
      destacado: !!helmet.destacado
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      showToast('Por favor escribe el nombre del casco', 'warning');
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...formData,
          tallasDisponibles: ['S', 'M', 'L', 'XL'],
          coloresDisponibles: [formData.color, 'Negro Mate', 'Titanio'],
          imagenes: [formData.imagen]
        });
        showToast(`Casco "${formData.nombre}" actualizado correctamente`, 'success');
      } else {
        await addProduct({
          ...formData,
          tallasDisponibles: ['S', 'M', 'L', 'XL'],
          coloresDisponibles: [formData.color, 'Negro Mate'],
          imagenes: [formData.imagen],
          rating: 4.8,
          reviewsCount: 1
        });
        showToast(`Casco "${formData.nombre}" agregado al inventario`, 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Error al procesar el producto', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete.id);
    showToast(`Casco "${productToDelete.nombre}" eliminado del catálogo`, 'info');
    setProductToDelete(null);
  };

  // Filtrado de la tabla
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.marca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory ? p.categoria === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Cabecera de gestión */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Catálogo de Productos</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Administra, añade y edita cascos y sus modelos 3D asociados.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Casco</span>
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 rounded-2xl bg-[#12121a] border border-[#232330]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre o marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#181824] text-xs text-white pl-10 pr-4 py-2 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#181824] text-xs text-zinc-300 py-2 px-3 rounded-xl border border-[#272738] focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          <option value="">Todas las categorías</option>
          <option value="Integral">Integral</option>
          <option value="Modular">Modular</option>
          <option value="Abierto">Abierto</option>
          <option value="Off Road">Off Road</option>
        </select>
      </div>

      {/* TABLA DE PRODUCTOS (REQUISITO 19) */}
      <div className="rounded-2xl bg-[#12121a] border border-[#232330] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3.5 px-4">Casco</th>
                <th className="py-3.5 px-4">Marca</th>
                <th className="py-3.5 px-4">Categoría</th>
                <th className="py-3.5 px-4">Precio</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock <= 0;
                const isLowStock = p.stock > 0 && p.stock <= p.stockMinimo;

                return (
                  <tr key={p.id} className="hover:bg-[#181824] transition-colors">
                    {/* Imagen y Nombre */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          className="w-12 h-12 rounded-xl object-cover bg-[#1c1c28] border border-[#2c2d3c]"
                        />
                        <div>
                          <p className="font-heading font-bold text-sm text-white">{p.nombre}</p>
                          <span className="text-[10px] text-zinc-500 font-mono">Talla: {p.talla} • {p.color}</span>
                        </div>
                      </div>
                    </td>

                    {/* Marca */}
                    <td className="py-3 px-4 font-bold text-red-400">
                      {p.marca}
                    </td>

                    {/* Categoría */}
                    <td className="py-3 px-4 text-zinc-300">
                      {p.categoria}
                    </td>

                    {/* Precio */}
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      Bs. {p.precio.toLocaleString()}
                    </td>

                    {/* Stock actual */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-zinc-200">
                        {p.stock} u.
                      </span>
                      <span className="text-[10px] text-zinc-500 block">Mín: {p.stockMinimo}</span>
                    </td>

                    {/* Estado de stock */}
                    <td className="py-3 px-4">
                      {isOutOfStock ? (
                        <Badge variant="danger" size="sm">Agotado</Badge>
                      ) : isLowStock ? (
                        <Badge variant="warning" size="sm">Bajo stock</Badge>
                      ) : (
                        <Badge variant="success" size="sm">Disponible</Badge>
                      )}
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/cascos/${p.id}`}
                          className="p-1.5 rounded-lg bg-[#1a1a26] text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                          title="Ver en la tienda"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-[#1a1a26] text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          title="Editar casco"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 rounded-lg bg-[#1a1a26] text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Eliminar casco"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL DE CREAR / EDITAR PRODUCTO */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Editar Casco de Motocicleta' : 'Registrar Nuevo Casco'}
        maxWidth="xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Nombre del Casco *</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. LS2 FF800 Storm II"
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Marca *</label>
              <select
                value={formData.marca}
                onChange={e => setFormData({ ...formData, marca: e.target.value })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="LS2">LS2</option>
                <option value="AGV">AGV</option>
                <option value="HJC">HJC</option>
                <option value="MT Helmets">MT Helmets</option>
                <option value="Bell">Bell</option>
                <option value="Shoei">Shoei</option>
                <option value="Airoh">Airoh</option>
                <option value="Fox">Fox</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Categoría</label>
              <select
                value={formData.categoria}
                onChange={e => setFormData({ ...formData, categoria: e.target.value as HelmetCategory })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="Integral">Integral</option>
                <option value="Modular">Modular</option>
                <option value="Abierto">Abierto</option>
                <option value="Off Road">Off Road</option>
              </select>
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Precio (Bs.) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.precio}
                onChange={e => setFormData({ ...formData, precio: Number(e.target.value) })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Precio Anterior (Opcional)</label>
              <input
                type="number"
                min="0"
                value={formData.precioAnterior}
                onChange={e => setFormData({ ...formData, precioAnterior: Number(e.target.value) })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Talla</label>
              <select
                value={formData.talla}
                onChange={e => setFormData({ ...formData, talla: e.target.value as HelmetSize })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Color / Acabado</label>
              <input
                type="text"
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Stock Actual</label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Stock Mínimo</label>
              <input
                type="number"
                min="0"
                value={formData.stockMinimo}
                onChange={e => setFormData({ ...formData, stockMinimo: Number(e.target.value) })}
                className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">URL de Imagen</label>
            <input
              type="text"
              value={formData.imagen}
              onChange={e => setFormData({ ...formData, imagen: e.target.value })}
              placeholder="https://..."
              className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Ruta del Modelo 3D (.glb)</label>
            <input
              type="text"
              value={formData.modelo3D}
              onChange={e => setFormData({ ...formData, modelo3D: e.target.value })}
              placeholder="/models/casco.glb"
              className="w-full bg-[#181824] text-white text-xs px-3.5 py-2 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono uppercase font-bold text-zinc-400 mb-1">Descripción</label>
            <textarea
              rows={3}
              value={formData.descripcion}
              onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full bg-[#181824] text-white text-xs p-3 rounded-xl border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="destacado"
              checked={formData.destacado}
              onChange={e => setFormData({ ...formData, destacado: e.target.checked })}
              className="rounded bg-[#181824] text-red-600 focus:ring-red-500 border-[#2b2c3c]"
            />
            <label htmlFor="destacado" className="text-xs text-zinc-300">Marcar como Casco Destacado en Inicio</label>
          </div>

          <div className="pt-4 border-t border-[#232330] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#181824] hover:bg-[#202030] text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-md shadow-red-600/30"
            >
              {editingProduct ? 'Guardar Cambios' : 'Crear Casco'}
            </button>
          </div>

        </form>
      </Modal>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      <Modal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Confirmar Eliminación"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-zinc-300">
            ¿Estás seguro de que deseas eliminar permanentemente el casco{' '}
            <strong className="text-white">{productToDelete?.nombre}</strong> del catálogo de la tienda?
          </p>
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              onClick={() => setProductToDelete(null)}
              className="px-4 py-2 rounded-xl bg-[#181824] text-zinc-400 text-xs hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
