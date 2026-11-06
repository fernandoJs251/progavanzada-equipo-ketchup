import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'bikerstock3d_flask_super_secret_key_2026')
    
    # Si se define DATABASE_URL (ej. PostgreSQL), la utiliza;
    # de lo contrario utiliza SQLite persistente local
    database_url = os.environ.get('DATABASE_URL')
    if database_url and database_url.startswith('postgres://'):
        # Compatibilidad con SQLAlchemy para URLs estilo postgres://
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
        
    SQLALCHEMY_DATABASE_URI = database_url or f"sqlite:///{os.path.join(BASE_DIR, 'bikerstock3d.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False

