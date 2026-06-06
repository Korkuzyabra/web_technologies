from app.models.city import City
from app.extensions import ma, db
from app.schemas.country import CountrySchema


class CitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = City

    country_id = ma.auto_field()
    country = ma.Nested(CountrySchema())


city_schema = CitySchema()
cities_schema = CitySchema(many=True)
