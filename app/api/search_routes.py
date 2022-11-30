from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Playlist, Genre, Artist, Album, Track
from sqlalchemy import func, or_

search_routes = Blueprint('search', __name__)

@search_routes.route('')
def search_everything():
    params = request.get_json()
    input = params['searchInput']

    if len(input) > 3:
        tracks = Track.query.filter((Track.name.ilike(f'%{input}'))).limit(10)
        playlists = Playlist.query.filter(Playlist.name.ilike(f'%{input}')).limit(10)
        genres = Genre.query.filter(Genre.genre.ilike(f'%{input}')).limit(10)
        artists = Artist.query.filter(Artist.name.ilike(f'%{input}')).limit(10)
        albums = Album.query.filter(Album.name.ilike(f'%{input}')).limit(10)
    else:
        tracks = Track.query.filter(func.lower(Track.name.startswith(input).lower())).limit(10)
        playlists = Playlist.query.filter(func.lower(Playlist.name.startswith(input))).limit(10)
        genres = Genre.query.filter(func.lower(Genre.genre.startswith(input))).limit(10)
        artists = Artist.query.filter(func.lower(Artist.name.startswith(input))).limit(10)
        albums = Album.query.filter(func.lower(Album.name.startswith(input))).limit(10)

    tracks = list(tracks)
