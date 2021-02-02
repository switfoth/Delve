from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request, redirect
from app.models import db, Member, Item
from flask_login import login_required, current_user
# import forms here
member_routes = Blueprint('member', __name__)


@member_routes.route('/')
def get_members():
    members = Member.query.all()
    return {"members": [member.to_dict() for member in members]}

@member_routes.route('/<int:id>')
def get_party_members(id):
    members = Member.query.filter(Member.party_id == id)
    return {"members": [member.to_dict() for member in members]}

@member_routes.route('/new')
def post_new_member():
    form = NewMemberForm()
    if form.validate_on_submit():
        member = Member(
            name=form.data["name"]
        )
        db.session.add(member)
        db.session.commit()
        return member.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@member_routes.route('/delete/<int:id>')
def delete_member(id):
    member = Member.query.get(id)
    db.session.delete(member)
    db.session.commit()
    return {"message": "Party Member Deleted Successfully"}

@member_routes.route('/update/<int:id>')
def put_update_member():
    content = request.json
    member = Member.query.get(id)
    member.name = content["name"]
    member.platinum = content["platinum"]
    member.gold = content["gold"]
    member.silver = content["silver"]
    member.copper = content["copper"]
    db.session.commit()
    return redirect(f'/api/member/{id}')
