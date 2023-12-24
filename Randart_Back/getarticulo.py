# articulos.py
from flask import Blueprint, jsonify
from models import Articulo

getarticulo_bp = Blueprint('getarticulo', __name__)

@getarticulo_bp.route("/getarticulo/<id>",  methods=['GET'])
def getarticulo(id):
    articulo = Articulo.query.get(id)
    # all_galerias lista de objetos

    # Transformar all_galerias (lista de objetos) a una lista de diccionarios

    data_serializada = {"id":articulo.id, "titulo":articulo.titulo, "autor":articulo.autor, "descripcion":articulo.descripcion, "precio":articulo.precio, "imagen":articulo.imagen}

    return jsonify(data_serializada)
