import React, { useEffect } from 'react';
import { useContext } from 'react';
import { WebsocketContext } from './Main';
import { useDispatch, useSelector } from 'react-redux';

import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import {
  updatewebSocketMessage,
  updatewebSocketSentMessage
} from '../redux/stateSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const send = useContext(WebsocketContext);
  const { webSocketStatus, webSocketMessage, webSocketSentMessage } =
    useSelector((state) => state.updater);

  const sendMessage = (newMessage) => {
    dispatch(updatewebSocketSentMessage(newMessage));
    send(newMessage);
  };

  useEffect(() => {
    if (webSocketMessage === '') return;
    if (webSocketMessage === webSocketSentMessage) {
      dispatch(updatewebSocketSentMessage(''));
      return;
    }
    addResponseMessage(webSocketMessage);
    dispatch(updatewebSocketMessage(''));
  }, [webSocketMessage]);

  return (
    <div>
      <Widget
        handleNewUserMessage={sendMessage}
        title="ChillChat"
        subtitle="Because All Apps Need A Chat Feature"
        senderPlaceHolder="How's the weather..."
        emojis={true}
      />
    </div>
  );
};

export default Chat;
