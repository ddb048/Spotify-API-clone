import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneAlbumThunk } from '../../store/album';
import { getTracksByAlbumThunk } from '../../store/track';
import SideBar from '../Sidebar';
import Record from '../Record';
import './index.css'
import { emptyQueueThunk, addTracktoQueue, getQueueThunk } from '../../store/queue';
import { getAllUsersArtistsThunk } from '../../store/collection';


const AlbumDetail = () => {
    const { albumId } = useParams()
    const [loaded, setLoaded] = useState(false);
    const [showQueueTracksAlert, setShowQueueTracksAlert] = useState(false);
    const dispatch = useDispatch()
    const album = useSelector((state) => state.albums.OneAlbum)
    const albums = useSelector((state) => Object.values(state.albums.albums))
    const albumTracks = useSelector((state) => Object.values(state.tracks.AlbumTracks))
    const queue = useSelector((state) => Object.values(state.queue.queueTracks))

    const handleAddAllTrackstoQueue = async (albumTracks) => {

        await dispatch(emptyQueueThunk());
        await albumTracks.forEach(track => dispatch(addTracktoQueue(track)))
        await dispatch(getQueueThunk())
        await setShowQueueTracksAlert(true)

    }
    useEffect(() => {
        if (setShowQueueTracksAlert) {
            const timeout = setTimeout(() => setShowQueueTracksAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showQueueTracksAlert]);

    useEffect(() => {
        (async () => {

            await dispatch(getAllUsersArtistsThunk())
            await dispatch(getOneAlbumThunk(albumId))
            await dispatch(getTracksByAlbumThunk(albumId))
                .then(() => setLoaded(true))
        })();
    }, [dispatch, setShowQueueTracksAlert]);

    return (
        <>
            {loaded &&
                (<div className='fullview'>
                    <SideBar />
                    <div className='main-page-container'>

                        <div className='detail-header'>


                            <div className='detail_image_container'>

                                <img className="detail_image"
                                    src={album.album_cover}

                                    alt='Artist Img' />
                            </div>
                            <div className='detail-header-textblock-container'>
                                <div className='detail-type'>Album</div>
                                <div className='detail-title'>{album.title}</div>
                                <div className='detail-subtext-container'>

                                </div>
                            </div>
                        </div>


                        <div className='buttons-section'>
                            <div>
                                <span
                                    id="play_button"
                                    className="material-icons"
                                    onClick={() => handleAddAllTrackstoQueue(albumTracks)}
                                >
                                    play_circle_filled
                                </span>
                            </div>
                        </div>

                        <div className='track-table-details-container'>
                            {albumTracks.map(track => (

                                < div className='track-record' >
                                    <Record track={track} />
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
                )
            }
            {
                showQueueTracksAlert && (
                    <div className='unfollow-alert'>Tracks added to your Queue</div>
                )
            }
        </>
    )

}

export default AlbumDetail;
