from app.models import db, Artist, environment, SCHEMA

def seed_artists():
    # 1
    artist1 = Artist(
        name='NF',
        genre_id=5,
        artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Bad_Bunny+artist-photo.png',
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
    # 4
    artist4 = Artist(
            name='Muna',
            genre_id=9,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+artist-photo.png',
            description="What other band could have stamped the forsaken year of 2021 with spangles and pom-poms, could have made you sing (and maybe even believe) that 'Life is so fun, life is so fun,' during what may well have been the most uneasy stretch of your life?")
    # 5
    artist5 = Artist(
            name='Kacy Musgraves',
            genre_id=10,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/Kacey_Musgraves+arist-photo.png',
            description="Kacey Musgraves’ new album, star-crossed, is a bold, empowering, and extremely personal series of songs that displays the six-time GRAMMY Award winner's continued growth as one of the finest singer-songwriters of our time.")
    # 6
    artist6 = Artist(
            name='Queen',
            genre_id=1,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen+arist-photo.png',
            description="Few bands embodied the fearless creativity and attitude of 1970s rock like Queen.")
    # 7
    artist7 = Artist(
            name='Bad Bunny',
            genre_id=6,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Bad_Bunny+artist-photo.png',
            description="Bad Bunny is a young urban music singer, rapper and producer originally from Puerto Rico. This artist has demonstrated his overwhelming power, influence and demand with completely sold-out concerts all over Europe, Latin America and the U.S.")
    # 8
    artist8 = Artist(
            name='Ludwig van Beethoven',
            genre_id=8,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beethoven/Ludwig_van_Beethoven.png',
            description="The events of Beethoven's life are the stuff of Romantic legend, evoking images of the solitary creator shaking his fist at Fate and finally overcoming it through a supreme effort of creative will.")
    # 9
    artist9 = Artist(
            name='Chappell Roan',
            genre_id=3,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/Chappell_Roan+artist-photo.png',
            description="Currently rhinestoning a cowgirl hat or something *✲☆⋆(˘ᴗ˘)")
    # 10
    artist10 = Artist(
            name='Dua Lipa',
            genre_id=3,
            artist_pic='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/dua+lipa/Dua_Lipa+artist-photo.png',
            description="Global pop superstar Dua Lipa released Future Nostalgia, her #1 UK sophomore album, this year to worldwide acclaim. It is one of the best reviewed albums of 2020 and debuted in the top 5 of the Billboard 200 Album Chart.")


    db.session.add(artist1)
    db.session.add(artist2)
    db.session.add(artist3)
    db.session.add(artist4)
    db.session.add(artist5)
    db.session.add(artist6)
    db.session.add(artist7)
    db.session.add(artist8)
    db.session.add(artist9)
    db.session.add(artist10)
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
