from app.models.country import Country
from app.extensions import ma, db


class CountrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Country
        load_instance = True
        sqla_session = db.session


country_schema = CountrySchema()
country_schema = CountrySchema(many=True)
