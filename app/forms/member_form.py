from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Member

class NewMemberForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
