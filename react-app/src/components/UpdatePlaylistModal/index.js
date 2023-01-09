import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePlaylistThunk, deletePlaylistThunk, getOnePlaylistThunk } from '../../store/playlist';
import { Modal } from '../../context/Modal';
import './index.css'
import { getAllUsersPlaylistsThunk } from '../../store/collection';

const UpdatePlaylistForm = ({ setUpdateShowModal, playlist }) => {
    const [name, setName] = useState(playlist.name);
    const [description, setDescription] = useState(playlist.description);
    const [error, setError] = useState(false);
    const [renderErr, setRenderErr] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let errors = {};
        if (!name) {
            errors.NameError = 'You must give your server a name';
        } else if (name.length > 40) {
            errors.nameError = 'Server name must be at most 10 characters'
        }

        if (description.length >= 200) {
            errors.descriptionError = 'Description must be less than 200 characters'
        }

        setError(errors);
    }, [name, description]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)


        const newPlaylist = {
            id: +playlist.id,
            name,
            description,
        }
        const data = await dispatch(updatePlaylistThunk(newPlaylist));
        if (data.errors) {
            setError(data.errors);
        } else {
            await dispatch(getOnePlaylistThunk(playlist.id))
            await dispatch(getAllUsersPlaylistsThunk())
            setUpdateShowModal(false)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePlaylistThunk(playlist))
        dispatch(getAllUsersPlaylistsThunk())
        history.push('')
        setUpdateShowModal(false)
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <form id="form" onSubmit={handleSubmit}>

                    <div className="text">
                        <h2>Your New Playlist</h2>
                    </div>

                    <div>
                        {renderErr && error.nameError ?
                            <label className="text renderError" htmlFor="name">
                                Playlist Name: {error.textError}
                            </label>
                            :
                            <label className="text noRenderError" htmlFor="name">
                                Playlist Name
                            </label>
                        }
                        <input
                            type="text"
                            className="inp"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder={"Playlist Name"}
                            name="description"
                        />
                    </div>

                    <div>
                        <label className="text noRenderError" htmlFor="text">
                            Playlist Description
                        </label>
                        <input
                            className="inp"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Share your playlist description"
                            name="description"
                        ></input>
                    </div>

                    <div className="errors-div">
                        {!!error.length && <div id="errors">{error[0]}</div>}
                    </div>
                    <div className='buttons-container'>
                        <button
                            className='subButton'
                            disabled={
                                !!error.nameError && !!error.description
                            }
                            type="submit"
                        >
                            Submit
                        </button>
                        <button className="btn-dlt" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>

                </form>
            </div >
        </div >

    )
}
export default UpdatePlaylistForm;
