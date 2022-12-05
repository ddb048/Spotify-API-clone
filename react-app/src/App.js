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
import Splash from './components/Splash';
import User from './components/User';
import { authenticate } from './store/session';
import SignupFormPage from './components/SignupFormPage';

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
          <Route path='/signup' exact={true}>
            <SignupFormPage />
          </Route>
          <Route path='/' exact={true}>
            <Splash />
          </Route>
          <ProtectedRoute path='/artists/:artistId'>
            <ArtistDetail />
            <AudioBar />
          </ProtectedRoute>
          <ProtectedRoute path='/albums/:albumId'>
            <AlbumDetail />
            <AudioBar />
          </ProtectedRoute>
          <ProtectedRoute path='/playlists/:playlistId'>
            <PlaylistDetail />
            <AudioBar />
          </ProtectedRoute>
          <ProtectedRoute path='/queue'  >
            <Queue />
            <AudioBar />
          </ProtectedRoute>
          <ProtectedRoute path='/collection'  >
            <Collection />
            <AudioBar />
          </ProtectedRoute>
          <ProtectedRoute path='/main' exact={true} >
            <Main loaded={loaded} />
            <AudioBar />
          </ProtectedRoute>
        </Switch>


      </BrowserRouter>
    </>
  );
}

export default App;
