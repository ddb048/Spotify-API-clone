from app.models import db, Genre, environment, SCHEMA

# Adds a demo genre, you can add other users here if you want
def seed_genres():
#    1
    rock = Genre(
        genre='Rock')
    # 2
    dance = Genre(
        genre='Dance')
    # 3
    pop = Genre(
        genre='Pop')
    # 4
    soul = Genre(
        genre='Soul')
    # 5
    rap = Genre(
        genre='Rap')
    # 6
    urbano = Genre(
        genre='Urbano')
    # 7
    r_and_b = Genre(
        genre='R&B')
    # 8
    classical = Genre(
        genre='Classical')
    # 9
    indie = Genre(
        genre='Indie')
    # 10
    country = Genre(
        genre='Country')


    db.session.add(rock)
    db.session.add(dance)
    db.session.add(pop)
    db.session.add(soul)
    db.session.add(rap)
    db.session.add(urbano)
    db.session.add(r_and_b)
    db.session.add(classical)
    db.session.add(indie)
    db.session.add(country)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_genres():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM genres")

    db.session.commit()
