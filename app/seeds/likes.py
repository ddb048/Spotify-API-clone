from app.models import db, environment, SCHEMA
from ..models.like import Like

def seed_likes():
    # 1
    like1 = Like(
        track_id=1,
        user_id=1,
       )
    # 2
    like2 = Like(
        track_id=2,
        user_id=2,
       )
    # 3
    like3 = Like(
        track_id=3,
        user_id=3,
       )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
