from app.models import db, Track, environment, SCHEMA

def seed_tracks():
    # 1
    track1 = Track(
        name='Let You Down',
        duration=216,
        album_id=1,
        genre_id=5,
        artist_id=1)
    # 2
    track2 = Track(
        name='Time',
        duration=244,
        album_id=2,
        genre_id=5,
        artist_id=1)
    # 3
    track3 = Track(
        name='Story',
        duration=306,
        album_id=3,
        genre_id=5,
        artist_id=1)

    db.session.add(track1)
    db.session.add(track2)
    db.session.add(track3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tracks")

    db.session.commit()
