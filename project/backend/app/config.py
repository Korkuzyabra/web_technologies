class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///books.db'


class DevelopmentConfig(Config):
    DEBUG = True
