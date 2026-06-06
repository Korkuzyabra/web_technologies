from flask import Blueprint, render_template
from .models import TypeBuilding, Building, City, Country
from .extensions import db
from sqlalchemy import func

main = Blueprint("main", __name__)


@main.route("/")
def index():
    result = db.session.query(
        TypeBuilding.id,
        TypeBuilding.type.label("Тип здания"),
    ).select_from(TypeBuilding)

    buildings = (
        db.session.query(
            Building.id,
            Building.title.label("Название"),
            TypeBuilding.type.label("Тип"),
            City.name.label("Город"),
            Country.name.label("Страна"),
            Building.year.label("Год"),
            Building.height.label("Высота"),
        )
        .join(TypeBuilding)
        .join(City)
        .join(Country)
    )

    stats_type = (
        db.session.query(
            TypeBuilding.type.label("Тип здания"),
            func.max(Building.height).label("Макс высота"),
            func.min(Building.height).label("Мин высота"),
            func.avg(Building.height).label("Средняя высота"),
        )
        .join(Building)
        .group_by(TypeBuilding.type)
    )

    stats_country = (
        db.session.query(
            Country.name.label("Страна"),
            func.max(Building.height).label("Макс высота"),
            func.min(Building.height).label("Мин высота"),
            func.avg(Building.height).label("Средняя высота"),
        )
        .select_from(Country)
        .join(City, Country.id == City.country_id)
        .join(Building, City.id == Building.city_id)
        .group_by(Country.name)
    )

    return render_template(
        "index.html",
        type_buildings_head=result.statement.columns.keys(),  # названия столбцов
        type_buildings_body=result.all(),  # содержимое таблицы
        buildings_head=buildings.statement.columns.keys(),
        buildings_body=buildings.all(),
        stats_type_head=stats_type.statement.columns.keys(),
        stats_type_body=stats_type.all(),
        stats_country_head=stats_country.statement.columns.keys(),
        stats_country_body=stats_country.all(),
    )
