from flask import Blueprint, jsonify, request, redirect
from app.models import ItemType, db

item_type_routes = Blueprint('item_type', __name__)

@item_type_routes.route('/', methods=["GET"])
def get_categories():
    item_types = ItemType.query.all()
    return {"item_types": [item_type.to_dict() for item_type in item_types]}

@item_type_routes.route('/<int:id>')
def get_item_type(id):
    item_type = item_type.query.get(id)
    return item_type.to_dict()
