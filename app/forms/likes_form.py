from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class Likes(FlaskForm):
    track_id = IntegerField('Track', validators=[DataRequired()])
