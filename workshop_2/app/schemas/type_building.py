from app.models.type_building import TypeBuilding
from app.extensions import ma, db


class TypeBuildingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TypeBuilding
        load_instance = True
        sqla_session = db.session


type_building_schema = TypeBuildingSchema()
type_buildings_schema = TypeBuildingSchema(many=True)
