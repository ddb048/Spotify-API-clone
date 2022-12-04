import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumsByArtistThunk } from '../../store/album';
import { getTracksByArtistThunk } from '../../store/track';
import AlbumCard from '../AlbumCard';
import SideBar from '../Sidebar';
import Record from '../Record';
import './index.css'
import { getOneArtistThunk } from '../../store/artist';
import { followArtistThunk, unfollowArtistThunk, getAllUsersArtistsThunk } from '../../store/collection';

const ArtistDetail = () => {
    const { artistId } = useParams()
    const [loaded, setLoaded] = useState(false);
    const [showFollowAlert, setShowFollowAlert] = useState(false);
    const [showUnfollowAlert, setShowUnfollowAlert] = useState(false);
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    // console.log(user, "user from ArtistDetail")

    const usersArtists = useSelector((state) => Object.values(state.collection.artists))
    // console.log(usersArtists, "usersArtists")
    const artist = useSelector((state) => state.artists.OneArtist)
    const albums = useSelector((state) => Object.values(state.albums.ArtistAlbums))
    const artistTracks = useSelector((state) => Object.values(state.tracks.ArtistTracks))
    console.log(artistTracks, "artistTracks from artist Details page")


    const handleAddFollow = () => {
        console.log(artist, "artist from handlefollow")
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
        (async () => {
            await dispatch(getAllUsersArtistsThunk())
            await dispatch(getOneArtistThunk(artistId))
            await dispatch(getAlbumsByArtistThunk(artistId))
            await dispatch(getTracksByArtistThunk(artistId))
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);

    return (
        <>
            {loaded &&
                (<div className='fullview'>
                    <SideBar />
                    <div className='main-page-container'>
                        <div className='detail-header'>
                            <div className='detail_image_container'>
                                <img className="detail_image"
                                    src={artist.artist_pic}

                                    alt='Artist Img' />
                            </div>
                            <div className='detail-header-textblock-container'>
                                <div className='detail-type'>Artist</div>
                                <div className='detail-title'>{artist.name}</div>
                                <div className='detail-subtext-container'>

                                </div>
                            </div>
                        </div>
                        <div className='buttons-section'>

                            <span
                                id="play_button"
                                className="material-icons"
                                onClick={null}
                            >
                                play_circle_filled
                            </span>

                            {usersArtists.find(artist => artist.id === +artistId) ?
                                <button className='follow-button'
                                    onClick={handleUnfollow}>Following</button>
                                :
                                <button className='unfollow-button'
                                    onClick={handleAddFollow}>Follow</button>}


                        </div>
                        <div className='track-table'>
                            <p className='track-title'>Title</p>
                            <p className='track-artist'>Artist</p>
                            <p className='track-album'>Album</p>
                            <p className='track-duration'>Duration</p>
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
        </>
    )
}

export default ArtistDetail;
