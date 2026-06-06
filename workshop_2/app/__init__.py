from flask import Flask
from app.config import DevelopmentConfig
from app.extensions import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    # Инициализация db
    db.init_app(app)

    # Импортируем модели В ПРАВИЛЬНОМ ПОРЯДКЕ (сначала независимые, потом зависимые)
    from app.models.country import Country
    from app.models.type_building import TypeBuilding
    from app.models.city import City
    from app.models.buildings import Building  # Building импортируется последним

    # Импортируем routes
    from .routes import title, buildings

    # Регистрация Blueprint
    app.register_blueprint(title.bp_title, url_prefix="/api/v1/title")
    app.register_blueprint(buildings.building_bp, url_prefix="/api/v1/buildings")

    return app
