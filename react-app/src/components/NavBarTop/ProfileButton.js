import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import upload from "../../images/upload.png";
import downArrow from '../../images/down-arrow.png';
import profile from '../../images/profile.png';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };
    //removed your groups and events ADD BACK LATER
    return (
        <>

            <div className="profile-button" onClick={openMenu}>
                <div className="profile-menu">
                    <img className="profile-pic" src={profile} alt="profile image" />
                    <img className="profile-menu-button" src={showMenu ? upload : downArrow} alt='arrows' />
                </div>

            </div>

            <div className="profile-dropdown" id={showMenu ? 'open' : 'closed'}>
                <div className="user-email">{user.email}</div>

                <div onClick={logout}>Log out</div>
            </div>
        </>
    );
}

export default ProfileButton;
