from marshmallow import fields
from app.extensions import ma


class AllBuildingsSchema(ma.Schema):
    id = fields.Int(required=True)
    title = fields.Str(required=True)
    type = fields.Str(required=True)
    country = fields.Str(required=True)
    city = fields.Str(required=True)
    year = fields.Int(required=True)
    height = fields.Float(required=True)


all_buildings_schema = AllBuildingsSchema(many=True)


class AggregateSchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)

    min_height = fields.Float(required=True)
    max_height = fields.Float(required=True)
    avg_height = fields.Float(required=True)


aggregate_schema = AggregateSchema()
aggregates_schema = AggregateSchema(many=True)
