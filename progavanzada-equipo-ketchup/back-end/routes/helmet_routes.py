from flask import Blueprint, request, jsonify
from models import db, Casco, Categoria

helmet_bp = Blueprint('helmets', __name__, url_prefix='/api')

@helmet_bp.route('/cascos', methods=['GET'])
def get_helmets():
    q = request.args.get('q', '').strip()
    categoria = request.args.get('categoria', '').strip()
    marca = request.args.get('marca', '').strip()
    talla = request.args.get('talla', '').strip()
    in_stock = request.args.get('inStock') == 'true'
    only_offers = request.args.get('oferta') == 'true'
    sort_by = request.args.get('sort', 'populares')

    query = Casco.query

    if q:
        query = query.filter(
            (Casco.nombre.ilike(f'%{q}%')) | (Casco.marca.ilike(f'%{q}%'))
        )
    if categoria:
        query = query.filter(Casco.categoria.ilike(categoria))
    if marca:
        query = query.filter(Casco.marca.ilike(marca))
    if in_stock:
        query = query.filter(Casco.stock > 0)
    if only_offers:
        query = query.filter(Casco.precio_anterior.isnot(None))

    if sort_by == 'precio-asc':
        query = query.order_by(Casco.precio.asc())
    elif sort_by == 'precio-desc':
        query = query.order_by(Casco.precio.desc())
    elif sort_by == 'nombre':
        query = query.order_by(Casco.nombre.asc())
    else:
        query = query.order_by(Casco.destacado.desc(), Casco.rating.desc(), Casco.id.asc())

    helmets = query.all()
    return jsonify([h.to_dict() for h in helmets])


@helmet_bp.route('/cascos/<int:helmet_id>', methods=['GET'])
def get_helmet_by_id(helmet_id):
    helmet = db.session.get(Casco, helmet_id)
    if not helmet:
        return jsonify({'error': 'Casco no encontrado'}), 404
    return jsonify(helmet.to_dict())


@helmet_bp.route('/cascos', methods=['POST'])
def create_helmet():
    data = request.get_json() or {}
    
    if not data.get('nombre') or not data.get('precio'):
        return jsonify({'error': 'El nombre y el precio son obligatorios'}), 400

    new_helmet = Casco(
        nombre=data.get('nombre'),
        marca=data.get('marca', 'LS2'),
        categoria=data.get('categoria', 'Integral'),
        precio=float(data.get('precio', 0)),
        precio_anterior=float(data.get('precioAnterior')) if data.get('precioAnterior') else None,
        stock=int(data.get('stock', 0)),
        stock_minimo=int(data.get('stockMinimo', 3)),
        talla=data.get('talla', 'M'),
        tallas_disponibles=data.get('tallasDisponibles', ['S', 'M', 'L', 'XL']),
        color=data.get('color', 'Negro Mate'),
        colores_disponibles=data.get('coloresDisponibles', [data.get('color', 'Negro Mate')]),
        imagen=data.get('imagen', 'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&auto=format&fit=crop&q=80'),
        imagenes=data.get('imagenes', [data.get('imagen')]),
        descripcion=data.get('descripcion', ''),
        caracteristicas=data.get('caracteristicas', []),
        modelo_3d=data.get('modelo3D', '/models/casco.glb'),
        rating=float(data.get('rating', 5.0)),
        reviews_count=int(data.get('reviewsCount', 0)),
        homologacion=data.get('homologacion', 'ECE 22.06'),
        peso=data.get('peso', '1500g'),
        destacado=bool(data.get('destacado', False))
    )

    db.session.add(new_helmet)
    db.session.commit()
    return jsonify(new_helmet.to_dict()), 201


@helmet_bp.route('/cascos/<int:helmet_id>', methods=['PUT'])
def update_helmet(helmet_id):
    helmet = db.session.get(Casco, helmet_id)
    if not helmet:
        return jsonify({'error': 'Casco no encontrado'}), 404

    data = request.get_json() or {}

    if 'nombre' in data: helmet.nombre = data['nombre']
    if 'marca' in data: helmet.marca = data['marca']
    if 'categoria' in data: helmet.categoria = data['categoria']
    if 'precio' in data: helmet.precio = float(data['precio'])
    if 'precioAnterior' in data: 
        helmet.precio_anterior = float(data['precioAnterior']) if data['precioAnterior'] else None
    if 'stock' in data: helmet.stock = int(data['stock'])
    if 'stockMinimo' in data: helmet.stock_minimo = int(data['stockMinimo'])
    if 'talla' in data: helmet.talla = data['talla']
    if 'tallasDisponibles' in data: helmet.tallas_disponibles = data['tallasDisponibles']
    if 'color' in data: helmet.color = data['color']
    if 'coloresDisponibles' in data: helmet.colores_disponibles = data['coloresDisponibles']
    if 'imagen' in data: helmet.imagen = data['imagen']
    if 'imagenes' in data: helmet.imagenes = data['imagenes']
    if 'descripcion' in data: helmet.descripcion = data['descripcion']
    if 'destacado' in data: helmet.destacado = bool(data['destacado'])

    db.session.commit()
    return jsonify(helmet.to_dict())


@helmet_bp.route('/cascos/<int:helmet_id>/stock', methods=['PATCH'])
def update_stock(helmet_id):
    helmet = db.session.get(Casco, helmet_id)
    if not helmet:
        return jsonify({'error': 'Casco no encontrado'}), 404

    data = request.get_json() or {}
    stock = data.get('stock')
    delta = data.get('delta')

    if stock is not None:
        helmet.stock = max(0, int(stock))
    elif delta is not None:
        helmet.stock = max(0, helmet.stock + int(delta))
    else:
        return jsonify({'error': 'Se requiere parámetro stock o delta'}), 400

    db.session.commit()
    return jsonify(helmet.to_dict())


@helmet_bp.route('/cascos/<int:helmet_id>', methods=['DELETE'])
def delete_helmet(helmet_id):
    helmet = db.session.get(Casco, helmet_id)
    if not helmet:
        return jsonify({'error': 'Casco no encontrado'}), 404

    db.session.delete(helmet)
    db.session.commit()
    return jsonify({'message': 'Casco eliminado correctamente', 'id': helmet_id})


@helmet_bp.route('/categorias', methods=['GET'])
def get_categories():
    categories = Categoria.query.all()
    return jsonify([c.to_dict() for c in categories])
