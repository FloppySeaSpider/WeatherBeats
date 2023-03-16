const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/authRouter');
const weatherRouter = require('./routes/weatherRouter');
// const db = require('../database/database');
const ws = require('ws');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

//WEBSOCKET LOGIC.

// Set up a headless websocket server that prints any
// events that come in.
//https://medium.com/hackernoon/https-medium-com-amanhimself-converting-a-buffer-to-json-and-utf8-strings-in-nodejs-2150b1e3de57
//https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
//https://www.npmjs.com/package/ws

const clients = {};

function handleDisconnect(userId) {
  const json = `${userId} disconnected.`;
  delete clients[userId];
  //Let's not broadcast the disconnect string until we have unique users. Just use a different object that relates the username to the UUID.
  //That way multiple people can have the same name.
  broadcastMessage(json);
}

function broadcastMessage(json) {
  // We are sending the current data to all connected active clients
  const data = JSON.stringify(json.toString('utf-8'));
  for (let userId in clients) {
    let client = clients[userId];
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  }
}

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (connection) => {
  // connection.on('message', (message) => console.log(message.toString('utf8')));
  const userId = uuidv4();
  clients[userId] = connection;
  console.log(`${userId} connected.`);

  //Sending messages to all clients.
  connection.on('message', (message) => broadcastMessage(message));

  // User disconnected
  connection.on('close', () => handleDisconnect(userId));
});

const app = express();
const PORT = 3000;

//Parsing JSON
app.use(express.json());
// Parsing URL encoded
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// creating a session instance
app.use(
  session({
    // secret is in .env file
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // secure true will only persist the cookie in https
      secure: false
    }
  })
);

app.use(express.static('public'));

// Todo: get request for weather type
app.use('/auth', authRoutes);
app.use('/api/weather', weatherRouter);

app.get('/api/user', async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'User not logged in' });
  }
  const { display_name, email, href } = req.session.user;
  const data = {
    display_name,
    email,
    href
  };
  return res.status(200).json(data);
});

// added catch
app.use('*', (req, res) => res.sendStatus(404));
app.use((err, req, res) => {
  const template = {
    status: 500,
    message: 'Error in middleware',
    log: 'Error in middleware'
  };
  const errObj = { ...template, ...err };
  console.log(errObj.log);
  return res.status(errObj.status).send(errObj.message);
});
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit('connection', socket, request);
  });
});

module.exports = app;
