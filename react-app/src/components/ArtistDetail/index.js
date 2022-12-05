import React, { useEffect, useState } from 'react';
import Color from 'color-thief-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumsByArtistThunk } from '../../store/album';
import { getTracksByArtistThunk } from '../../store/track';
import AlbumCard from '../AlbumCard';
import SideBar from '../Sidebar';
import Record from '../Record';
import './index.css'
import { getOneArtistThunk } from '../../store/artist';
import { emptyQueueThunk, addTracktoQueue, getQueueThunk } from '../../store/queue';
import { followArtistThunk, unfollowArtistThunk, getAllUsersArtistsThunk } from '../../store/collection';

const ArtistDetail = () => {
    const { artistId } = useParams()
    const [loaded, setLoaded] = useState(false);
    const [showFollowAlert, setShowFollowAlert] = useState(false);
    const [showQueueTracksAlert, setShowQueueTracksAlert] = useState(false);
    const [showUnfollowAlert, setShowUnfollowAlert] = useState(false);
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    // console.log(user, "user from ArtistDetail")

    const usersArtists = useSelector((state) => Object.values(state.collection.artists))
    // console.log(usersArtists, "usersArtists")
    const artist = useSelector((state) => state.artists.OneArtist)
    let albums = useSelector((state) => state.albums.ArtistAlbums)
    const queue = useSelector((state) => Object.values(state.queue.queueTracks))
    const artistTracks = useSelector((state) => Object.values(state.tracks.ArtistTracks))
    console.log(artistTracks, "artistTracks from artist Details page")


    console.log(albums, "albums from ArtistDetail")

    const handleAddAllTrackstoQueue = async (artistTracks) => {
        console.log(artistTracks, "artistTracks from inside queue handling")

        await dispatch(emptyQueueThunk());
        await artistTracks.forEach(track => dispatch(addTracktoQueue(track)))
        await dispatch(getQueueThunk())
        await setShowQueueTracksAlert(true)

    }




    const handleAddFollow = () => {
        // console.log(artist, "artist from handlefollow")
        dispatch(followArtistThunk(artist))
        setShowFollowAlert(true)

    }

    const handleUnfollow = () => {
        dispatch(unfollowArtistThunk(artist))
        setShowUnfollowAlert(true)
    }

    useEffect(() => {
        if (setShowFollowAlert) {
            const timeout = setTimeout(() => setShowFollowAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showFollowAlert]);

    useEffect(() => {
        if (setShowUnfollowAlert) {
            const timeout = setTimeout(() => setShowUnfollowAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showUnfollowAlert]);

    useEffect(() => {
        if (setShowQueueTracksAlert) {
            const timeout = setTimeout(() => setShowQueueTracksAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showQueueTracksAlert]);

    let imgSrc = artist.artist_pic;

    useEffect(() => {
        (async () => {

            await dispatch(getAllUsersArtistsThunk())
            await dispatch(getOneArtistThunk(artistId))
            await dispatch(getAlbumsByArtistThunk(artistId))
            await dispatch(getTracksByArtistThunk(artistId))
                .then(() => setLoaded(true))
        })();
    }, [dispatch, setShowQueueTracksAlert]);

    if (albums) {
        albums = Object.values(albums)
    } else {
        return null
    }

    const Loading = () => <div>Loading...</div>;
    return (
        <>
            {loaded &&
                (<div className='fullview'>
                    <SideBar />
                    <div className='main-page-container'>
                        <Color src={imgSrc} crossOrigin="anonymous" format='hex'>
                            {({ data, loading }) => {
                                if (loading) return <Loading />
                                return (
                                    <div className='detail-header' crossOrigin="anonymous" style={{ backgroundColor: { data } }}>



                                        <div className='detail_image_container'>
                                            {data}
                                            <img className="detail_image"
                                                src={imgSrc}

                                                alt='Artist Img' />
                                        </div>
                                        <div className='detail-header-textblock-container'>
                                            <div className='detail-type'>Artist</div>
                                            <div className='detail-title'>{artist.name}</div>
                                            <div className='detail-subtext-container'>

                                            </div>
                                        </div>
                                    </div>)
                            }}
                        </Color>
                        <div className='buttons-section'>
                            <div class>
                                <span
                                    id="play_button"
                                    className="material-icons"
                                    onClick={() => handleAddAllTrackstoQueue(artistTracks)}
                                >
                                    play_circle_filled
                                </span>
                            </div>
                            {usersArtists.find(artist => artist.id === +artistId) ?
                                <button className='follow-button'
                                    onClick={handleUnfollow}>FOLLOWING</button>
                                :
                                <button className='unfollow-button'
                                    onClick={handleAddFollow}>FOLLOW</button>}


                        </div>

                        <div className='track-table-details-container'>
                            {artistTracks.map(track => (

                                < div className='track-record' >
                                    <Record track={track} />
                                </div>
                            ))}
                        </div>

                        <h2 className='section-title'>Albums</h2>
                        <div className='section-div'>
                            <div className='card-container'>
                                {albums.map(album => (
                                    <div className='playlist-card' key={album.id}>
                                        <AlbumCard album={album} />
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            {
                showFollowAlert && (
                    <div className='follow-alert'>Saved to your collection</div>
                )
            }
            {
                showUnfollowAlert && (
                    <div className='unfollow-alert'>Removed from your collection</div>
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

export default ArtistDetail;
