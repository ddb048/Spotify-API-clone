//*****************************TYPES************************* */
const GET_ARTIST = 'artists/GET_ARTIST';
const GET_ARTISTS = 'artists/GET_ARTISTS';
const GET_GENRES_ARTISTS = 'artists/GET_GENRES_ARTISTS';
const CLEAR_ARTISTS = 'artists/CLEAR'

//*****************************TYPES************************* */
const loadOneArtist = (artist) => ({
    type: GET_ARTIST,
    artist
});

const loadAllArtists = (artists) => ({
    type: GET_ARTISTS,
    artists
});

const loadGenresArtists = (genreArtists) => ({
    type: GET_GENRES_ARTISTS,
    genreArtists
});

export const clearArtists = () => ({
    type: CLEAR_ARTISTS
})

/**********************************THUNKS************************* */
export const getOneArtistThunk = (artistId) => async dispatch => {
    const response = await fetch(`/api/artists/${artistId}`);
    if (response.ok) {
        const artist = await response.json();
        dispatch(loadOneArtist(artist))
        return artist
    }
}

export const getAllArtistsThunk = () => async dispatch => {
    const response = await fetch('/api/artists');
    if (response.ok) {
        const artists = await response.json();
        dispatch(loadAllArtists(artists.artists))
        return artists.artists
    }
}

export const getAllGenreArtistsThunk = (genreId) => async dispatch => {
    const response = await fetch(`/api/genres/${genreId}/artists`)

    if (response.ok) {
        const artists = await response.json();
        dispatch(loadGenresArtists(artists.artists))
        return artists.artists
    }
}

/******************************REDUCER*************************** */

const initialState = {
    artists: {},
    OneArtist: {},
    GenreArtists: {}

};

const artistsReducer = (state = initialState, action) => {
    let newState = {}

    Object.freeze(state);
    switch (action.type) {
        case GET_ARTIST:
            newState.artists = { ...state.artists, [action.artist.id]: action.artist };
            newState.OneArtist = { ...action.artist };
            return newState

        case GET_ARTISTS:
            newState = { ...state }
            newState.artists = {}
            action.artists.forEach(artist => {
                newState.artists[artist.id] = artist
            });
            return newState

        case GET_GENRES_ARTISTS:
            newState = { ...state }
            newState.GenreArtists = {}
            action.genreArtists.forEach(artist => {
                newState.GenreArtists[artist.id] = artist
            });
            return newState

        case CLEAR_ARTISTS:
            newState = { ...state };
            newState.artists = {}
            newState.OneArtist = {}
            newState.GenreArtists = {}
            return newState;

        default:
            return state
    }
}

export default artistsReducer;
