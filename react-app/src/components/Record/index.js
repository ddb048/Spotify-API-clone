import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsersPlaylistsThunk, getAllUsersTracksThunk, likeTrackThunk, unlikeTrackThunk } from "../../store/collection";

//put these thunks in dropdown component
import { addTracktoQueue, emptyQueueThunk, deleteTrackFromQueue, getQueueThunk } from "../../store/queue";
import { createPlaylistTrackThunk, deletePlaylistTrackThunk } from "../../store/playlist";
import RecordDropMenu from "../RecordDropMenu";
import './index.css'

const Record = ({ track }) => {
    const album = track.album
    // console.log(album, 'album from within record component')

    const [loaded, setLoaded] = useState(false);
    const [showLikeAlert, setShowLikeAlert] = useState(false);
    const [showUnlikeAlert, setShowUnlikeAlert] = useState(false);

    //put queue in seperate dropdown component
    const [showQueueAddAlert, setShowQueueAddAlert] = useState(false);
    const [showQueueRemoveAlert, setShowQueueRemoveAlert] = useState(false);
    const dispatch = useDispatch()

    const usersTracks = useSelector((state) => Object.values(state.collection.tracks))
    const usersPlaylists = useSelector((state) => state.collection.playlists)
    const queueTracks = useSelector((state) => Object.values(state.queue.queueTracks))
    // console.log(queueTracks, 'queueTracks in record')

    const handleLikeTrack = () => {
        dispatch(likeTrackThunk(track));
        setShowLikeAlert(true);
    };

    const handleAddToQueue = async () => {
        await dispatch(addTracktoQueue(track))
        await dispatch(getQueueThunk())
        setShowQueueAddAlert(true)
    }

    const handleRemoveFromQueue = async () => {
        await dispatch(deleteTrackFromQueue(track))
        await dispatch(getQueueThunk())
        setShowQueueRemoveAlert(true)
    }

    const handleUnlikeTrack = () => {
        dispatch(unlikeTrackThunk(track));
        setShowUnlikeAlert(true);
    }

    const handleTrackPlay = async (track) => {
        await dispatch(emptyQueueThunk())
        await dispatch(addTracktoQueue(track))
        await dispatch(getQueueThunk())
        setShowQueueAddAlert(true)
    }

    let hrs;
    let mins;
    let secs;

    const time = track.duration;

    const timeConverter = (time) => {
        hrs = ~~(time / 3600);
        mins = ~~((time % 3600) / 60);
        secs = ~~time % 60
    }

    timeConverter(time);

    useEffect(() => {
        if (setShowLikeAlert) {
            const timeout = setTimeout(() => setShowLikeAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showLikeAlert]);

    useEffect(() => {
        if (setShowUnlikeAlert) {
            const timeout = setTimeout(() => setShowUnlikeAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showUnlikeAlert]);

    useEffect(() => {
        if (setShowQueueAddAlert) {
            const timeout = setTimeout(() => setShowQueueAddAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showQueueAddAlert]);

    useEffect(() => {
        if (setShowQueueRemoveAlert) {
            const timeout = setTimeout(() => setShowQueueRemoveAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showQueueRemoveAlert]);

    useEffect(() => {
        (async () => {
            await dispatch(getAllUsersTracksThunk())
            await dispatch(getAllUsersPlaylistsThunk())
            await dispatch(getQueueThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);

    return (
        <>
            {loaded && (
                <div className="complete-record">
                    <div className="record-front-grouping">
                        <div className="record-front">
                            <span className="allow-pointer-events song-icon material-icons"
                                onClick={() => handleTrackPlay(track)}
                            >play_arrow</span>

                            <img className="record-track-image" src={album.album_cover} alt='track-album-cover' />
                        </div>
                        <div className="record-front-mid">
                            <div>{track.name}</div>
                            <div className="record-artist">{track.album.artist.name}</div>
                        </div>
                    </div>
                    <div className="record-center">
                        <div className="record-title">{track.album.title}</div>
                    </div>

                    <div className="record-back">
                        <div className="queue-container">
                            {queueTracks.find(queueTrack => queueTrack?.tracks?.id === +track.id) ?
                                <span
                                    className="allow-pointer-events song-icon material-icons inQueue"
                                    onClick={handleRemoveFromQueue}
                                >
                                    playlist_play
                                </span>
                                :
                                <span
                                    className="allow-pointer-events song-icon material-icons"
                                    onClick={handleAddToQueue}
                                >
                                    playlist_play
                                </span>}
                        </div>
                        <div className="like-container">
                            {usersTracks.find(userTrack => userTrack.id === +track.id) ?

                                (<span onClick={handleUnlikeTrack} className="material-symbols-outlined liked ">
                                    heart_minus
                                </span>)
                                :
                                (<span onClick={handleLikeTrack} className="material-symbols-outlined unliked">
                                    heart_plus
                                </span>)
                            }
                        </div>
                        <div className="dropdown-container">
                            <RecordDropMenu track={track} usersPlaylists={usersPlaylists} />
                        </div>
                    </div>

                </div>
            )}
            {showLikeAlert && (
                <div className='follow-alert'>Saved to your collection</div>
            )}
            {showUnlikeAlert && (
                <div className='unfollow-alert'>Removed from your collection</div>
            )}
            {showQueueAddAlert && (
                <div className='unfollow-alert'>Added to your Queue</div>
            )}
            {showQueueRemoveAlert && (
                <div className='unfollow-alert'>Removed from your Queue</div>
            )}
        </>
    )
}

export default Record;
