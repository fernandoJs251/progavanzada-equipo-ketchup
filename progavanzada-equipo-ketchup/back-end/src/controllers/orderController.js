import { pool, memoryStore, getDbStatus } from '../config/db.js';

export const getOrders = async (req, res) => {
  try {
    const { connected } = getDbStatus();

    if (connected) {
      const ordersResult = await pool.query('SELECT * FROM pedidos ORDER BY fecha DESC');
      const orders = [];

      for (const o of ordersResult.rows) {
        const itemsResult = await pool.query('SELECT * FROM pedido_items WHERE pedido_id = $1', [o.id]);
        orders.push({
          id: o.id,
          numeroPedido: o.numero_pedido,
          fecha: o.fecha ? new Date(o.fecha).toISOString().split('T')[0] : '',
          cliente: {
            nombre: o.cliente_nombre,
            apellido: o.cliente_apellido,
            ci: o.cliente_ci,
            telefono: o.cliente_telefono,
            correo: o.cliente_correo,
            direccion: o.cliente_direccion,
            ciudad: o.cliente_ciudad,
            notas: o.cliente_notas
          },
          subtotal: parseFloat(o.subtotal),
          envio: parseFloat(o.envio),
          total: parseFloat(o.total),
          estado: o.estado,
          metodoPago: o.metodo_pago,
          items: itemsResult.rows.map(item => ({
            id: String(item.id),
            helmet: {
              id: item.casco_id,
              nombre: item.nombre,
              marca: item.marca,
              imagen: item.imagen,
              precio: parseFloat(item.precio_unitario)
            },
            cantidad: item.cantidad,
            tallaSeleccionada: item.talla,
            colorSeleccionado: item.color
          }))
        });
      }

      return res.json(orders);
    } else {
      return res.json(memoryStore.orders);
    }
  } catch (err) {
    console.error('Error en getOrders:', err);
    return res.status(500).json({ error: 'Error al consultar pedidos' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const { cliente, items, subtotal, envio, total, metodoPago } = orderData;

    if (!cliente || !items || items.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos para procesar el pedido' });
    }

    const { connected } = getDbStatus();
    const orderId = `ord-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    if (connected) {
      const countRes = await pool.query('SELECT COUNT(*) FROM pedidos');
      const nextNum = parseInt(countRes.rows[0].count, 10) + 1;
      const numeroPedido = `BKS-2026-${String(nextNum).padStart(3, '0')}`;

      // Insertar pedido principal
      await pool.query(
        `INSERT INTO pedidos
         (id, numero_pedido, cliente_nombre, cliente_apellido, cliente_ci, cliente_telefono, cliente_correo, cliente_direccion, cliente_ciudad, cliente_notas, subtotal, envio, total, estado, metodo_pago)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          orderId,
          numeroPedido,
          cliente.nombre,
          cliente.apellido || '',
          cliente.ci,
          cliente.telefono,
          cliente.correo || '',
          cliente.direccion,
          cliente.ciudad || 'La Paz',
          cliente.notas || '',
          subtotal,
          envio || 0,
          total,
          'Confirmado',
          metodoPago || 'QR'
        ]
      );

      // Insertar items y descontar stock
      for (const it of items) {
        const helmet = it.helmet;
        await pool.query(
          `INSERT INTO pedido_items
           (pedido_id, casco_id, nombre, marca, imagen, talla, color, precio_unitario, cantidad, subtotal)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            orderId,
            helmet.id,
            helmet.nombre,
            helmet.marca,
            helmet.imagen,
            it.tallaSeleccionada || helmet.talla || 'M',
            it.colorSeleccionado || helmet.color || 'Negro Mate',
            helmet.precio,
            it.cantidad,
            helmet.precio * it.cantidad
          ]
        );

        // Descontar stock en cascos
        await pool.query('UPDATE cascos SET stock = GREATEST(0, stock - $1) WHERE id = $2', [it.cantidad, helmet.id]);
      }

      return res.status(201).json({
        id: orderId,
        numeroPedido,
        fecha: today,
        cliente,
        items,
        subtotal,
        envio,
        total,
        estado: 'Confirmado',
        metodoPago
      });
    } else {
      const nextNum = memoryStore.orders.length + 1;
      const numeroPedido = `BKS-2026-${String(nextNum).padStart(3, '0')}`;

      const createdOrder = {
        id: orderId,
        numeroPedido,
        fecha: today,
        cliente,
        items: [...items],
        subtotal,
        envio: envio || 0,
        total,
        estado: 'Confirmado',
        metodoPago: metodoPago || 'QR'
      };

      // Descontar stock en memoria
      items.forEach(it => {
        const h = memoryStore.helmets.find(item => item.id === it.helmet.id);
        if (h) {
          h.stock = Math.max(0, h.stock - it.cantidad);
        }
      });

      memoryStore.orders.unshift(createdOrder);
      return res.status(201).json(createdOrder);
    }
  } catch (err) {
    console.error('Error en createOrder:', err);
    return res.status(500).json({ error: 'Error al procesar la compra' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const validStates = ['Pendiente', 'Confirmado', 'Preparando', 'Entregado', 'Cancelado'];
    if (!validStates.includes(estado)) {
      return res.status(400).json({ error: `Estado inválido. Valores permitidos: ${validStates.join(', ')}` });
    }

    const { connected } = getDbStatus();

    if (connected) {
      const result = await pool.query('UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING *', [estado, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      return res.json({ message: 'Estado actualizado', pedido: result.rows[0] });
    } else {
      const order = memoryStore.orders.find(o => o.id === id);
      if (!order) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      order.estado = estado;
      return res.json({ message: 'Estado actualizado', pedido: order });
    }
  } catch (err) {
    console.error('Error en updateOrderStatus:', err);
    return res.status(500).json({ error: 'Error al actualizar estado del pedido' });
  }
};
