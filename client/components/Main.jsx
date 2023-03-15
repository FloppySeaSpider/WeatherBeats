import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/thunks';
import Zipcode from './Zipcode';
import UserBox from './UserBox';
import Icon from './Icon';
import Player from './Player';
import Login from './Login';

export default function Main() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.updater);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

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
