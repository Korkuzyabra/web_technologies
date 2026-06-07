from app.extensions import db
from app.models.country import Country
from app.models.city import City
from app.models.type_building import TypeBuilding
from app.models.buildings import Building
from sqlalchemy import func, desc


def get_all_buildings():
    query = (
        db.session.query(
            Building.id,
            Building.title,
            TypeBuilding.type.label("type"),
            Country.name.label("country"),
            City.name.label("city"),
            Building.year,
            Building.height,
        )
        .select_from(Building)
        .join(TypeBuilding)
        .join(City)
        .join(Country)
    )
    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def get_country_stat():
    query = (
        db.session.query(
            Country.id,
            Country.name,
            func.min(Building.height).label("min_height"),
            func.max(Building.height).label("max_height"),
            func.avg(Building.height).label("avg_height"),
        )
        .join(City, City.country_id == Country.id)
        .join(Building, Building.city_id == City.id)
        .group_by(Country.id, Country.name)
    )

    results = query.all()
    keys = query.statement.columns.keys()

    return [dict(zip(keys, row)) for row in results]


def get_type_building_stat():
    query = (
        db.session.query(
            TypeBuilding.id,
            TypeBuilding.type.label("name"),
            func.min(Building.height).label("min_height"),
            func.max(Building.height).label("max_height"),
            func.avg(Building.height).label("avg_height"),
        )
        .join(Building)
        .group_by(TypeBuilding.id, TypeBuilding.type)
    )

    results = query.all()
    keys = query.statement.columns.keys()

    return [dict(zip(keys, row)) for row in results]


def get_year_stat():
    query = (
        db.session.query(
            Building.year.label("id"),
            Building.year.label("name"),
            func.min(Building.height).label("min_height"),
            func.max(Building.height).label("max_height"),
            func.avg(Building.height).label("avg_height"),
        )
        .group_by(Building.year)
        .order_by(Building.year)
    )

    results = query.all()
    keys = query.statement.columns.keys()

    return [dict(zip(keys, row)) for row in results]
