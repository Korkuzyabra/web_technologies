from app.models.buildings import Building
from app.extensions import ma, db
from .city import CitySchema
from .type_building import TypeBuildingSchema


class BuildingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Building
        model = Building
        load_instance = True
        sqla_session = db.session

    city_id = ma.auto_field()
    type_building_id = ma.auto_field()

    type_building = ma.Nested(TypeBuildingSchema())
    city = ma.Nested(CitySchema())


building_cschema = BuildingSchema()
buildings_cschema = BuildingSchema(many=True)
