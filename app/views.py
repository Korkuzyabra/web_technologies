from flask import Blueprint, render_template
from .models import TypeBuilding
from .extensions import db

main = Blueprint("main", __name__)


@main.route("/")
def index():
    result = db.session.query(
        TypeBuilding.id,
        TypeBuilding.type.label("Тип здания"),
    ).select_from(TypeBuilding)

    return render_template(
        "index.html",
        type_buildings_head=result.statement.columns.keys(),  # названия столбцов
        type_buildings_body=result.all(),  # содержимое таблицы
    )
