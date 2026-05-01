from .models import TypeBuilding, Country, City, Building
from .extensions import db


def create():
    types = [
        "Небоскрёб",
        "Антенная мачта",
        "Бетонная башня",
        "Гиперболоидная башня",
        "Дымовая труба",
        "Решётчатая мачта",
        "Башня",
        "Мост",
    ]

    buildings = [TypeBuilding(t) for t in types]
    db.session.add_all(buildings)
    db.session.commit()


def read():
    query_typeBuilding = TypeBuilding.query.all()
    query_country = Country.query.all()
    query_city = City.query.all()
    query_building = Building.query.all()

    print(query_typeBuilding)
    print(query_country)
    print(query_city)
    print(query_building)


def update():
    (
        TypeBuilding.query.filter(TypeBuilding.type == "Мост").update(
            {TypeBuilding.type: "Мосты"}
        )
    )
    db.session.commit()

    query = TypeBuilding.query.all()
    print(query)


def delete():
    TypeBuilding.query.filter(TypeBuilding.id == 9).delete()

    db.session.commit()

    query = TypeBuilding.query.all()
    print(query)
