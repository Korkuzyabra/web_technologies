from flask import Blueprint, jsonify

from app.models.books import Author, Genre, Language, Publisher

meta_bp = Blueprint('meta', __name__)


@meta_bp.route('/', methods=['GET'])
def get_meta():
    genres = [{'id': g.id, 'name': g.name} for g in Genre.query.order_by(Genre.name).all()]
    publishers = [{'id': p.id, 'name': p.name} for p in Publisher.query.order_by(Publisher.name).all()]
    languages = [{'id': l.id, 'code': l.code} for l in Language.query.order_by(Language.code).all()]
    authors = [{'id': a.id, 'name': a.name} for a in Author.query.order_by(Author.name).all()]
    return jsonify({
        'success': True,
        'genres': genres,
        'publishers': publishers,
        'languages': languages,
        'authors': authors,
    }), 200
