from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class Queue(db.Model):
    __tablename__ = 'queue'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime(), nullable=False,server_default=func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,onupdate=func.now(), default=func.now())
    #relationships
    users = db.relationship('User', back_populates='queue')
    queue_tracks = db.relationship('Queue_track', back_populates='queue')


    def to_dict(self):
        return {
            'id': self.id,
            # 'user': self.users.to_dict(),
            # "queue_tracks": self.queue_tracks.to_dict()
        }
