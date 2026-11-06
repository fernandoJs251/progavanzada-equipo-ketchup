import base64
import json
import hmac
import hashlib
import time
from functools import wraps
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import Usuario

def get_secret_key():
    return current_app.config.get('SECRET_KEY', 'bikerstock3d_flask_super_secret_key_2026')

def create_access_token(user_data, expires_in=7 * 86400):
    """Genera un JWT estándar firmado con HMAC-SHA256 sin requerir librerías externas"""
    secret = get_secret_key()
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "id": user_data["id"],
        "nombre": user_data["nombre"],
        "email": user_data["email"],
        "rol": user_data["rol"],
        "exp": int(time.time()) + expires_in
    }

    h_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
    p_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
    signature = hmac.new(secret.encode(), f"{h_b64}.{p_b64}".encode(), hashlib.sha256).digest()
    s_b64 = base64.urlsafe_b64encode(signature).decode().rstrip('=')

    return f"{h_b64}.{p_b64}.{s_b64}"

def decode_access_token(token):
    """Verifica y decodifica un JWT"""
    try:
        secret = get_secret_key()
        parts = token.split('.')
        if len(parts) != 3:
            return None

        h_b64, p_b64, s_b64 = parts
        expected_sig = hmac.new(secret.encode(), f"{h_b64}.{p_b64}".encode(), hashlib.sha256).digest()
        calc_s_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip('=')

        if not hmac.compare_digest(s_b64, calc_s_b64):
            return None

        # Padding para base64 decode
        pad = len(p_b64) % 4
        if pad:
            p_b64 += '=' * (4 - pad)

        payload = json.loads(base64.urlsafe_b64decode(p_b64.encode()).decode())
        if payload.get('exp', 0) < time.time():
            return None

        return payload
    except Exception:
        return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'Token de autorización requerido'}), 401

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({'error': 'Formato de cabecera inválido (debe ser: Bearer <token>)'}), 401

        token = parts[1]
        payload = decode_access_token(token)
        if not payload:
            return jsonify({'error': 'Token inválido o expirado'}), 401

        current_user = Usuario.query.get(payload['id'])
        if not current_user:
            return jsonify({'error': 'Usuario asociado al token no existe'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

def roles_required(*allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            if current_user.rol not in allowed_roles:
                return jsonify({
                    'error': f'Acceso denegado: Se requiere uno de los siguientes roles: {", ".join(allowed_roles)}'
                }), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator

