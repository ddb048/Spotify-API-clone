from app.models import db, Queue_track, environment, SCHEMA

def seed_queue_tracks():
    # 1
    queue_track1 = Queue_track(
        queue_id=1,
        track_id=5)
    # 2
    queue_track2 = Queue_track(
        queue_id=2,
        track_id=5)
    # 3
    queue_track3 = Queue_track(
        queue_id=3,
        track_id=5)

    db.session.add(queue_track1)
    db.session.add(queue_track2)
    db.session.add(queue_track3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_queue_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.queue_tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM queue_tracks")

    db.session.commit()
