import os
from flask import Flask, jsonify, request, Response
from config import Config
from models import db
from seeders import seed_database
from routes.auth_routes import auth_bp
from routes.helmet_routes import helmet_bp
from routes.order_routes import order_bp
from routes.admin_routes import admin_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicializar Base de Datos con SQLAlchemy
    db.init_app(app)

    # Manejo nativo de CORS para comunicación limpia con el frontend
    @app.before_request
    def handle_cors_preflight():
        if request.method == 'OPTIONS':
            res = Response()
            res.headers['Access-Control-Allow-Origin'] = '*'
            res.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
            res.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            return res

    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        return response

    # Registrar Rutas de la API
    app.register_blueprint(auth_bp)
    app.register_blueprint(helmet_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(admin_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        db_uri = app.config['SQLALCHEMY_DATABASE_URI']
        db_type = 'PostgreSQL' if 'postgresql' in db_uri else 'SQLite'
        return jsonify({
            'status': 'ok',
            'service': 'BIKERSTOCK3D Flask API',
            'database': db_type,
            'version': '1.0.0'
        })

    # Creación de tablas y carga de seeders automática
    with app.app_context():
        db.create_all()
        seed_database()

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 [Flask API] Servidor iniciado en http://localhost:{port}")
    print(f"📦 [Base de Datos] URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
    app.run(host='0.0.0.0', port=port, debug=True)

