from marshmallow import fields

from app.extensions import ma


class QuizSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    type = fields.Str(required=True)
    title = fields.Str(required=True)
    tasks = fields.Str(required=True)


quiz_schema = QuizSchema()
quizzes_schema = QuizSchema(many=True)
