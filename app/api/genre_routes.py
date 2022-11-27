from flask import Blueprint
from app.models import Genre, db

genre_routes = Blueprint('genres', __name__)


#!SECTION - /api/genres/
@genre_routes.route('/')
def get_all_genres():
    genres = Genre.query.all()

    genreList = [genre.to_dict() for genre in genres]

    return {'genres': genreList}


#!SECTION - /api/genres/:genreId
@genre_routes.route('/<int:genreId>')
def get_one_genre(genreId):
    genre = Genre.query.get(int(genreId))
    if genre:
        return genre.to_dict(), 200
    else:
        return {
            'errors': 'genre not found',
            'Status Code': 404
        }, 404
