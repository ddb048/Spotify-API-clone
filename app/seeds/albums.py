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
    # 4
    album4 = Album(
        title='The Best of Whitney Houston 1992',
        release_date=1992,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/The+Best+of+Whitney+Houston+1992/Whitney_Houston_-_The_Bodyguard_-_The_Bodyguard__soundtrack__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=7,
        artist_id=2)
    # 5
    album5 = Album(
        title='Whitney 1987',
        release_date=1987,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/whitney+1987/Whitney__album__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=7,
        artist_id=2)
    # 6
    album6 = Album(
        title='Whitney Houston 1985',
        release_date=1985,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/whitney+houston+1985/Whitney_Houston__Self_Titled_-_Whitney_Houston__album__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=7,
        artist_id=2)
    # 7
    album7 = Album(
        title='Lemonade',
        release_date=2016,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Cursor_and_Beyonce_-_Lemonade__Official_Album_Cover__-_Lemonade__Beyonce%CC%81_album__-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=7,
        artist_id=3)
    # 8
    album8 = Album(
        title='Star Crossed',
        release_date=2021,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/golden+hour/Kacey_Musgraves_-_Golden_Hour_-_Golden_Hour__Kacey_Musgraves_album__-_Wikipedia.png',
        genre_id=10,
        artist_id=5)
    # 9
    album9 = Album(
        title='Golden Hour',
        release_date=2018,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/golden+hour/Kacey_Musgraves_-_Golden_Hour_-_Golden_Hour__Kacey_Musgraves_album__-_Wikipedia.png',
        genre_id=10,
        artist_id=5)
    # 10
    album10 = Album(
        title='Greatest Hits',
        release_date=2014,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/golden+hour/Kacey_Musgraves_-_Golden_Hour_-_Golden_Hour__Kacey_Musgraves_album__-_Wikipedia.png',
        genre_id=1,
        artist_id=6)
    # 11
    album11 = Album(
        title='Un Verano Sin Ti',
        release_date=2022,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Bad_Bunny_-_Un_Verano_Sin_Ti_-_Un_Verano_Sin_Ti_-_Wikipedia_%F0%9F%94%8A.png',
        genre_id=6,
        artist_id=7)
    # 12
    album12 = Album(
        title='Best of Beethoven',
        release_date=2022,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beethoven/best+of+beethoven/BEETHOVEN_-_Very_Best_of_Beethoven_-_Amazon_com_Music_%F0%9F%94%8A.png',
        genre_id=8,
        artist_id=8)
    # 13
    album13 = Album(
        title='Casual',
        release_date=2022,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/casual/Spotify_%E2%80%93_Casual.png',
        genre_id=3,
        artist_id=9)
    # 14
    album14 = Album(
        title='Naked in Manhattan',
        release_date=2022,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/naked+in+manhattan/Spotify_%E2%80%93_Naked_in_Manhattan.png',
        genre_id=3,
        artist_id=9)
    # 15
    album15 = Album(
        title='My Kink is Karma',
        release_date=2022,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/my+kink+is+karma/Spotify_%E2%80%93_My_Kink_is_Karma.png',
        genre_id=3,
        artist_id=9)
    # 16
    album16 = Album(
        title='California',
        release_date=2020,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/california/Spotify_%E2%80%93_California.png',
        genre_id=3,
        artist_id=9)
    # 17
    album17 = Album(
        title='Pink Pony Club',
        release_date=2020,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/pink+pony+club/pink_pony_club_album_cover_-_Google_Search_%F0%9F%94%8A.png',
        genre_id=3,
        artist_id=9)
    # 18
    album18 = Album(
        title='Good Hurt',
        release_date=2017,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/good+hurt/chappell_roan_school_nights_-_Google_Search.png',
        genre_id=3,
        artist_id=9)
    # 19
    album19 = Album(
        title='Love Me Anyway',
        release_date=2020,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/love+me+anyway/chappell_roan_love_me_anyway_-_Google_Search.png',
        genre_id=3,
        artist_id=9)
    # 20
    album20 = Album(
        title='Future Nostalgia',
        release_date=2020,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/dua+lipa/future+nostalgia/Spotify_%E2%80%93_Future_Nostalgia.png',
        genre_id=3,
        artist_id=10)
    # 21
    album21 = Album(
        title='Saves The World',
        release_date=2019,
        album_cover='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA__Saves_the_World_Album_Review___Pitchfork.png',
        genre_id=9,
        artist_id=4)

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.add(album8)
    db.session.add(album9)
    db.session.add(album10)
    db.session.add(album11)
    db.session.add(album12)
    db.session.add(album13)
    db.session.add(album14)
    db.session.add(album15)
    db.session.add(album16)
    db.session.add(album17)
    db.session.add(album18)
    db.session.add(album19)
    db.session.add(album20)
    db.session.add(album21)
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
