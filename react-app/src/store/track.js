//*****************************TYPES************************* */
const GET_TRACK = 'tracks/GET_TRACK';
const GET_TRACKS = 'tracks/GET_TRACKS';
const GET_TRACKS_BY_GENRE = 'tracks/GET_TRACKS_BY_GENRE';
const GET_TRACKS_BY_ARTIST = 'tracks/GET_TRACKS_BY_ARTIST';
const GET_TRACKS_BY_ALBUM = 'tracks/GET_TRACKS_BY_ALBUM';
const CLEAR_TRACKS = 'tracks/CLEAR'

/*******************ACTION CREATORS**************** */
const loadOneTrack = (track) => ({
    type: GET_TRACK,
    track
});

const loadAllTracks = (tracks) => ({
    type: GET_TRACKS,
    tracks
})

const loadGenreTracks = (genreTracks) => ({
    type: GET_TRACKS_BY_GENRE,
    genreTracks
})

const loadArtistTracks = (artistTracks) => ({
    type: GET_TRACKS_BY_ARTIST,
    artistTracks
})

const loadAlbumTracks = (albumTracks) => ({
    type: GET_TRACKS_BY_ALBUM,
    albumTracks
})

export const clearTracks = () => ({
    type: CLEAR_TRACKS
})
/**********************************THUNKS************************* */
export const getOneTrackThunk = (trackId) => async dispatch => {
    const response = await fetch(`/api/tracks/${trackId}`);
    if (response.ok) {
        const track = await response.json();
        dispatch(loadOneTrack(track))
        return track
    }
}

export const getAllTracksThunk = () => async dispatch => {
    const response = await fetch('/api/tracks')

    if (response.ok) {
        const tracks = await response.json();
        dispatch(loadAllTracks(tracks.tracks));
        return tracks.tracks
    }
}

export const getTracksByGenreThunk = (genreId) => async dispatch => {
    const response = await fetch(`/api/tracks/genres/${genreId}`);
    if (response.ok) {
        const tracks = await response.json();
        dispatch(loadGenreTracks(tracks.tracks));
        return tracks.tracks
    }
}


export const getTracksByArtistThunk = (artistId) => async dispatch => {
    const response = await fetch(`/api/tracks/artists/${artistId}`);
    if (response.ok) {
        const tracks = await response.json();
        dispatch(loadArtistTracks(tracks.tracks));
        return tracks.tracks
    }
}


export const getTracksByAlbumThunk = (albumId) => async dispatch => {
    const response = await fetch(`/api/track/albums/${albumId}`);
    if (response.ok) {
        const tracks = await response.json();
        dispatch(loadAlbumTracks(tracks.tracks));
        return tracks.tracks
    }
}
/******************************REDUCER*************************** */
const initialState = {
    tracks: {},
    OneTrack: {},
    GenreTracks: {},
    ArtistTracks: {},
    AlbumTracks: {}

};

const tracksReducer = (state = initialState, action) => {
    let newState = {}

    Object.freeze(state);
    switch (action.type) {
        case GET_TRACK:
            newState.tracks = { ...state.tracks, [action.track.id]: action.track };
            newState.OneTrack = { ...action.track };
            return newState

        case GET_TRACKS:
            newState = { ...state }
            newState.tracks = {}
            action.tracks.forEach(track => {
                newState.tracks[track.id] = track
            });
            return newState

        case GET_TRACKS_BY_GENRE:
            newState = { ...state }
            newState.GenreTracks = {}
            action.genreTracks.forEach(track => {
                newState.GenreTracks[track.id] = track
            });
            return newState

        case GET_TRACKS_BY_ARTIST:
            newState = { ...state }
            newState.ArtistTracks = {}
            action.artistTracks.forEach(track => {
                newState.ArtistTracks[track.id] = track
            });
            return newState

        case GET_TRACKS_BY_ALBUM:
            newState = { ...state }
            newState.AlbumTracks = {}
            action.albumTracks.forEach(track => {
                newState.AlbumTracks[track.id] = track
            });
            return newState

        case CLEAR_TRACKS:
            newState = { ...state };
            newState.tracks = {}
            newState.GenreTracks = {}
            newState.ArtistTracks = {}
            newState.AlbumTracks = {}
            return newState;

        default:
            return state
    }
}

export default tracksReducer;
