import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "integral",
    nombre: "Integral",
    descripcion: "Máxima protección y aerodinámica deportiva para circuito y carretera.",
    imagen: '/images/cascos/integral.jpg',
    icono: "Shield",
    cantidad: 6
  },
  {
    id: "modular",
    nombre: "Modular",
    descripcion: "Versatilidad touring con mentonera abatible para viajes largos y ciudad.",
    imagen: '/images/cascos/modular.jpg',
    icono: "RotateCw",
    cantidad: 2
  },
  {
    id: "abierto",
    nombre: "Abierto",
    descripcion: "Estilo retro, custom y libertad urbana con ventilación directa y ligereza.",
    imagen: '/images/cascos/abierto.jpg',
    icono: "Wind",
    cantidad: 2
  },
  {
    id: "off-road",
    nombre: "Off Road",
    descripcion: "Diseñados para resistir el barro, saltos y desafíos de Motocross y Enduro.",
    imagen: '/images/cascos/offroad.jpg',
    icono: "Compass",
    cantidad: 2
  }
];
