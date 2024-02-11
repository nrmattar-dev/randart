# app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db
from galerias import galerias_bp
from articulos import articulos_bp
from paises import paises_bp
from usuarios import usuarios_bp

app = Flask(__name__)
CORS(app)

# Configurar la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:1234@localhost:3306/randart'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'  # Agrega esta línea para definir la carpeta de subidas
db.init_app(app)

# Registrar blueprints
app.register_blueprint(galerias_bp)
app.register_blueprint(articulos_bp)
app.register_blueprint(paises_bp)
app.register_blueprint(usuarios_bp)

# Agrega una ruta para servir archivos estáticos
@app.route('/uploads/<filename>') #Cuando esto ocurre llama a la función que le sigue y le pasa por parametros el filename
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()    
    
    @app.route("/")
    def index():
        return f'Este es el Backend de RANDART'
    
    app.run(debug=True)
