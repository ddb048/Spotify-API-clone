from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    marketable = db.Column(db.Boolean)
    birthdate = db.Column(db.DateTime, nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    playlists = db.relationship('Playlist', back_populates='users', cascade="all,delete")
    follows = db.relationship('Follow', back_populates='users', cascade="all,delete")
    likes = db.relationship('Like', back_populates='users', cascade="all,delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'marketable': self.marketable,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'playlists': [playlist.to_dict() for playlist in self.playlists],
            'follows': [follow.to_dict() for follow in self.follows],
            'likes': [like.to_dict() for like in self.likes]
        }
