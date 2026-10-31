import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';
import { Order, OrderStatus } from '../../types';
import { Badge } from '../../components/common/Badge';
import { ShoppingBag, Search, Eye, CheckCircle2, Clock, Truck, Package, XCircle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    orderService.getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (orderId: string, nuevoEstado: OrderStatus) => {
    try {
      const updated = await orderService.updateOrderStatus(orderId, nuevoEstado);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      showToast(`Pedido ${updated.numeroPedido} actualizado a: ${nuevoEstado}`, 'success');
    } catch {
      showToast('Error al actualizar el estado del pedido', 'error');
    }
  };

  const statusOptions: OrderStatus[] = ['Pendiente', 'Confirmado', 'Preparando', 'Entregado', 'Cancelado'];

  const getStatusBadge = (estado: OrderStatus) => {
    switch (estado) {
      case 'Pendiente':
        return <Badge variant="warning"><Clock className="w-3 h-3" /> Pendiente</Badge>;
      case 'Confirmado':
        return <Badge variant="info"><CheckCircle2 className="w-3 h-3" /> Confirmado</Badge>;
      case 'Preparando':
        return <Badge variant="info"><Package className="w-3 h-3" /> Preparando</Badge>;
      case 'Entregado':
        return <Badge variant="success"><Truck className="w-3 h-3" /> Entregado</Badge>;
      case 'Cancelado':
        return <Badge variant="danger"><XCircle className="w-3 h-3" /> Cancelado</Badge>;
    }
  };

  const filteredOrders = orders.filter(o =>
    o.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.cliente.ci.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Gestión y Despacho de Pedidos</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Revisión de órdenes de clientes y cambio de estados logísticos en tiempo real.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar pedido por código, cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#12121a] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#232330] focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
      </div>

      {/* TABLA DE PEDIDOS ADMINISTRATIVOS (REQUISITO 24) */}
      <div className="rounded-2xl bg-[#12121a] border border-[#232330] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3.5 px-4">Pedido</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4 text-center">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Estado Actual</th>
                <th className="py-3.5 px-4">Cambiar Estado</th>
                <th className="py-3.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#181824] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-red-400">
                    {order.numeroPedido}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-white">{order.cliente.nombre} {order.cliente.apellido}</p>
                    <span className="text-[10px] text-zinc-500 font-mono">{order.cliente.ci}</span>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 font-mono">
                    {order.fecha}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-zinc-200">
                    {order.items.reduce((acc, i) => acc + i.cantidad, 0)}
                  </td>
                  <td className="py-3 px-4 font-mono font-extrabold text-white">
                    Bs. {order.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(order.estado)}
                  </td>
                  
                  {/* Selector interactivo para cambiar estado (Requisito 24) */}
                  <td className="py-3 px-4">
                    <select
                      value={order.estado}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-[#181824] text-xs font-semibold text-zinc-200 py-1.5 px-2.5 rounded-lg border border-[#2b2c3c] focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
                    >
                      {statusOptions.map(st => (
                        <option key={st} value={st} className="bg-[#12121a] text-white">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg bg-[#181824] text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Ver detalle del pedido"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalle del Pedido */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Detalle de Pedido: ${selectedOrder?.numeroPedido || ''}`}
        maxWidth="lg"
      >
        {selectedOrder && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#181824] border border-[#2b2c3c]">
              <div>
                <span className="text-zinc-500 block uppercase font-mono text-[10px]">Cliente</span>
                <p className="font-bold text-white text-sm">{selectedOrder.cliente.nombre} {selectedOrder.cliente.apellido}</p>
                <p className="text-zinc-400">{selectedOrder.cliente.correo}</p>
                <p className="text-zinc-400 font-mono">{selectedOrder.cliente.telefono}</p>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase font-mono text-[10px]">Dirección de Entrega</span>
                <p className="text-zinc-200">{selectedOrder.cliente.direccion}</p>
                <p className="text-zinc-400">{selectedOrder.cliente.ciudad || 'La Paz'}</p>
                <span className="inline-block mt-1 font-semibold text-red-400">Pago: {selectedOrder.metodoPago}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-400 font-mono uppercase font-bold block mb-2">Productos Ordenados</span>
              <div className="divide-y divide-[#232332] rounded-xl bg-[#181824] border border-[#2b2c3c] overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.helmet.imagen} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-white">{item.helmet.nombre}</p>
                        <p className="text-[10px] text-zinc-500">Talla: {item.tallaSeleccionada} • Color: {item.colorSeleccionado} • Cant: {item.cantidad}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-white">
                      Bs. {(item.helmet.precio * item.cantidad).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#232330] flex items-center justify-between">
              <div>
                <span className="text-zinc-400 text-xs">Cambiar Estado:</span>
                <select
                  value={selectedOrder.estado}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="ml-2 bg-[#181824] text-xs font-semibold text-white py-1 px-2 rounded-lg border border-[#2b2c3c]"
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-zinc-500 block">Total con envío</span>
                <span className="font-heading text-xl font-extrabold text-red-500">
                  Bs. {selectedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
