# paises.py
from flask import Blueprint, request, jsonify
from models import db,Pais

paises_bp = Blueprint('paises', __name__)

@paises_bp.route("/paises", methods=['GET'])
def obtener_paises():
    all_paises = Pais.query.all()
    data_serializada = [{"id": registro.id, "descripcion": registro.descripcion} for registro in all_paises]
    return jsonify(data_serializada)

