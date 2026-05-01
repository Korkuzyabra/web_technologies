from .models import Country, City, Building
from .extensions import db
import csv


def country_upload():
    with open("app/data/country.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = Country(item[0])
            db.session.add(new_entry)
        db.session.commit()


def city_upload():
    with open("app/data/city.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = City(name=item[0], country_id=item[1])
            db.session.add(new_entry)
        db.session.commit()


def building_upload():
    with open("app/data/building.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = Building(
                title=item[0],
                type_building_id=item[1],
                city_id=item[2],
                year=item[3],
                height=item[4],
            )
            db.session.add(new_entry)
        db.session.commit()
