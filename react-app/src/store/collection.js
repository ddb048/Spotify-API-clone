//*****************************TYPES************************* */
const GET_USERS_PLAYLISTS = 'collection/GET_USERS_PLAYLISTS'
const GET_USERS_TRACKS = 'collection/GET_USERS_TRACKS'
const GET_USERS_ARTISTS = 'collection/GET_USERS_ARTISTS'
const FOLLOW_ARTIST = 'collection/FOLLOW_ARTIST'
const UNFOLLOW_ARTIST = 'collection/UNFOLLOW_ARTIST'
const LIKE_TRACK = 'collection/LIKE_TRACK'
const UNLIKE_TRACK = 'collection/UNLIKE_TRACK'

//*****************************TYPES************************* */

const loadUsersPlaylists = (playlists) => ({
    type: GET_USERS_PLAYLISTS,
    playlists
});

const loadUsersTracks = (tracks) => ({
    type: GET_USERS_TRACKS,
    tracks
});

const loadUsersArtists = (artists) => ({
    type: GET_USERS_ARTISTS,
    artists
})

const followArtist = artist => ({
    type: FOLLOW_ARTIST,
    artist
})

const unfollowArtist = artist => ({
    type: UNFOLLOW_ARTIST,
    artist
})

const likeTrack = track => ({
    type: LIKE_TRACK,
    track
})

const unlikeTrack = track => ({
    type: UNLIKE_TRACK,
    track
})


/**********************************THUNKS************************* */


export const getAllUsersPlaylistsThunk = () => async dispatch => {
    const response = await fetch('/api/collection')

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadUsersPlaylists(playlists.playlists))
        return playlists.playlists
    }
}

export const getAllUsersTracksThunk = () => async dispatch => {
    const response = await fetch('/api/collection/tracks')

    if (response.ok) {
        const tracks = await response.json();
        dispatch(loadUsersTracks(tracks.tracks))
        return tracks.tracks
    }
}

export const getAllUsersArtistsThunk = () => async dispatch => {
    const response = await fetch('/api/collection/artists')

    if (response.ok) {
        const artists = await response.json();
        dispatch(loadUsersArtists(artists.artists))
        return artists.artists
    }
}

export const followArtistThunk = (artist) => async dispatch => {
    const response = await fetch(`/api/collection/artists/${artist.id}/follow`)

    if (response.ok) {
        const follow = await response.json();
        dispatch(followArtist(follow))
        return follow
    }
}

export const unfollowArtistThunk = (artist) => async dispatch => {
    const response = await fetch(`/api/collection/artists/${artist.id}/unfollow`)

    if (response.ok) {
        const unfollow = await response.json();
        dispatch(unfollowArtist(unfollow))
        return unfollow
    }
}

export const likeTrackThunk = (track) => async dispatch => {
    const response = await fetch(`/api/collection/tracks/${track.id}/like`)

    if (response.ok) {
        const like = await response.json();
        dispatch(likeTrack(like))
        return like
    }
}

export const unlikeTrackThunk = (track) => async dispatch => {
    const response = await fetch(`/api/collection/tracks/${track.id}/unlike`)

    if (response.ok) {
        const unlike = await response.json();
        dispatch(unlikeTrack(unlike))
        return unlike
    }
}

/************************REDUCER************************** */

const initialState = {
    playlists: {},
    artists: {},
    tracks: {}
}

const collectionReducer = (state = initialState, action) => {
    let newState = {}

    Object.freeze(state);
    switch (action.type) {
        case GET_USERS_PLAYLISTS:
            newState = { ...state }
            newState.playlists = {}
            action.playlists.forEach(playlist => {
                newState.playlists[playlist.id] = playlist
            });
            return newState

        case GET_USERS_ARTISTS:
            newState = { ...state }
            newState.artists = {}
            action.artists.forEach(artist => {
                newState.artists[artist.id] = artist
            });
            return newState

        case GET_USERS_TRACKS:
            newState = { ...state }
            newState.tracks = {}
            action.tracks.forEach(track => {
                newState.tracks[track.id] = track
            });
            return newState

        case FOLLOW_ARTIST:
            newState.artists[action.artist.id] = action.artist
            return newState

        case UNFOLLOW_ARTIST:
            delete newState.artists[action.artist]
            return newState

        case LIKE_TRACK:
            newState.tracks[action.track.id] = action.track
            return newState

        case UNLIKE_TRACK:
            delete newState.tracks[action.track]
            return newState

        default:
            return state

    }
}


export default collectionReducer;
