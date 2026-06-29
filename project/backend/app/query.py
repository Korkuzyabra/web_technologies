# -*- coding: utf-8 -*-
from sqlalchemy import func

from .extensions import db
from .models.books import Author, Book, Genre, Language, Publisher


def query_join_filter_sort():
    return (
        db.session.query(
            Book.title.label('Название'),
            Author.name.label('Автор'),
            Genre.name.label('Жанр'),
            Publisher.name.label('Издательство'),
            Book.sale_price.label('Цена'),
            Book.average_rating.label('Рейтинг'),
        )
        .join(Author, Book.author_id == Author.id)
        .join(Genre, Book.genre_id == Genre.id)
        .join(Publisher, Book.publisher_id == Publisher.id)
        .filter(Book.average_rating > 4)
        .filter(Genre.name == 'fiction')
        .order_by(Book.sale_price.desc())
        .limit(50)
    )


def query_row_calculation():
    popularity = Book.average_rating * Book.ratings_count
    return (
        db.session.query(
            Book.title.label('Название'),
            Author.name.label('Автор'),
            Book.sale_price.label('Цена'),
            Book.average_rating.label('Рейтинг'),
            Book.ratings_count.label('Оценок'),
            popularity.label('Популярность'),
        )
        .join(Author, Book.author_id == Author.id)
        .filter(Book.average_rating.isnot(None))
        .filter(Book.ratings_count.isnot(None))
        .order_by(popularity.desc())
        .limit(50)
    )


def query_group_aggregate():
    return (
        db.session.query(
            Publisher.name.label('Издательство'),
            func.round(func.avg(Book.sale_price), 2).label('Средняя цена'),
            func.min(Book.sale_price).label('Минимальная цена'),
            func.max(Book.sale_price).label('Максимальная цена'),
            func.count(Book.id).label('Количество книг'),
        )
        .join(Book, Book.publisher_id == Publisher.id)
        .group_by(Publisher.name)
        .order_by(func.avg(Book.sale_price).desc())
    )
