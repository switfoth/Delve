from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

class NewItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), length(max=60)])
    description = TextAreaField('description', validators=[DataRequired(), length(max=500)])
    platinum_value = IntegerField('platinum_value', default=0)
    gold_value = IntegerField('gold_value', default=0)
    silver_value = IntegerField('silver_value', default=0)
    copper_value = IntegerField('copper_value', default=0)

    party_id = IntegerField("Party")
    member_id = IntegerField("Member")
    type_id = IntegerField("ItemType")
