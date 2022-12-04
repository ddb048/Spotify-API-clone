import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsersPlaylistsThunk, getAllUsersTracksThunk, likeTrackThunk, unlikeTrackThunk } from "../../store/collection";

//put these thunks in dropdown component
import { addTrack, priorityAdd, removeTrack } from "../../store/queue";
import { createPlaylistTrackThunk, deletePlaylistTrackThunk } from "../../store/playlist";
import RecordDropMenu from "../RecordDropMenu";
import './index.css'

const Record = ({ track }) => {
    const album = track.album

    const [loaded, setLoaded] = useState(false);
    const [showLikeAlert, setShowLikeAlert] = useState(false);
    const [showUnlikeAlert, setShowUnlikeAlert] = useState(false);

    //put queue in seperate dropdown component
    const [showQueueAlert, setShowQueueAlert] = useState(false);
    const dispatch = useDispatch()

    const usersTracks = useSelector((state) => Object.values(state.collection.tracks))
    const usersPlaylists = useSelector((state) => state.collection.playlists)

    const handleLikeTrack = () => {
        dispatch(likeTrackThunk(track));
        setShowLikeAlert(true);
    };

    const handleAddToQueue = () => {
        dispatch(addTrack(track))
        setShowQueueAlert(true)
    }

    const handleUnlikeTrack = () => {
        dispatch(unlikeTrackThunk(track));
        setShowUnlikeAlert(true);
    }

    const handleTrackPlay = () => {
        dispatch(priorityAdd(track))
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
        if (setShowQueueAlert) {
            const timeout = setTimeout(() => setShowQueueAlert(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [showQueueAlert]);

    useEffect(() => {
        (async () => {
            await dispatch(getAllUsersTracksThunk())
            await dispatch(getAllUsersPlaylistsThunk())
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
                                onClick={handleTrackPlay}
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
                        <div className="add-to-queue">
                            <span
                                className="allow-pointer-events song-icon material-icons"
                                onClick={handleAddToQueue}
                            >
                                playlist_play
                            </span>
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
            {showQueueAlert && (
                <div className='unfollow-alert'>Added to your Queue</div>
            )}
        </>
    )
}

export default Record;
