from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request, redirect
from app.models import db, Member, Item
from flask_login import login_required, current_user
from app.forms import NewItemForm
item_routes = Blueprint('item', __name__)

@item_routes.route('')
def items():
    items = Item.query.all()
    return {"items": [item.to_dict() for item in items]}

@item_routes.route('/<int:id>')
def item(id):
    item = Item.query.get(id)
    return item.to_dict()

@item_routes.route('/party/<int:id>')
def items_by_party(id):
    items = Item.query.filter(
        Item.party_id == id,
        Item.member_id == None
        )
    return {"items": [item.to_dict() for item in items]}

@item_routes.route('/member/<int:id>')
def items_by_member(id):
    items = Item.query.filter(Item.member_id == id)
    return {"items": [item.to_dict() for item in items]}

@item_routes.route('/new', methods=["POST"])
@login_required
def post_new_item():
    form = NewItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item(
            name = form.data['name'],
            description = form.data['description'],
            platinum_value = form.data['platinum_value'],
            gold_value= form.data['gold_value'],
            silver_value= form.data['silver_value'],
            copper_value= form.data['copper_value'],
            party_id= form.data['party_id'],
            member_id= form.data['member_id'],
            type_id= form.data['type_id']
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@item_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_item(id):
    item = Item.query.get(id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Item Deleted Successfully"}

@item_routes.route('/update/<int:id>', methods=["PUT"])
def put_update_item(id):
    content = request.json
    item = Item.query.get(id)
    item.name = content["name"]
    item.description = content["description"]
    item.platinum_value = content["platinum_value"]
    item.gold_value = content["gold_value"]
    item.silver_value = content["silver_value"]
    item.copper_value = content["copper_value"]
    item.party_id = content["party_id"]
    item.member_id = content["member_id"]
    item.type_id = content["type_id"]
    db.session.commit()
    return item.to_dict()
