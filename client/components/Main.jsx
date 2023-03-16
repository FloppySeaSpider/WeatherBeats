import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/thunks';
import Zipcode from './Zipcode';
import UserBox from './UserBox';
import Icon from './Icon';
import Player from './Player';
import Login from './Login';
import Chat from './Chat';
import {
  updateZipcode,
  updateWebSocket,
  updateWebSocketStatus,
  updatewebSocketMessage
} from '../redux/stateSlice';
import Modal from './UserProfileModal';
import { useState, useRef, createContext } from 'react';

export const WebsocketContext = createContext(false, null, () => {});
//                                            ready, value, send

export default function Main() {
  const dispatch = useDispatch();
  const { token, isOpen, userName } = useSelector((state) => state.updater);

  //WEBSOCKET LOGIC.
  //https://stackoverflow.com/questions/60152922/proper-way-of-using-react-hooks-websockets
  //https://www.kianmusser.com/articles/react-where-put-websocket/
  //I'm putting the websocket into context, but it should be able to be stored in state. Redux doesn't like it by default, though.
  //Just hacking a working solution.
  const ws = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://104.248.31.172:3000/');

    //Scuffed solution, but send the following string as a way for the websocket server to identify new connections.
    socket.onopen = () => {
      dispatch(updateWebSocketStatus(true));
      if (userName) socket.send(`USERNAME: ${userName}`);
    };
    socket.onclose = () => {
      socket.send('A user disconnected.');
      dispatch(updateWebSocketStatus(false));
    };
    //The idea is we will want to push messages in state to render a component, and then set the message to empty.
    socket.onmessage = (event) => {
      dispatch(updatewebSocketMessage(JSON.parse(event.data)));
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [userName]);

  const ret = ws.current?.send.bind(ws.current);

  //END OF WEBSOCKET LOGIC.

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
        <div id="chat">
          <WebsocketContext.Provider value={ret}>
            <Chat />
          </WebsocketContext.Provider>
        </div>
      </div>
      <div className="hero-foot" />
    </>
  );
}
