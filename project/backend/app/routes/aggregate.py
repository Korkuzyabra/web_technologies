from flask import Blueprint, jsonify, request

from app.models.aggregate import (
    get_all_books,
    get_genre_price_stat,
    get_genre_rating_stat,
    get_language_price_stat,
    get_publisher_price_stat,
)
from app.models.quiz import Quiz
from app.schemas.aggregate import price_stat_schema, rating_stat_schema
from app.schemas.quiz import quizzes_schema

aggregate_bp = Blueprint('aggregate', __name__)


@aggregate_bp.route('/publisher/', methods=['GET'])
def publisher_price_stat():
    return jsonify({'success': True, 'stat': price_stat_schema.dump(get_publisher_price_stat())}), 200


@aggregate_bp.route('/genre/', methods=['GET'])
def genre_price_stat():
    return jsonify({'success': True, 'stat': price_stat_schema.dump(get_genre_price_stat())}), 200


@aggregate_bp.route('/language/', methods=['GET'])
def language_price_stat():
    return jsonify({'success': True, 'stat': price_stat_schema.dump(get_language_price_stat())}), 200


@aggregate_bp.route('/rating/', methods=['GET'])
def genre_rating_stat():
    return jsonify({'success': True, 'stat': rating_stat_schema.dump(get_genre_rating_stat())}), 200


@aggregate_bp.route('/all/', methods=['GET'])
def all_books():
    limit = request.args.get('limit', 50, type=int)
    offset = request.args.get('offset', 0, type=int)
    sort_by = request.args.get('sort_by', 'sale_price')
    sort_order = request.args.get('sort_order', 'desc')
    publisher_id = request.args.get('publisher_id', type=int)
    genre_id = request.args.get('genre_id', type=int)
    language_id = request.args.get('language_id', type=int)
    search = request.args.get('search', type=str)
    min_rating = request.args.get('min_rating', type=float)

    total, results = get_all_books(
        limit=limit,
        offset=offset,
        sort_by=sort_by,
        sort_order=sort_order,
        publisher_id=publisher_id,
        genre_id=genre_id,
        language_id=language_id,
        search=search or None,
        min_rating=min_rating,
    )
    return jsonify({'success': True, 'total': total, 'books': results}), 200


@aggregate_bp.route('/charts/', methods=['GET'])
def all_charts():
    return jsonify({
        'success': True,
        'publisher': price_stat_schema.dump(get_publisher_price_stat()),
        'genre': price_stat_schema.dump(get_genre_price_stat()),
        'language': price_stat_schema.dump(get_language_price_stat()),
    }), 200


@aggregate_bp.route('/quiz/', methods=['GET'])
def quiz():
    items = Quiz.query.order_by(Quiz.id).all()
    return jsonify(quizzes_schema.dump(items)), 200
