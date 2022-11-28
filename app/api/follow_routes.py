from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Playlist, Playlist_track, Track, Album, Artist, Genre, db, User
from ..models.follow import Follow
from ..models.like import Like
from ..forms.follows_form import Follows
from ..forms.likes_form import Likes
from .auth_routes import validation_errors_to_error_messages


follow_and_likes_routes = Blueprint('follow', __name__)

#SECTION - GET followed artists /api/collection/artists
@follow_and_likes_routes.route('/artists')
@login_required
def get_followed_artists():
    userId = current_user.id
    all_artists = Artist.query.all()
    list_of_artists = [artist.to_dict() for artist in all_artists]

    response = []
    for artist in list_of_artists:
        for follows in artist['follows']:
            if follows['user']['id'] == userId:
                response.append(artist)
    return {'artists': response}, 200




#SECTION - POST follow artist /api/collection/artists/:artistId/<action>
@follow_and_likes_routes.route('/artists/<int:artistId>/<action>')
@login_required
def follow_artist(artistId, action):
    artist = Artist.query.filter_by(id=artistId).first()
    if artist:
        if action == 'follow':
            current_user.follow_artist(artist)
            db.session.commit()
            return {"message": "Artist added to your Library"}, 200
        if action == 'unfollow':
            current_user.unfollow_artist(artist)
            db.session.commit()
            return {"message": "Artist removed from your library"}, 200
    else:
        return {"errors": "Artist not currently in your Library",
                "statusCode": 404}, 404




# #SECTION - POST followed artist /api/collection/artists
# @follow_and_likes_routes.route('/artists', methods=["POST"])
# @login_required
# def follow_artist():
#     form = Follows()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         follow = Follow()
#         form.populate_obj(follow)
#         follow.user_id = current_user.id
#         db.session.add(follow)
#         db.session.commit()

#         return follow.to_dict(), 200
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400




# #SECTION - DELETE followed artist /api/collection/artists/:followId
# @follow_and_likes_routes.route('/artists/<int:followId>', methods=['DELETE'])
# @login_required
# def unfollow_artist(followId):
#     follow = Follow.query.get(int(followId))
#     if follow:
#         db.session.delete(follow)
#         db.session.commit()
#         return {
#             'message': 'You no longer Follow this Artist',
#             'statusCode': 302
#         }, 302
#     else:
#         return {
#             'errors': 'You do not currently follow this Artist',
#             'statusCode': 404
#         }, 404



#SECTION - GET liked tracks
@follow_and_likes_routes.route('/tracks')
@login_required
def get_liked_tracks():
    userId = current_user.id
    all_tracks = Track.query.all()
    list_of_tracks = [track.to_dict() for track in all_tracks]

    response = []
    for track in list_of_tracks:
        for likes in track['likes']:
            if likes['user']['id'] == userId:
                response.append(track)
    return {'tracks': response}, 200





#SECTION - POST liked track /api/collection/tracks/:trackId/<action>
@follow_and_likes_routes.route('/tracks/<int:trackId>/<action>')
@login_required
def like_track(trackId, action):
    track = Track.query.filter_by(id=trackId).first()
    if track:
        if action == 'like':
            current_user.like_track(track)
            db.session.commit()
            return {"message": "Track added to your Library"}, 200
        if action == 'unlike':
            current_user.unlike_track(track)
            db.session.commit()
            return {"message": "Track removed from your library"}, 200
    else:
        return {"errors": "Track not currently in your Library",
                "statusCode": 404}, 404
