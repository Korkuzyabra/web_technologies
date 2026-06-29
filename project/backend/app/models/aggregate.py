from sqlalchemy import func
from sqlalchemy.orm import joinedload

from app.extensions import db
from app.models.books import Author, Book, Genre, Language, Publisher


def _format_query_results(query):
    keys = query.statement.columns.keys()
    return [
        {field_name: value for field_name, value in zip(keys, row)}
        for row in query.all()
    ]


def get_publisher_price_stat():
    query = (
        db.session.query(
            Publisher.id.label('id'),
            Publisher.name.label('name'),
            func.count(Book.id).label('count'),
            func.round(func.max(Book.sale_price), 2).label('max_price'),
            func.round(func.min(Book.sale_price), 2).label('min_price'),
            func.round(func.avg(Book.sale_price), 2).label('avg_price'),
        )
        .join(Book, Book.publisher_id == Publisher.id)
        .group_by(Publisher.id, Publisher.name)
        .order_by(Publisher.name)
    )
    return _format_query_results(query)


def get_genre_price_stat():
    query = (
        db.session.query(
            Genre.id.label('id'),
            Genre.name.label('name'),
            func.count(Book.id).label('count'),
            func.round(func.max(Book.sale_price), 2).label('max_price'),
            func.round(func.min(Book.sale_price), 2).label('min_price'),
            func.round(func.avg(Book.sale_price), 2).label('avg_price'),
        )
        .join(Book, Book.genre_id == Genre.id)
        .group_by(Genre.id, Genre.name)
        .order_by(Genre.name)
    )
    return _format_query_results(query)


def get_language_price_stat():
    query = (
        db.session.query(
            Language.id.label('id'),
            Language.code.label('name'),
            func.count(Book.id).label('count'),
            func.round(func.max(Book.sale_price), 2).label('max_price'),
            func.round(func.min(Book.sale_price), 2).label('min_price'),
            func.round(func.avg(Book.sale_price), 2).label('avg_price'),
        )
        .join(Book, Book.language_id == Language.id)
        .group_by(Language.id, Language.code)
        .order_by(Language.code)
    )
    return _format_query_results(query)


def get_genre_rating_stat():
    query = (
        db.session.query(
            Genre.id.label('id'),
            Genre.name.label('name'),
            func.round(func.max(Book.average_rating), 2).label('max_rating'),
            func.round(func.min(Book.average_rating), 2).label('min_rating'),
            func.round(func.avg(Book.average_rating), 2).label('avg_rating'),
        )
        .join(Book, Book.genre_id == Genre.id)
        .filter(Book.average_rating.isnot(None))
        .group_by(Genre.id, Genre.name)
        .order_by(func.avg(Book.average_rating).desc())
    )
    return _format_query_results(query)


def book_to_nested(book):
    return {
        'id': book.id,
        'csv_index': book.csv_index,
        'title': book.title,
        'publishing_year': book.publishing_year,
        'average_rating': book.average_rating,
        'ratings_count': book.ratings_count,
        'sale_price': book.sale_price,
        'gross_sales': book.gross_sales,
        'publisher_revenue': book.publisher_revenue,
        'sales_rank': book.sales_rank,
        'units_sold': book.units_sold,
        'author': {
            'id': book.author.id,
            'name': book.author.name,
            'rating': book.author.rating,
        },
        'publisher': {
            'id': book.publisher.id,
            'name': book.publisher.name,
        },
        'genre': {
            'id': book.genre.id,
            'name': book.genre.name,
        },
        'language': {
            'id': book.language.id,
            'code': book.language.code,
        },
    }


def search_books(
    limit=50,
    offset=0,
    sort_by='sale_price',
    sort_order='desc',
    publisher_id=None,
    genre_id=None,
    language_id=None,
    search=None,
    min_rating=None,
):
    query = (
        Book.query
        .join(Author, Book.author_id == Author.id)
        .join(Publisher, Book.publisher_id == Publisher.id)
        .join(Genre, Book.genre_id == Genre.id)
        .join(Language, Book.language_id == Language.id)
    )

    if publisher_id is not None:
        query = query.filter(Book.publisher_id == publisher_id)
    if genre_id is not None:
        query = query.filter(Book.genre_id == genre_id)
    if language_id is not None:
        query = query.filter(Book.language_id == language_id)
    if search:
        query = query.filter(Book.title.ilike(f'%{search}%'))
    if min_rating is not None:
        query = query.filter(Book.average_rating >= min_rating)

    total = query.count()

    sort_columns = {
        'sale_price': Book.sale_price,
        'rating': Book.average_rating,
        'title': Book.title,
        'publisher': Publisher.name,
        'genre': Genre.name,
        'sales_rank': Book.sales_rank,
        'units_sold': Book.units_sold,
        'publishing_year': Book.publishing_year,
    }
    sort_col = sort_columns.get(sort_by, Book.sale_price)
    if sort_order == 'asc':
        query = query.order_by(sort_col.asc())
    else:
        query = query.order_by(sort_col.desc())

    books = (
        query
        .options(
            joinedload(Book.author),
            joinedload(Book.publisher),
            joinedload(Book.genre),
            joinedload(Book.language),
        )
        .offset(offset)
        .limit(limit)
        .all()
    )

    return total, [book_to_nested(book) for book in books]


def get_all_books(limit=50, offset=0, **kwargs):
    return search_books(limit=limit, offset=offset, **kwargs)


def get_one_book_nested(book_id):
    book = (
        Book.query
        .options(
            joinedload(Book.author),
            joinedload(Book.publisher),
            joinedload(Book.genre),
            joinedload(Book.language),
        )
        .filter(Book.id == book_id)
        .first()
    )
    if not book:
        return None
    return book_to_nested(book)
