from flask import Blueprint, jsonify
from sqlalchemy import func, desc
from app.schemas.aggregate import all_buildings_schema, aggregates_schema
from app.models.aggregate import (
    get_all_buildings,
    get_country_stat,
    get_type_building_stat,
    get_year_stat,
)


aggregate_bp = Blueprint("aggregate", __name__)


@aggregate_bp.route("/all/", methods=["GET"])
def all_buildings():
    results = get_all_buildings()
    return (
        jsonify({"success": True, "all_buildings": all_buildings_schema.dump(results)}),
        200,
    )


@aggregate_bp.route("/country/", methods=["GET"])
def country_stat():
    result = get_country_stat()

    return jsonify({"success": True, "stat": aggregates_schema.dump(result)}), 200


@aggregate_bp.route("/type-building/", methods=["GET"])
def type_building_stat():
    result = get_type_building_stat()

    return jsonify({"success": True, "stat": aggregates_schema.dump(result)}), 200


@aggregate_bp.route("/year/", methods=["GET"])
def year_stat():
    result = get_year_stat()

    return jsonify({"success": True, "stat": aggregates_schema.dump(result)}), 200
