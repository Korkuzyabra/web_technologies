from flask import Flask
from .extensions import db
from .config import DevelopmentConfig

#  модели
from app.models.buildings import Building
from app.models.type_building import TypeBuilding
from app.models.city import City
from app.models.country import Country

#  маршруты
from .routes import title, buildings


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    app.json.ensure_ascii = False

    # Инициализация расширений
    db.init_app(app)

    # Регистрация Blueprint-ов
    app.register_blueprint(title.bp_title, url_prefix="/api/v1/title")
    app.register_blueprint(buildings.building_bp, url_prefix="/api/v1/buildings")

    return app
