import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import { deleteTrackFromQueue, getQueueThunk } from "../../store/queue";
import { likeTrackThunk, unlikeTrackThunk } from "../../store/collection";
import { getAllUsersTracksThunk } from "../../store/collection";
import Small_logo from '../../images/Small_logo.png'
import './index.css'

const AudioBar = () => {
    const dispatch = useDispatch()
    const [mp3, setMp3] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [showLikeAlert, setShowLikeAlert] = useState(false);
    const [showUnlikeAlert, setShowUnlikeAlert] = useState(false);


    const queue = useSelector((state) => Object.values(state.queue.queueTracks))
    const usersTracks = useSelector((state) => Object.values(state.collection.tracks))
    // console.log(queue, "queue from audioBar component")
    let songs;

    useEffect(() => {
        if (queue.length) {
            setMp3(queue[0].tracks.source);
        }
    }, [queue]);

    useEffect(() => {

        if (mp3) {
            let music = document.querySelector("audio");
            music
                .play()
                .then(() => {
                    // console.log("working");
                })
                .catch((e) => {
                    // console.log("error");
                });
        }
    }, [mp3]);


    const updateQueueHead = async () => {
        await dispatch(deleteTrackFromQueue(queue[0].tracks));
        await dispatch(getQueueThunk())
    };

    const handleLikeTrack = () => {
        dispatch(likeTrackThunk(queue[0]));
        setShowLikeAlert(true);
    };

    const handleUnlikeTrack = () => {
        dispatch(unlikeTrackThunk(queue[0]));
        setShowUnlikeAlert(true);
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
            await dispatch(getQueueThunk())
                .then(() => setLoaded(true))
        })();
    }, [dispatch]);


    return (

        <>

            <div id="audio-controls-nav-bar_div">
                <div id="song-display_div">
                    {queue.length ? (
                        <img
                            id="audio-controls_img"
                            src={queue[0]?.tracks?.album?.album_cover}
                            alt="album img"
                        />
                    ) : (
                        <img
                            id="audio-controls_img"
                            src={Small_logo}
                            alt="album img"
                        />
                    )}
                    <div className="song-text">
                        {queue ? (
                            <p id="audio-controls_name">
                                {queue[0]?.tracks.name}
                            </p>
                        ) : (
                            <p id="audio-controls_name">Song Title</p>
                        )}
                        {queue ? (
                            <p id="audio-controls_album-title">
                                {queue[0]?.tracks.album.artist.name}
                            </p>
                        ) : (
                            <p id="audio-controls_album-title">Artist</p>
                        )}
                    </div>
                </div>
                <div className="controls">
                    <div id="audio-controls_div">
                        <audio
                            // controls
                            // autoplay
                            id="navbar-player"
                            controls={true}
                            controlsList="nodownload"
                            src={mp3}
                            accept={`*/`}
                        // onPlay={() => setIsPlaying(true)}
                        // onPause={() => setIsPlaying(false)}
                        ></audio>

                        <span id='next' onClick={updateQueueHead} className="material-symbols-outlined next">
                            skip_next
                        </span>
                        <NavLink
                            to="/queue"
                            className="queue-link"
                            activeClassName="queue-link-active"
                        >
                            <span className="material-icons queue-btn">
                                playlist_play
                            </span>
                        </NavLink>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AudioBar
