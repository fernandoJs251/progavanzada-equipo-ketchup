from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(20), nullable=False, default='CLIENTE')
    avatar = db.Column(db.Text, nullable=True)
    telefono = db.Column(db.String(40), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    pedidos = db.relationship('Pedido', backref='usuario', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'rol': self.rol,
            'avatar': self.avatar or 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
            'telefono': self.telefono or '+591 76543210'
        }


class Categoria(db.Model):
    __tablename__ = 'categorias'

    id = db.Column(db.String(50), primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    imagen = db.Column(db.Text, nullable=False)
    icono = db.Column(db.String(40), nullable=False, default='Shield')

    def to_dict(self, include_count=True):
        data = {
            'id': self.id,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'imagen': self.imagen,
            'icono': self.icono
        }
        if include_count:
            data['cantidad'] = Casco.query.filter_by(categoria=self.nombre).count()
        return data


class Casco(db.Model):
    __tablename__ = 'cascos'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False, index=True)
    marca = db.Column(db.String(80), nullable=False, index=True)
    categoria = db.Column(db.String(50), nullable=False, index=True)
    precio = db.Column(db.Float, nullable=False)
    precio_anterior = db.Column(db.Float, nullable=True)
    stock = db.Column(db.Integer, nullable=False, default=0)
    stock_minimo = db.Column(db.Integer, nullable=False, default=3)
    talla = db.Column(db.String(10), nullable=False, default='M')
    tallas_disponibles = db.Column(db.JSON, nullable=False, default=lambda: ['S', 'M', 'L'])
    color = db.Column(db.String(80), nullable=False)
    colores_disponibles = db.Column(db.JSON, nullable=False, default=lambda: ['Negro Mate'])
    imagen = db.Column(db.Text, nullable=False)
    imagenes = db.Column(db.JSON, nullable=False, default=list)
    descripcion = db.Column(db.Text, nullable=True)
    caracteristicas = db.Column(db.JSON, nullable=False, default=list)
    modelo_3d = db.Column(db.String(255), default='/models/casco.glb')
    rating = db.Column(db.Float, default=5.0)
    reviews_count = db.Column(db.Integer, default=0)
    homologacion = db.Column(db.String(80), default='ECE 22.06')
    peso = db.Column(db.String(50), default='1500g')
    destacado = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'marca': self.marca,
            'categoria': self.categoria,
            'precio': float(self.precio),
            'precioAnterior': float(self.precio_anterior) if self.precio_anterior else None,
            'stock': int(self.stock),
            'stockMinimo': int(self.stock_minimo),
            'talla': self.talla,
            'tallasDisponibles': self.tallas_disponibles or ['M'],
            'color': self.color,
            'coloresDisponibles': self.colores_disponibles or [self.color],
            'imagen': self.imagen,
            'imagenes': self.imagenes or [self.imagen],
            'descripcion': self.descripcion or '',
            'caracteristicas': self.caracteristicas or [],
            'modelo3D': self.modelo_3d or '/models/casco.glb',
            'rating': float(self.rating) if self.rating else 5.0,
            'reviewsCount': int(self.reviews_count) if self.reviews_count else 0,
            'homologacion': self.homologacion or 'ECE 22.06',
            'peso': self.peso or '1500g',
            'destacado': bool(self.destacado)
        }


class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.String(50), primary_key=True)
    numero_pedido = db.Column(db.String(50), unique=True, nullable=False, index=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=True)
    cliente_nombre = db.Column(db.String(120), nullable=False)
    cliente_apellido = db.Column(db.String(120), nullable=True)
    cliente_ci = db.Column(db.String(40), nullable=False)
    cliente_telefono = db.Column(db.String(40), nullable=False)
    cliente_correo = db.Column(db.String(150), nullable=True)
    cliente_direccion = db.Column(db.Text, nullable=False)
    cliente_ciudad = db.Column(db.String(60), nullable=False, default='La Paz')
    cliente_notas = db.Column(db.Text, nullable=True)
    subtotal = db.Column(db.Float, nullable=False)
    envio = db.Column(db.Float, nullable=False, default=0.0)
    total = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(30), nullable=False, default='Confirmado')
    metodo_pago = db.Column(db.String(50), nullable=False, default='QR')
    fecha = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('PedidoItem', backref='pedido', cascade='all, delete-orphan', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'numeroPedido': self.numero_pedido,
            'fecha': self.fecha.strftime('%Y-%m-%d') if self.fecha else datetime.utcnow().strftime('%Y-%m-%d'),
            'cliente': {
                'nombre': self.cliente_nombre,
                'apellido': self.cliente_apellido or '',
                'ci': self.cliente_ci,
                'telefono': self.cliente_telefono,
                'correo': self.cliente_correo or '',
                'direccion': self.cliente_direccion,
                'ciudad': self.cliente_ciudad,
                'notas': self.cliente_notas or ''
            },
            'subtotal': float(self.subtotal),
            'envio': float(self.envio),
            'total': float(self.total),
            'estado': self.estado,
            'metodoPago': self.metodo_pago,
            'items': [item.to_dict() for item in self.items]
        }


class PedidoItem(db.Model):
    __tablename__ = 'pedido_items'

    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.String(50), db.ForeignKey('pedidos.id', ondelete='CASCADE'), nullable=False)
    casco_id = db.Column(db.Integer, db.ForeignKey('cascos.id'), nullable=True)
    nombre = db.Column(db.String(150), nullable=False)
    marca = db.Column(db.String(80), nullable=False)
    imagen = db.Column(db.Text, nullable=True)
    talla = db.Column(db.String(10), nullable=False, default='M')
    color = db.Column(db.String(80), nullable=False, default='Negro Mate')
    precio_unitario = db.Column(db.Float, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False, default=1)
    subtotal = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'helmet': {
                'id': self.casco_id,
                'nombre': self.nombre,
                'marca': self.marca,
                'imagen': self.imagen,
                'precio': float(self.precio_unitario)
            },
            'cantidad': self.cantidad,
            'tallaSeleccionada': self.talla,
            'colorSeleccionado': self.color
        }

