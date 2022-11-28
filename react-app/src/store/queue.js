//*****************************TYPES************************* */
const ADD_TRACK_TO_QUEUE = 'queue/ADD_QUEUE';
const REMOVE_TRACK_FROM_QUEUE = 'queue/REMOVE_ONE_QUEUE';
const SKIP_TRACK_QUEUE = 'queue/SKIP_TRACK_QUEUE';
const ADD_PLAYLIST_TO_QUEUE = 'queue/ADD_PLAYLIST_QUEUE'
const ADD_TRACK_TO_TOP = 'queue/ADD_TOP_QUEUE'
const REMOVE_QUEUE = 'queue/REMOVE_QUEUE'

/*******************ACTION CREATORS**************** */

export const addTrack = (trackId) => ({
    type: ADD_TRACK_TO_QUEUE,
    trackId
});

export const removeTrack = (trackId, idx) => ({
    type: REMOVE_TRACK_FROM_QUEUE,
    trackId,
    idx
});

export const skipTrack = () => ({
    type: SKIP_TRACK_QUEUE
})

export const removeQueue = () => ({
    type: REMOVE_QUEUE
})

export const priorityAdd = (trackId) => ({
    type: ADD_TRACK_TO_TOP,
    trackId
})

export const addPlaylist = (playlist) => ({
    type: ADD_PLAYLIST_TO_QUEUE,
    payload: playlist
})



/******************************REDUCER*************************** */
const initialState = [];

export default function queueReducer(state = initialState, action) {
    Object.freeze(state)
    switch (action.type) {

        case ADD_TRACK_TO_QUEUE:
            return [...state, action.trackId];

        case REMOVE_TRACK_FROM_QUEUE:
            const sansState = [...state];
            const removeIdx = action.idx;
            sansState.splice(removeIdx, 1);
            return sansState;

        case ADD_PLAYLIST_TO_QUEUE:
            return [...action.payload];

        case SKIP_TRACK_QUEUE:
            const newState = [...state];
            newState.shift();
            return newState;

        case REMOVE_QUEUE:
            return [];

        default:
            return state;
    }
}
