from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Album, db

albums_routes = Blueprint('albums', __name__)

# SECTION - Get all albums /api/albums/
@albums_routes.route('')
def get_all_albums():
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}


# SECTION - Get album by ID /api/albums/:albumId
@albums_routes.route('/<int:albumId>')
def get_one_album(albumId):
    album = Album.query.get(int(albumId))
    if album:
        return album.to_dict(), 200
    else:
        return {
            'errors': 'album not found',
            'Status Code': 404
        }, 404
