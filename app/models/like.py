from .db import db, SCHEMA, environment, add_prefix_for_prod
# from .user import User
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

class Like(db.Model):
    __tablename__ = 'likes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key = True)
    track_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("tracks.id")))
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
 #relationship
    tracks = db.relationship('Track', back_populates = 'likes')
    users = db.relationship('User', back_populates = 'likes')

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'track': self.tracks.to_dict(),
            'user': self.users.to_dict()
        }
