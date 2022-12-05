from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import Like
from .follow import Follow

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
    queue = db.relationship('Queue', back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def like_track(self, track):
        if not self.has_liked_track(track):
            like = Like(user_id=self.id, track_id=track.id)
            db.session.add(like)
        else:
            return {
            "errors": "Track already in your collection"
            }, 404

    def unlike_track(self, track):
        if self.has_liked_track(track):
            Like.query.filter_by(
                user_id=self.id,
                track_id=track.id).delete()
        else:
            return {
            "errors": "Track not currently in your collection"
            }, 404

    def has_liked_track(self, track):
        return Like.query.filter(
            Like.user_id == self.id,
            Like.track_id == track.id).count() > 0


    def follow_artist(self, artist):
        if not self.has_followed_artist(artist):
            follow = Follow(user_id=self.id, artist_id=artist.id)
            db.session.add(follow)
        else:
            return {
            "errors": "Artist already in your collection"
            }, 404

    def unfollow_artist(self, artist):
        if self.has_followed_artist(artist):
            Follow.query.filter_by(
                user_id=self.id,
                artist_id=artist.id).delete()
        else:
            return {
            "errors": "Artist not currently in your collection"
            }, 404

    def has_followed_artist(self, artist):
        return Follow.query.filter(
            Follow.user_id == self.id,
            Follow.artist_id == artist.id).count() > 0



    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'marketable': self.marketable,
            'birthdate': self.birthdate,
            'gender': self.gender,
            # 'queue': self.queue
            #  'playlists': [playlist.to_dict() for playlist in self.playlists],
            #  'follows': [follow.to_dict() for follow in self.follows],
            #  'likes': [like.to_dict() for like in self.likes]
        }
