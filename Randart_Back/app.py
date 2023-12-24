# app.py
from flask import Flask
from flask_cors import CORS
from models import db
from galerias import galerias_bp
from articulos import articulos_bp
from getarticulo import getarticulo_bp

app = Flask(__name__)
CORS(app)

# Configurar la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:1234@localhost:3306/randart'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Registrar blueprints
app.register_blueprint(galerias_bp)
app.register_blueprint(articulos_bp)
app.register_blueprint(getarticulo_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()    
    app.run(debug=True)
