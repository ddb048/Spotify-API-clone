from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Artist, Album, db


artists_routes = Blueprint('artists', __name__)

# SECTION - Get all artists /api/artists
@artists_routes.route('')
def get_all_artists():
    artists = Artist.query.all()
    return {'artists': [artist.to_dict() for artist in artists]}




# SECTION - Get artist by ID /api/artists/:artistId
@artists_routes.route('/<int:artistId>')
def get_one_artist(artistId):
    artist = Artist.query.get(int(artistId))
    if artist:
        return artist.to_dict(), 200
    else:
        return {
            'errors': 'artist not found',
            'Status Code': 404
        }, 404


#!SECTION - Get albums by artistId /api/artists/:artistId/albums
@artists_routes.route('/<int:artistId>/albums')
def get_artists_albums(artistId):
    albums = Album.query.filter(Album.artist_id == artistId).all()
    return {'albums': [album.to_dict() for album in albums]}
