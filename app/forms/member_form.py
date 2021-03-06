from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Member

class NewMemberForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=60)])
    party_id = IntegerField('party_id')
