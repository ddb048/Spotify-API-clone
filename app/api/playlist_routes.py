from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Playlist, Playlist_track, Track, Album, Artist, Genre, db


playlist_routes = Blueprint('playlists', __name__)




# SECTION - GET all playlists /api/playlists
@playlist_routes.route('')
def get_playlists():
    playlists = Playlist.query.all()

    return {'playlists': [playlist.to_dict() for playlist in playlists]}




# SECTION - GET all playlists by current User /api/playlists/collection
@playlist_routes.route('/collection')
@login_required
def user_playlists():
    userId = current_user.id
    all_playlists = Playlist.query.all()
    list_of_playlists = [playlist.to_dict() for playlist in all_playlists]

    response = []
    for playlist in list_of_playlists:
        if playlist['user']['id'] == userId:
            response.append(playlist)
    return {'playlists': response}, 200




# SECTION - GET playlist by playlistId /api/playlists/:playlistId
@playlist_routes.route('/<int:playlistId>')
def get_one_playlist(playlistId):
    playlist = Playlist.query.get(int(playlistId))
    if playlist:
        return playlist.to_dict(), 200
    else:
        return {
            'errors': 'playlist not found',
            'Status Code': 404
        }, 404



# SECTION - Get all tracks by playlistId /api/playlists/:playlistId/tracks
@playlist_routes.route('/<int:playlistId>/tracks')
def get_playlist_tracks(playlistId):



    tracks = Track.query.all()

    tracksList = []

    for track in tracks:
        if playlistId in track.to_dict()['playlists']:
            tracksList.append(track.to_dict())

    return {'tracks': tracksList}
