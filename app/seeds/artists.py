from app.models import db, Artist, environment, SCHEMA

def seed_artists():
    # 1
    artist1 = Artist(
        name='NF',
        genre_id=5,
        artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Spotify_%E2%80%93_NF.png',
        description='NF is the stage name of Michigan rapper and composer Nate Feuerstein, who emerged with his debut album, Mansion , in 2015.')
    # 2
    artist2 = Artist(
        name='Whitney Houston',
        genre_id=7,
        artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/_1__Facebook.png',
        description='Whitney Houston was inarguably one of the biggest pop stars of all time. Her accomplishments as a hitmaker were extraordinary.')
    # 3
    artist3 = Artist(
            name='Beyonce',
            genre_id=7,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Spotify_%E2%80%93_RENAISSANCE.png',
            description="A multifaceted superstar by any measure, Beyoncé rose to fame in the late '90s as the central member of pop-R&B group , and the following decade embarked on a multi-platinum, record-breaking solo career with Dangerously in Love (2003)")

    db.session.add(artist1)
    db.session.add(artist2)
    db.session.add(artist3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM artists")

    db.session.commit()
