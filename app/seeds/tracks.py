from app.models import db, Track, environment, SCHEMA

def seed_tracks():
    # 1
    track1 = Track(
        name='Let You Down',
        duration=216,
        source='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/NF/Perception+2017/NF+-+Let+You+Down.mp3',
        album_id=1,
        genre_id=5,
        artist_id=1)
    # 2
    track2 = Track(
        name='Time',
        duration=244,
        source='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/NF/Perception+2017/NF+-+Let+You+Down.mp3',
        album_id=2,
        genre_id=5,
        artist_id=1)
    # 3
    track3 = Track(
        name='Story',
        duration=306,
        source='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/NF/Clouds+2021/NF+-+STORY.mp3',
        album_id=3,
        genre_id=5,
        artist_id=1)
    # 4
    track4 = Track(
        name='I Wanna Dance with Somebody (Who Loves Me)',
        duration=291,
        source='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/whitney+1987/I+Wanna+Dance+with+Somebody+(Who+Loves+Me).mp3',
        album_id=5,
        genre_id=2,
        artist_id=2)
    # 5
    track5 = Track(
        name='How Will I Know',
        duration=275,
        source='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/whitney+houston+1985/Whitney+Houston+-+How+Will+I+Know+(Official+Video).mp3',
        album_id=6,
        genre_id=7,
        artist_id=2)
    # 6
    track6 = Track(
        name='I Will Always Love You',
        duration=274,
        source='https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/The+Best+of+Whitney+Houston+1992/Whitney+Houston+-+I+Will+Always+Love+You+(Official+4K+Video).mp3',
        album_id=4,
        genre_id=4,
        artist_id=2)
    # 7
    track7 = Track(
        name="I'm Every Woman",
        duration=285,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/The+Best+of+Whitney+Houston+1992/Whitney+Houston+-+I'm+Every+Woman+(Official+Video).mp3",
        album_id=4,
        genre_id=7,
        artist_id=2)
    #8
    track8 = Track(
        name="My Love Is Your Love",
        duration=256,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/whitney+Houston/The+Best+of+Whitney+Houston+1992/Whitney+Houston+-+My+Love+Is+Your+Love+(Official+Video).mp3",
        album_id=4,
        genre_id=7,
        artist_id=2)
    #9
    track9 = Track(
        name="Hold Up",
        duration=221,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Beyonc%C3%A9+-+Hold+Up+(With+Lyrics).mp3",
        album_id=7,
        genre_id=7,
        artist_id=3)
    #10
    track10 = Track(
        name="Sorry",
        duration=265,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Beyonc%C3%A9+-+Sorry+(Video).mp3",
        album_id=7,
        genre_id=7,
        artist_id=3)
    #11
    track11 = Track(
        name="Formation",
        duration=287,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Beyonc%C3%A9+-+Formation+(Official+Video).mp3",
        album_id=7,
        genre_id=7,
        artist_id=3)
    #12
    track12 = Track(
        name="Don't Hurt Yourself",
        duration=193,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Beyonc%C3%A9+ft+Jack+White+-+Don't+Hurt+Yourself+(+Official+Music+Video+)+Pre+Promo.mp3",
        album_id=7,
        genre_id=7,
        artist_id=3)
    #13
    track13 = Track(
        name="All Night",
        duration=381,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Beyonc%C3%A9+-+All+Night+(Video).mp3",
        album_id=7,
        genre_id=7,
        artist_id=3)
    #14
    track14 = Track(
        name="Daddy Lessons",
        duration=288,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beyonce/lemonade/Daddy+Lessons.mp3",
        album_id=7,
        genre_id=10,
        artist_id=3)
    #15
    track15 = Track(
        name="Grow",
        duration=107,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/Grow.mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #16
    track16 = Track(
        name="Navy Blue",
        duration=240,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+-+Navy+Blue+(Audio).mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #17
    track17 = Track(
        name="Number One Fan",
        duration=205,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+-+Number+One+Fan.mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #18
    track18 = Track(
        name="Stayaway",
        duration=212,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+-+Stayaway.mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #19
    track19 = Track(
        name="What I Want",
        duration=246,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+-+What+I+Want+(Official+Video).mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #20
    track20 = Track(
        name="Who",
        duration=187,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+-+Who+(Official+Visual).mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #21
    track21 = Track(
        name="Taken",
        duration=242,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/muna/saves+the+world/MUNA+-+Taken+(Official+Video).mp3",
        album_id=21,
        genre_id=9,
        artist_id=4)
    #22
    track22 = Track(
        name="Can't Help Falling In Love",
        duration=168,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/star+crossed/Can't+Help+Falling+in+Love.mp3",
        album_id=8,
        genre_id=10,
        artist_id=5)
    #23
    track23 = Track(
        name="Cherry Blossom",
        duration=194,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/star+crossed/KACEY+MUSGRAVES+-+cherry+blossom+(official+lyric+video).mp3",
        album_id=8,
        genre_id=10,
        artist_id=5)
    #24
    track24 = Track(
        name="Good Wife",
        duration=241,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/star+crossed/KACEY+MUSGRAVES+-+good+wife+(official+lyric+video).mp3",
        album_id=8,
        genre_id=10,
        artist_id=5)
    #25
    track25 = Track(
        name="Simple Times",
        duration=177,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/star+crossed/KACEY+MUSGRAVES+-+simple+times+(official+lyric+video).mp3",
        album_id=8,
        genre_id=10,
        artist_id=5)
    #26
    track26 = Track(
        name="Star-Crossed",
        duration=199,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/star+crossed/KACEY+MUSGRAVES+-+star-crossed+(official+lyric+video).mp3",
        album_id=8,
        genre_id=10,
        artist_id=5)
    #27
    track27 = Track(
        name="Butterflies",
        duration=219,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/golden+hour/Kacey+Musgraves+-+Butterflies+(Official+Music+Video).mp3",
        album_id=9,
        genre_id=10,
        artist_id=5)
    #28
    track28 = Track(
        name="Rainbow",
        duration=214,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/kacey+Musgraves/golden+hour/Kacey+Musgraves+-+Rainbow+(Official+Music+Video).mp3",
        album_id=9,
        genre_id=10,
        artist_id=5)
    #29
    track29 = Track(
        name="Bohemian Rhapsody",
        duration=359,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_%E2%80%93_Bohemian_Rhapsody_Official_Video_Remaster.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #30
    track30 = Track(
        name="Another One Bites The Dust",
        duration=214,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_Another_One_Bites_The_Dust.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #31
    track31 = Track(
        name="Crazy Little Thing Called Love",
        duration=255,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_Crazy_Little_Thing_Called_Love.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #32
    track32 = Track(
        name="Don't Stop Me Now",
        duration=212,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_Don_t_Stop_Me_Now_Official_Video_.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #33
    track33 = Track(
        name="Killer Queen",
        duration=179,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_Killer_Queen.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #34
    track34 = Track(
        name="Somebody To Love",
        duration=309,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_Somebody_To_Love_Official_Video_.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #35
    track35 = Track(
        name="Death On Two Legs",
        duration=223,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen+-+Death+on+two+legs+(dedicated+to......)+(1975).mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #36
    track36 = Track(
        name="We Will Rock You",
        duration=174,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_We_Will_Rock_You.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #37
    track37 = Track(
        name="We Are The Champions",
        duration=186,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/queen/Queen_We_Are_The_Champions.mp3",
        album_id=10,
        genre_id=1,
        artist_id=6)
    #38
    track38 = Track(
        name="Efecto",
        duration=223,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Efecto.mp3",
        album_id=11,
        genre_id=6,
        artist_id=7)
    #39
    track39 = Track(
        name="Callaita",
        duration=250,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Callaita.mp3",
        album_id=11,
        genre_id=6,
        artist_id=7)
    #40
    track40 = Track(
        name="Neverita",
        duration=173,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Neverita.mp3",
        album_id=11,
        genre_id=6,
        artist_id=7)
    #41
    track41 = Track(
        name="Ojitos Lindos",
        duration=258,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Ojitos+Lindos.mp3",
        album_id=11,
        genre_id=6,
        artist_id=7)
    #42
    track42 = Track(
        name="Tarot",
        duration=237,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Tarot.mp3",
        album_id=11,
        genre_id=6,
        artist_id=7)
    #43
    track43 = Track(
        name="Tití Me Preguntó",
        duration=243,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/bad+bunny/Un+Verano+Sin+Ti+2022/Tit%C3%AD+Me+Pregunt%C3%B3.mp3",
        album_id=11,
        genre_id=6,
        artist_id=7)
    #44
    track44 = Track(
        name="Symphony No 7",
        duration=1800,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beethoven/best+of+beethoven/Beethoven_Symphony_No_7_Iv%C3%A1n_Fischer___Concer.mp3",
        album_id=12,
        genre_id=8,
        artist_id=8)
    #45
    track45 = Track(
        name="Für Elise",
        duration=173,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beethoven/best+of+beethoven/Ludwig_van_Beethoven_F%C3%BCr_Elise.mp3",
        album_id=12,
        genre_id=8,
        artist_id=8)
    #46
    track46 = Track(
        name="Moonlight Sonata",
        duration=328,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/beethoven/best+of+beethoven/Ludwig_van_Beethoven_Moonlight_Sonata_Adagio_So.mp3",
        album_id=12,
        genre_id=8,
        artist_id=8)
    #47
    track47 = Track(
        name="Casual",
        duration=240,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/casual/Chappell+Roan+-+Casual+(Official+Visualizer).mp3",
        album_id=13,
        genre_id=9,
        artist_id=9)
    #48
    track48 = Track(
        name="Naked In Manhattan",
        duration=213,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/naked+in+manhattan/Chappell+Roan+-+Naked+in+Manhattan+(Official+Music+Video).mp3",
        album_id=14,
        genre_id=9,
        artist_id=9)
    #49
    track49 = Track(
        name="My Kink Is Karma",
        duration=233,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/my+kink+is+karma/Chappell+Roan+-+My+Kink+is+Karma+(Official+Music+Video).mp3",
        album_id=15,
        genre_id=9,
        artist_id=9)
    #50
    track50 = Track(
        name="California",
        duration=210,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/california/Chappell+Roan+-+California+(Official+Lyric+Video).mp3",
        album_id=16,
        genre_id=9,
        artist_id=9)
    #51
    track51 = Track(
        name="Pink Pony Club",
        duration=282,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/pink+pony+club/Chappell+Roan+-+Pink+Pony+Club+(Lyrics).mp3",
        album_id=17,
        genre_id=9,
        artist_id=9)
    #52
    track52 = Track(
        name="Good Hurt",
        duration=196,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/good+hurt/Chappell+Roan+-+Good+Hurt+(Official+Music+Video).mp3",
        album_id=18,
        genre_id=9,
        artist_id=9)
    #53
    track53 = Track(
        name="Love Me Anyway",
        duration=233,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/Chappell+Roan/love+me+anyway/Chappell+Roan+-+Love+Me+Anyway+(Official+Lyric+Video).mp3",
        album_id=19,
        genre_id=9,
        artist_id=9)
    #54
    track54 = Track(
        name="Levitating",
        duration=320,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/dua+lipa/future+nostalgia/Dua+Lipa+-+Levitating+(Official+Lyrics+Video).mp3",
        album_id=20,
        genre_id=11,
        artist_id=10)
    #55
    track55 = Track(
        name="Hallucinate",
        duration=208,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/dua+lipa/future+nostalgia/Dua+Lipa+-+Hallucinate+(Official+Lyrics+Video).mp3",
        album_id=20,
        genre_id=3,
        artist_id=10)
    #56
    track56 = Track(
        name="Physical",
        duration=243,
        source="https://amplifybuckey.s3.us-west-2.amazonaws.com/mp3/dua+lipa/future+nostalgia/Dua+Lipa+-+Physical+(Official+Video).mp3",
        album_id=20,
        genre_id=3,
        artist_id=10)
    db.session.add(track1)
    db.session.add(track2)
    db.session.add(track3)
    db.session.add(track4)
    db.session.add(track5)
    db.session.add(track6)
    db.session.add(track7)
    db.session.add(track8)
    db.session.add(track9)
    db.session.add(track10)
    db.session.add(track11)
    db.session.add(track12)
    db.session.add(track13)
    db.session.add(track14)
    db.session.add(track15)
    db.session.add(track16)
    db.session.add(track17)
    db.session.add(track18)
    db.session.add(track19)
    db.session.add(track20)
    db.session.add(track21)
    db.session.add(track22)
    db.session.add(track23)
    db.session.add(track24)
    db.session.add(track25)
    db.session.add(track26)
    db.session.add(track27)
    db.session.add(track28)
    db.session.add(track29)
    db.session.add(track30)
    db.session.add(track31)
    db.session.add(track32)
    db.session.add(track33)
    db.session.add(track34)
    db.session.add(track35)
    db.session.add(track36)
    db.session.add(track37)
    db.session.add(track38)
    db.session.add(track39)
    db.session.add(track40)
    db.session.add(track41)
    db.session.add(track42)
    db.session.add(track43)
    db.session.add(track44)
    db.session.add(track45)
    db.session.add(track46)
    db.session.add(track47)
    db.session.add(track48)
    db.session.add(track49)
    db.session.add(track50)
    db.session.add(track51)
    db.session.add(track52)
    db.session.add(track53)
    db.session.add(track54)
    db.session.add(track55)
    db.session.add(track56)
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
