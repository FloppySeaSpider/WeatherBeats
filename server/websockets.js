const WebSocket = require('ws');

const socketServer = (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on(
    'connection',
    function connection(websocketConnection, connectionRequest) {
      websocketConnection.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        websocketConnection.send(
          JSON.stringify({ message: 'There be gold in them thar hills.' })
        );
      });
    }
  );

  return websocketServer;
};

module.exports = socketServer;
