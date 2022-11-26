from .db import db, SCHEMA, environment, add_prefix_for_prod
# from .user import User
from sqlalchemy import ForeignKey

class Track(db.Model):
    __tablename__ = 'tracks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("genres.id")))
    artist_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("artists.id")))
    album_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("albums.id")))
 #relationship
    genres = db.relationship('Genre', back_populates = 'tracks')
    artists = db.relationship('Artist', back_populates = 'tracks')
    albums = db.relationship('Album', back_populates = 'tracks')
    likes = db.relationship('Like', back_populates = 'tracks', cascade = 'all, delete')
    playlists = db.relationship('Playlist_track', back_populates='tracks', cascade= 'all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'duration': self.duration,
            'genre': self.genres.to_dict(),
            'artist': self.artists.to_dict(),
            'album': self.albums.to_dict(),
            'likes': [like.to_dict() for like in self.likes]
        }
