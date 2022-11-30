//*****************************TYPES************************* */
const GET_TRACK = 'tracks/GET_TRACK';
const GET_TRACKS = 'tracks/GET_TRACKS';
const GET_TRACKS_BY_GENRE = 'tracks/GET_TRACKS_BY_GENRE';
const GET_TRACKS_BY_ARTIST = 'tracks/GET_TRACKS_BY_ARTIST';
const GET_TRACKS_BY_ALBUM = 'tracks/GET_TRACKS_BY_ALBUM';


/*******************ACTION CREATORS**************** */
const loadOneTrack = (track) => ({
    type: GET_TRACK,
    track
});

const loadAllTracks = (tracks) => ({
    type: GET_TRACKS,
    tracks
})

const loadGenreTracks = (genreId) => ({
    type: GET_TRACKS_BY_GENRE,
    genreId
})

const loadArtistTracks = (artistId) => ({
    type: GET_TRACKS_BY_ARTIST,
    artistId
})

const loadAlbumTracks = (albumId) => ({
    type: GET_TRACKS_BY_ALBUM,
    albumId
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


/******************************REDUCER*************************** */
const initialState = {
    tracks: {},
    OneTrack: {}
};

const tracksReducer = (state = initialState, action) => {
    let newState = {}

    Object.freeze(state);
    switch (action.type) {
        case GET_TRACK:
            newState.tracks = { ...state.tracks, [action.track.id]: action.track };
            newState.oneTrack = { ...action.track };
            return newState
    }
}
