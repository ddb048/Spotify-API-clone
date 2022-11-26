"""created models

Revision ID: 370a41351e26
Revises: 
Create Date: 2022-11-24 16:27:46.115651

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '370a41351e26'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('marketable', sa.Boolean(), nullable=True),
    sa.Column('birthdate', sa.DateTime(), nullable=False),
    sa.Column('gender', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('artists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.Column('artist_pic', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('preview_image', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('release_date', sa.Integer(), nullable=False),
    sa.Column('album_cover', sa.String(length=255), nullable=True),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.Column('artist_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tracks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.Column('artist_id', sa.Integer(), nullable=True),
    sa.Column('album_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('track_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['track_id'], ['tracks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_tracks',
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('track_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['track_id'], ['tracks.id'], ),
    sa.PrimaryKeyConstraint('playlist_id', 'track_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlist_tracks')
    op.drop_table('likes')
    op.drop_table('tracks')
    op.drop_table('follows')
    op.drop_table('albums')
    op.drop_table('playlists')
    op.drop_table('artists')
    op.drop_table('users')
    op.drop_table('genres')
    # ### end Alembic commands ###