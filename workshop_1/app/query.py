from .models import Country, City, Building, TypeBuilding
from .extensions import db


def query():
    result = db.session.query(TypeBuilding)
    # print(result)

    result_1 = db.session.query(City.name, City.country_id).all()
    # print(result_1)

    result_2 = db.session.query(
        City.name.label("Город"), City.country_id.label("Страна")
    ).all()
    # print(result_2)

    result_3 = (
        db.session.query(
            Building.title.label("Здание"),
            Building.year.label("Год"),
            Building.height.label("Высота"),
        )
        .filter(Building.height > 640)
        .all()
    )
    # print(result_3)

    result_4 = (
        db.session.query(
            Building.title.label("Здание"),
            Building.year.label("Год"),
            Building.height.label("Высота"),
        )
        .filter(Building.height > 500, Building.height < 600)
        .all()
    )
    # print(result_4)

    result_5 = (
        db.session.query(
            Building.title.label("Здание"),
            Building.year.label("Год"),
            Building.height.label("Высота"),
        )
        .filter((Building.height < 355) | (Building.height > 800))
        .all()
    )
    # print(result_5)

    result_6 = (
        db.session.query(
            Building.title.label("Здание"),
            Building.year.label("Год"),
            Building.height.label("Высота"),
        )
        .order_by("Год", Building.height.desc())
        .all()
    )
    # print(result_6)
