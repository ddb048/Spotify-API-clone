import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import './index.css'


const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [playlists, setPlaylists] = useState([]);
    const [myPlaylistNumber, setMyPlaylistNumber] = useState(1);

    const playlistsSelector = useSelector((state) => state.playlists);
    const sessionUser = useSelector((state) => state.session.user);


    let usersPlaylists;


    // useEffect(() => {
    //     dispatch(thunkGetPlaylists());
    // }, [dispatch]);

    // useEffect(() => {
    //     setPlaylists(Object.values(playlistsSelector));
    // }, [playlistsSelector]);


    if (sessionUser) {
        usersPlaylists =
            playlists &&
            playlists.filter((playlist) => playlist.user.id === sessionUser.id);
    }


    const userPlaylistNameArray = [];
    usersPlaylists?.map((playlists) =>
        userPlaylistNameArray.push(playlists.name)
    );

    let i = 1;

    while (userPlaylistNameArray.includes(`My Playlist #${i}`)) {
        i++;
    }
    useEffect(() => {
        setMyPlaylistNumber(i);
    }, [i]);

    const onSubmit = async (e) => {
        if (sessionUser) {
            e.preventDefault();
            setMyPlaylistNumber(i);

            const playlist = {
                name: `My Playlist #${myPlaylistNumber}`,
                description: `${sessionUser.username}'s Playlist`,
                cover_img_url: "",
            };
            // const newPlaylist = await dispatch(thunkAddPlaylist(playlist));
            // if (newPlaylist) {
            //     history.push(`/playlists/${newPlaylist.id}`);
            // }
        }
    };
    return (
        <div className="side-bar">
            <div className="side-bar-container">

                <div className="side-bar-links"></div>
                <NavLink className="sidebar-link" to="/" exact={true}>
                    <i className="fa fa-home" />
                    Home
                </NavLink>
                <NavLink className="sidebar-link" to="/search" exact={true}>
                    <i className="fa fa-search" />
                    Search
                </NavLink>
                <NavLink className="sidebar-link" to="/collection" exact={true}>
                    <i className="fa fa-music" />
                    Your Library
                </NavLink>

                {sessionUser && <div className="sidebar-link" onClick={onSubmit}>
                    <i className="fa fa-plus" />
                    Create Playlist
                </div>}


                <div className="side-bar-playlist-list">
                    {sessionUser &&
                        usersPlaylists.map((playlist) => (
                            <NavLink
                                className="sidebar-link sidebar-playlist-link"
                                to={`/playlists/${playlist.id}`}
                                key={playlist.id}
                            >
                                {playlist.name}
                            </NavLink>
                        ))}
                </div>


            </div>
        </div>
    );

}

export default SideBar
