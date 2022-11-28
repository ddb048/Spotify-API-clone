from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class Follows(FlaskForm):
    artist_id = IntegerField("Artist", validators=[DataRequired()])
