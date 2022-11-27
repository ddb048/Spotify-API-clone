from .db import db, SCHEMA, environment, add_prefix_for_prod
# from .user import User
from sqlalchemy import ForeignKey

class Album(db.Model):
    __tablename__ = 'albums'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    release_date = db.Column(db.Integer, nullable = False)
    album_cover = db.Column(db.String(255))
    genre_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("genres.id")))
    artist_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("artists.id")))
 #relationship
    genres = db.relationship('Genre', back_populates = 'albums', cascade='all, delete')
    artists = db.relationship('Artist', back_populates = 'albums', cascade= 'all, delete')
    tracks = db.relationship('Track', back_populates = 'albums')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'released': self.release_date,
            'album cover':self.album_cover,
            'genre': self.genres.to_dict(),
            'artist': self.artists.to_dict(),
            'tracks': [track.to_dict() for track in self.tracks]
        }
