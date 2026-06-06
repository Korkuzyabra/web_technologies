from flask import Blueprint, jsonify, request
from app.models.buildings import Building
from app.extensions import db

building_bp = Blueprint("building", __name__)


@building_bp.route("/", methods=["GET"])
def get_buildings():

    buildings = Building.query.all()
    return jsonify({"success": True, "buildings": str(buildings)}), 200
