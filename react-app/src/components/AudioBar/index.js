import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import Small_logo from '../../images/Small_logo.png'
import './index.css'

const AudioBar = () => {
    const [mp3, setMp3] = useState("");
    const [buffer, setBuffer] = useState(false);

    const queue = useSelector((state) => state.queue);
    let songs;

    // useEffect(() => {
    //     if (queue.length) {
    //         setMp3(songs[queue[0]]?.source);
    //     }
    // }, [queue, songs]);

    // useEffect(() => {

    //     if (songs[queue[0]]?.source) {
    //         let music = document.querySelector("audio");
    //         music
    //             .play()
    //             .then(() => {
    //                 // console.log("working");
    //             })
    //             .catch((e) => {
    //                 // console.log("error");
    //             });
    //     }
    // }, [mp3]);

    const bufferFunc = () => {
        setMp3(
            "https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/500-milliseconds-of-silence.mp3"
        );
        setBuffer(true);
    };

    // const updateQueueHead = () => {
    // 	dispatch(moveToNextSong());
    // };

    // useEffect(() => {
    //     if (buffer) {
    //         dispatch(moveToNextSong());
    //         setBuffer(false);
    //     }
    // }, [buffer, dispatch]);

    return (
        <div id="audio-controls-nav-bar_div">
            <div id="song-display_div">
                {queue ? (
                    <img
                        id="audio-controls_img"
                        src={Small_logo}
                        alt="album img"
                    />
                ) : (
                    <img
                        id="audio-controls_img"
                        src={Small_logo}
                        alt="album img"
                    />
                )}
                {queue ? (
                    <p id="audio-controls_name">
                        {null}
                    </p>
                ) : (
                    <p id="audio-controls_name">Song Title</p>
                )}
                {queue ? (
                    <p id="audio-controls_album-title">
                        {null}
                    </p>
                ) : (
                    <p id="audio-controls_album-title">Artist</p>
                )}
            </div>

            <div id="audio-controls_div">
                <audio
                    // controls
                    // autoplay
                    id="navbar-player"
                    controls={true}
                    controlsList="nodownload"
                    src={mp3}
                    accept={`*/`}
                    onEnded={bufferFunc}
                // onPlay={() => setIsPlaying(true)}
                // onPause={() => setIsPlaying(false)}
                ></audio>
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
    )
}

export default AudioBar
