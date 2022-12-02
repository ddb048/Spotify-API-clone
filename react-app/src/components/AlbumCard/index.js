import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './index.css'

const AlbumCard = ({ album }) => {

    return (
        <Link to={`/albums/${album.id}`}>
            <div className="image-parent">
                <img className="album_card_img"
                    src={album.album_cover}

                    alt='Album Img' />
            </div>
            <div className="card-textblock">
                <div className="card-text">{album.title}</div>
                <div className="card-text-sub">{album.release_date}</div>
            </div>
        </Link>
    )
}

export default AlbumCard;
