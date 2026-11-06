from flask import Blueprint, jsonify
from models import db, Casco, Pedido, Usuario

admin_bp = Blueprint('admin', __name__, url_prefix='/api')

@admin_bp.route('/dashboard/metrics', methods=['GET'])
def get_dashboard_metrics():
    total_products = Casco.query.count()
    low_stock_count = Casco.query.filter(Casco.stock <= Casco.stock_minimo).count()
    orders = Pedido.query.all()
    
    total_sales_count = len(orders)
    total_revenue = sum(o.total for o in orders)
    pending_orders_count = sum(1 for o in orders if o.estado in ['Pendiente', 'Confirmado', 'Preparando'])

    # Métricas por categoría
    category_counts = {}
    helmets = Casco.query.all()
    for h in helmets:
        category_counts[h.categoria] = category_counts.get(h.categoria, 0) + 1

    return jsonify({
        'totalProductsCount': total_products,
        'lowStockCount': low_stock_count,
        'totalSalesCount': total_sales_count,
        'totalRevenue': total_revenue,
        'pendingOrdersCount': pending_orders_count,
        'categoriesDistribution': [{'categoria': k, 'cantidad': v} for k, v in category_counts.items()]
    })


@admin_bp.route('/clientes', methods=['GET'])
def get_customers():
    # Obtener usuarios con rol CLIENTE
    users = Usuario.query.filter_by(rol='CLIENTE').all()
    customers_list = []

    for idx, u in enumerate(users, start=1):
        user_orders = Pedido.query.filter(
            (Pedido.cliente_id == u.id) | (Pedido.cliente_correo == u.email)
        ).all()

        total_gastado = sum(o.total for o in user_orders)
        customers_list.append({
            'id': u.id,
            'nombre': u.nombre.split()[0],
            'apellido': " ".join(u.nombre.split()[1:]) if len(u.nombre.split()) > 1 else '',
            'ci': '8472910 LP',
            'telefono': u.telefono or '+591 76543210',
            'correo': u.email,
            'numeroCompras': len(user_orders),
            'totalGastado': total_gastado,
            'fechaRegistro': u.created_at.strftime('%Y-%m-%d') if u.created_at else '2026-03-15',
            'estado': 'Activo'
        })

    return jsonify(customers_list)


@admin_bp.route('/ventas', methods=['GET'])
def get_sales():
    orders = Pedido.query.order_by(Pedido.fecha.desc()).all()
    sales_list = []

    for idx, o in enumerate(orders, start=1):
        sales_list.append({
            'id': f"vnt-{o.id}",
            'fecha': o.fecha.strftime('%Y-%m-%d') if o.fecha else '',
            'numeroNota': f"NV-{2026000 + idx}",
            'cliente': f"{o.cliente_nombre} {o.cliente_apellido}".strip(),
            'ci': o.cliente_ci,
            'itemsCount': sum(it.cantidad for it in o.items),
            'total': o.total,
            'metodoPago': o.metodo_pago,
            'vendedor': 'Alejandro Morales (Online)',
            'estado': 'Emitida' if o.estado != 'Cancelado' else 'Anulada'
        })

    return jsonify(sales_list)

