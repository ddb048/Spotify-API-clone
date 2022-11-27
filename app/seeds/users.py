from datetime import datetime
from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        birthdate=datetime(1987, 12, 1),
        marketable=False,
        gender="Non-binary")
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        birthdate=datetime(1976, 1, 31),
        marketable=True,
        gender="Male")
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        marketable=True,
        birthdate=datetime(1991, 6, 7),
        gender='Female')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
