from marshmallow import fields

from app.extensions import ma


class PriceStatSchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    count = fields.Int(required=True)
    max_price = fields.Float(required=True)
    min_price = fields.Float(required=True)
    avg_price = fields.Float(required=True)


class RatingStatSchema(ma.Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    max_rating = fields.Float(required=True)
    min_rating = fields.Float(required=True)
    avg_rating = fields.Float(required=True)


price_stat_schema = PriceStatSchema(many=True)
rating_stat_schema = RatingStatSchema(many=True)
