from flask import Flask
from .config import DevelopmentConfig
from .extensions import db
from .upload_db import country_upload, city_upload, building_upload
from .models import Country, City, Building, TypeBuilding
from .query import query
from .crud import create, read, update, delete

# Импортируем маршруты
from app.views import main


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    # Инициализация расширений
    db.init_app(app)

    # создание базы данных на основе указанных в импорте моделей
    # если модели не импортированы создается пустая база данных
    with app.app_context():
        db.create_all()

        # db.session.query(TypeBuilding).delete()
        # db.session.commit()

        # create()
        # read()
        # update()
        # delete()

        # country_upload()
        # city_upload()
        # building_upload()

        query()

    # Регистрация Blueprint-ов
    app.register_blueprint(main)

    return app
