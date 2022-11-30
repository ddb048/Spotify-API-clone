from .db import db, SCHEMA, environment, add_prefix_for_prod

from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


class Playlist_track(db.Model):
    __tablename__ = 'playlist_tracks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    playlist_id = db.Column(ForeignKey(
        add_prefix_for_prod("playlists.id")), primary_key=True)
    track_id = db.Column(ForeignKey(
        add_prefix_for_prod("tracks.id")), primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           onupdate=func.now(), default=func.now())
    playlists = db.relationship('Playlist', back_populates='tracks')
    tracks = db.relationship('Track', back_populates='playlists')

    def to_dict(self):
        return {
            'playlist_id': self.playlist_id,
            'track_id': self.track_id,
            'tracks': self.tracks.to_dict(),
            'playlist': self.playlists.to_dict(),
            'created': self.created_at,
            'updated': self.updated_at
        }
