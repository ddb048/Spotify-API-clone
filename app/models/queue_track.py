from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Queue_track(db.Model):
    __tablename__ = 'queue_tracks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    queue_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("queue.id")))
    track_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("tracks.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
    #relationships
    queue = db.relationship('Queue', back_populates='queue_tracks')
    tracks = db.relationship('Track', back_populates='queue_tracks')


    def to_dict(self):
        return {
            'id': self.id,
            'tracks': self.tracks.to_dict(),
            'added': self.created_at,
            'updated': self.updated_at
        }
