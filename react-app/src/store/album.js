//*****************************TYPES************************* */
const GET_ALBUM = 'albums/GET_ALBUM';
const GET_ALBUMS = 'albums/GET_ALBUMS';
const GET_ARTISTS_ALBUMS = 'albums/GET_ARTISTS_ALBUMS';
const GET_GENRES_ALBUMS = 'albums/GET_GENRES_ALBUMS';
const CLEAR_ALBUMS = 'albums/CLEAR'

//*****************************TYPES************************* */
const loadOneAlbum = (album) => ({
    type: GET_ALBUM,
    album
});

const loadAllAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums
});

const loadArtistsAlbums = (artistAlbums) => ({
    type: GET_ARTISTS_ALBUMS,
    artistAlbums
});

const loadGenresAlbums = (genreAlbums) => ({
    type: GET_GENRES_ALBUMS,
    genreAlbums
});

export const clearAlbums = () => ({
    type: CLEAR_ALBUMS
})

/**********************************THUNKS************************* */
export const getOneAlbumThunk = (albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`);
    if (response.ok) {
        const album = await response.json();
        dispatch(loadOneAlbum(album))
        return album
    }
}

export const getAllAlbumsThunk = () => async dispatch => {
    const response = await fetch('/api/albums')

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAllAlbums(albums.albums))
        return albums.albums
    }
}

export const getAlbumsByGenreThunk = (genreId) => async dispatch => {
    const response = await fetch(`/api/genres/${genreId}/albums`)

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadGenresAlbums(albums.albums))
        return albums.albums
    }
}

export const getAlbumsByArtistThunk = (artistId) => async dispatch => {
    const response = await fetch(`/api/artists/${artistId}/albums`)

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadArtistsAlbums(albums.albums))
        return albums.albums
    }
}

/******************************REDUCER*************************** */
const initialState = {
    albums: {},
    OneAlbum: {},
    GenreAlbums: {},
    ArtistAlbums: {}

};

const albumsReducer = (state = initialState, action) => {
    let newState = {}

    Object.freeze(state);
    switch (action.type) {
        case GET_ALBUM:
            newState.albums = { ...state.albums, [action.album.id]: action.album };
            newState.OneAlbum = { ...action.album };
            return newState

        case GET_ALBUMS:
            newState = { ...state }
            newState.albums = {}
            action.albums.forEach(album => {
                newState.albums[album.id] = album
            });
            return newState

        case GET_ARTISTS_ALBUMS:
            newState = { ...state }
            newState.ArtistAlbums = {}
            action.artistAlbums.forEach(album => {
                newState.ArtistAlbums[album.id] = album
            });
            return newState

        case GET_GENRES_ALBUMS:
            newState = { ...state }
            newState.GenreAlbums = {}
            action.genreAlbums.forEach(album => {
                newState.GenreAlbums[album.id] = album
            });
            return newState

        case CLEAR_ALBUMS:
            newState = { ...state };
            newState.albums = {}
            newState.GenreAlbums = {}
            newState.ArtistAlbums = {}
            newState.OneAlbum = {}
            return newState;

        default:
            return state
    }

}

export default albumsReducer;
