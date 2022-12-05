import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersPlaylistsThunk, getAllUsersTracksThunk, getAllUsersArtistsThunk } from '../../store/collection';
import PlaylistCard from '../PlaylistCard';
import ArtistCard from '../ArtistCard';
import Record from '../Record';
import SideBar from '../Sidebar';
import './index.css'

const Collection = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const tracks = useSelector((state) => Object.values(state.collection.tracks))
    const playlists = useSelector((state) => Object.values(state.collection.playlists))
    const artists = useSelector((state) => Object.values(state.collection.artists))


    useEffect(() => {
        (async () => {
            await dispatch(getAllUsersArtistsThunk())
            await dispatch(getAllUsersPlaylistsThunk())
            await dispatch(getAllUsersTracksThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);

    return (
        <>
            {loaded &&
                (<div className='fullview'>
                    <SideBar />
                    <div className='main-page-container'>
                        <div className='main-selector-container'>
                            <h2 className='section-title'>Tracks</h2>
                            <div className='section-div'>
                                <div className='track-table-details-container'>
                                    {tracks.map(track => (
                                        < div className='track-record' >
                                            <Record track={track} />
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <h2 className='section-title'>Playlists</h2>
                            <div className='section-div'>
                                <div className='card-container'>
                                    {playlists.map(playlist => (
                                        <div className='playlist-card' key={playlist}>
                                            <PlaylistCard playlist={playlist} />
                                        </div>

                                    ))}
                                </div>
                            </div>

                            <h2 className='section-title'>Artists</h2>
                            <div className='section-div'>
                                <div className='card-container'>
                                    {artists.map(artist => (
                                        <div className='artist-card' key={artist}>
                                            <ArtistCard artist={artist} />
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                )}
        </>
    )

}

export default Collection;
