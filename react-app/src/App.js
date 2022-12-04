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
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
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
          <Route path='/artists/:artistId'>
            <ArtistDetail />
          </Route>
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
