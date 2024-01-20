# articulos.py
from flask import Blueprint, request, jsonify
from models import db,Articulo
from sqlalchemy.sql.expression import func
from werkzeug.utils import secure_filename

articulos_bp = Blueprint('articulos', __name__)


@articulos_bp.route("/articulos", methods=['GET'])
def obtener_articulos():

    id = int(request.args.get('id', 0))
    rand = request.args.get('rand', 'false').lower() == 'true'

    if not id:
        if not rand:
            all_articulos = Articulo.query.order_by().all()
        else:
            all_articulos = Articulo.query.order_by(func.rand()).limit(12).all()
    else:
        all_articulos = [Articulo.query.get(id)]
        
    data_serializada = [{"id": articulo.id, "titulo": articulo.titulo, "autor": articulo.autor, "descripcion": articulo.descripcion, "precio": articulo.precio, "imagen": articulo.imagen} for articulo in all_articulos if articulo is not None]
    
    base_url = "http://127.0.0.1:5000/uploads/"  # Reemplaza con la URL de tu servidor
    for articulo in data_serializada:
        articulo["imagen"] = f"{base_url}{articulo['imagen']}"

    return jsonify(data_serializada)

# Ruta para insertar un registro en la DB
@articulos_bp.route("/articulo_insert", methods=['POST'])
def registro():
    # Obtén el resto de los campos del formulario
    filename = ""
    titulo_recibido = request.form.get("titulo").capitalize()
    autor_recibido = request.form.get("autor").capitalize()
    descripcion_recibido = request.form.get("descripcion")
    precio_recibido = request.form.get("precio")
    fecha_recibido = request.form.get("fecha")

    # Verifica si se ha cargado un archivo
    if 'imagen' in request.files:
        imagen_recibida = request.files['imagen']
        # Utiliza secure_filename para asegurar un nombre de archivo seguro
        filename = secure_filename(imagen_recibida.filename)
        # Guarda el archivo en tu sistema de archivos
        imagen_recibida.save(f'uploads/{filename}')
    else:
        # Si no se ha cargado un archivo, establece el nombre de imagen en None o algún valor predeterminado
        imagen_recibida = None

    # Crea un nuevo registro en la base de datos
    nuevo_registro = Articulo(
        titulo=titulo_recibido,
        autor=autor_recibido,
        descripcion=descripcion_recibido,
        precio=precio_recibido,
        fecha=fecha_recibido,
        imagen=filename  # Guarda el nombre del archivo en la base de datos
    )
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud vía POST recibida correctamente."

'''
@articulos_bp.route("/articulo_insert", methods=['POST'])
def registro():

    titulo_recibido = request.json["titulo"].capitalize()
    autor_recibido = request.json["autor"].capitalize()
    descripcion_recibido = request.json["descripcion"]
    precio_recibido = request.json["precio"]
    imagen_recibido = request.json["imagen"]

    nuevo_registro = Articulo(titulo=titulo_recibido,autor=autor_recibido,descripcion=descripcion_recibido,precio=precio_recibido,imagen=imagen_recibido)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud vía post recibida."

'''

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


