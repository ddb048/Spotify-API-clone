import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import queueReducer from './queue';
import tracksReducer from './track';
import albumsReducer from './album';
import artistsReducer from './artist';
import playlistReducer from './playlist';
import collectionReducer from './collection';

const rootReducer = combineReducers({
  session: sessionReducer,
  queue: queueReducer,
  tracks: tracksReducer,
  albums: albumsReducer,
  artists: artistsReducer,
  playlists: playlistReducer,
  collection: collectionReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
