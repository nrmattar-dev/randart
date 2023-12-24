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
    descripcion = db.Column(db.String(500))
    precio = db.Column(db.Numeric(precision=10, scale=2))
    imagen = db.Column(db.Text)
