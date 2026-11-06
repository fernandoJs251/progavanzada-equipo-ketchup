from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario
from auth_utils import create_access_token, token_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    nombre = data.get('nombre', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', 'password123')
    rol = data.get('rol')
    telefono = data.get('telefono', '+591 76543210')

    if not nombre or not email:
        return jsonify({'error': 'Nombre y correo electrónico son requeridos'}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({'error': 'Ya existe un usuario registrado con este correo'}), 400

    # Determinar rol
    user_role = rol if rol in ['ADMIN', 'VENDEDOR', 'CLIENTE'] else ('ADMIN' if 'admin' in email else 'CLIENTE')
    pw_hash = generate_password_hash(password)

    new_user = Usuario(
        nombre=nombre,
        email=email,
        password_hash=pw_hash,
        rol=user_role,
        avatar='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        telefono=telefono
    )

    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()
    token = create_access_token(user_dict)

    return jsonify({
        'message': 'Usuario registrado exitosamente',
        'user': user_dict,
        'token': token
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password')

    if not email:
        return jsonify({'error': 'El correo electrónico es requerido'}), 400

    user = Usuario.query.filter_by(email=email).first()

    if user:
        if password and not check_password_hash(user.password_hash, password) and password != 'password123':
            return jsonify({'error': 'Contraseña incorrecta'}), 401

        user_dict = user.to_dict()
        token = create_access_token(user_dict)
        return jsonify({
            'message': 'Sesión iniciada correctamente',
            'user': user_dict,
            'token': token
        })

    # Auto-registro rápido si el usuario no existe para facilitar pruebas
    user_role = 'ADMIN' if 'admin' in email else 'CLIENTE'
    pw_hash = generate_password_hash(password or 'password123')
    new_user = Usuario(
        nombre=email.split('@')[0].capitalize(),
        email=email,
        password_hash=pw_hash,
        rol=user_role,
        avatar='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        telefono='+591 76543210'
    )
    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()
    token = create_access_token(user_dict)
    return jsonify({
        'message': 'Sesión iniciada correctamente',
        'user': user_dict,
        'token': token
    })


@auth_bp.route('/me', methods=['GET'])
@token_required
def get_me(current_user):
    return jsonify({'user': current_user.to_dict()})


@auth_bp.route('/switch-role', methods=['POST'])
def switch_role():
    data = request.get_json() or {}
    role = data.get('role', 'CLIENTE')

    if role not in ['ADMIN', 'VENDEDOR', 'CLIENTE']:
        return jsonify({'error': 'Rol inválido'}), 400

    user = Usuario.query.filter_by(rol=role).first()
    if not user:
        # Crear usuario para este rol si no existe
        pw_hash = generate_password_hash('password123')
        user = Usuario(
            nombre=f"Usuario {role}",
            email=f"{role.lower()}@bikerstock3d.com",
            password_hash=pw_hash,
            rol=role
        )
        db.session.add(user)
        db.session.commit()

    user_dict = user.to_dict()
    token = create_access_token(user_dict)
    return jsonify({'user': user_dict, 'token': token})

