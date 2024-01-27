# usuarios.py
from flask import Blueprint, request, jsonify
from models import db,usuario

usuarios_bp = Blueprint('usuarios', __name__)

@usuarios_bp.route("/usuarios", methods=['GET'])
def obtener_usuarios():
    all_usuarios = usuario.query.all()
    data_serializada = [{"id": registro.id, "nombre": registro.nombre, "apellido": registro.apellido, "mail": registro.mail,"pais_id": registro.pais_id,"ciudad": registro.ciudad,"calle": registro.calle,"numero": registro.numero,"password": registro.password} for registro in all_usuarios]
    return jsonify(data_serializada)



# Ruta para insertar un registro en la DB
@usuarios_bp.route("/usuario_insert", methods=['POST'])
def registro():

    nombre_recibido = request.json["nombre"].capitalize()
    apellido_recibido = request.json["apellido"]
    mail_recibido = request.json["mail"]
    pais_recibido = request.json["pais_id"]
    ciudad_recibido = request.json["ciudad"]
    calle_recibido = request.json["calle"]
    numero_recibido = request.json["numero"]
    password_recibido = request.json["password"]

    nuevo_registro = usuario(nombre=nombre_recibido,apellido=apellido_recibido,mail=mail_recibido,pais_id=pais_recibido,ciudad=ciudad_recibido,calle=calle_recibido,numero=numero_recibido,password=password_recibido)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud vía post recibida."



# Modificar un registro
@usuarios_bp.route('/usuario_update/<id>', methods=['PUT'])
def update(id):
    # Buscar a quién modificar, por id
    update_usuario = usuario.query.get(id)
    # Recibir los nuevos datos
    nombre = request.json["nombre"].capitalize()
    apellido = request.json["apellido"]
    mail = request.json["mail"]

    update_usuario.nombre = nombre
    update_usuario.apellido = apellido
    update_usuario.mail = mail

    db.session.commit() 

    # Transformando update_usuario (lista de objeto) a lista de diccionario
    data_serializada = [{"id": update_usuario.id, "nombre": update_usuario.nombre, "apellido": update_usuario.apellido, "mail": update_usuario.mail}]
    return jsonify(data_serializada)

    
# Eliminar un registro
@usuarios_bp.route('/usuario_delete/<id>', methods=['DELETE'])
def delete(id):
    # Buscar a quién modificar, por id
    delete_usuario = usuario.query.get(id)
    # delete_usuario -> objeto

    db.session.delete(delete_usuario)
    db.session.commit()

    data_serializada = [{"id": delete_usuario.id, "nombre": delete_usuario.nombre, "apellido": delete_usuario.apellido, "mail": delete_usuario.mail}]
    return jsonify(data_serializada)
