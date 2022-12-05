import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getAllPlaylistsThunk } from "../../store/playlist";
import CreatePlaylistForm from "../CreatePlaylistModal";
import './index.css'


const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [playlists, setPlaylists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [myPlaylistNumber, setMyPlaylistNumber] = useState(1);

    const playlistSelector = useSelector((state) => state.playlists);
    const sessionUser = useSelector((state) => state.session.user);

    console.log(showModal, "setShowModal from SideBar")
    let usersPlaylists;


    useEffect(() => {
        dispatch(getAllPlaylistsThunk());
    }, [dispatch]);

    useEffect(() => {
        setPlaylists(Object.values(playlistSelector));
    }, [playlistSelector]);


    if (sessionUser) {
        usersPlaylists =
            playlists &&
            playlists.filter((playlist) => playlist.user_id === sessionUser.id);
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

        }
    };
    return (
        <div className="side-bar">
            <div className="side-bar-container">

                <div className="side-bar-links">
                    <NavLink className="sidebar-link" to="/main" exact={true}>
                        <i className="fa fa-home" />
                        Home
                    </NavLink>
                    <NavLink className="sidebar-link" to="/collection" exact={true}>
                        <i className="fa fa-music" />
                        Your Collection
                    </NavLink>

                    {sessionUser && <div className="sidebar-link" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus" />

                        Create Playlist
                    </div>}
                    {showModal &&
                        <Modal onClose={() => setShowModal(false)} >
                            <CreatePlaylistForm setShowModal={setShowModal} />
                        </Modal>}
                </div>

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
