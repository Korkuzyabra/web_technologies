from flask import jsonify
from flask_httpauth import HTTPBasicAuth
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()
auth = HTTPBasicAuth()


@auth.get_password
def get_password(username):
    if username == 'student':
        return 'dvfu'
    return None


@auth.error_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized access'}), 401
