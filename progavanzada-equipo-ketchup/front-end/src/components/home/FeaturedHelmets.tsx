import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../catalog/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const FeaturedHelmets: React.FC = () => {
  const { products } = useProducts();

  // Filtrar cascos destacados (o los 6 primeros más relevantes)
  const featured = products.filter(p => p.destacado).slice(0, 6);

  return (
    <section className="py-20 bg-[#0c0c11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-500 font-mono mb-1">
              <Flame className="w-4 h-4" />
              <span>Los más elegidos por los pilotos</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Cascos Destacados
            </h2>
          </div>

          <Link
            to="/cascos"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 mt-4 md:mt-0 transition-colors group"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid de productos destacados (Responsive: 1 móvil, 2 tablet, 3-4 desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {featured.map((helmet) => (
            <ProductCard key={helmet.id} helmet={helmet} />
          ))}
        </div>

        {/* Banner inferior de incentivo */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#181822] to-[#121219] border border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">¿No encuentras tu talla o modelo ideal?</h3>
            <p className="text-sm text-zinc-400 mt-1">Explora nuestro catálogo con filtros por marca, color, homologación y precio.</p>
          </div>
          <Link
            to="/cascos"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all shrink-0"
          >
            Explorar catálogo completo
          </Link>
        </div>

      </div>
    </section>
  );
};
