from flask import Blueprint, request
from app.forms.playlist_form import PlaylistForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
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


# SECTION POST a playlist /api/playlists
@playlist_routes.route('', methods=['POST'])
@login_required
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(""".





              'test for hitting route'





              .""")
        playlist = Playlist()
        form.populate_obj(playlist)
        playlist.preview_image = 'https://amplifybuckey.s3.us-west-2.amazonaws.com/Q-cord-logos-1.png'
        playlist.user_id = current_user.id
        db.session.add(playlist)
        db.session.commit()

        return playlist.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



#!SECTION UPDATE a playlist /api/playlists/:playlistId
@playlist_routes.route('/<int:playlistId>', methods=['PUT'])
@login_required
def update_playlist(playlistId):
    playlist = Playlist.query.get(int(playlistId))
    if playlist:
        form = PlaylistForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(playlist)
            db.session.commit()
            return playlist.to_dict(), 200
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#SECTION POST a track to a playlist /api/playlists/:playlistId/tracks/:trackId
@playlist_routes.route('/<int:playlistId>/tracks/<int:trackId>', methods=["POST"])
@login_required
def add_to_playlist(playlistId, trackId):
    playlist = get_playlist_tracks(playlistId);
    print(playlist)
    for track in playlist["tracks"]:
        print(track)
        if track['id'] == trackId:
            return {'errors': "track already in playlist"}

        else:

            playlist_track=Playlist_track()
            playlist_track.playlist_id = playlistId
            playlist_track.track_id = trackId
            db.session.add(playlist_track)
            db.session.commit()

            return playlist_track.to_dict(), 200
            # return {'message': "track added to playlist"}, 200


#!SECTION DELETE a playlist /api/playlists/:playlistId
@playlist_routes.route('/<int:playlistId>', methods=['DELETE'])
@login_required
def delete_playlist(playlistId):
    playlist = Playlist.query.get(int(playlistId))
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return {
            'message': 'Playlist successfully deleted',
            'statusCode': 200
        }, 200
    else:
        return {
            'errors': 'playlist not found',
            'statusCode': 404
        }, 404



#!SECTION GET a playlist_track list by playlistID /api/playlists/playlist_track/:playlistId
@playlist_routes.route('/playlist_track/<int:playlistId>')
@login_required
def get_playlist_track(playlistId):
    playlist_tracks_all = Playlist_track.query.all()
    tracksList = [playlist_track.to_dict() for playlist_track in playlist_tracks_all]
    res = []
    for track in tracksList:
        if track['playlist_id'] == playlistId:
            res.append(track)
    return {'tracks': res}, 200


#!SECTION DELETE a track from a playlist /api/playlists/playlist_track/:playlistId/:trackId
@playlist_routes.route('/playlist_track/<int:playlistId>/<int:trackId>', methods=['DELETE'])
@login_required
def delete_track_from_playlist(playlistId, trackId):
    playlist_track = Playlist_track.query.filter_by(playlist_id=int(playlistId), track_id=int(trackId)).first()
    if playlist_track:
        db.session.delete(playlist_track)
        db.session.commit()
        return {
            'message': "Track removed from playlist",
            'statusCode': 200
        }, 200
    else:
        return {
            'errors': "Track not found in playlist",
            'statusCode': 404
        }, 404
