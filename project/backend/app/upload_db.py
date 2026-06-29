import csv
import json
from pathlib import Path

from .extensions import db
from .models import Author, Book, Genre, Language, Publisher, Quiz

DATA_DIR = Path(__file__).parent / 'data'


def _parse_int(value):
    if value in ('', None):
        return None
    return int(float(value))


def _parse_float(value):
    if value in ('', None):
        return None
    return float(value)


def genre_upload():
    with open(DATA_DIR / 'genre.csv', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            db.session.add(Genre(item[0]))
        db.session.commit()


def publisher_upload():
    with open(DATA_DIR / 'publisher.csv', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            db.session.add(Publisher(item[0]))
        db.session.commit()


def author_upload():
    with open(DATA_DIR / 'author.csv', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            db.session.add(Author(item[0], item[1] or None))
        db.session.commit()


def language_upload():
    with open(DATA_DIR / 'language.csv', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            db.session.add(Language(item[0]))
        db.session.commit()


def book_upload():
    with open(DATA_DIR / 'book.csv', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        batch = []
        for item in reader:
            batch.append(Book(
                csv_index=_parse_int(item[0]),
                title=item[1],
                publishing_year=_parse_int(item[2]),
                genre_id=int(item[3]),
                publisher_id=int(item[4]),
                author_id=int(item[5]),
                language_id=int(item[6]),
                average_rating=_parse_float(item[7]),
                ratings_count=_parse_int(item[8]),
                sale_price=_parse_float(item[9]),
                gross_sales=_parse_float(item[10]),
                publisher_revenue=_parse_float(item[11]),
                sales_rank=_parse_int(item[12]),
                units_sold=_parse_int(item[13]),
            ))
        db.session.add_all(batch)
        db.session.commit()


QUIZ_ITEMS = [
    {
        'type': 'M',
        'title': 'Сопоставьте таблицу каталога книг с описанием',
        'tasks': [
            {'question': 'genre', 'answer': 'Жанр литературного произведения'},
            {'question': 'publisher', 'answer': 'Издательство, выпустившее книгу'},
            {'question': 'author', 'answer': 'Автор произведения'},
            {'question': 'book', 'answer': 'Книга с ценой, рейтингом и продажами'},
        ],
    },
    {
        'type': 'M',
        'title': 'Сопоставьте поле таблицы book с его значением',
        'tasks': [
            {'question': 'sale_price', 'answer': 'Цена продажи книги'},
            {'question': 'average_rating', 'answer': 'Средняя оценка читателей'},
            {'question': 'sales_rank', 'answer': 'Место книги в рейтинге продаж'},
            {'question': 'units_sold', 'answer': 'Количество проданных экземпляров'},
        ],
    },
    {
        'type': 'S',
        'title': 'Расположите уровни иерархии каталога книг от общего к частному',
        'tasks': [
            {'question': '1', 'answer': 'Жанр (fiction, nonfiction)'},
            {'question': '2', 'answer': 'Издательство'},
            {'question': '3', 'answer': 'Автор'},
            {'question': '4', 'answer': 'Конкретная книга с показателями продаж'},
        ],
    },
    {
        'type': 'O',
        'title': 'Какая таблица является основной фактической в каталоге книг?',
        'tasks': [
            {'question': 'author', 'answer': '0'},
            {'question': 'book', 'answer': '1'},
            {'question': 'genre', 'answer': '0'},
        ],
    },
    {
        'type': 'O+',
        'title': 'Какие показатели хранятся в карточке книги?',
        'tasks': [
            {'question': 'Цена и объём продаж', 'answer': '1'},
            {'question': 'Рейтинг и число оценок', 'answer': '1'},
            {'question': 'Год издания', 'answer': '1'},
            {'question': 'Паспортные данные читателя', 'answer': '0'},
        ],
    },
    {
        'type': 'S',
        'title': 'Упорядочите этапы выбора книги читателем',
        'tasks': [
            {'question': '1', 'answer': 'Выбор жанра'},
            {'question': '2', 'answer': 'Поиск автора или названия'},
            {'question': '3', 'answer': 'Сравнение рейтинга и цены'},
            {'question': '4', 'answer': 'Покупка издания'},
        ],
    },
]


def quiz_upload():
    for item in QUIZ_ITEMS:
        db.session.add(Quiz(
            item['type'],
            item['title'],
            json.dumps(item['tasks'], ensure_ascii=False),
        ))
    db.session.commit()


def upload_all():
    genre_upload()
    publisher_upload()
    author_upload()
    language_upload()
    book_upload()
    quiz_upload()
