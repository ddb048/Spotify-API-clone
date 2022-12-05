import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBarTop from './components/NavBarTop';
import SideBar from './components/Sidebar';
import AudioBar from './components/AudioBar';
import Main from './components/Main';
import ArtistDetail from './components/ArtistDetail';
import AlbumDetail from './components/AlbumDetail';
import PlaylistDetail from './components/playlistDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Queue from './components/Queue';
import Collection from './components/collection';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>

      <BrowserRouter>
        <NavBarTop loaded={loaded} />


        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/artists/:artistId'>
            <ArtistDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/albums/:albumId'>
            <AlbumDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/playlists/:playlistId'>
            <PlaylistDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/queue'  >
            <Queue />
          </ProtectedRoute>
          <ProtectedRoute path='/collection'  >
            <Collection />
          </ProtectedRoute>
          <Route path='/' exact={true} >
            <Main loaded={loaded} />
          </Route>
        </Switch>
        <AudioBar />
      </BrowserRouter>
    </>
  );
}

export default App;
