import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Sparkles, Box, Compass, Flame, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#09090c] via-[#101017] to-[#09090c] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#1f202b]">
      {/* Luces y mallas de fondo estilo pista */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-0 w-96 h-96 bg-red-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA: TEXTO Y LLAMADA A LA ACCIÓN */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wide">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              <span>NUEVA COLECCIÓN MOTORSPORT 2026</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Encuentra el casco perfecto para tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">próxima ruta</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-zinc-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Seguridad, estilo y tecnología en un solo lugar. Inspecciona tus modelos en 3D antes de comprar con el estándar de protección más riguroso del mundo.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/cascos"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Ver cascos</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#categorias"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#181822] hover:bg-[#20202e] text-zinc-200 hover:text-white font-bold text-base border border-[#2b2c3c] hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-red-400" />
                <span>Explorar colección</span>
              </a>
            </div>

            {/* Métricas rápidas */}
            <div className="pt-8 border-t border-[#1f202b] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-white">+12</p>
                <p className="text-xs text-zinc-400">Modelos Premium</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-red-500">ECE 22.06</p>
                <p className="text-xs text-zinc-400">Homologación Europea</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-white">360°</p>
                <p className="text-xs text-zinc-400">Visualizador 3D</p>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: COMPOSICIÓN VISUAL DEL CASCO DEPORTIVO */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Halo de resplandor */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-red-500/10 rounded-3xl blur-2xl -z-10" />

            {/* Contenedor principal de la tarjeta Hero */}
            <div className="relative w-full max-w-md rounded-3xl bg-[#14141d] border border-[#2a2b3d] p-6 shadow-2xl">
              
              {/* Badge de casco estrella */}
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  Modelo Estrella
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/80 border border-[#333446] text-white text-xs font-bold">
                  <Box className="w-3.5 h-3.5 text-red-500" />
                  Listo para 3D
                </span>
              </div>

              {/* Imagen principal con marco deportivo */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1c1c28] to-[#101016] border border-[#2a2b3d] group">
                <img
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"
                  alt="Casco deportivo BikerStock3D"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Hotspot interactivo 3D */}
                <Link
                  to="/cascos/2"
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105"
                >
                  <span>Probar en 3D</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Especificaciones destacadas de la composición */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">AGV K1 S Racing</h3>
                    <p className="text-xs text-zinc-400">Calota de alta resistencia con spoiler biplano</p>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-2xl font-extrabold text-red-500">Bs. 1.650</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#232330] text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Certificado ECE 22.06
                  </span>
                  <span>Peso: 1500g</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
