import React from 'react';
import { useContext } from 'react';
import { WebsocketContext } from './Main';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
  const send = useContext(WebsocketContext);
  const { webSocketStatus, webSocketMessage } = useSelector(
    (state) => state.updater
  );

  return (
    <div>
      Ready: {JSON.stringify(webSocketStatus)}, Value: {webSocketMessage}
    </div>
  );
};

export default Chat;
