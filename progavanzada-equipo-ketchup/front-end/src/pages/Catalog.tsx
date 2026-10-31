import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { Search, SlidersHorizontal, ArrowUpDown, X, Box } from 'lucide-react';

export const Catalog: React.FC = () => {
  const { products, isLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Marcas únicas disponibles
  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.marca))).sort();
  }, [products]);

  // Precio máximo disponible
  const maxPossiblePrice = useMemo(() => {
    return products.length > 0 ? Math.max(...products.map(p => p.precio)) : 4000;
  }, [products]);

  // Estado de los filtros
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('categoria') || '',
    brand: searchParams.get('marca') || '',
    size: searchParams.get('talla') || '',
    color: '',
    maxPrice: maxPossiblePrice,
    inStockOnly: false,
    onlyOffers: searchParams.get('oferta') === 'true',
    sortBy: 'populares' // 'precio-asc' | 'precio-desc' | 'nombre' | 'populares'
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sincronizar búsqueda desde query params si cambian
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('categoria') || '';
    const brand = searchParams.get('marca') || '';
    const size = searchParams.get('talla') || '';
    const oferta = searchParams.get('oferta') === 'true';

    setFilters(f => ({
      ...f,
      search: q,
      category: cat,
      brand: brand,
      size: size,
      onlyOffers: oferta
    }));
  }, [searchParams]);

  // Actualizar precio máximo cuando carguen los productos
  useEffect(() => {
    if (maxPossiblePrice > 0) {
      setFilters(f => ({ ...f, maxPrice: maxPossiblePrice }));
    }
  }, [maxPossiblePrice]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    const params: Record<string, string> = {};
    if (newFilters.search.trim()) params.q = newFilters.search.trim();
    if (newFilters.category) params.categoria = newFilters.category;
    if (newFilters.brand) params.marca = newFilters.brand;
    if (newFilters.size) params.talla = newFilters.size;
    if (newFilters.onlyOffers) params.oferta = 'true';
    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    const reset = {
      search: '',
      category: '',
      brand: '',
      size: '',
      color: '',
      maxPrice: maxPossiblePrice,
      inStockOnly: false,
      onlyOffers: false,
      sortBy: 'populares'
    };
    setFilters(reset);
    setSearchParams({}, { replace: true });
  };

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Buscador
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
      );
    }

    // 2. Categoría
    if (filters.category) {
      result = result.filter(p => p.categoria.toLowerCase() === filters.category.toLowerCase());
    }

    // 3. Marca
    if (filters.brand) {
      result = result.filter(p => p.marca.toLowerCase() === filters.brand.toLowerCase());
    }

    // 4. Talla
    if (filters.size) {
      result = result.filter(p => p.tallasDisponibles.includes(filters.size as any));
    }

    // 5. Precio Máximo
    result = result.filter(p => p.precio <= filters.maxPrice);

    // 6. Solo en stock
    if (filters.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // 7. Solo ofertas
    if (filters.onlyOffers) {
      result = result.filter(p => !!p.precioAnterior && p.precioAnterior > p.precio);
    }

    // 8. Ordenamiento
    switch (filters.sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'populares':
      default:
        result.sort((a, b) => (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating));
        break;
    }

    return result;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-[#09090c] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Página */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-red-500 font-mono uppercase font-bold tracking-wider mb-1">
            <Box className="w-4 h-4" />
            <span>Tienda Oficial BikerStock3D</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
            Catálogo de Cascos
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Explora cascos de motocicleta de competición, touring y ciudad con garantía de fábrica y soporte 3D.
          </p>
        </div>

        {/* Barra superior de herramientas: Buscador y Ordenar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#12121a] border border-[#232330] mb-8">
          
          {/* Input de Búsqueda rápida */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por modelo, marca o característica..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-[#181822] text-sm text-white pl-10 pr-9 py-2.5 rounded-xl border border-[#272736] focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-3 top-3 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Botón de filtros en móvil */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#181822] text-zinc-200 border border-[#272736] text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4 text-red-500" />
              <span>Filtros</span>
            </button>

            {/* Selector de Ordenamiento */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full sm:w-auto bg-[#181822] text-sm text-zinc-200 py-2.5 px-3 rounded-xl border border-[#272736] focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              >
                <option value="populares">Más populares</option>
                <option value="precio-asc">Precio menor a mayor</option>
                <option value="precio-desc">Precio mayor a menor</option>
                <option value="nombre">Nombre (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Principal: Sidebar y Grid de Productos */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR DE FILTROS (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                availableBrands={availableBrands}
                maxPossiblePrice={maxPossiblePrice}
              />
            </div>
          </aside>

          {/* GRID DE PRODUCTOS */}
          <main className="lg:col-span-3">
            
            {/* Contador de resultados */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-400">
                Mostrando <strong className="text-white">{filteredProducts.length}</strong> de {products.length} cascos
              </span>
              
              {(filters.category || filters.brand || filters.size || filters.search) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-red-400 hover:underline font-semibold"
                >
                  Limpiar filtros activos
                </button>
              )}
            </div>

            {/* Listado de Productos */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="rounded-2xl bg-[#13131b] border border-[#232330] p-4 h-96 animate-pulse">
                    <div className="w-full h-48 bg-[#1f202b] rounded-xl mb-4" />
                    <div className="w-2/3 h-4 bg-[#1f202b] rounded mb-2" />
                    <div className="w-1/2 h-3 bg-[#1f202b] rounded mb-4" />
                    <div className="w-1/3 h-6 bg-[#1f202b] rounded" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(helmet => (
                  <ProductCard key={helmet.id} helmet={helmet} />
                ))}
              </div>
            ) : (
              /* Estado Vacío */
              <div className="text-center py-16 px-4 rounded-2xl bg-[#12121a] border border-[#232330]">
                <Box className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <h3 className="font-heading text-xl font-bold text-white">No se encontraron cascos</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Ningún casco coincide con los filtros aplicados. Intenta ampliar tus criterios de búsqueda.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-all"
                >
                  Restablecer filtros
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* DRAWER MÓVIL DE FILTROS */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#12121a] h-full p-5 overflow-y-auto z-10">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#232330]">
              <span className="font-heading font-bold text-lg text-white">Filtros</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableBrands={availableBrands}
              maxPossiblePrice={maxPossiblePrice}
            />

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-6 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              Aplicar y Cerrar ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
