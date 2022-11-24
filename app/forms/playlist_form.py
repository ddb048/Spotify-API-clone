from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class PlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=50)])
    description = StringField('description', validators=[Length(max=200)])
    picture_url = StringField('Playlist Photo', validators=[DataRequired()])
