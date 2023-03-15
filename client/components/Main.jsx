import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, updateEmail, updateToken } from '../redux/stateSlice';
import Zipcode from './Zipcode';
import UserBox from './UserBox';
import Icon from './Icon';
import Player from './Player';
import Login from './Login';

export default function Main() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.updater);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/auth/token');
        const data = await response.json();
        const { accessToken } = data;
        dispatch(updateToken(accessToken.trim()));
      } catch (error) {
        console.error('Token fetch error: ', error);
      }
    };

    // fetch userdata
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        dispatch(updateUser(data.display_name));
        dispatch(updateEmail(data.email));
      } catch (error) {
        console.error('User data fetch error: ', error);
      }
    };
    fetchToken();
    fetchUserData();
  }, [token]);

  return (
    <>
      <div className="hero-head">
        <div className="columns">
          <Icon />
          <Zipcode />
          <UserBox />
        </div>
      </div>

      <div className="hero-body is-align-content-center is-justify-content-center">
        <div className="box center is-align-content-center is-justify-content-center">
          <div id="player" className="card">
            <div className="card-content">
              <div className="content">
                <div className="field">{!token ? <Login /> : <Player />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot" />
    </>
  );
}

// On page render, we will have access to a JSON object from Spotify
// On page load, we can send a Post request to our Database with the username of the persom
// On Zip Code Use Effect Fire
