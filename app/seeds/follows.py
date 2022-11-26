from app.models import db, Follow, environment, SCHEMA

def seed_follows():
    # 1
    follow1 = Follow(
        artist_id=3,
        user_id=1,
       )
    # 2
    follow2 = Follow(
        artist_id=3,
        user_id=2,
       )
    # 3
    follow3 = Follow(
        artist_id=3,
        user_id=3,
       )

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM follows")

    db.session.commit()
