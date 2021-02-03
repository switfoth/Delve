from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Party

class NewPartyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
