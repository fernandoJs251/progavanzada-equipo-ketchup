import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Order, OrderStatus } from '../types';
import { orderService } from '../services/orderService';
import { Badge } from '../components/common/Badge';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  ChevronRight, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    orderService.getOrders().then(res => {
      setOrders(res);
      setIsLoading(false);
    });
  }, []);

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
      default:
        return <Badge variant="default">{estado}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090c] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Mis Pedidos
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Historial de órdenes y seguimiento de estado en tiempo real.
            </p>
          </div>

          <Link
            to="/cascos"
            className="px-4 py-2 rounded-xl bg-[#181824] hover:bg-[#202030] text-zinc-200 border border-[#2b2c3c] text-xs font-bold transition-colors self-start sm:self-auto flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <span>Seguir Comprando</span>
          </Link>
        </div>

        {/* Listado de Pedidos */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-36 rounded-2xl bg-[#12121a] border border-[#232330] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#12121a] border border-[#232330]">
            <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold text-white">No tienes pedidos registrados</h3>
            <p className="text-zinc-400 text-xs mt-1">Realiza tu primera compra desde nuestro catálogo de cascos.</p>
            <Link to="/cascos" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs">
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="rounded-3xl bg-[#12121a] border border-[#232330] hover:border-red-500/30 transition-all overflow-hidden shadow-xl"
              >
                {/* Header del Pedido */}
                <div className="px-6 py-4 bg-[#161622] border-b border-[#232330] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">Número de Pedido</span>
                      <span className="font-mono text-sm font-bold text-white">{order.numeroPedido}</span>
                    </div>
                    <div className="hidden sm:block h-6 w-px bg-zinc-700" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">Fecha</span>
                      <span className="text-xs font-semibold text-zinc-300">{order.fecha}</span>
                    </div>
                    <div className="hidden sm:block h-6 w-px bg-zinc-700" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">Método de Pago</span>
                      <span className="text-xs font-semibold text-red-400">{order.metodoPago}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.estado)}
                    <span className="font-heading text-lg font-bold text-white">
                      Bs. {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items del Pedido */}
                <div className="p-6 divide-y divide-[#1f202b]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.helmet.imagen}
                          alt={item.helmet.nombre}
                          className="w-16 h-16 rounded-xl object-cover bg-[#181824] border border-[#272738]"
                        />
                        <div>
                          <span className="text-[10px] uppercase font-mono font-bold text-red-500">{item.helmet.marca}</span>
                          <h4 className="font-heading text-base font-bold text-white">{item.helmet.nombre}</h4>
                          <p className="text-xs text-zinc-400">
                            Talla: <span className="text-zinc-200">{item.tallaSeleccionada}</span> • Color: <span className="text-zinc-200">{item.colorSeleccionado}</span> • Cantidad: <span className="text-white font-bold">{item.cantidad}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="font-heading font-extrabold text-sm text-zinc-200">
                          Bs. {(item.helmet.precio * item.cantidad).toLocaleString()}
                        </span>
                        <Link
                          to={`/cascos/${item.helmet.id}`}
                          className="p-2 rounded-lg bg-[#181824] hover:bg-red-600/20 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Ver producto en tienda"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pie de pedido: Destinatario */}
                <div className="px-6 py-3 bg-[#0e0e15] border-t border-[#1f202b] flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
                  <span>
                    Destinatario: <strong className="text-zinc-200">{order.cliente.nombre} {order.cliente.apellido}</strong> ({order.cliente.ci})
                  </span>
                  <span>
                    Entrega en: <strong className="text-zinc-200">{order.cliente.direccion}, {order.cliente.ciudad || 'La Paz'}</strong>
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
