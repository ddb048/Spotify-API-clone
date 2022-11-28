from app.models import db, Playlist_track, environment, SCHEMA

def seed_playlist_tracks():
    # 1
    list1 = Playlist_track(
        playlist_id=1,
        track_id=1,
       )
    # 2
    list2 = Playlist_track(
        playlist_id=2,
        track_id=2,
       )
    # 3
    list3 = Playlist_track(
        playlist_id=3,
        track_id=3,
       )

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlist_tracks")

    db.session.commit()
