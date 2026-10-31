import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: "usr-admin",
    nombre: "Alejandro Morales",
    email: "admin@bikerstock3d.com",
    rol: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    telefono: "+591 71002233"
  },
  {
    id: "usr-vendedor",
    nombre: "Patricia Méndez",
    email: "ventas@bikerstock3d.com",
    rol: "VENDEDOR",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    telefono: "+591 72334455"
  },
  {
    id: "usr-cliente",
    nombre: "Carlos Mamani",
    email: "carlos.mamani@email.com",
    rol: "CLIENTE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    telefono: "+591 76543210"
  }
];
