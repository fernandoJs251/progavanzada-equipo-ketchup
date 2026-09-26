import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orderService } from '../services/orderService';
import { PaymentMethod } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowRight, 
  ShoppingBag,
  Clock
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, subtotal, envio, total, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Formulario del cliente
  const [formData, setFormData] = useState({
    nombre: user ? user.nombre.split(' ')[0] : '',
    apellido: user ? user.nombre.split(' ')[1] || '' : '',
    ci: '8472910 LP',
    telefono: '+591 76543210',
    correo: user ? user.email : '',
    direccion: 'Av. Arce #2430, Edif. Torre Azul',
    ciudad: 'La Paz',
    notas: ''
  });

  const [metodoPago, setMetodoPago] = useState<PaymentMethod>('QR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (items.length === 0 && !completedOrderNumber) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#09090c]">
        <ShoppingBag className="w-16 h-16 text-zinc-600 mb-4" />
        <h2 className="font-heading text-2xl font-bold text-white">No hay productos en el pedido</h2>
        <p className="text-zinc-400 text-sm mt-2">Agrega al menos un casco a tu carrito para realizar el checkout.</p>
        <Link to="/cascos" className="mt-5 px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs">
          Ver Cascos
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.ci || !formData.telefono || !formData.direccion) {
      showToast('Por favor completa los campos requeridos', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear pedido mediante orderService
      const createdOrder = await orderService.createOrder({
        cliente: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          ci: formData.ci,
          telefono: formData.telefono,
          correo: formData.correo,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          notas: formData.notas
        },
        items: [...items],
        subtotal,
        envio,
        total,
        estado: 'Confirmado',
        metodoPago
      });

      // Efecto confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignorar si falla
      }

      setCompletedOrderNumber(createdOrder.numeroPedido);
      clearCart();
      showToast('Pedido realizado correctamente.', 'success', '¡Compra Exitosa!');
    } catch {
      showToast('Error al procesar el pedido. Intenta nuevamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pantalla de confirmación de pedido
  if (completedOrderNumber) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#09090c]">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#12121a] border border-[#232330] text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-heading text-3xl font-extrabold text-white">
            Pedido Realizado Correctamente
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Hemos registrado tu orden en nuestro sistema de inventario.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-[#181824] border border-[#2a2b3c]">
            <span className="text-xs text-zinc-500 uppercase font-mono block">Código de Seguimiento</span>
            <span className="font-mono text-xl font-bold text-red-400">{completedOrderNumber}</span>
          </div>

          <div className="space-y-3">
            <Link
              to="/pedidos"
              className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all block"
            >
              Consultar Mis Pedidos
            </Link>
            <Link
              to="/cascos"
              className="w-full py-3 px-6 rounded-xl bg-[#181824] hover:bg-[#202030] text-zinc-300 font-semibold text-xs border border-[#2c2d3e] transition-all block"
            >
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090c] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Finalizar Pedido
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Ingresa los datos para la entrega de tu casco de motocicleta y selecciona el método de pago.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* FORMULARIO DE DESPACHO Y FACTURACIÓN (7 columnas) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Sección 1: Datos Personales */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#12121a] border border-[#232330] space-y-4">
                <h3 className="font-heading text-xl font-bold text-white border-b border-[#232330] pb-3">
                  1. Información del Cliente
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Nombre *</label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Carlos"
                      className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Apellido *</label>
                    <input
                      type="text"
                      required
                      value={formData.apellido}
                      onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                      placeholder="Ej. Mamani"
                      className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Cédula de Identidad (CI) *</label>
                    <input
                      type="text"
                      required
                      value={formData.ci}
                      onChange={e => setFormData({ ...formData, ci: e.target.value })}
                      placeholder="Ej. 8472910 LP"
                      className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={formData.telefono}
                      onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+591 76543210"
                      className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={e => setFormData({ ...formData, correo: e.target.value })}
                    placeholder="carlos.mamani@email.com"
                    className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sección 2: Dirección de Entrega */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#12121a] border border-[#232330] space-y-4">
                <h3 className="font-heading text-xl font-bold text-white border-b border-[#232330] pb-3">
                  2. Dirección de Entrega
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Ciudad *</label>
                    <select
                      value={formData.ciudad}
                      onChange={e => setFormData({ ...formData, ciudad: e.target.value })}
                      className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                      <option value="La Paz">La Paz</option>
                      <option value="Santa Cruz">Santa Cruz</option>
                      <option value="Cochabamba">Cochabamba</option>
                      <option value="Oruro">Oruro</option>
                      <option value="Potosí">Potosí</option>
                      <option value="Chuquisaca">Chuquisaca (Sucre)</option>
                      <option value="Tarija">Tarija</option>
                      <option value="Beni">Beni</option>
                      <option value="Pando">Pando</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Dirección exacta *</label>
                    <input
                      type="text"
                      required
                      value={formData.direccion}
                      onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                      placeholder="Calle / Avenida, Número, Edificio, Depto"
                      className="w-full bg-[#181824] text-white text-sm px-4 py-2.5 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1">Instrucciones o Referencia de entrega</label>
                  <textarea
                    rows={2}
                    value={formData.notas}
                    onChange={e => setFormData({ ...formData, notas: e.target.value })}
                    placeholder="Ej. Tocar timbre 4B o llamar al llegar"
                    className="w-full bg-[#181824] text-white text-sm px-4 py-2 rounded-xl border border-[#2c2d3e] focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Sección 3: Método de Pago Simulado */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#12121a] border border-[#232330] space-y-4">
                <h3 className="font-heading text-xl font-bold text-white border-b border-[#232330] pb-3">
                  3. Método de Pago Simulado
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* QR */}
                  <label
                    onClick={() => setMetodoPago('QR')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${
                      metodoPago === 'QR'
                        ? 'bg-red-600/10 border-red-500 text-white shadow-lg'
                        : 'bg-[#181824] border-[#2b2c3c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-8 h-8 text-red-500 mb-2" />
                    <span className="text-xs font-bold">Pago QR</span>
                    <span className="text-[10px] text-zinc-500 mt-1">Simple / Bancos</span>
                  </label>

                  {/* Transferencia */}
                  <label
                    onClick={() => setMetodoPago('Transferencia bancaria')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${
                      metodoPago === 'Transferencia bancaria'
                        ? 'bg-red-600/10 border-red-500 text-white shadow-lg'
                        : 'bg-[#181824] border-[#2b2c3c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-red-500 mb-2" />
                    <span className="text-xs font-bold text-center">Transferencia</span>
                    <span className="text-[10px] text-zinc-500 mt-1">Bancaria Directa</span>
                  </label>

                  {/* Efectivo */}
                  <label
                    onClick={() => setMetodoPago('Efectivo')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${
                      metodoPago === 'Efectivo'
                        ? 'bg-red-600/10 border-red-500 text-white shadow-lg'
                        : 'bg-[#181824] border-[#2b2c3c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-8 h-8 text-red-500 mb-2" />
                    <span className="text-xs font-bold">Efectivo</span>
                    <span className="text-[10px] text-zinc-500 mt-1">Contra entrega</span>
                  </label>
                </div>

                <div className="p-3 bg-[#181824] rounded-xl text-xs text-zinc-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modo Prototipo Universitario: No se efectúan cobros reales.</span>
                </div>
              </div>

            </div>

            {/* RESUMEN LATERAL (5 columnas) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 p-6 sm:p-8 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl space-y-6">
                
                <h3 className="font-heading text-xl font-bold text-white border-b border-[#232330] pb-3">
                  Resumen de la Orden
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-[#1f202b] last:border-0">
                      <img src={item.helmet.imagen} alt={item.helmet.nombre} className="w-12 h-12 rounded-lg object-cover bg-[#181824]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.helmet.nombre}</p>
                        <p className="text-[11px] text-zinc-400">Talla: {item.tallaSeleccionada} • Cant: {item.cantidad}</p>
                      </div>
                      <span className="text-xs font-bold text-zinc-300">
                        Bs. {(item.helmet.precio * item.cantidad).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#232330] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span className="text-white font-semibold">Bs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Costo de envío:</span>
                    <span className="text-white font-semibold">{envio === 0 ? 'Gratis' : `Bs. ${envio}`}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Método de pago:</span>
                    <span className="text-red-400 font-semibold">{metodoPago}</span>
                  </div>

                  <div className="border-t border-[#232330] pt-3 flex justify-between items-baseline">
                    <span className="font-heading text-lg font-bold text-white">Total a pagar:</span>
                    <span className="font-heading text-2xl font-extrabold text-red-500">
                      Bs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Procesando pedido...</span>
                  ) : (
                    <>
                      <span>Realizar pedido</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
