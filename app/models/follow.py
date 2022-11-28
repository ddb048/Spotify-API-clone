from .db import db, SCHEMA, environment, add_prefix_for_prod
# from .user import User
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

class Follow(db.Model):
    __tablename__ = 'follows'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key = True)
    artist_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("artists.id")))
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
 #relationship
    artists = db.relationship('Artist', back_populates = 'follows')
    users = db.relationship('User', back_populates = 'follows')

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'artist': self.artists.to_dict(),
            'user': self.users.to_dict()
        }
