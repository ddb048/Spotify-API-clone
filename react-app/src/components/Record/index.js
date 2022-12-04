import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsersPlaylistsThunk, getAllUsersTracksThunk, likeTrackThunk, unlikeTrackThunk } from "../../store/collection";

//put these thunks in dropdown component
import { addTrack, priorityAdd, removeTrack } from "../../store/queue";
import { createPlaylistTrackThunk, deletePlaylistTrackThunk } from "../../store/playlist";
import RecordDropMenu from "../RecordDropMenu";

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

    const handleUnlikeTrack = () => {
        dispatch(unlikeTrackThunk(track));
        setShowUnlikeAlert(true);
    }

    const handleTrackPlay = () => {
        dispatch(priorityAdd(track))
    }

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
        (async () => {
            await dispatch(getAllUsersTracksThunk())
            await dispatch(getAllUsersPlaylistsThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);

    return (
        <>
            {loaded && (
                <>
                    <span className="allow-pointer-events song-icon material-icons"
                        onClick={handleTrackPlay}
                    >play_arrow</span>

                    <img className="record-track-image" src={album.album_cover} alt='track-album-cover' />
                    <div>{track.name}</div>
                    <div>{track.album.artist.name}</div>
                    <div>{track.album.title}</div>
                    <div>{Math.abs((track.duration) / 60)}:{(track.duration % 60)}</div>

                    {usersTracks.find(userTrack => userTrack.id === +track.id) ?
                        <span onClick={handleLikeTrack} className="material-symbols-outlined-unliked">
                            favorite
                        </span>
                        :
                        <span onClick={handleUnlikeTrack} className="material-symbols-outlined-liked">
                            favorite
                        </span>}

                    <RecordDropMenu track={track} usersPlaylists={usersPlaylists} />
                </>
            )}
            {showLikeAlert && (
                <div className='follow-alert'>Saved to your collection</div>
            )}
            {showUnlikeAlert && (
                <div className='unfollow-alert'>Removed from your collection</div>
            )}
        </>
    )
}

export default Record;
