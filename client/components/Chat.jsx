import React from 'react';
import { useEffect, useRef, useState } from 'react';

const Chat = () => {
  const [sendMessage, setSendMessage] = useState(false);
  const ws = useRef(null);

  //https://stackoverflow.com/questions/60152922/proper-way-of-using-react-hooks-websockets
  //https://www.kianmusser.com/articles/react-where-put-websocket/
  // useEffect(() => {
  //   const client = new WebSocket('ws://localhost:3000');
  //   client.onopen = (event) => {
  //     console.log('ws open');
  //     client.send("Here's some text that the server is urgently awaiting!");
  //   };
  //   client.onclose = (event) => {
  //     console.log('ws closed');
  //   };
  //   client.onmessage = (event) => {
  //     console.log(event.data);
  //   };

  //   const wsCurrent = ws.client;

  //   return () => {
  //     wsCurrent.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!ws.current) return;

  //   ws.current.onmessage = (e) => {
  //     if (isChatPaused) return;
  //     const message = JSON.parse(e.data);
  //     console.log('e', message);
  //   };
  // }, [sendMessage]);
  return (
    <div>
      <button onClick={() => setSendMessage(!sendMessage)}>Test</button>
    </div>
  );
};

export default Chat;
