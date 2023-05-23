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

