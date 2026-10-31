import pg from 'pg';
import dotenv from 'dotenv';
import { SEED_USERS, SEED_CATEGORIES, SEED_HELMETS, SEED_ORDERS } from '../data/seedData.js';

dotenv.config();

const { Pool } = pg;

// Configuración de conexión para PostgreSQL
const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.PGUSER || 'postgres',
      host: process.env.PGHOST || 'localhost',
      database: process.env.PGDATABASE || 'bikerstock3d',
      password: process.env.PGPASSWORD || 'postgres',
      port: parseInt(process.env.PGPORT || '5432', 10),
      connectionTimeoutMillis: 2000
    };

export const pool = new Pool(poolConfig);

// Estado de conexión a PostgreSQL
let isPostgresConnected = false;

// Almacén en memoria de respaldo para cuando PostgreSQL no esté en ejecución
export const memoryStore = {
  users: [...SEED_USERS],
  categories: [...SEED_CATEGORIES],
  helmets: [...SEED_HELMETS],
  orders: [...SEED_ORDERS]
};

// Probar conexión inicial
export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    client.release();
    isPostgresConnected = true;
    console.log('✅ [PostgreSQL] Conectado exitosamente a la base de datos:', res.rows[0].now);
    return true;
  } catch (err) {
    isPostgresConnected = false;
    console.log('ℹ️ [Base de Datos] PostgreSQL no disponible localmente en puerto 5432.');
    console.log('🚀 [Base de Datos] Operando en Modo Almacén Activo en Memoria con Seeders completos.');
    return false;
  }
};

export const getDbStatus = () => ({
  connected: isPostgresConnected,
  type: isPostgresConnected ? 'PostgreSQL' : 'In-Memory DB (Seeded)'
});

export const query = async (text, params) => {
  if (isPostgresConnected) {
    return pool.query(text, params);
  }
  throw new Error('PostgreSQL no conectado');
};
