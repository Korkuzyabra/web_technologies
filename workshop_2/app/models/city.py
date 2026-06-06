from app import db


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column("Город", db.String(100))
    country_id = db.Column(db.Integer, db.ForeignKey("country.id"))
    country = db.relationship("Country", back_populates="cities")
    buildings = db.relationship("Building", cascade="all, delete")

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id

    def __repr__(self):
        return f"\nid: {self.id}, Город: {self.name}, country_id: {self.country_id}"
