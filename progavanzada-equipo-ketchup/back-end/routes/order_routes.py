import time
from datetime import datetime
from flask import Blueprint, request, jsonify
from models import db, Pedido, PedidoItem, Casco

order_bp = Blueprint('orders', __name__, url_prefix='/api/pedidos')

@order_bp.route('', methods=['GET'])
def get_orders():
    orders = Pedido.query.order_by(Pedido.fecha.desc()).all()
    return jsonify([o.to_dict() for o in orders])


@order_bp.route('', methods=['POST'])
def create_order():
    data = request.get_json() or {}
    cliente = data.get('cliente')
    items = data.get('items', [])
    subtotal = float(data.get('subtotal', 0))
    envio = float(data.get('envio', 0))
    total = float(data.get('total', 0))
    metodo_pago = data.get('metodoPago', 'QR')

    if not cliente or not items:
        return jsonify({'error': 'Información de cliente e items requerida'}), 400

    count = Pedido.query.count() + 1
    numero_pedido = f"BKS-2026-{str(count).zfill(3)}"
    order_id = f"ord-{int(time.time() * 1000)}"

    new_order = Pedido(
        id=order_id,
        numero_pedido=numero_pedido,
        cliente_nombre=cliente.get('nombre', '').strip(),
        cliente_apellido=cliente.get('apellido', '').strip(),
        cliente_ci=cliente.get('ci', '').strip(),
        cliente_telefono=cliente.get('telefono', '').strip(),
        cliente_correo=cliente.get('correo', '').strip(),
        cliente_direccion=cliente.get('direccion', '').strip(),
        cliente_ciudad=cliente.get('ciudad', 'La Paz').strip(),
        cliente_notas=cliente.get('notas', '').strip(),
        subtotal=subtotal,
        envio=envio,
        total=total,
        estado='Confirmado',
        metodo_pago=metodo_pago,
        fecha=datetime.utcnow()
    )

    db.session.add(new_order)

    # Insertar items y descontar stock del inventario
    for it in items:
        helmet_info = it.get('helmet', {})
        helmet_id = helmet_info.get('id')
        qty = int(it.get('cantidad', 1))
        unit_price = float(helmet_info.get('precio', 0))

        order_item = PedidoItem(
            pedido_id=order_id,
            casco_id=helmet_id,
            nombre=helmet_info.get('nombre', 'Casco'),
            marca=helmet_info.get('marca', 'General'),
            imagen=helmet_info.get('imagen', ''),
            talla=it.get('tallaSeleccionada', 'M'),
            color=it.get('colorSeleccionado', 'Negro'),
            precio_unitario=unit_price,
            cantidad=qty,
            subtotal=unit_price * qty
        )
        db.session.add(order_item)

        # Descontar stock real en la base de datos
        if helmet_id:
            helmet = db.session.get(Casco, helmet_id)
            if helmet:
                helmet.stock = max(0, helmet.stock - qty)

    db.session.commit()
    return jsonify(new_order.to_dict()), 201


@order_bp.route('/<order_id>/estado', methods=['PATCH'])
def update_order_status(order_id):
    order = db.session.get(Pedido, order_id)
    if not order:
        return jsonify({'error': 'Pedido no encontrado'}), 404

    data = request.get_json() or {}
    nuevo_estado = data.get('estado')

    estados_validos = ['Pendiente', 'Confirmado', 'Preparando', 'Entregado', 'Cancelado']
    if nuevo_estado not in estados_validos:
        return jsonify({'error': f'Estado no válido. Opciones: {", ".join(estados_validos)}'}), 400

    order.estado = nuevo_estado
    db.session.commit()

    return jsonify({'message': 'Estado actualizado', 'pedido': order.to_dict()})
