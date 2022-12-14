import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylistsThunk } from '../../store/playlist';
import { getAllArtistsThunk } from '../../store/artist';
import { getAllAlbumsThunk } from '../../store/album';
import PlaylistCard from '../PlaylistCard';
import ArtistCard from '../ArtistCard';
import AlbumCard from '../AlbumCard';
import SideBar from '../Sidebar';
import Footer from '../Footer';
import './index.css'

const Main = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const albums = useSelector((state) => Object.values(state.albums.albums))
    const playlists = useSelector((state) => Object.values(state.playlists.playlists))
    const artists = useSelector((state) => Object.values(state.artists.artists))


    useEffect(() => {
        (async () => {
            await dispatch(getAllArtistsThunk())
            await dispatch(getAllPlaylistsThunk())
            await dispatch(getAllAlbumsThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);

    if (artists) {
    }

    return (
        <>
            {loaded &&
                (<div className='fullview'>
                    <SideBar />
                    <div className='main-page-container'>
                        <div className='main-selector-container'>
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
                            <h2 className='section-title'>Albums</h2>
                            <div className='section-div'>
                                <div className='card-container'>
                                    {albums.map(album => (
                                        <div className='playlist-card' key={album}>
                                            <AlbumCard album={album} />
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


                            <div className="section-title">
                                <a href='https://github.com/ddb048'>
                                    <i className="fab fa-github"></i>
                                </a>Created by David Burch</div>
                            <div className="section-div">

                                <div className="tech">
                                    JavaScript * CSS * React * Redux * Express * Sequelize * PostgreSQL
                                </div>
                            </div>




                        </div>

                    </div>
                </div>
                )}
        </>
    )
}

export default Main;
