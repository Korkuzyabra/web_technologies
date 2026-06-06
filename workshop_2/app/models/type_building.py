from app import db


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
