import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, ChevronLeft } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, envio, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#09090c]">
        <div className="w-20 h-20 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-6 text-red-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-white">Tu carrito está vacío</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-sm">
          Aún no has agregado cascos a tu carrito de compras. Explora nuestras marcas y modelos deportivos.
        </p>
        <Link
          to="/cascos"
          className="mt-6 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
        >
          <span>Ir al Catálogo de Cascos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090c] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#232330] gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Carrito de Compras
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Revisa los productos seleccionados antes de proceder a la facturación y envío.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vaciar todo el carrito</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* TABLA / LISTA DE PRODUCTOS (8 columnas) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Header de tabla (Desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 bg-[#12121a] rounded-xl border border-[#232330]">
              <span className="col-span-6">Producto</span>
              <span className="col-span-2 text-center">Precio</span>
              <span className="col-span-2 text-center">Cantidad</span>
              <span className="col-span-2 text-right">Subtotal</span>
            </div>

            {/* Filas de items */}
            {items.map((item) => {
              const itemSubtotal = item.helmet.precio * item.cantidad;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center p-4 sm:p-5 rounded-2xl bg-[#12121a] border border-[#232330] hover:border-red-500/30 transition-all shadow-sm"
                >
                  {/* Columna 1: Imagen e Información (col-span-6) */}
                  <div className="flex items-center gap-4 w-full sm:col-span-6">
                    <Link to={`/cascos/${item.helmet.id}`} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-[#181824] border border-[#2b2c3c]">
                      <img
                        src={item.helmet.imagen}
                        alt={item.helmet.nombre}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-bold text-red-500 uppercase">{item.helmet.marca}</span>
                      <Link to={`/cascos/${item.helmet.id}`}>
                        <h4 className="font-heading text-base font-bold text-white hover:text-red-400 transition-colors truncate">
                          {item.helmet.nombre}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                        <span className="bg-[#1a1a26] px-2 py-0.5 rounded border border-[#2a2b3b]">Talla: {item.tallaSeleccionada}</span>
                        <span className="bg-[#1a1a26] px-2 py-0.5 rounded border border-[#2a2b3b]">{item.colorSeleccionado}</span>
                      </div>
                    </div>
                  </div>

                  {/* Columna 2: Precio Unitario (col-span-2) */}
                  <div className="w-full sm:w-auto flex justify-between sm:justify-center sm:col-span-2 text-sm font-semibold text-zinc-300">
                    <span className="sm:hidden text-zinc-500 text-xs">Precio:</span>
                    <span>Bs. {item.helmet.precio.toLocaleString()}</span>
                  </div>

                  {/* Columna 3: Control de Cantidad (col-span-2) */}
                  <div className="w-full sm:w-auto flex justify-between sm:justify-center sm:col-span-2">
                    <span className="sm:hidden text-zinc-500 text-xs">Cantidad:</span>
                    <div className="flex items-center bg-[#181824] rounded-lg border border-[#2b2c3c] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="p-1.5 text-zinc-400 hover:text-white"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        disabled={item.cantidad >= item.helmet.stock}
                        className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Columna 4: Subtotal y Botón Eliminar (col-span-2) */}
                  <div className="w-full sm:w-auto flex justify-between sm:justify-end items-center gap-3 sm:col-span-2">
                    <span className="sm:hidden text-zinc-500 text-xs">Subtotal:</span>
                    <span className="font-heading font-extrabold text-base text-white">
                      Bs. {itemSubtotal.toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Enlace para seguir comprando */}
            <div className="pt-4">
              <Link
                to="/cascos"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Continuar explorando cascos</span>
              </Link>
            </div>

          </div>

          {/* RESUMEN DEL PEDIDO (4 columnas) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl space-y-6">
              <h3 className="font-heading text-xl font-bold text-white border-b border-[#232330] pb-4">
                Resumen del Pedido
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal productos</span>
                  <span className="font-semibold text-white">Bs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span>Envío</span>
                    {envio === 0 && (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                        Gratis
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-white">
                    {envio === 0 ? 'Bs. 0' : `Bs. ${envio}`}
                  </span>
                </div>

                {subtotal < 1000 && (
                  <p className="text-[11px] text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                    Agrega Bs. {(1000 - subtotal).toLocaleString()} más para obtener <strong>Envío Gratis</strong> en toda Bolivia.
                  </p>
                )}

                <div className="border-t border-[#232330] pt-3 flex justify-between items-baseline">
                  <span className="font-heading text-lg font-bold text-white">Total</span>
                  <span className="font-heading text-2xl font-extrabold text-red-500">
                    Bs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Botón Finalizar Pedido */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Badges de Garantía */}
              <div className="pt-2 border-t border-[#232330] space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pago 100% seguro (Simulado)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Entrega en 24-48 hrs en ciudades principales</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
