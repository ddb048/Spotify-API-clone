import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllUsersTracksThunk, getAllUsersPlaylistsThunk } from '../../store/collection';
import { deletePlaylistTrackThunk, createPlaylistTrackThunk } from '../../store/playlist';
import './index.css'


const RecordDropMenu = ({ track, usersPlaylists }) => {
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false)
    const [showPlaylistAddMenu, setShowPlaylistAddMenu] = useState(false);
    const [showPlaylistRemoveMenu, setShowPlaylistRemoveMenu] = useState(false);
    const [showPlaylistAddAlert, setShowPlaylistAddAlert] = useState(false);
    const [showPlaylistRemoveAlert, setShowPlaylistRemoveAlert] = useState(false);

    console.log(usersPlaylists, "usersPlaylists from inside Record dropdown menu")

    const usersPlaylistArray = Object.values(usersPlaylists)

    const userPlaylistIdSet = new Set(Object.values(usersPlaylists).map(playlist => playlist.id))
    console.log(userPlaylistIdSet)

    const usersPlaylistsWithTrack = track.playlists.filter(playlist => userPlaylistIdSet.has(+playlist))
    console.log(usersPlaylistsWithTrack, "array of playlists Ids")

    const addTracktoPlaylist = (playlist) => {
        console.log(playlist, "value from addTracktoPlayist menu")
        dispatch(createPlaylistTrackThunk(playlist, track))

        setShowPlaylistAddAlert(true)
        setShowPlaylistAddMenu(false)

    };

    const removeTrackFromPlaylist = (playlist) => {
        console.log(playlist, "playlist from delete track from playlist")
        dispatch(deletePlaylistTrackThunk(playlist, track))

        setShowPlaylistRemoveAlert(true)
        setShowPlaylistRemoveMenu(false)

    }

    const handleClick = useCallback(() => {
        if (showPlaylistAddMenu) {
            setShowPlaylistAddMenu(false)
        }

        if (showPlaylistRemoveMenu) {
            setShowPlaylistRemoveMenu(false)
        }
    });

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick)
        };
    }, [showPlaylistAddMenu, showPlaylistRemoveMenu])


    useEffect(() => {
        if (setShowPlaylistAddAlert) {
            const timeout = setTimeout(() => setShowPlaylistAddAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showPlaylistAddAlert]);

    useEffect(() => {
        if (setShowPlaylistRemoveAlert) {
            const timeout = setTimeout(() => setShowPlaylistRemoveAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showPlaylistRemoveAlert]);

    useEffect(() => {
        (async () => {
            await dispatch(getAllUsersTracksThunk())
            await dispatch(getAllUsersPlaylistsThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch, showPlaylistAddAlert, showPlaylistRemoveAlert]);

    return (
        <>
            {loaded && (
                <div>
                    <p className='allow-pointer-events'>
                        <span onClick={() => setShowPlaylistAddMenu(true)}
                            className="allow-pointer-events material-icons" >playlist_add</span>
                    </p>
                    {showPlaylistAddMenu && (
                        <div className='allow-pointer-events add-to-playlist_dropdown'>
                            <div className='allow-pointer-events add-to-playlist_dropdown_options'>
                                {usersPlaylistArray.map(playlist =>
                                    <div
                                        key={playlist}
                                        value={playlist}
                                        onClick={() => addTracktoPlaylist(playlist)}
                                        className='allow-pointer-events add-to-playlist_dropdown_slot'>
                                        {playlist.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <p className='allow-pointer-events'>
                        <span onClick={() => setShowPlaylistRemoveMenu(true)}
                            className="allow-pointer-events material-icons" >playlist_remove</span>
                    </p>
                    {track.playlists.length ? showPlaylistRemoveMenu && (
                        <div className='allow-pointer-events remove-from-playlist_dropdown'>
                            <div className='allow-pointer-events remove-from-playlist_dropdown_options'>
                                {usersPlaylistsWithTrack.map(playlist =>
                                    <div
                                        key={playlist}
                                        value={playlist}
                                        onClick={() => removeTrackFromPlaylist(playlist)}
                                        className='allow-pointer-events remove-from-playlist_dropdown_slot'>
                                        {usersPlaylists[playlist].name}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) :

                        null}
                </div>
            )}
            {showPlaylistAddAlert && (
                <div className='follow-alert'>Added to your playlist</div>
            )}
            {showPlaylistRemoveAlert && (
                <div className='unfollow-alert'>Removed from your playlist</div>
            )}
        </>
    )

}

export default RecordDropMenu;
