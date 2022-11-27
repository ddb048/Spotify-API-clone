from flask.cli import AppGroup
from .users import seed_users, undo_users
from .genres import seed_genres, undo_genres
from .artists import seed_artists, undo_artists
from .albums import seed_albums, undo_albums
from .tracks import seed_tracks, undo_tracks
from .playlists import seed_playlists, undo_playlists
from .playlist_tracks import seed_playlist_tracks, undo_playlist_tracks
from .follows import seed_follows, undo_follows
from .likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_genres()
        undo_artists()
        undo_albums()
        undo_tracks()
        undo_playlists()
        undo_playlist_tracks()
        undo_follows()
        undo_likes()
    seed_users()
    seed_genres()
    seed_artists()
    seed_albums()
    seed_tracks()
    seed_playlists()
    seed_playlist_tracks()
    seed_follows()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_genres()
    undo_artists()
    undo_albums()
    undo_tracks()
    undo_playlists()
    undo_playlist_tracks()
    undo_follows()
    undo_likes()
    # Add other undo functions here
