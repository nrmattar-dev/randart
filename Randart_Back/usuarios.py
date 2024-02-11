# Usuarios.py
from flask import Blueprint, request, jsonify
from models import db,Usuario

usuarios_bp = Blueprint('Usuarios', __name__)

@usuarios_bp.route("/usuarios", methods=['GET'])
def obtener_Usuarios():
    all_Usuarios = Usuario.query.all()
    data_serializada = [{"id": registro.id, "nombre": registro.nombre, "apellido": registro.apellido, "mail": registro.mail,"pais_id": registro.pais_id,"ciudad": registro.ciudad,"calle": registro.calle,"numero": registro.numero,"password": registro.password} for registro in all_Usuarios]
    return jsonify(data_serializada)



# Ruta para insertar un registro en la DB
@usuarios_bp.route("/usuario_insert", methods=['POST'])
def registro():

    nombre_recibido = request.json["nombre"].capitalize()
    apellido_recibido = request.json["apellido"]
    mail_recibido = request.json["mail"]
    username_recibido = request.json["username"]
    pais_recibido = request.json["pais_id"]
    ciudad_recibido = request.json["ciudad"]
    calle_recibido = request.json["calle"]
    numero_recibido = request.json["numero"]
    password_recibido = request.json["password"]

    nuevo_registro = Usuario(username=username_recibido,nombre=nombre_recibido,apellido=apellido_recibido,mail=mail_recibido,pais_id=pais_recibido,ciudad=ciudad_recibido,calle=calle_recibido,numero=numero_recibido,password=password_recibido)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud vía post recibida."



# Modificar un registro
@usuarios_bp.route('/usuario_update/<id>', methods=['PUT'])
def update(id):
    # Buscar a quién modificar, por id
    update_Usuario = Usuario.query.get(id)
    # Recibir los nuevos datos
    nombre = request.json["nombre"].capitalize()
    apellido = request.json["apellido"]
    mail = request.json["mail"]

    update_Usuario.nombre = nombre
    update_Usuario.apellido = apellido
    update_Usuario.mail = mail

    db.session.commit() 

    # Transformando update_Usuario (lista de objeto) a lista de diccionario
    data_serializada = [{"id": update_Usuario.id, "nombre": update_Usuario.nombre, "apellido": update_Usuario.apellido, "mail": update_Usuario.mail}]
    return jsonify(data_serializada)

    
# Eliminar un registro
@usuarios_bp.route('/usuario_delete/<id>', methods=['DELETE'])
def delete(id):
    # Buscar a quién modificar, por id
    delete_Usuario = Usuario.query.get(id)
    # delete_Usuario -> objeto

    db.session.delete(delete_Usuario)
    db.session.commit()

    data_serializada = [{"id": delete_Usuario.id, "nombre": delete_Usuario.nombre, "apellido": delete_Usuario.apellido, "mail": delete_Usuario.mail}]
    return jsonify(data_serializada)
