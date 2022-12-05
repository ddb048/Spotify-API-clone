
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';
import Main_logo from '../../images/Main_logo.png'
import './index.css'

const NavBarTop = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser, "session user from NavBarTop")

  const dispatch = useDispatch()
  const history = useHistory()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='nav-button'>
        <NavLink to='/login' exact={true} className="nav-text">
          Login
        </NavLink>
        <NavLink className="nav-text" to="/signup" exact={true} >
          Sign Up
        </NavLink>
      </div>
    );
  }
  return (

    <div className='NavbarTop-Main'>
      <div className='nav-bar-left'>
        <NavLink to='/main' exact={true} className='logo'>
          <img className='logo-img' src={Main_logo} alt="Main Logo" />
        </NavLink>

      </div>

      <div className='nav-bar-right'>
        {loaded && sessionLinks}
      </div>


    </div>

  );
}

export default NavBarTop;
