from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class TrackPlaylist(FlaskForm):
    track_id = IntegerField('Track', validators=[DataRequired()])
    playlistId = IntegerField('Playlist', validators=[DataRequired()])
