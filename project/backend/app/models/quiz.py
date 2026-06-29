from app.extensions import db


class Quiz(db.Model):
    __tablename__ = 'quiz'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)
    tasks = db.Column(db.Text, nullable=False)

    def __init__(self, type, title, tasks):
        self.type = type
        self.title = title
        self.tasks = tasks
