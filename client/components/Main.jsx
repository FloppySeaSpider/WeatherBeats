import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/thunks';
import Zipcode from './Zipcode';
import UserBox from './UserBox';
import Icon from './Icon';
import Player from './Player';
import Login from './Login';
import Chat from './Chat';
import { updateZipcode } from '../redux/stateSlice';
import Modal from './UserProfileModal';
import { useState } from 'react';

export default function Main() {
  const dispatch = useDispatch();
  const { token, isOpen } = useSelector((state) => state.updater);

  useEffect(() => {
    if (localStorage.getItem('zipcode')) {
      dispatch(updateZipcode(localStorage.getItem('zipcode')));
    }
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      <div className="hero-head">
        <div className="columns">
          {token && <Icon />}
          <Zipcode />
          {token && <UserBox />}
          {isOpen && <Modal />}
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
        <div id="chat" className="card">
          <div className="card-content">
            <div className="content">
              <Chat />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot" />
    </>
  );
}
