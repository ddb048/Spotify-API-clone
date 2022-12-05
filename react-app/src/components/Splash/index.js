import React from 'react';
import { useHistory } from 'react-router-dom';
import bubbles_dktp from '../../images/bubbles_dktp.png';
import spotify_phone from '../../images/spotify_phone.png';
import './index.css';
import { Link } from 'react-router-dom';

function Splash() {
    const history = useHistory();

    const signUp = () => {
        history.push('/signup');
    };

    return (
        <>
            <div className='Splash-container'>
                <div>
                    <div className='Splash-title'>

                        <p className='subtext'>
                            Play millions of songs, for free.
                        </p>

                        <img id='left-people' src={spotify_phone} alt='people on the left' />

                        <img id='clouds' src={bubbles_dktp} alt='clouds' />
                    </div>

                    <div className='Splash-detail even'>

                        <div className='button-div'>
                            <button className='sign-up-button' onClick={signUp}>
                                Sign Up
                            </button>
                        </div>
                        <div className='contact-box'>
                            <div className='languages-card' id='languages'>
                                <div className='footer-title'>Languages Used</div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='Splash-footer'>
                <div className='footer-content'>


                </div>
            </div>
        </>
    );
}

export default Splash;
