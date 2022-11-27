from app.models import db, Playlist, environment, SCHEMA

def seed_playlists():
    # 1
    playlist1 = Playlist(
        name='My Happy Mix',
        preview_image='https://amplifybuckey.s3.us-west-2.amazonaws.com/Q-cord-logos-1.png',
        description='I made this mix to cheer myself up',
        user_id=1,
       )
    # 2
    playlist2 = Playlist(
        name='Hot Girl Summer Music',
        preview_image='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/casual/pink_pony_club_album_cover_-_Google_Search_%F0%9F%94%8A.png',
        description='Our playlist for our beach trips! Such a fun time!',
        user_id=3,
       )
    # 3
    playlist3 = Playlist(
        name='Monday',
        preview_image="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/golden+hour/Kacey_Musgraves_-_Golden_Hour_-_Golden_Hour__Kacey_Musgraves_album__-_Wikipedia.png",
        description="kickin off monday right",
        user_id=2,
       )

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlists")

    db.session.commit()
