import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPlaylistThunk } from '../../store/playlist';
import { Modal } from '../../context/Modal';
import './index.css'

const CreatePlaylistForm = ({ setShowModal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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
            name,
            description,
        }

        const data = await dispatch(createPlaylistThunk(newPlaylist));
        console.log(data, "data from create playlist modal")
        if (data.errors) {
            setError(data.errors);
        } else { setShowModal(false) }
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
                    <div >
                        <button
                            className='subButton'
                            disabled={
                                !!error.nameError && !!error.description
                            }
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div >
        </div >

    )
}

export default CreatePlaylistForm;
