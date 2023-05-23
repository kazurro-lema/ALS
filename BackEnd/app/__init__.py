from flask import Flask
from flask_cors import CORS
from app.config import RedisConfig
from redis import Redis

# Crear la instancia de la aplicación Flask
app = Flask(__name__)

# Crear la instancia de la base de datos
redis_db = Redis(host=RedisConfig.HOST, port=RedisConfig.PORT, db=RedisConfig.DB)

# Habilitar CORS para todos los endpoints de la aplicación
CORS(app)

# Importar los blueprints y registrarlos en la aplicación
from app.routes.users import users_bp
from app.routes.events import events_bp
from app.routes.attendees import attendees_bp

app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(events_bp, url_prefix='/api')
app.register_blueprint(attendees_bp, url_prefix='/api')