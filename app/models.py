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


class TypeBuilding(db.Model):
    __tablename__ = "type_building"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column("Тип", db.String(50), nullable=False)
    buildings = db.relationship(
        "Building", back_populates="type_building", cascade="all, delete"
    )

    def __init__(self, type):
        self.type = type

    def __repr__(self):
        return f"\nid: {self.id}, Тип: {self.type}"


class Building(db.Model):
    __tablename__ = "building"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column("Название", db.String(200))
    type_building_id = db.Column(db.Integer, db.ForeignKey("type_building.id"))
    city_id = db.Column(db.Integer, db.ForeignKey("city.id"))
    year = db.Column(db.Integer)
    height = db.Column(db.Integer)
    type_building = db.relationship("TypeBuilding", back_populates="buildings")
    city = db.relationship("City", back_populates="buildings")

    def __init__(self, title, type_building_id, city_id, year, height):
        self.title = title
        self.type_building_id = type_building_id
        self.city_id = city_id
        self.year = year
        self.height = height

    def __repr__(self):
        return (
            f"\nid: {self.id}, Здание: {self.title}, "
            f"type_building_id: {self.type_building_id}, "
            f"city_id: {self.city_id}, Год: {self.year}, "
            f"Высота: {self.height}"
        )
