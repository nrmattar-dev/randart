# galerias.py
from flask import Blueprint, request, jsonify
from models import db,Galeria

galerias_bp = Blueprint('galerias', __name__)

@galerias_bp.route("/galerias", methods=['GET'])
def obtener_galerias():
    all_galerias = Galeria.query.all()
    data_serializada = [{"id": registro.id, "razon_social": registro.razon_social, "mapa_url": registro.mapa_url, "observaciones": registro.observaciones} for registro in all_galerias]
    return jsonify(data_serializada)



# Ruta para insertar un registro en la DB
@galerias_bp.route("/galeria_insert", methods=['POST'])
def registro():
    # {
    #   "nombre": "Fernando"
    # }
    #    <input type="text" name="nombre" id="nombre">
    
    razon_social_recibido = request.json["razon_social"].capitalize()
    mapa_url_recibido = request.json["mapa_url"]
    observaciones_recibido = request.json["observaciones"]

    nuevo_registro = Galeria(razon_social=razon_social_recibido,mapa_url=mapa_url_recibido,observaciones=observaciones_recibido)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud vía post recibida."



# Modificar un registro
@galerias_bp.route('/galeria_update/<id>', methods=['PUT'])
def update(id):
    # Buscar a quién modificar, por id
    update_galeria = Galeria.query.get(id)
    # Recibir los nuevos datos
    razon_social = request.json["razon_social"].capitalize()
    mapa_url = request.json["mapa_url"]
    observaciones = request.json["observaciones"]

    update_galeria.razon_social = razon_social
    update_galeria.mapa_url = mapa_url
    update_galeria.observaciones = observaciones

    db.session.commit() 

    # Transformando update_galeria (lista de objeto) a lista de diccionario
    data_serializada = [{"id": update_galeria.id, "razon_social": update_galeria.razon_social, "mapa_url": update_galeria.mapa_url, "observaciones": update_galeria.observaciones}]
    return jsonify(data_serializada)

    
# Eliminar un registro
@galerias_bp.route('/galeria_delete/<id>', methods=['DELETE'])
def delete(id):
    # Buscar a quién modificar, por id
    delete_galeria = Galeria.query.get(id)
    # delete_galeria -> objeto

    db.session.delete(delete_galeria)
    db.session.commit()

    data_serializada = [{"id": delete_galeria.id, "razon_social": delete_galeria.razon_social, "mapa_url": delete_galeria.mapa_url, "observaciones": delete_galeria.observaciones}]
    return jsonify(data_serializada)
