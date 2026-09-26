import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Boxes, Plus, Minus, Search, AlertTriangle, Check, RefreshCw } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, updateProduct } = useProducts();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');

  const handleStockChange = async (id: number, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      await updateProduct(id, { stock: newStock });
      showToast(`Stock actualizado a ${newStock} unidades`, 'info');
    } catch {
      showToast('Error al actualizar inventario', 'error');
    }
  };

  const filtered = products.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.marca.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Control de Inventario de Cascos</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Supervisión de existencias en almacén, umbrales de seguridad y reposición inmediata.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Filtrar inventario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12121a] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#232330] focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Tabla de Inventario */}
      <div className="rounded-2xl bg-[#12121a] border border-[#232330] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3.5 px-4">Producto</th>
                <th className="py-3.5 px-4 text-center">Nivel Visual</th>
                <th className="py-3.5 px-4 text-center">Stock Actual</th>
                <th className="py-3.5 px-4 text-center">Stock Mínimo</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Ajuste Rápido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {filtered.map((helmet) => {
                const isOutOfStock = helmet.stock <= 0;
                const isLowStock = helmet.stock > 0 && helmet.stock <= helmet.stockMinimo;
                const percentage = Math.min(100, Math.round((helmet.stock / (helmet.stockMinimo * 3)) * 100));

                return (
                  <tr key={helmet.id} className="hover:bg-[#181824] transition-colors">
                    {/* Producto */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={helmet.imagen}
                          alt={helmet.nombre}
                          className="w-10 h-10 rounded-xl object-cover bg-[#1c1c28] border border-[#2c2d3c]"
                        />
                        <div>
                          <p className="font-heading font-bold text-sm text-white">{helmet.nombre}</p>
                          <span className="text-[10px] text-red-400 font-mono">{helmet.marca} • {helmet.categoria}</span>
                        </div>
                      </div>
                    </td>

                    {/* Barra de progreso visual */}
                    <td className="py-3 px-4 w-44">
                      <div className="w-full bg-[#1e1e2c] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isOutOfStock
                              ? 'bg-red-600'
                              : isLowStock
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.max(4, percentage)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono block text-right mt-1">
                        {helmet.stock} / {helmet.stockMinimo * 3} ref.
                      </span>
                    </td>

                    {/* Stock Actual */}
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-sm text-white">
                      {helmet.stock}
                    </td>

                    {/* Stock Mínimo */}
                    <td className="py-3 px-4 text-center font-mono text-zinc-400">
                      {helmet.stockMinimo}
                    </td>

                    {/* Estado con colores */}
                    <td className="py-3 px-4">
                      {isOutOfStock ? (
                        <Badge variant="danger" size="sm">
                          <AlertTriangle className="w-3 h-3" /> Agotado
                        </Badge>
                      ) : isLowStock ? (
                        <Badge variant="warning" size="sm">
                          <AlertTriangle className="w-3 h-3" /> Stock bajo
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          <Check className="w-3 h-3" /> Disponible
                        </Badge>
                      )}
                    </td>

                    {/* Ajuste rápido con botones +/- */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center bg-[#181824] rounded-lg border border-[#2c2d3e] p-0.5">
                        <button
                          onClick={() => handleStockChange(helmet.id, helmet.stock, -1)}
                          disabled={helmet.stock <= 0}
                          className="p-1 text-zinc-400 hover:text-white disabled:opacity-30"
                          title="Restar 1 unidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-white text-xs">
                          {helmet.stock}
                        </span>
                        <button
                          onClick={() => handleStockChange(helmet.id, helmet.stock, 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          title="Sumar 1 unidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
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

    </div>
  );
};
