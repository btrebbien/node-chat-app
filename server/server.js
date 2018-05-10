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


// configure express middleware (holds html so keep below maintenance)
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  // create a newMessage for other clients
  socket.emit('newMessage', {
    from: newMessageFromClient.from,
    text: newMessageFromClient.text,
    createdAt: new Date().toString()
  });

  // listen for custom event createMessage from Client
  socket.on('createMessage', (newMessageFromClient) => {
    console.log('createMessage', newMessageFromClient);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

// binds app to a port
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
