import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Shield, RotateCw, Wind, Compass } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const getCategoryIcon = (icono: string) => {
    switch (icono) {
      case 'Shield': return <Shield className="w-5 h-5 text-red-500" />;
      case 'RotateCw': return <RotateCw className="w-5 h-5 text-red-500" />;
      case 'Wind': return <Wind className="w-5 h-5 text-red-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-red-500" />;
      default: return <Shield className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="categorias" className="py-20 bg-[#09090c] border-b border-[#1c1d25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono">
              Encuentra tu estilo
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Categorías de Cascos
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mt-3 md:mt-0">
            Diseñados para cada tipo de conducción, desde el circuito hasta la ciudad y senderos extremos.
          </p>
        </div>

        {/* Cuadrícula de 4 categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col rounded-2xl bg-[#13131b] border border-[#232330] hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 overflow-hidden"
            >
              {/* Imagen con Overlay gradiente */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1c28]">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-[#13131b]/40 to-transparent" />
                
                {/* Ícono distintivo */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                  {getCategoryIcon(cat.icono)}
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/10">
                  {cat.cantidad} modelos
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="flex-1 flex flex-col p-6">
                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                  {cat.nombre}
                </h3>
                
                <p className="text-xs text-zinc-400 mt-2 mb-6 leading-relaxed flex-1">
                  {cat.descripcion}
                </p>

                {/* Botón Ver Productos */}
                <Link
                  to={`/cascos?categoria=${encodeURIComponent(cat.nombre)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a24] hover:bg-red-600 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#2a2b3b] hover:border-red-500 transition-all group-hover:shadow-md"
                >
                  <span>Ver productos</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
