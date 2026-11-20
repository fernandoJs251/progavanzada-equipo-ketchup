import React from 'react';

export const DEFAULT_HELMET_IMAGE = '/images/cascos/fallback.jpg';
export const LOCAL_DEFAULT_HELMET = '/images/default-helmet.svg';

/**
 * Manejador estándar de error de carga de imágenes de cascos.
 * Si una URL falla, asigna automáticamente la imagen de alta resolución de respaldo.
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== DEFAULT_HELMET_IMAGE && !target.src.includes('default-helmet.svg')) {
    target.src = DEFAULT_HELMET_IMAGE;
  } else if (!target.src.includes('default-helmet.svg')) {
    target.src = LOCAL_DEFAULT_HELMET;
  }
};

