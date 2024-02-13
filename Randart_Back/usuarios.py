# Usuarios.py
from flask import Blueprint, request, jsonify
from models import db,Usuario
import bcrypt,secrets
from mail import send_verification_email
from sqlalchemy import text

usuarios_bp = Blueprint('Usuarios', __name__)

@usuarios_bp.route("/usuarios", methods=['GET'])
def obtener_Usuarios():
    all_Usuarios = Usuario.query.all()
    data_serializada = [{"id": registro.id, "nombre": registro.nombre, "apellido": registro.apellido, "mail": registro.mail,"pais_id": registro.pais_id,"ciudad": registro.ciudad,"calle": registro.calle,"numero": registro.numero,"password": registro.password} for registro in all_Usuarios]
    return jsonify(data_serializada)


@usuarios_bp.route("/usuario_verificacion", methods=['GET'])
def verificacion():
    token = request.args.get('token', 0)

    sql_query = """
        SELECT 
        id,
        mail,
        username,
        nombre,
        apellido,
        pais_id,
        ciudad,
        calle,
        numero,
        password_hash,
        salt,
        verification_token,
        activo
        FROM Usuario
        WHERE verification_token = :token
    """
    result = db.session.execute(text(sql_query), {"token": token})

     
    #for row in result:
    #    print("Usuario:", row["Usuario.id"], row["Usuario.otra_columna"])
    #    print("Pais:", row["Pais.id"], row["Pais.otra_columna"])
    
    rows = []
    for row in result.fetchall():
        db.session.execute(text("UPDATE Usuario SET activo = true WHERE Id = :id"), {"id": row[0]})

        row_dict = {
            "id":row[0],
            "mail":row[1],
            "username":row[2],
            "nombre":row[3],
            "apellido":row[4],
            "pais_id":row[5],
            "ciudad":row[6],
            "calle":row[7],
            "numero":row[8],
            "password_hash":row[9],
            "salt":row[10],
            "verification_token":row[11],
            "activo":row[12]
        }
        rows.append(row_dict)

    if result.rowcount > 0:
        db.session.commit()

    # Retornar los resultados como JSON
    return jsonify(rows)



# Ruta para insertar un registro en la DB
@usuarios_bp.route("/usuario_insert", methods=['POST'])
def registro():
    username_recibido = ''
    nombre_recibido = request.json["nombre"].capitalize()
    apellido_recibido = request.json["apellido"].capitalize()
    mail_recibido = request.json["mail"]
    username_recibido = request.json["username"]
    pais_id_recibido = request.json["pais_id"]
    ciudad_recibido = request.json["ciudad"].capitalize()
    calle_recibido = request.json["calle"].capitalize()
    numero_recibido = request.json["numero"]
    password_recibido = request.json["password"]
    salt, password_hash = encrypt_password(password_recibido)
    verification_token = secrets.token_urlsafe(32)

    nuevo_registro = Usuario(
        username=username_recibido,
        nombre=nombre_recibido,
        apellido=apellido_recibido,
        mail=mail_recibido,
        pais_id=pais_id_recibido,
        ciudad=ciudad_recibido,
        calle=calle_recibido,
        numero=numero_recibido,
        password_hash=password_hash,
        salt = salt,
        verification_token = verification_token,
        activo = False
        )
    
    db.session.add(nuevo_registro)
    db.session.commit()

    data = {
        'email': mail_recibido,
        'token': verification_token
    }
    send_verification_email(data)

    return "Solicitud vía post recibida."



def encrypt_password(password):
    # Genera un salt aleatorio
    salt = bcrypt.gensalt()
    # Hashea la contraseña utilizando el salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return salt,hashed_password




'''
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
'''