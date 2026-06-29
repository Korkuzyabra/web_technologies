from app.extensions import db, ma
from app.models.books import Book


class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True
        sqla_session = db.session
        include_fk = True


book_schema = BookSchema()
books_schema = BookSchema(many=True)
