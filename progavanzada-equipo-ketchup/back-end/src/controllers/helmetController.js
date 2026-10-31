import { pool, memoryStore, getDbStatus } from '../config/db.js';

export const getHelmets = async (req, res) => {
  try {
    const { q, categoria, marca, talla, inStock } = req.query;
    const { connected } = getDbStatus();

    if (connected) {
      let queryText = 'SELECT * FROM cascos WHERE 1=1';
      const params = [];

      if (q) {
        params.push(`%${q}%`);
        queryText += ` AND (LOWER(nombre) LIKE LOWER($${params.length}) OR LOWER(marca) LIKE LOWER($${params.length}))`;
      }
      if (categoria) {
        params.push(categoria);
        queryText += ` AND LOWER(categoria) = LOWER($${params.length})`;
      }
      if (marca) {
        params.push(marca);
        queryText += ` AND LOWER(marca) = LOWER($${params.length})`;
      }
      if (inStock === 'true') {
        queryText += ` AND stock > 0`;
      }

      queryText += ' ORDER BY id ASC';
      const result = await pool.query(queryText, params);

      // Mapear campos de snake_case a camelCase para compatibilidad total con el frontend
      const helmets = result.rows.map(h => ({
        id: h.id,
        nombre: h.nombre,
        marca: h.marca,
        categoria: h.categoria,
        precio: parseFloat(h.precio),
        precioAnterior: h.precio_anterior ? parseFloat(h.precio_anterior) : undefined,
        stock: h.stock,
        stockMinimo: h.stock_minimo,
        talla: h.talla,
        tallasDisponibles: h.tallas_disponibles || ['M'],
        color: h.color,
        coloresDisponibles: h.colores_disponibles || [h.color],
        imagen: h.imagen,
        imagenes: h.imagenes || [h.imagen],
        descripcion: h.descripcion,
        caracteristicas: h.caracteristicas || [],
        modelo3D: h.modelo_3d,
        rating: parseFloat(h.rating),
        reviewsCount: h.reviews_count,
        homologacion: h.homologacion,
        peso: h.peso,
        destacado: h.destacado
      }));

      return res.json(helmets);
    } else {
      // Filtrado en almacén de memoria
      let helmets = [...memoryStore.helmets];

      if (q) {
        const queryLower = q.toLowerCase();
        helmets = helmets.filter(h =>
          h.nombre.toLowerCase().includes(queryLower) ||
          h.marca.toLowerCase().includes(queryLower)
        );
      }
      if (categoria) {
        helmets = helmets.filter(h => h.categoria.toLowerCase() === categoria.toLowerCase());
      }
      if (marca) {
        helmets = helmets.filter(h => h.marca.toLowerCase() === marca.toLowerCase());
      }
      if (inStock === 'true') {
        helmets = helmets.filter(h => h.stock > 0);
      }

      return res.json(helmets);
    }
  } catch (err) {
    console.error('Error en getHelmets:', err);
    return res.status(500).json({ error: 'Error al consultar cascos' });
  }
};

export const getHelmetById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { connected } = getDbStatus();

    if (connected) {
      const result = await pool.query('SELECT * FROM cascos WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Casco no encontrado' });
      }
      const h = result.rows[0];
      return res.json({
        id: h.id,
        nombre: h.nombre,
        marca: h.marca,
        categoria: h.categoria,
        precio: parseFloat(h.precio),
        precioAnterior: h.precio_anterior ? parseFloat(h.precio_anterior) : undefined,
        stock: h.stock,
        stockMinimo: h.stock_minimo,
        talla: h.talla,
        tallasDisponibles: h.tallas_disponibles || ['M'],
        color: h.color,
        coloresDisponibles: h.colores_disponibles || [h.color],
        imagen: h.imagen,
        imagenes: h.imagenes || [h.imagen],
        descripcion: h.descripcion,
        caracteristicas: h.caracteristicas || [],
        modelo3D: h.modelo_3d,
        rating: parseFloat(h.rating),
        reviewsCount: h.reviews_count,
        homologacion: h.homologacion,
        peso: h.peso,
        destacado: h.destacado
      });
    } else {
      const helmet = memoryStore.helmets.find(h => h.id === id);
      if (!helmet) {
        return res.status(404).json({ error: 'Casco no encontrado' });
      }
      return res.json(helmet);
    }
  } catch (err) {
    console.error('Error en getHelmetById:', err);
    return res.status(500).json({ error: 'Error al obtener detalle del casco' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const result = await pool.query('SELECT * FROM categorias');
      return res.json(result.rows);
    } else {
      return res.json(memoryStore.categories);
    }
  } catch (err) {
    console.error('Error en getCategories:', err);
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

export const createHelmet = async (req, res) => {
  try {
    const h = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      const result = await pool.query(
        `INSERT INTO cascos
         (nombre, marca, categoria, precio, precio_anterior, stock, stock_minimo, talla, tallas_disponibles, color, colores_disponibles, imagen, imagenes, descripcion, caracteristicas, modelo_3d, rating, reviews_count, homologacion, peso, destacado)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
         RETURNING *`,
        [
          h.nombre, h.marca, h.categoria, h.precio, h.precioAnterior || null,
          h.stock || 0, h.stockMinimo || 3, h.talla || 'M',
          h.tallasDisponibles || [h.talla || 'M'],
          h.color || 'Negro Mate',
          h.coloresDisponibles || [h.color || 'Negro Mate'],
          h.imagen,
          h.imagenes || [h.imagen],
          h.descripcion || '',
          h.caracteristicas || [],
          h.modelo3D || '/models/casco.glb',
          h.rating || 5.0,
          h.reviewsCount || 0,
          h.homologacion || 'ECE 22.06',
          h.peso || '1500g',
          h.destacado || false
        ]
      );
      return res.status(201).json(result.rows[0]);
    } else {
      const newId = memoryStore.helmets.length > 0
        ? Math.max(...memoryStore.helmets.map(item => item.id)) + 1
        : 1;

      const created = {
        ...h,
        id: newId,
        tallasDisponibles: h.tallasDisponibles || [h.talla || 'M'],
        coloresDisponibles: h.coloresDisponibles || [h.color || 'Negro Mate'],
        imagenes: h.imagenes || [h.imagen],
        rating: h.rating || 5.0,
        reviewsCount: h.reviewsCount || 0
      };

      memoryStore.helmets.unshift(created);
      return res.status(201).json(created);
    }
  } catch (err) {
    console.error('Error en createHelmet:', err);
    return res.status(500).json({ error: 'Error al crear casco' });
  }
};

export const updateHelmet = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      // Actualizar dinámicamente campos enviados
      const fields = [];
      const values = [];
      let index = 1;

      if (updates.nombre !== undefined) { fields.push(`nombre = $${index++}`); values.push(updates.nombre); }
      if (updates.marca !== undefined) { fields.push(`marca = $${index++}`); values.push(updates.marca); }
      if (updates.precio !== undefined) { fields.push(`precio = $${index++}`); values.push(updates.precio); }
      if (updates.stock !== undefined) { fields.push(`stock = $${index++}`); values.push(updates.stock); }
      if (updates.stockMinimo !== undefined) { fields.push(`stock_minimo = $${index++}`); values.push(updates.stockMinimo); }
      if (updates.imagen !== undefined) { fields.push(`imagen = $${index++}`); values.push(updates.imagen); }
      if (updates.destacado !== undefined) { fields.push(`destacado = $${index++}`); values.push(updates.destacado); }

      values.push(id);
      const queryText = `UPDATE cascos SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
      const result = await pool.query(queryText, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Casco no encontrado' });
      }
      return res.json(result.rows[0]);
    } else {
      const idx = memoryStore.helmets.findIndex(h => h.id === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Casco no encontrado' });
      }

      memoryStore.helmets[idx] = { ...memoryStore.helmets[idx], ...updates };
      return res.json(memoryStore.helmets[idx]);
    }
  } catch (err) {
    console.error('Error en updateHelmet:', err);
    return res.status(500).json({ error: 'Error al actualizar casco' });
  }
};

export const updateStock = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { stock, delta } = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      let result;
      if (stock !== undefined) {
        result = await pool.query('UPDATE cascos SET stock = $1 WHERE id = $2 RETURNING *', [Math.max(0, stock), id]);
      } else if (delta !== undefined) {
        result = await pool.query('UPDATE cascos SET stock = GREATEST(0, stock + $1) WHERE id = $2 RETURNING *', [delta, id]);
      } else {
        return res.status(400).json({ error: 'Se requiere stock o delta' });
      }

      if (result.rows.length === 0) return res.status(404).json({ error: 'Casco no encontrado' });
      return res.json(result.rows[0]);
    } else {
      const idx = memoryStore.helmets.findIndex(h => h.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Casco no encontrado' });

      let newStock = memoryStore.helmets[idx].stock;
      if (stock !== undefined) newStock = Math.max(0, stock);
      if (delta !== undefined) newStock = Math.max(0, newStock + delta);

      memoryStore.helmets[idx].stock = newStock;
      return res.json(memoryStore.helmets[idx]);
    }
  } catch (err) {
    console.error('Error en updateStock:', err);
    return res.status(500).json({ error: 'Error al actualizar stock' });
  }
};

export const deleteHelmet = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { connected } = getDbStatus();

    if (connected) {
      const result = await pool.query('DELETE FROM cascos WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Casco no encontrado' });
      }
      return res.json({ message: 'Casco eliminado correctamente', id });
    } else {
      const initialLen = memoryStore.helmets.length;
      memoryStore.helmets = memoryStore.helmets.filter(h => h.id !== id);
      if (memoryStore.helmets.length === initialLen) {
        return res.status(404).json({ error: 'Casco no encontrado' });
      }
      return res.json({ message: 'Casco eliminado correctamente', id });
    }
  } catch (err) {
    console.error('Error en deleteHelmet:', err);
    return res.status(500).json({ error: 'Error al eliminar casco' });
  }
};
