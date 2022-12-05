from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import Queue, Queue_track, Track, db

queue_routes = Blueprint('queue', __name__)

# SECTION - GET queue by current User /api/queue
@queue_routes.route('')
@login_required
def user_queue():
    userId = current_user.id
    queue = Queue.query.filter_by(user_id=int(userId)).first()
    if queue:
        return queue.to_dict(), 200
    else:
        return {
            'errors': 'queue not found',
            'Status Code': 404
        }, 404

# SECTION - Get all tracks by queueId /api/queue/tracks
@queue_routes.route('/tracks')
@login_required
def get_queue_tracks():
    queue = user_queue()
    if queue:
        queue_tracks=Queue_track.query.filter_by(queue_id=int(queue[0]['id'])).all()
        trackslist = []
        for track in queue_tracks:
            trackslist.append(track.to_dict())
        return {'Queue': trackslist}, 200



# SECTION - POST track to queue queueId /api/queue/tracks/:trackId
@queue_routes.route('/tracks/<int:trackId>', methods=['POST'])
@login_required
def post_queue_tracks(trackId):
    queue = user_queue()
    if queue:
        queue_track=Queue_track(queue_id=queue[0]['id'], track_id=trackId)
        db.session.add(queue_track)
        db.session.commit()

        return queue_track.to_dict(), 200

    else: return {'errors': 'queue not found'}, 404


# SECTION - DELETE track from queue queueId /api/queue/tracks/:trackId
@queue_routes.route('/tracks/<int:trackId>', methods=['DELETE'])
@login_required
def delete_queue_tracks(trackId):
    queue = user_queue()
    if queue:
        queue_track = Queue_track.query.filter_by(queue_id=queue[0]['id'], track_id=int(trackId)).first()
        if queue_track:
            db.session.delete(queue_track)
            db.session.commit()
            return {
                'message': 'Track removed from queue',
                'statusCode': 200
            }, 200
        else:
            return {
                'errors': 'track not in queue',
                'statusCode': 404
            }, 404
    else:
        return {
            'errors': 'queue not found',
            'statusCode': 404
        }, 404

# SECTION - DELETE all tracks to queue queueId /api/queue/tracks
@queue_routes.route('/tracks', methods=['DELETE'])
@login_required
def delete_all_queue_tracks():
    queue = user_queue()
    if queue:
        queue_tracks = Queue_track.query.filter_by(queue_id=queue[0]['id']).all()
        if queue_tracks:
            for queue_track in queue_tracks:
                db.session.delete(queue_track)
                db.session.commit()
            return {
                'message': 'Queue emptied',
                'statusCode': 200
            }, 200
        else:
            return {
                'errors': 'queue is empty',
                'statusCode': 404
            }, 404
    else:
        return {
            'errors': 'queue not found',
            'statusCode': 404
        }, 404
