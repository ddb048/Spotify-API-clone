from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Playlist(db.Model):
    __tablename__ = 'playlists'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    preview_image = db.Column(db.String(255))
    description = db.Column(db.String(255))
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
 #relationship
    users = db.relationship('User', back_populates='playlists')
    tracks = db.relationship('Playlist_track', back_populates='playlists', cascade="all,delete")



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'preview_image': self.preview_image,
            'description':self.description,
            'created_at':self.created_at,
            'updated_at':self.updated_at,
            "user": self.users.to_dict(),
            'num_tracks':len(self.tracks),
            #'tracks':[track.to_dict() for track in self.tracks ]
        }
