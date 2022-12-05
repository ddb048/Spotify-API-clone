import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './index.css'


const ArtistCard = ({ artist }) => {
    console.log(artist, "artist from card")
    return (
        <Link to={`/artists/${artist.id}`}>
            <div className="image-parent">
                <img className="artist_card_img"
                    src={artist.artist_pic}

                    alt='Artist Img' />
            </div>

            <div className='card-textblock'>
                <div className="card-text">{artist.name}</div>
                <div className="card-text-sub">{artist.description.slice(0, 30).trim()}
                    {artist.description && "..."}</div>
            </div>
        </Link>
    )
}

export default ArtistCard;
