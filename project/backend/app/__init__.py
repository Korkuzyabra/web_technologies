from flask import Flask

from .config import DevelopmentConfig
from .extensions import db, ma
from .models import Genre
from .routes import aggregate, book, meta, title
from .upload_db import quiz_upload, upload_all


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    ma.init_app(app)
    app.json.ensure_ascii = False

    with app.app_context():
        db.create_all()
        if Genre.query.count() == 0:
            upload_all()
        else:
            from .models import Quiz
            if Quiz.query.count() == 0:
                quiz_upload()

    app.register_blueprint(title.bp_title, url_prefix='/api/v1/title')
    app.register_blueprint(book.book_bp, url_prefix='/api/v1/books')
    app.register_blueprint(aggregate.aggregate_bp, url_prefix='/api/v1/aggregate')
    app.register_blueprint(meta.meta_bp, url_prefix='/api/v1/meta')

    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return response

    return app
