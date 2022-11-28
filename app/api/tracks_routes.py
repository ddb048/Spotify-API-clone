from flask import Blueprint, request
from app.models import db, Track
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

track_routes = Blueprint("tracks", __name__)

# SECTION - Get all tracks /api/tracks/
@track_routes.route('/')
def get_all_tracks():
    tracks = Track.query.all()
    return {'tracks': [track.to_dict() for track in tracks]}




# SECTION - Get all tracks by album /api/tracks/albums/:albumId
@track_routes.route('/albums/<int:albumId>')
def get_all_tracks_by_album(albumId):
    tracks = Track.query.filter(Track.album_id == albumId).all()
    return {'tracks': [track.to_dict() for track in tracks]}




# SECTION - Get all tracks by artist /api/tracks/artists/:albumId
@track_routes.route('/artists/<int:artistId>')
def get_all_tracks_by_artist(artistId):
    tracks = Track.query.filter(Track.artist_id == artistId).all()
    return {'tracks': [track.to_dict() for track in tracks]}




# SECTION - Get all tracks by genre /api/tracks/genres/:genreId
@track_routes.route('/genres/<int:genreId>')
def get_all_tracks_by_genre(genreId):
    tracks = Track.query.filter(Track.genre_id == genreId).all()
    return {'tracks': [track.to_dict() for track in tracks]}





# SECTION - Get track by ID /api/tracks/:trackId
@track_routes.route('/<int:trackId>')
def get_one_track(trackId):
    track = Track.query.get(int(trackId))
    if track:
        return track.to_dict(), 200
    else:
        return {
            'errors': 'track not found',
            'Status Code': 404
        }, 404




# @track_routes.route("", methods=["POST"])
# @login_required
# def upload_track():
#     if "track" not in request.files:
#         return {"errors": "track required"}, 400

#     track = request.files["track"]

#     if not allowed_file(track.filename):
#         return {"errors": "file type not permitted"}, 400

#     track.filename = get_unique_filename(track.filename)

#     upload = upload_file_to_s3(track)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400

#     url = upload["url"]
#     # flask_login allows us to get the current user from the request
#     new_track = Track(user=current_user, url=url)
#     db.session.add(new_track)
#     db.session.commit()
#     return {"url": url}
