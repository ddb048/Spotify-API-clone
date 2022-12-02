import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './index.css'

const PlaylistCard = ({ playlist }) => {

    return (
        <Link to={`/playlists/${playlist.id}`}>
            <div className="image-parent">
                <img className="playlist_card_img"
                    src={playlist.preview_image}

                    alt='Playlist Img' />
            </div>
            <div className='card-textblock'>
                <div className="card-text">{playlist.name}</div>
                <div className="card-text-sub">{playlist.description.slice(0, 40).trim()}
                    {playlist.description.length > 40 && "..."}</div>
            </div>
        </Link>
    )
}

export default PlaylistCard;
