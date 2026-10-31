import React from 'react';
import { HelmetCategory, HelmetSize } from '../../types';
import { Filter, RotateCcw, Check, DollarSign, Flame } from 'lucide-react';

interface FiltersState {
  search: string;
  category: string;
  brand: string;
  size: string;
  color: string;
  maxPrice: number;
  inStockOnly: boolean;
  onlyOffers: boolean;
  sortBy: string;
}

interface FilterSidebarProps {
  filters: FiltersState;
  onChange: (newFilters: FiltersState) => void;
  onReset: () => void;
  availableBrands: string[];
  maxPossiblePrice: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  availableBrands,
  maxPossiblePrice
}) => {
  const categories: HelmetCategory[] = ['Integral', 'Modular', 'Abierto', 'Off Road'];
  const sizes: HelmetSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="bg-[#12121a] border border-[#232330] rounded-2xl p-5 space-y-6">
      
      {/* Encabezado de filtros */}
      <div className="flex items-center justify-between pb-4 border-b border-[#232330]">
        <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
          <Filter className="w-4 h-4 text-red-500" />
          <span>Filtros de Búsqueda</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors"
          title="Restablecer todos los filtros"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpiar</span>
        </button>
      </div>

      {/* 1. Categoría */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono mb-2.5">
          Categoría
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => onChange({ ...filters, category: '' })}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === ''
                ? 'bg-red-600/20 text-red-400 border border-red-500/40 font-semibold'
                : 'text-zinc-400 hover:bg-[#1a1a24] hover:text-white'
            }`}
          >
            <span>Todas las categorías</span>
            {filters.category === '' && <Check className="w-3.5 h-3.5" />}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-red-600/20 text-red-400 border border-red-500/40 font-semibold'
                  : 'text-zinc-400 hover:bg-[#1a1a24] hover:text-white'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Marca */}
      <div className="pt-4 border-t border-[#232330]">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono mb-2.5">
          Marca
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => onChange({ ...filters, brand: '' })}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
              filters.brand === ''
                ? 'bg-red-600/20 text-red-400 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Todas las marcas</span>
          </button>
          {availableBrands.map(brand => (
            <button
              key={brand}
              onClick={() => onChange({ ...filters, brand: brand })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                filters.brand === brand
                  ? 'bg-red-600/20 text-red-400 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>{brand}</span>
              {filters.brand === brand && <Check className="w-3.5 h-3.5 text-red-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Talla */}
      <div className="pt-4 border-t border-[#232330]">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono mb-2.5">
          Talla
        </label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map(size => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                onClick={() => onChange({ ...filters, size: isSelected ? '' : size })}
                className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                    : 'bg-[#181824] text-zinc-400 border-[#2a2b3b] hover:text-white hover:border-zinc-500'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Rango de Precio */}
      <div className="pt-4 border-t border-[#232330]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
            Precio Máximo
          </label>
          <span className="text-xs font-bold text-red-400">
            Bs. {filters.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max={maxPossiblePrice}
          step="50"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
          <span>Bs. 500</span>
          <span>Bs. {maxPossiblePrice.toLocaleString()}</span>
        </div>
      </div>

      {/* 5. Disponibilidad / En Stock */}
      <div className="pt-4 border-t border-[#232330]">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-zinc-300">Solo cascos disponibles en stock</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-red-600 bg-[#181824] border-[#2f303f] focus:ring-red-500 cursor-pointer"
          />
        </label>
      </div>

      {/* 6. Solo Ofertas y Descuentos */}
      <div className="pt-4 border-t border-[#232330]">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-medium text-zinc-300 group-hover:text-red-400 flex items-center gap-1.5 transition-colors">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Solo ofertas y descuentos</span>
          </span>
          <input
            type="checkbox"
            checked={filters.onlyOffers}
            onChange={(e) => onChange({ ...filters, onlyOffers: e.target.checked })}
            className="w-4 h-4 rounded text-red-600 bg-[#181824] border-[#2f303f] focus:ring-red-500 cursor-pointer"
          />
        </label>
      </div>

    </div>
  );
};
