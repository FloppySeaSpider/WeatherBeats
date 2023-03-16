const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
// const db = require('../database/database');
const ws = require('ws');
const { v4: uuidv4 } = require('uuid');
const { cli } = require('webpack-dev-server');
const weatherRouter = require('./routes/weatherRouter');
const authRoutes = require('./routes/authRouter');

require('dotenv').config();

// WEBSOCKET LOGIC.

// Set up a headless websocket server that prints any
// events that come in.
// https://medium.com/hackernoon/https-medium-com-amanhimself-converting-a-buffer-to-json-and-utf8-strings-in-nodejs-2150b1e3de57
// https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
// https://www.npmjs.com/package/ws

const clients = {};
const loggedInUsers = {};

function handleDisconnect(userId) {
  delete clients[userId];
  let userName;
  if (loggedInUsers.hasOwnProperty(userId)) {
    userName = loggedInUsers[userId];
    delete loggedInUsers[userId];
  }
  // Let's not broadcast the disconnect string until we have unique users. Just use a different object that relates the username to the UUID.
  // That way multiple people can have the same name.
  if (userName) {
    const message = `${userName} has logged out.`;
    broadcastMessage(message);
  }
}

function broadcastMessage(json, isLoggingIn, userId) {
  // Handle the broadcast logic if this is a user login event.
  let data;
  if (isLoggingIn) {
    data = `${loggedInUsers[userId]} has joined the chat.`;
  }
  // We are sending the current data to all connected active clients
  else data = json;
  // Let's concatenate onto the beginning of the message the username if they exist in the database.
  if (loggedInUsers.hasOwnProperty(userId) && !isLoggingIn) {
    // data = JSON.stringify(loggedInUsers[userId].toString('utf-8')) + data;
    data = `${loggedInUsers[userId]}: ${data}`;
  }
  // Finally, parse the data before sending it.
  data = JSON.stringify(data.toString('utf-8'));
  for (const uID in clients) {
    // Do not send the client a copy of the message, as it will appear in their chat instantaneously on the client side.
    if (uID === userId) continue;
    const client = clients[uID];
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  }
}

// Add user to our logged in collection if they are logged in.
function checkIfNewUser(json, userId) {
  const data = json.toString('utf-8');
  // The first part of the string is USERNAME:
  if (data.includes('USERNAME:')) {
    const username = data.split(' ')[1];
    loggedInUsers[userId] = username;
    return true;
  }
  return false;
}

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (connection) => {
  // connection.on('message', (message) => console.log(message.toString('utf8')));
  const userId = uuidv4();
  clients[userId] = connection;

  // Sending messages to all clients.
  connection.on('message', (message) => {
    // When a client connects, if they connect with a username, use this username.
    const isLoggingIn = checkIfNewUser(message, userId);
    broadcastMessage(message, isLoggingIn, userId);
  });

  // User disconnected
  connection.on('close', () => handleDisconnect(userId));
});

const app = express();
const PORT = 3000;

// Parsing JSON
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
      secure: false,
    },
  }),
);

app.use(express.static(path.resolve(__dirname, '../dist')));

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
    href,
  };
  return res.status(200).json(data);
});

// added catch
app.use('*', (req, res) => res.sendStatus(404));
app.use((err, req, res) => {
  const template = {
    status: 500,
    message: 'Error in middleware',
    log: 'Error in middleware',
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
