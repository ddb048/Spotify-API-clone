from app.models import db, Queue, environment, SCHEMA

def seed_queue():
    # 1
    queue1 = Queue(
        user_id=1)
    # 2
    queue2 = Queue(
        user_id=2)
    # 3
    queue3 = Queue(
        user_id=3)

    db.session.add(queue1)
    db.session.add(queue2)
    db.session.add(queue3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_queue():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.queue RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM queue")

    db.session.commit()
