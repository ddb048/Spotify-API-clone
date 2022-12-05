import React from 'react';
import { useHistory } from 'react-router-dom';
import bubbles_dktp from '../../images/bubbles_dktp.png';
import spotify_phone from '../../images/spotify_phone.png';
import './index.css';
import { Link } from 'react-router-dom';

function Splash() {
    const history = useHistory();

    const signUp = () => {
        history.push('/sign-up');
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
                                <div className='language-button-div'>
                                    <Link
                                        className='language-button'
                                        to={{ pathname: 'https://www.python.org/doc' }}
                                        target='_blank'
                                    >
                                        <i className='fa-brands fa-python'></i>
                                    </Link>

                                    <Link
                                        className='language-button'
                                        to={{ pathname: 'https://reactjs.org/' }}
                                        target='_blank'
                                    >
                                        <i className='fa-brands fa-react'></i>
                                    </Link>
                                    <Link
                                        className='language-button'
                                        to={{ pathname: 'https://nodejs.org/en/docs/' }}
                                        target='_blank'
                                    >
                                        <i className='fa-brands fa-node-js'></i>
                                    </Link>
                                    <Link
                                        className='language-button'
                                        to={{
                                            pathname:
                                                'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
                                        }}
                                        target='_blank'
                                    >
                                        <i className='fa-brands fa-html5'></i>
                                    </Link>
                                </div>
                            </div>
                            <div className='contact-card' id='david'>
                                <div className='contact-text'>David Burch</div>
                                <div className='contact-buttons-div'>
                                    <Link
                                        className='contact-button'
                                        to={{ pathname: 'https://github.com/ddb048' }}
                                        target='_blank'
                                    >
                                        <i className='fa-brands fa-square-github' />
                                    </Link>
                                    <Link
                                        className='contact-button'
                                        to={{
                                            pathname:
                                                'https://www.linkedin.com/in/david-burch-26b92b226/',
                                        }}
                                        target='_blank'
                                    >
                                        <i className='fa-brands fa-linkedin'></i>
                                    </Link>
                                </div>
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
