# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Galeria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    razon_social = db.Column(db.String(50))
    mapa_url = db.Column(db.String(500))
    observaciones = db.Column(db.String(100))

class Articulo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(50))
    autor = db.Column(db.String(50))
    fecha = db.Column(db.Date)
    descripcion = db.Column(db.String(500))
    precio = db.Column(db.Numeric(precision=10, scale=2))
    imagen = db.Column(db.String(50))

class Pais(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(50))

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mail = db.Column(db.String(80))
    username = db.Column(db.String(80))
    nombre = db.Column(db.String(50))
    apellido = db.Column(db.String(50))
    pais_id = db.Column(db.Integer)
    ciudad = db.Column(db.String(50))
    calle  = db.Column(db.String(50))
    numero  = db.Column(db.String(50))
    password = db.Column(db.String(50))
    activo = db.Column(db.Boolean)
