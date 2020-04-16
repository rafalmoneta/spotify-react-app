import React, { useEffect } from 'react';
import './LoginScreen.scss';
import {getAccessToken, authEndpoint, CLIENT_ID, REDIRECT_URI, scopes} from '../../spotify/spotify';

const LoginScreen = () => {

  useEffect(() => {
    getAccessToken();
  })
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Music app with Spotify API</h1>
        <a
          className="btn login-btn"
          href={`${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
}
 
export default LoginScreen;