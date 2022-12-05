//*****************************TYPES************************* */
const GET_PLAYLIST = 'playlists/GET_PLAYLIST'
const GET_PLAYLISTS = 'playlists/GET_PLAYLISTS'
const GET_PLAYLIST_TRACKS = 'playlists/GET_PLAYLIST_TRACKS'
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST'
const CREATE_PLAYLIST_TRACK = 'playlists/CREATE_PLAYLIST_TRACKS'
const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST'
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'
const DELETE_PLAYLIST_TRACK = 'playlists/DELETE_PLAYLIST_TRACK'

//*****************************TYPES************************* */
const loadOnePlaylist = (playlist) => ({
    type: GET_PLAYLIST,
    playlist
});

const loadAllPlaylists = (playlists) => ({
    type: GET_PLAYLISTS,
    playlists
});

const loadPlaylistTracks = (playlistTracks) => ({
    type: GET_PLAYLIST_TRACKS,
    playlistTracks
})

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist
})

const createPlaylistTrack = (playlistTrack) => ({
    type: CREATE_PLAYLIST_TRACK,
    playlistTrack
})

const updatePlaylist = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist
});

const deletePlaylist = (playlist) => ({
    type: DELETE_PLAYLIST,
    playlist
});

const deletePlaylistTrack = (playlistTrack) => ({
    type: DELETE_PLAYLIST_TRACK,
    playlistTrack
});

/**********************************THUNKS************************* */
export const getOnePlaylistThunk = (playlistId) => async dispatch => {
    const response = await fetch(`/api/playlists/${playlistId}`);
    if (response.ok) {
        const playlist = await response.json();
        dispatch(loadOnePlaylist(playlist))
        return playlist
    }
}

export const getAllPlaylistsThunk = () => async dispatch => {
    const response = await fetch('/api/playlists')

    if (response.ok) {
        const playlists = await response.json();
        (console.log('playlists from playlists thunk', playlists))
        dispatch(loadAllPlaylists(playlists.playlists))
        return playlists.playlists
    }
}


export const getAllPlaylistTracksThunk = (playlistId) => async dispatch => {
    const response = await fetch(`/api/playlists/${playlistId}/tracks`)

    if (response.ok) {
        const tracks = await response.json();
        dispatch(loadPlaylistTracks(tracks.tracks))
        return tracks.tracks
    }
}


export const createPlaylistThunk = newPlaylist => async dispatch => {
    console.log(newPlaylist, "newPlaylist from thunk")
    const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlaylist)
    });
    console.log(response, "response from createPlaylistThunk")
    if (response.ok) {
        const newPlaylist = await response.json();
        dispatch(createPlaylist(newPlaylist));
        return newPlaylist;

    } else if (response.status < 500) {

        const data = await response.json();
        console.log(data, "data from create playlist thunk")
        if (data.errors) {
            return data;
        }
    }
}

export const createPlaylistTrackThunk = (playlist, track) => async dispatch => {
    const response = await fetch(`/api/playlists/${playlist.id}/tracks/${track.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist, track)
    });

    if (response.ok) {
        const newPlaylistTrack = await response.json();
        dispatch(createPlaylistTrack(newPlaylistTrack));
        return newPlaylistTrack;

    } else if (response.status < 500) {

        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
}

export const updatePlaylistThunk = playlist => async dispatch => {
    console.log(playlist, "playlist from updatePlaylist thunk")
    const response = await fetch(`/api/playlists/${playlist.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist)
    });
    console.log(response, "response from playlist update thunk")
    if (response.ok) {

        const playlist = await response.json();
        console.log(playlist, "playlist from response ok in update thunk")
        dispatch(updatePlaylist(playlist))
        return playlist;

    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }
    }
}


export const deletePlaylistThunk = playlist => async dispatch => {
    const response = await fetch(`/api/playlists/${playlist.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(deletePlaylist(playlist));
        return playlist;
    }
}

export const deletePlaylistTrackThunk = (playlist, playlistTrack) => async dispatch => {
    const response = await fetch(`/api/playlists/playlist_track/${playlist}/${playlistTrack.id}`, {
        method: 'DELETE'
    });
    console.log(response, "response from thunk")
    if (response.ok) {

        const playlist_track = await response.json();
        console.log(playlist_track, "playlist_track from thunk")
        console.log(playlistTrack, "playlistTrack from thunk")
        dispatch(deletePlaylistTrack(playlistTrack.id));
        return playlist_track;
    }
}

/************************REDUCER************************** */

const initialState = {
    playlists: {},
    OnePlaylist: {},
    PlaylistTracks: {}

}

const playlistReducer = (state = initialState, action) => {
    let newState = {}

    Object.freeze(state);
    switch (action.type) {
        case GET_PLAYLIST:
            newState = { ...state }
            newState.playlists = { ...state.playlists, [action.playlist.id]: action.playlist };
            newState.OnePlaylist = { ...action.playlist };
            return newState

        case GET_PLAYLISTS:
            newState = { ...state }
            newState.playlists = {}
            action.playlists.forEach(playlist => {
                newState.playlists[playlist.id] = playlist
            });
            return newState

        case GET_PLAYLIST_TRACKS:
            let idx = 0;
            newState = { ...state }
            newState.PlaylistTracks = {}
            action.playlistTracks.forEach(playlistTrack => {
                newState.PlaylistTracks[playlistTrack.id] = playlistTrack
            });
            return newState

        case CREATE_PLAYLIST:
            newState = { ...state }
            newState.playlists[action.playlist.id] = action.playlist
            return newState

        case CREATE_PLAYLIST_TRACK:
            newState = { ...state }
            newState.PlaylistTracks[action.playlistTrack] = action.playlistTrack
            return newState

        case UPDATE_PLAYLIST:
            newState = { ...state }
            newState.playlists[action.playlist.id] = action.playlist

        case DELETE_PLAYLIST:
            newState = { ...state }
            delete newState.playlists[action.playlist]
            return newState

        case DELETE_PLAYLIST_TRACK:
            newState = { ...state, PlaylistTracks: { ...state.PlaylistTracks } }
            delete newState.PlaylistTracks[action.playlistTrack];
            return newState

        default:
            return state

    }
}

export default playlistReducer;
