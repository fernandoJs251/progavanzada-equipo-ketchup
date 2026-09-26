import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Helmet3DViewer } from '../components/product/Helmet3DViewer';
import { ProductCard } from '../components/catalog/ProductCard';
import { Badge } from '../components/common/Badge';
import { HelmetSize } from '../types';
import { 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Box, 
  ChevronRight, 
  Check, 
  AlertTriangle, 
  Minus, 
  Plus, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const helmetId = id ? parseInt(id, 10) : 0;
  const helmet = getProductById(helmetId);

  // Estados locales para selección en el detalle
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<HelmetSize>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'3d' | 'specs'>('3d');

  useEffect(() => {
    if (helmet) {
      setSelectedImage(helmet.imagen);
      setSelectedSize(helmet.talla);
      setSelectedColor(helmet.color);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [helmet]);

  if (!helmet) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#09090c]">
        <Box className="w-16 h-16 text-zinc-600 mb-4 animate-bounce" />
        <h2 className="font-heading text-3xl font-bold text-white">Casco no encontrado</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-sm">
          El producto solicitado no existe o fue retirado de nuestro catálogo.
        </p>
        <Link
          to="/cascos"
          className="mt-6 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const isOutOfStock = helmet.stock <= 0;
  const isLowStock = helmet.stock > 0 && helmet.stock <= helmet.stockMinimo;

  const handleAddToCart = () => {
    addToCart(helmet, quantity, selectedSize, selectedColor);
  };

  // Productos relacionados de la misma categoría o marca
  const relatedHelmets = products
    .filter(p => p.id !== helmet.id && (p.categoria === helmet.categoria || p.marca === helmet.marca))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#09090c] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb de navegación */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8 font-medium">
          <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link to="/cascos" className="hover:text-white transition-colors">Cascos</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link to={`/cascos?categoria=${helmet.categoria}`} className="hover:text-white transition-colors">{helmet.categoria}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-red-400 truncate max-w-[200px]">{helmet.nombre}</span>
        </nav>

        {/* Sección Principal: Galería + Ficha de Compra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* GALERÍA DE IMÁGENES (7 columnas en desktop) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Imagen Principal Grande */}
            <div className="relative aspect-[4/3] rounded-3xl bg-[#14141d] border border-[#272736] overflow-hidden group shadow-2xl">
              <img
                src={selectedImage || helmet.imagen}
                alt={helmet.nombre}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="default" size="sm">
                  {helmet.categoria}
                </Badge>
                {helmet.destacado && (
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded bg-red-600 text-white shadow">
                    Top Ventas
                  </span>
                )}
              </div>

              {/* Botón flotante para saltar al 3D */}
              <button
                onClick={() => {
                  const element = document.getElementById('seccion-3d');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/80 hover:bg-red-600 text-white text-xs font-bold backdrop-blur-md border border-red-500/40 transition-all shadow-lg"
              >
                <Box className="w-4 h-4 text-red-400 group-hover:text-white" />
                <span>Ver en 3D</span>
              </button>
            </div>

            {/* Miniaturas de la Galería */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {helmet.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#181824] border-2 transition-all shrink-0 ${
                    selectedImage === img
                      ? 'border-red-500 ring-2 ring-red-500/30'
                      : 'border-[#272736] opacity-70 hover:opacity-100 hover:border-zinc-500'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* FICHA TÉCNICA Y OPCIONES DE COMPRA (5 columnas en desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#12121a] p-6 sm:p-8 rounded-3xl border border-[#232330] shadow-xl">
            
            <div>
              {/* Marca y Valoración */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">
                  {helmet.marca}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="font-bold text-white">{helmet.rating}</span>
                  <span className="text-zinc-500">({helmet.reviewsCount} opiniones verificadas)</span>
                </div>
              </div>

              {/* Nombre del Casco */}
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {helmet.nombre}
              </h1>

              {/* Precios */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                  Bs. {helmet.precio.toLocaleString()}
                </span>
                {helmet.precioAnterior && (
                  <span className="text-base text-zinc-500 line-through">
                    Bs. {helmet.precioAnterior.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Facturación Oficial
                </span>
              </div>

              {/* Estado de Stock */}
              <div className="mt-4">
                {isOutOfStock ? (
                  <Badge variant="danger" size="md">
                    <AlertTriangle className="w-3.5 h-3.5" /> Producto Agotado actualmente
                  </Badge>
                ) : isLowStock ? (
                  <Badge variant="warning" size="md">
                    <AlertTriangle className="w-3.5 h-3.5" /> ¡Últimas {helmet.stock} unidades en inventario!
                  </Badge>
                ) : (
                  <Badge variant="success" size="md">
                    <Check className="w-3.5 h-3.5" /> En stock ({helmet.stock} disponibles para entrega inmediata)
                  </Badge>
                )}
              </div>

              {/* Selector de Tallas */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Selecciona tu Talla:
                  </span>
                  <span className="text-xs text-red-400 font-medium">Guía de tallas</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {helmet.tallasDisponibles.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-10 px-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                          : 'bg-[#181824] text-zinc-300 border-[#2b2c3c] hover:border-zinc-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Color */}
              <div className="mt-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono mb-2">
                  Color / Acabado: <strong className="text-white normal-case">{selectedColor}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {helmet.coloresDisponibles.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedColor === c
                          ? 'bg-red-600/20 text-red-300 border-red-500'
                          : 'bg-[#181824] text-zinc-400 border-[#2b2c3c] hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad y Botón de Carrito */}
              <div className="mt-8 pt-6 border-t border-[#232330] space-y-4">
                <div className="flex items-center gap-4">
                  {/* Selector de Cantidad */}
                  <div className="flex items-center bg-[#181824] rounded-xl border border-[#2b2c3c] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="p-2 text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-white text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(helmet.stock, quantity + 1))}
                      disabled={quantity >= helmet.stock || isOutOfStock}
                      className="p-2 text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Botón Añadir al Carrito */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all ${
                      isOutOfStock
                        ? 'bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>{isOutOfStock ? 'Agotado Temporalmente' : 'Añadir al carrito'}</span>
                  </button>
                </div>

                {/* Garantías de compra */}
                <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-2 bg-[#181824]/60 p-2.5 rounded-xl border border-[#252535]">
                    <Truck className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Envío seguro a toda Bolivia</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#181824]/60 p-2.5 rounded-xl border border-[#252535]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Garantía de fábrica 1 año</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECCIÓN INTERACTIVA 3D (REQUISITO 11) */}
        {/* ========================================================================= */}
        <div id="seccion-3d" className="mt-16 scroll-mt-24">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-500 font-mono mb-1">
                <Box className="w-4 h-4" />
                <span>Inspección 360 Grados</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-white">
                Ver Casco en 3D Interactivo
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Interactúa con el casco en tiempo real. Abre y cierra el visor, rota la cámara 360° y prueba diferentes tonos de acabado.
            </p>
          </div>

          {/* Render del Visor 3D de Three.js / React Three Fiber */}
          <Helmet3DViewer
            initialColor={selectedColor || helmet.color}
            modelUrl={helmet.modelo3D || '/models/casco.glb'}
            helmetName={helmet.nombre}
          />
        </div>

        {/* ESPECIFICACIONES TÉCNICAS Y CARACTERÍSTICAS */}
        <div className="mt-16 p-8 rounded-3xl bg-[#12121a] border border-[#232330]">
          <h3 className="font-heading text-2xl font-bold text-white mb-4">
            Descripción y Especificaciones
          </h3>
          <p className="text-zinc-300 text-sm leading-relaxed mb-8 max-w-3xl">
            {helmet.descripcion}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-[#181824] border border-[#272738]">
              <span className="text-xs text-zinc-500 font-mono uppercase block mb-1">Homologación</span>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                {helmet.homologacion}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#181824] border border-[#272738]">
              <span className="text-xs text-zinc-500 font-mono uppercase block mb-1">Peso Aproximado</span>
              <p className="text-sm font-bold text-white">
                {helmet.peso}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#181824] border border-[#272738]">
              <span className="text-xs text-zinc-500 font-mono uppercase block mb-1">Categoría de Protección</span>
              <p className="text-sm font-bold text-red-400">
                {helmet.categoria}
              </p>
            </div>
          </div>

          {helmet.caracteristicas && (
            <div className="mt-8 pt-6 border-t border-[#232330]">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono mb-4">
                Puntos Clave de Seguridad:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                {helmet.caracteristicas.map((car, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{car}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* PRODUCTOS RELACIONADOS */}
        {relatedHelmets.length > 0 && (
          <div className="mt-20">
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              Cascos Relacionados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedHelmets.map(rel => (
                <ProductCard key={rel.id} helmet={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
