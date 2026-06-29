from app.extensions import db


class Genre(db.Model):
    __tablename__ = 'genre'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    books = db.relationship('Book', back_populates='genre')

    def __init__(self, name):
        self.name = name


class Publisher(db.Model):
    __tablename__ = 'publisher'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False, unique=True)
    books = db.relationship('Book', back_populates='publisher')

    def __init__(self, name):
        self.name = name


class Author(db.Model):
    __tablename__ = 'author'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(300), nullable=False)
    rating = db.Column(db.String(50))
    books = db.relationship('Book', back_populates='author')

    def __init__(self, name, rating=None):
        self.name = name
        self.rating = rating or None


class Language(db.Model):
    __tablename__ = 'language'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    code = db.Column(db.String(20), nullable=False, unique=True)
    books = db.relationship('Book', back_populates='language')

    def __init__(self, code):
        self.code = code


class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    csv_index = db.Column(db.Integer, nullable=False, unique=True)
    title = db.Column(db.String(300), nullable=False)
    publishing_year = db.Column(db.Integer)
    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'), nullable=False)
    publisher_id = db.Column(db.Integer, db.ForeignKey('publisher.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'), nullable=False)
    average_rating = db.Column(db.Float)
    ratings_count = db.Column(db.Integer)
    sale_price = db.Column(db.Float)
    gross_sales = db.Column(db.Float)
    publisher_revenue = db.Column(db.Float)
    sales_rank = db.Column(db.Integer)
    units_sold = db.Column(db.Integer)

    genre = db.relationship('Genre', back_populates='books')
    publisher = db.relationship('Publisher', back_populates='books')
    author = db.relationship('Author', back_populates='books')
    language = db.relationship('Language', back_populates='books')
