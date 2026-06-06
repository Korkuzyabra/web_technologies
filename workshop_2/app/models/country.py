from app import db


class Country(db.Model):
    __tablename__ = "country"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column("Страна", db.String(100), nullable=False)
    cities = db.relationship("City", back_populates="country")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"\nid: {self.id}, Страна: {self.name}"
