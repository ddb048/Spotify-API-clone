import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { deletePlaylistTrackThunk, createPlaylistTrackThunk } from '../../store/playlist';

const RecordDropMenu = ({ track, usersPlaylists }) => {
    const dispatch = useDispatch();

    const [showPlaylistAddMenu, setShowPlaylistAddMenu] = useState(false);
    const [showPlaylistRemoveMenu, setShowPlaylistRemoveMenu] = useState(false);

    console.log(usersPlaylists, "usersPlaylists from inside Record dropdown menu")

    const usersPlaylistArray = Object.values(usersPlaylists)

    const userPlaylistIdSet = new Set(Object.values(usersPlaylists).map(playlist => playlist.id))
    console.log(userPlaylistIdSet)

    const usersPlaylistsWithTrack = track.playlists.filter(playlist => userPlaylistIdSet.has(+playlist))
    console.log(usersPlaylistsWithTrack, "array of playlists Ids")

    const addTracktoPlaylist = async (playlist) => {
        console.log(playlist.id, "value from addTracktoPlayist menu")
        const response = await dispatch(createPlaylistTrackThunk(playlist.id, track))

        if (response.ok) {
            setShowPlaylistAddMenu(false)
        }
    };

    const removeTrackFromPlaylist = async (playlistId) => {
        const response = await dispatch(deletePlaylistTrackThunk(playlistId, track))

        if (response.ok) {
            setShowPlaylistRemoveMenu(false)
        }
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


    return (
        <>
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
                {usersPlaylistsWithTrack.length > 0 ? showPlaylistRemoveMenu && (
                    <div className='allow-pointer-events remove-from-playlist_dropdown'>
                        <div className='allow-pointer-events remove-from-playlist_dropdown_options'>
                            {usersPlaylistsWithTrack.map(playlist =>
                                <div
                                    key={playlist}
                                    value={playlist}
                                    onClick={removeTrackFromPlaylist}
                                    className='allow-pointer-events remove-from-playlist_dropdown_slot'>
                                    {usersPlaylists[playlist].name}
                                </div>
                            )}
                        </div>
                    </div>
                ) :

                    null}

            </div>
        </>
    )

}

export default RecordDropMenu;
