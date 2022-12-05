import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignUpForm.css';
import Small_logo from '../../images/Small_logo.png'

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    /*********************State**************** */
    const sessionUser = useSelector((state) => state.session.user);

    //state
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    //field state errors
    const [emailErr, setEmailErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
    const [renderErr, setRenderErr] = useState(false);
    const [errors, setErrors] = useState([]);

    /********************Helper Function***************** */

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    /***********************On Submit********************* */


    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

        if (
            !usernameErr &&
            !emailErr &&
            !firstNameErr &&
            !lastNameErr &&
            !passwordErr &&
            !confirmPasswordErr
        ) {
            setErrors([]);
            await dispatch(signUp(email, username, password))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.message) setErrors(data.message);
                });
            history.push('/main');
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);


    };

    /********************Use Effect******************* */

    useEffect(() => {
        //email error handling
        if (email.length && !validateEmail(email)) {
            setEmailErr('invalid email')
        } else if (!email.length) {
            setEmailErr('email is required')
        } else {
            setEmailErr("")
        }

        //username error handling
        if (username.length < 4) {
            setUsernameErr('username must be at least 4 characters')
        } else {
            setUsernameErr("")
        }

        //firstName error handling
        if (!first_name.length) {
            setFirstNameErr('first name is required')
        } else {
            setFirstNameErr("");
        }

        //lastName error handling
        if (!last_name.length) {
            setLastNameErr('last name is required')
        } else {
            setLastNameErr('')
        }

        //password error handling
        if (!password.length) {
            setPasswordErr('password is required')
        } else if (password.length && password.length < 6) {
            setPasswordErr('password must be greater than 6 characters')
        } else {
            setPasswordErr("")
        }

        //confirm password error handling
        if (confirmPassword.length && confirmPassword !== password) {
            setConfirmPasswordErr('please confirm passwords match')
        } else {
            setConfirmPasswordErr("");
        }


    }, [username, email, first_name, last_name, password, confirmPassword])

    return (
        <div className="main">
            <div className="title">Sign Up!</div>

            <form onSubmit={handleSubmit}>
                <div className="input-main">
                    <div className="input-inner-div">
                        <div className="input-header">First Name</div>
                        <input
                            className="input-field"
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="error-div">
                        {renderErr && firstNameErr.length > 0 && firstNameErr}
                    </div>
                </div>
                <div className="input-main">
                    <div className="input-inner-div">
                        <div className="input-header">Last Name</div>
                        <input
                            className="input-field"
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="error-div">
                        {renderErr && lastNameErr.length > 0 && lastNameErr}
                    </div>
                </div>
                <div className="input-main">
                    <div className="input-inner-div">

                        <div className="input-header">Email</div>
                        <input
                            className="input-field"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="error-div">
                        {renderErr && emailErr.length > 0 && emailErr}
                    </div>
                </div>
                <div className="input-main">
                    <div className="input-inner-div">

                        <div className="input-header">Username</div>
                        <input
                            className="input-field"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className="error-div">
                        {renderErr && usernameErr.length > 0 && usernameErr}
                    </div>
                </div>
                <div className="input-main">
                    <div className="input-inner-div">

                        <div className="input-header">Password</div>
                        <input
                            className="input-field"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />


                    </div>
                    <div className="error-div">
                        {renderErr && passwordErr.length > 0 && passwordErr}
                    </div>
                </div>
                <div className="input-main">
                    <div className="input-inner-div">

                        <div className="input-header">Confirm Password</div>
                        <input
                            className="input-field"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />

                        <div className="error-div">
                            {renderErr && confirmPasswordErr.length > 0 && confirmPasswordErr}
                        </div>
                    </div>
                </div>
                <div className="submit-button">
                    <button className='submit' type="submit">Sign Up</button>
                </div>
                <div className="logo-div">
                    <img clasName='img' src={Small_logo} />
                </div>
            </form>
        </div>
    );
}

export default SignupFormPage;
