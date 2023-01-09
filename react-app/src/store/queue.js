//*****************************TYPES************************* */
const LOAD_QUEUE = 'queue/LOAD_QUEUE'
const ADD_TRACK_TO_QUEUE = 'queue/ADD_QUEUE';
const REMOVE_TRACK_FROM_QUEUE = 'queue/REMOVE_ONE_QUEUE';
const SKIP_TRACK_QUEUE = 'queue/SKIP_TRACK_QUEUE';
const ADD_PLAYLIST_TO_QUEUE = 'queue/ADD_PLAYLIST_QUEUE'
const ADD_TRACK_TO_TOP = 'queue/ADD_TOP_QUEUE'
const REMOVE_QUEUE = 'queue/REMOVE_QUEUE'

/*******************ACTION CREATORS**************** */
const loadQueue = (queue) => ({
    type: LOAD_QUEUE,
    queue
});

const addTrack = (track) => ({
    type: ADD_TRACK_TO_QUEUE,
    track
});

export const removeTrack = (track) => ({
    type: REMOVE_TRACK_FROM_QUEUE,
    track
});

export const skipTrack = () => ({
    type: SKIP_TRACK_QUEUE
})

const removeQueue = () => ({
    type: REMOVE_QUEUE,
    queue: {}
})

export const priorityAdd = (trackId) => ({
    type: ADD_TRACK_TO_TOP,
    trackId
})

export const addPlaylist = (playlist) => ({
    type: ADD_PLAYLIST_TO_QUEUE,
    payload: playlist
})

/**********************************THUNKS************************* */
export const getQueueThunk = () => async dispatch => {
    const response = await fetch('/api/queue/tracks')
    if (response.ok) {
        const queue = await response.json();
        dispatch(loadQueue(queue.Queue))
        return queue.Queue
    }
}

export const addTracktoQueue = (track) => async dispatch => {
    const response = await fetch(`/api/queue/tracks/${track.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(track)
    });

    if (response.ok) {
        const newQueueTrack = await response.json();
        dispatch(addTrack(track))
        return newQueueTrack;

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
}

export const deleteTrackFromQueue = (track) => async dispatch => {
    const response = await fetch(`/api/queue/tracks/${track.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const queueTrack = await response.json();
        dispatch(removeTrack(track));
        return queueTrack
    }
}

export const emptyQueueThunk = () => async dispatch => {
    const response = await fetch('/api/queue/tracks', {
        method: 'DELETE'
    });

    if (response.ok) {
        const queue = await response.json();
        dispatch(removeQueue());
        return queue
    }
}

/******************************REDUCER*************************** */
const initialState = {
    queueTracks: {}
};

export default function queueReducer(state = initialState, action) {
    let newState = {}

    Object.freeze(state)
    switch (action.type) {

        case LOAD_QUEUE:
            newState.queueTracks = {}
            action.queue.forEach(queueTrack => {
                newState.queueTracks[queueTrack.id] = queueTrack
            });
            return newState


        case ADD_TRACK_TO_QUEUE:
            newState = { ...state }
            newState.queueTracks[action.track.id] = action.track
            return newState

        case REMOVE_TRACK_FROM_QUEUE:
            newState = { ...state }
            delete newState.queueTracks[action.track.id]
            return newState

        case REMOVE_QUEUE:
            newState = { ...state }
            newState.queueTracks = action.queue
            return newState

        default:
            return state;
    }
}
