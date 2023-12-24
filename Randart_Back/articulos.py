# articulos.py
from flask import Blueprint, request, jsonify
from models import db,Articulo
from sqlalchemy.sql.expression import func

articulos_bp = Blueprint('articulos', __name__)

@articulos_bp.route("/articulos", methods=['GET'])
def obtener_articulos():
    all_articulos = Articulo.query.order_by(func.rand()).limit(12).all()
    data_serializada = [{"id": registro.id, "titulo": registro.titulo, "autor": registro.autor, "descripcion": registro.descripcion, "precio": registro.precio, "imagen": registro.imagen} for registro in all_articulos]
    return jsonify(data_serializada)


# Ruta para insertar un registro en la DB
@articulos_bp.route("/articulo_insert", methods=['POST'])
def registro():
    # {
    #   "nombre": "Fernando"
    # }
    #    <input type="text" name="nombre" id="nombre">
    
    titulo_recibido = request.json["titulo"].capitalize()
    autor_recibido = request.json["autor"].capitalize()
    descripcion_recibido = request.json["descripcion"]
    precio_recibido = request.json["precio"]
    imagen_recibido = request.json["imagen"]

    nuevo_registro = Articulo(titulo=titulo_recibido,autor=autor_recibido,descripcion=descripcion_recibido,precio=precio_recibido,imagen=imagen_recibido)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud vía post recibida."



# Modificar un registro
@articulos_bp.route('/articulo_update/<id>', methods=['PUT'])
def update(id):
    # Buscar a quién modificar, por id
    update_Articulo = Articulo.query.get(id)
    # one_Articulo -> objeto

    # Recibir los nuevos datos
    titulo = request.json["titulo"].capitalize()
    autor = request.json["autor"].capitalize()
    descripcion = request.json["descripcion"]
    precio = request.json["precio"]
    imagen = request.json["imagen"]

    update_Articulo.titulo = titulo
    update_Articulo.autor = autor
    update_Articulo.descripcion = descripcion
    update_Articulo.precio = precio
    update_Articulo.imagen = imagen

    db.session.commit() 

    # Transformando update_Articulo (lista de objeto) a lista de diccionario
    data_serializada = [{"id": update_Articulo.id, "titulo": update_Articulo.titulo, "autor": update_Articulo.autor, "descripcion": update_Articulo.descripcion, "precio": update_Articulo.precio, "imagen": update_Articulo.imagen}]
    return jsonify(data_serializada)

    
# Eliminar un registro
@articulos_bp.route('/articulo_delete/<id>', methods=['DELETE'])
def delete(id):
    # Buscar a quién modificar, por id
    delete_Articulo = Articulo.query.get(id)
    # delete_Articulo -> objeto

    db.session.delete(delete_Articulo)
    db.session.commit()

    data_serializada = [{"id": delete_Articulo.id, "titulo": delete_Articulo.titulo, "autor": delete_Articulo.autor, "descripcion": delete_Articulo.descripcion, "precio": delete_Articulo.precio, "imagen": delete_Articulo.imagen}]
    return jsonify(data_serializada)
