import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Award, Phone, Mail, MapPin, QrCode, CreditCard, Banknote } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#060608] border-t border-[#1c1d25] text-zinc-400">
      {/* Barra de 4 pilares de confianza */}
      <div className="border-b border-[#1c1d25] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f0f15] border border-[#20212d]">
              <div className="p-3 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Envíos a Nivel Nacional</h4>
                <p className="text-xs text-zinc-400">Gratis en compras superiores a Bs. 1.000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f0f15] border border-[#20212d]">
              <div className="p-3 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Homologación ECE 22.06</h4>
                <p className="text-xs text-zinc-400">Seguridad certificada bajo estándares europeos</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f0f15] border border-[#20212d]">
              <div className="p-3 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Garantía Oficial</h4>
                <p className="text-xs text-zinc-400">Cambio directo por defecto de fábrica</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f0f15] border border-[#20212d]">
              <div className="p-3 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Visualización 3D</h4>
                <p className="text-xs text-zinc-400">Inspecciona el casco en 360° antes de comprar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Columna Marca */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-600 text-white font-bold">
                3D
              </div>
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                BIKER<span className="text-red-500">STOCK</span>3D
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Plataforma especializada en cascos de motocicleta de alto rendimiento, 
              gestión inteligente de inventario y simulación 3D de última generación.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-red-600/10 border border-red-500/30 text-red-400 font-mono">
                Proyecto Universitario Frontend • Prototipo 2026
              </span>
            </div>
          </div>

          {/* Columna Navegación */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Inicio</Link></li>
              <li><Link to="/cascos" className="hover:text-red-400 transition-colors">Catálogo Completo</Link></li>
              <li><Link to="/cascos?oferta=true" className="hover:text-red-400 transition-colors">Ofertas Especiales</Link></li>
              <li><Link to="/carrito" className="hover:text-red-400 transition-colors">Carrito de Compras</Link></li>
              <li><Link to="/pedidos" className="hover:text-red-400 transition-colors">Seguimiento de Pedidos</Link></li>
            </ul>
          </div>

          {/* Columna Categorías */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cascos?categoria=Integral" className="hover:text-red-400 transition-colors">Cascos Integrales</Link></li>
              <li><Link to="/cascos?categoria=Modular" className="hover:text-red-400 transition-colors">Cascos Modulares</Link></li>
              <li><Link to="/cascos?categoria=Abierto" className="hover:text-red-400 transition-colors">Cascos Abiertos (Jet)</Link></li>
              <li><Link to="/cascos?categoria=Off Road" className="hover:text-red-400 transition-colors">Off Road / Motocross</Link></li>
              <li><Link to="/admin" className="text-red-400 hover:underline flex items-center gap-1 font-semibold mt-2">Acceso Administrativo →</Link></li>
            </ul>
          </div>

          {/* Columna Métodos de Pago Simulados & Contacto */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Métodos de Pago</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <QrCode className="w-4 h-4 text-red-500" />
                <span>Pago con QR Simple</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CreditCard className="w-4 h-4 text-red-500" />
                <span>Transferencia Bancaria</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Banknote className="w-4 h-4 text-red-500" />
                <span>Pago contra Entrega (Efectivo)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1c1d25] text-xs space-y-1.5">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-zinc-500" /> +591 76543210</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-zinc-500" /> contacto@bikerstock3d.bo</p>
            </div>
          </div>

        </div>

        {/* Barra de copyright */}
        <div className="border-t border-[#1c1d25] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 BikerStock3D. Prototipo desarrollado para fines académicos.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-zinc-400 cursor-pointer">Términos de servicio</span>
            <span className="hover:text-zinc-400 cursor-pointer">Políticas de garantía</span>
            <span className="text-red-500 font-semibold">Listo para API REST</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
