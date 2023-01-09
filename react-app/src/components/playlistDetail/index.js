import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getOneAlbumThunk } from '../../store/album';
import { getTracksByAlbumThunk } from '../../store/track';
import SideBar from '../Sidebar';
import Record from '../Record';
import './index.css'
import UpdatePlaylistForm from '../UpdatePlaylistModal';
import { emptyQueueThunk, addTracktoQueue, getQueueThunk } from '../../store/queue';
import { getAllUsersArtistsThunk, getAllUsersTracksThunk } from '../../store/collection';
import { getAllPlaylistTracksThunk, getOnePlaylistThunk } from '../../store/playlist';

const PlaylistDetail = () => {
    const [showUpdateModal, setUpdateShowModal] = useState(false);
    const { playlistId } = useParams()
    const [loaded, setLoaded] = useState(false);
    const [showQueueTracksAlert, setShowQueueTracksAlert] = useState(false);
    const dispatch = useDispatch()

    // console.log(playlistId, "playlistid from playlist detail")

    const usersPlaylists = useSelector((state) => Object.values(state.collection.playlists))
    const playlist = useSelector((state) => state.playlists.OnePlaylist)
    // console.log(playlist, "playlist from playlist Detail")
    let playlistTracks = useSelector((state) => state.playlists.PlaylistTracks)

    useEffect(() => {
        (async () => {

            await dispatch(getAllPlaylistTracksThunk(playlistId))
            await dispatch(getOnePlaylistThunk(playlistId))
            await dispatch(getAllUsersTracksThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch, setShowQueueTracksAlert]);

    if (playlistTracks) {
        playlistTracks = Object.values(playlistTracks)
    } else {
        return null
    }

    const handleAddAllTrackstoQueue = async (playlistTracks) => {

        await dispatch(emptyQueueThunk());
        await playlistTracks.forEach(track => dispatch(addTracktoQueue(track)))
        await dispatch(getQueueThunk())
        await setShowQueueTracksAlert(true)

    }



    return (
        <>
            {loaded && (
                <div className='fullview'>
                    <SideBar />
                    <div className='main-page-container'>
                        <div className='detail-header'>



                            <div className='detail_image_container'>
                                <img className="detail_image"
                                    src={playlist.preview_image}

                                    alt='Artist Img' />
                            </div>
                            <div className='detail-header-textblock-container'>
                                <div className='detail-type'>Playlist</div>
                                <div className='detail-title'>{playlist.name}</div>
                                <div className='detail-subtext-container'>
                                    {playlist.description}
                                </div>
                            </div>
                        </div>
                        <div className='buttons-section'>
                            <div className='buttons'>
                                <span
                                    id="play_button"
                                    className="material-icons"
                                    onClick={() => handleAddAllTrackstoQueue(playlistTracks)}
                                >
                                    play_circle_filled
                                </span>
                                {usersPlaylists.find(playlist => playlist.id === +playlistId) ?
                                    (<span onClick={() => (setUpdateShowModal(true))} className="material-symbols-outlined elipsis">
                                        more_horiz
                                    </span>)
                                    :
                                    null}
                                {showUpdateModal && (
                                    <Modal onClose={() => setUpdateShowModal(false)}>
                                        <UpdatePlaylistForm
                                            setUpdateShowModal={setUpdateShowModal}
                                            playlist={playlist}
                                        />
                                    </Modal>
                                )}
                            </div>



                        </div>
                        <div className='track-table-details-container'>
                            {playlistTracks.map(track => (

                                < div className='track-record' >
                                    <Record track={track} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default PlaylistDetail;
