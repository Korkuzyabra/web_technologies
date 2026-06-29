from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from app.extensions import auth, db
from app.models.aggregate import get_one_book_nested
from app.models.books import Book
from app.schemas.book import book_schema, books_schema

book_bp = Blueprint('book', __name__)


@book_bp.route('/', methods=['GET'])
@auth.login_required
def get_books():
    limit = request.args.get('limit', 50, type=int)
    offset = request.args.get('offset', 0, type=int)
    books = (
        Book.query
        .order_by(Book.id)
        .offset(offset)
        .limit(limit)
        .all()
    )
    total = Book.query.count()
    return jsonify({
        'success': True,
        'total': total,
        'books': books_schema.dump(books),
    }), 200


@book_bp.route('/<int:book_id>', methods=['GET'])
def get_one_book(book_id):
    book = get_one_book_nested(book_id)
    if not book:
        return jsonify({'success': False, 'error': 'Book not found'}), 404
    return jsonify({'success': True, 'book': book}), 200


@book_bp.route('/', methods=['POST'])
@auth.login_required
def create_book():
    try:
        data = request.get_json() or {}
        errors = book_schema.validate(data)
        if errors:
            return jsonify({'success': False, 'errors': errors}), 400

        book = Book(
            csv_index=data['csv_index'],
            title=data['title'],
            publishing_year=data.get('publishing_year'),
            genre_id=data['genre_id'],
            publisher_id=data['publisher_id'],
            author_id=data['author_id'],
            language_id=data['language_id'],
            average_rating=data.get('average_rating'),
            ratings_count=data.get('ratings_count'),
            sale_price=data.get('sale_price'),
            gross_sales=data.get('gross_sales'),
            publisher_revenue=data.get('publisher_revenue'),
            sales_rank=data.get('sales_rank'),
            units_sold=data.get('units_sold'),
        )
        db.session.add(book)
        db.session.commit()
        return jsonify({'success': True, 'book': book_schema.dump(book)}), 201
    except ValidationError as err:
        db.session.rollback()
        return jsonify({'success': False, 'errors': err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@book_bp.route('/<int:book_id>', methods=['PUT'])
@auth.login_required
def update_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'success': False, 'error': 'Book not found'}), 404
    try:
        data = request.get_json() or {}
        errors = book_schema.validate(data, partial=True)
        if errors:
            return jsonify({'success': False, 'errors': errors}), 400
        for field, value in data.items():
            if field != 'id' and hasattr(book, field):
                setattr(book, field, value)
        db.session.commit()
        return jsonify({'success': True, 'book': book_schema.dump(book)}), 200
    except ValidationError as err:
        db.session.rollback()
        return jsonify({'success': False, 'errors': err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@book_bp.route('/<int:book_id>', methods=['DELETE'])
@auth.login_required
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'success': False, 'error': 'Book not found'}), 404
    try:
        book_data = book_schema.dump(book)
        db.session.delete(book)
        db.session.commit()
        return jsonify({'success': True, 'book': book_data}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
