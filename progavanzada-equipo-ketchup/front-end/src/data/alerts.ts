import { StockAlert } from '../types';

export const INITIAL_ALERTS: StockAlert[] = [
  {
    id: "alt-01",
    cascoId: 2,
    cascoNombre: "AGV K1 S",
    marca: "AGV",
    stockActual: 2,
    stockMinimo: 4,
    nivel: "Stock bajo",
    fecha: "2026-09-25",
    resuelto: false,
    mensaje: "AGV K1 S tiene solamente 2 unidades disponibles (mínimo configurado: 4)."
  },
  {
    id: "alt-02",
    cascoId: 3,
    cascoNombre: "HJC i70",
    marca: "HJC",
    stockActual: 0,
    stockMinimo: 3,
    nivel: "Agotado",
    fecha: "2026-09-24",
    resuelto: false,
    mensaje: "¡URGENTE! El casco HJC i70 se encuentra totalmente agotado (Stock 0)."
  },
  {
    id: "alt-03",
    cascoId: 6,
    cascoNombre: "Shoei NXR2",
    marca: "Shoei",
    stockActual: 3,
    stockMinimo: 2,
    nivel: "Stock bajo",
    fecha: "2026-09-25",
    resuelto: false,
    mensaje: "Shoei NXR2 está al borde del umbral de seguridad con 3 unidades."
  },
  {
    id: "alt-04",
    cascoId: 11,
    cascoNombre: "Fox Racing V3 RS",
    marca: "Fox",
    stockActual: 3,
    stockMinimo: 2,
    nivel: "Stock bajo",
    fecha: "2026-09-23",
    resuelto: true,
    mensaje: "Fox Racing V3 RS reportó bajo stock. Reposición tramitada."
  }
];
