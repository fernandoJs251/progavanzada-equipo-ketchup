import React, { useState, useEffect } from 'react';
import { salesService } from '../../services/salesService';
import { Sale } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { TrendingUp, Search, Eye, Download, Calendar, DollarSign } from 'lucide-react';

export const AdminSales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    salesService.getSales().then(setSales);
  }, []);

  const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

  const filteredSales = sales.filter(s =>
    s.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.clienteCI.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Cabecera y Resumen de Ventas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Registro de Ventas y Facturación</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Histórico de transacciones de cascos de motocicleta efectuadas en el sistema.
          </p>
        </div>

        <div className="p-3 bg-[#12121a] rounded-2xl border border-[#232330] flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-red-500" />
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-mono block">Recaudación en Ventas</span>
            <span className="font-heading text-lg font-extrabold text-white">
              Bs. {totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Buscar por cliente, CI o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#12121a] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#232330] focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      {/* TABLA DE VENTAS (REQUISITO 22) */}
      <div className="rounded-2xl bg-[#12121a] border border-[#232330] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3.5 px-4">ID Venta</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Fecha y Hora</th>
                <th className="py-3.5 px-4 text-center">Cant. Productos</th>
                <th className="py-3.5 px-4">Método de Pago</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-[#181824] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-red-400">
                    {sale.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-white">{sale.cliente}</p>
                    <span className="text-[10px] text-zinc-500 font-mono">{sale.clienteCI}</span>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 font-mono text-[11px]">
                    {sale.fecha}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-zinc-200">
                    {sale.cantidadProductos}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {sale.metodoPago}
                  </td>
                  <td className="py-3 px-4 font-mono font-extrabold text-white text-sm">
                    Bs. {sale.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={sale.estado === 'Completada' ? 'success' : 'warning'} size="sm">
                      {sale.estado}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedSale(sale)}
                      className="px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-[#2b2c3c] text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Detalle</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLE DE VENTA / COMPROBANTE */}
      <Modal
        isOpen={!!selectedSale}
        onClose={() => setSelectedSale(null)}
        title={`Detalle de Venta: ${selectedSale?.id || ''}`}
        maxWidth="md"
      >
        {selectedSale && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#181824] border border-[#2b2c3c] space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Cliente:</span>
                <span className="font-bold text-white">{selectedSale.cliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">C.I.:</span>
                <span className="font-mono text-zinc-300">{selectedSale.clienteCI}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Fecha:</span>
                <span className="font-mono text-zinc-300">{selectedSale.fecha}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Método de Pago:</span>
                <span className="text-red-400 font-semibold">{selectedSale.metodoPago}</span>
              </div>
            </div>

            <div>
              <h4 className="font-mono uppercase font-bold text-zinc-400 mb-2">Cascos Incluidos:</h4>
              <div className="divide-y divide-[#232332] rounded-xl bg-[#181824] border border-[#2b2c3c] overflow-hidden">
                {selectedSale.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{item.nombre}</p>
                      <p className="text-[10px] text-zinc-500">Cant: {item.cantidad} x Bs. {item.precioUnitario.toLocaleString()}</p>
                    </div>
                    <span className="font-mono font-bold text-white">
                      Bs. {(item.cantidad * item.precioUnitario).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#232330] flex justify-between items-baseline">
              <span className="font-heading text-base font-bold text-white">Total Pagado:</span>
              <span className="font-heading text-xl font-extrabold text-red-500">
                Bs. {selectedSale.total.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
