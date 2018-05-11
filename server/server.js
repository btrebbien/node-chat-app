const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// pass express into http server setup
var server = http.createServer(app);
// websocket server created to emit and listen to events
var io = socketIO(server);

const util = require('./utils/message.js');


// configure express middleware (holds html so keep below maintenance)
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  // send a welcome message just to the client that connects
  socket.emit('newMessage', util.generateMessage('Admin', 'Welcome to the chat.'));
  // broadcast to all others that someone joined
  socket.broadcast.emit('newMessage', util.generateMessage('Admin', 'New user joined.'));

  // listen for custom event createMessage from Client
  // then send the message to all connected cliens
  // callback here is an actual callback function which fires an ack to the client
  // callback function can only take one argument
  socket.on('createMessage', (newMessageFromClient, callback) => {
    console.log('createMessage', newMessageFromClient);
    // emits an event to all connections
    io.emit('newMessage', util.generateMessage(newMessageFromClient.from, newMessageFromClient.text));
    callback('This is from the server.');
  });

  // register listener for geolocation coordinates from client
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', util.generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

// binds app to a port
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
