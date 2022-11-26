from app.models import db, Album, environment, SCHEMA

def seed_albums():
    # 1
    album1 = Album(
        title='Perception',
        release_date=2017,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/NF/Perception+2017/Nf_perception_album_cover_-_Perception__NF_album__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=5,
        artist_id=1)
    # 2
    album2 = Album(
        title='The Search',
        release_date=2019,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/NF/The+Search+2019/NF_-_The_Search_-_The_Search__NF_album__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=5,
        artist_id=1)
    # 3
    album3 = Album(
             title='Clouds',
        release_date=2021,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/NF/Clouds+2021/Cursor_and_NF_Clouds__The_Mixtape__album_cover_-_Clouds__The_Mixtape__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=5,
        artist_id=1)

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
