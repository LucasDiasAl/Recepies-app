import React, { useState, useContext } from 'react';
import './Login.css';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import md5 from 'crypto-js/md5';
import {
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { auth } from '../../utils/firebase';
import logo from '../../images/bgT.png';
import { Context } from '../../Context/Context';

function Login() {
  const { setUserImg } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setvalid] = useState(false);

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = {
        email: result.user.email,
        userImg: result.user.photoURL,
      };
      localStorage.setItem('user', JSON.stringify((user)));
      setUserImg(result.user.photoURL);
      navigate('/meals');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    const hash = md5(email).toString();
    const urll = `https://www.gravatar.com/avatar/${hash}`;
    const fetchApi = await fetch(urll);
    const { url } = fetchApi;
    setUserImg(url);
    const user = {
      email,
      userImg: url,
    };
    localStorage.setItem('user', JSON.stringify((user)));
    navigate('/meals');
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const criptoKey = process.env.REACT_APP_CRIPTO_KEY || 'DefaultKey';
    const MIN_LENGTH_PASS = 6;
    const regex = /\S+@\S+\.\S+/;
    let verifyEmail = false;
    let verifyName = false;
    if (name === 'email') {
      verifyEmail = value && regex.test(value);
      verifyName = password.length >= MIN_LENGTH_PASS;
      setEmail(value);
    } if (name === 'password') {
      verifyName = value.length >= MIN_LENGTH_PASS;
      verifyEmail = email && regex.test(email);
      const encripted = CryptoJS.AES.encrypt(value, criptoKey).toString();
      setPassword(encripted);
    }
    if (verifyEmail && verifyName) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  };

  return (
    <div className="Login">
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        className="Login__container"
      >
        <div className="Login__container-logo">
          <img src={ logo } alt="trybe recepies logo" />
        </div>
        <form className="Login__form">
          <input
            type="email"
            className="Login__input-email"
            placeholder="Email"
            data-testid="email-input"
            required
            name="email"
            onChange={ handleChange }
            value={ email }
          />
          <input
            type="password"
            className="Login__input-password"
            placeholder="Password"
            data-testid="password-input"
            required
            name="password"
            onChange={ handleChange }
            defaultValue={ password }
          />
          <button
            className="Login__button"
            onClick={ handleClick }
            type="button"
            disabled={ !valid }
            data-testid="login-submit-btn"
          >
            Enter
          </button>
          <button
            onClick={ GoogleLogin }
            type="button"
            className="Login__google-button"
          >
            <FcGoogle size={ 20 } className="google-svg" />
            Sign in using Google
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
