import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Star, Eye, Box, AlertCircle, Check } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  helmet: Helmet;
}

// Formateador de moneda reutilizable fuera del componente
const currencyFormatter = new Intl.NumberFormat('es-BO', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatPrice = (price: number) => `Bs. ${currencyFormatter.format(price)}`;

// Estilos de Tailwind desglosados para el botón de compra
const CART_BUTTON_BASE =
  'p-2.5 rounded-xl flex items-center justify-center transition-[background-color,transform,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500';

const CART_BUTTON_VARIANTS = {
  outOfStock: 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700',
  available:
    'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30 hover:scale-105 active:scale-95',
};

export const ProductCard: React.FC<ProductCardProps> = memo(({ helmet }) => {
  const { addToCart } = useCart();

  const isOutOfStock = helmet.stock <= 0;
  const isLowStock = helmet.stock > 0 && helmet.stock <= helmet.stockMinimo;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isOutOfStock) {
        addToCart(helmet);
      }
    },
    [addToCart, helmet, isOutOfStock]
  );

  // Unificación de la configuración de stock
  const stockConfig = isOutOfStock
    ? { variant: 'danger' as const, Icon: AlertCircle, text: 'Agotado' }
    : isLowStock
    ? { variant: 'warning' as const, Icon: AlertCircle, text: `Solo ${helmet.stock} en stock` }
    : { variant: 'success' as const, Icon: Check, text: `Stock: ${helmet.stock} unidades` };

  return (
    <article className="group relative flex flex-col rounded-2xl bg-[#13131b] border border-[#232330] hover:border-red-500/50 transition-colors duration-300 hover:shadow-xl hover:shadow-red-600/10 overflow-hidden">
      
      {/* Insignias Superiores */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {helmet.destacado && (
            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-red-600 text-white shadow-md">
              Destacado
            </span>
          )}
          {helmet.precioAnterior && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/90 text-black">
              Oferta
            </span>
          )}
        </div>

        {/* Badge 3D */}
        <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-black/70 backdrop-blur-md text-red-400 border border-red-500/30">
          <Box className="w-3.5 h-3.5 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          <span>3D</span>
        </span>
      </div>

      {/* Imagen del Producto con Overlay */}
      <Link
        to={`/cascos/${helmet.id}`}
        aria-label={`Ver detalles de ${helmet.nombre}`}
        className="relative aspect-square overflow-hidden bg-[#1a1a24] block focus-visible:ring-2 focus-visible:ring-red-500 outline-none"
      >
        <img
          src={helmet.imagen}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Botón flotante para hover (decorativo para lectores de pantalla) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]"
        >
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4 text-red-600" />
            Ver Detalles & 3D
          </span>
        </div>
      </Link>

      {/* Información del Casco */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">
        
        {/* Marca y Categoría */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-medium">
          <span className="uppercase tracking-wider font-bold text-red-500">{helmet.marca}</span>
          <span className="text-zinc-500" aria-hidden="true">•</span>
          <span>{helmet.categoria}</span>
        </div>

        {/* Nombre del Producto */}
        <Link
          to={`/cascos/${helmet.id}`}
          className="focus-visible:ring-2 focus-visible:ring-red-500 rounded outline-none"
        >
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {helmet.nombre}
          </h3>
        </Link>

        {/* Rating y Homologación */}
        <div className="flex items-center justify-between my-2 text-xs">
          <div
            className="flex items-center gap-1 text-amber-400"
            aria-label={`Calificación: ${helmet.rating} de 5 estrellas basado en ${helmet.reviewsCount} opiniones`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-bold text-white">{helmet.rating}</span>
            <span className="text-zinc-500">({helmet.reviewsCount})</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-[#1c1c28] px-2 py-0.5 rounded border border-[#272738]">
            {helmet.homologacion.split('/')[0]}
          </span>
        </div>

        {/* Estado de Stock (JSX unificado) */}
        <div className="mb-4">
          <Badge variant={stockConfig.variant} size="sm">
            <stockConfig.Icon className="w-3 h-3" aria-hidden="true" /> {stockConfig.text}
          </Badge>
        </div>

        {/* Precios y Botón de Acción */}
        <div className="mt-auto pt-3 border-t border-[#232330] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-xl font-extrabold text-white">
                <span className="sr-only">Precio actual: </span>
                {formatPrice(helmet.precio)}
              </span>
              {helmet.precioAnterior && (
                <span className="text-xs text-zinc-500 line-through">
                  <span className="sr-only">Precio anterior: </span>
                  {formatPrice(helmet.precioAnterior)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 block">Talla: {helmet.talla} • {helmet.color}</span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`${CART_BUTTON_BASE} ${
              isOutOfStock ? CART_BUTTON_VARIANTS.outOfStock : CART_BUTTON_VARIANTS.available
            }`}
            title={isOutOfStock ? 'Producto agotado' : 'Añadir al carrito'}
            aria-label={
              isOutOfStock
                ? `${helmet.nombre} está agotado`
                : `Añadir ${helmet.nombre} al carrito`
            }
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
