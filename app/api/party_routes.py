from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request, redirect
from app.models import db, Member, Party, Item
from flask_login import login_required, current_user
from app.forms import NewPartyForm
party_routes = Blueprint('party', __name__)
import json

@party_routes.route('/')
def parties():
    parties = Party.query.all()
    return {"parties": [party.to_dict() for party in parties]}

@party_routes.route('/<int:id>')
def party(id):
    party = Party.query.get(id)
    return party.to_dict()

@party_routes.route('/user/<int:id>')
def parties_by_user(id):
    parties = Party.query.filter(Party.user_id == id)
    return {"parties": [party.to_dict() for party in parties]}

@party_routes.route('/new', methods=["POST"])
@login_required
def post_new_party():
    form = NewPartyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        party = Party(
            name=form.data['name'],
            user_id=current_user.id,
        )
        db.session.add(party)
        db.session.commit()
        return party.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@party_routes.route("/delete/<int:id>", methods=["DELETE"])
def delete_party(id):
    party = Party.query.get(id)
    db.session.delete(party)
    db.session.commit()
    return {"message": "Party Deleted Successfully"}

@party_routes.route("/update/<int:id>", methods=["PUT"])
def put_update_party(id):
    content = request.json
    party = Party.query.get(id)
    party.name = content["name"]
    party.platinum = content["platinum"]
    party.gold = content["gold"]
    party.silver = content["silver"]
    party.copper = content["copper"]
    db.session.commit()
    return redirect(f'/api/party/{id}')
