// opens socket connection to server
var socket = io();

// default event
socket.on('connect', function () {
  console.log('Connected to the server.');

  socket.emit('createMessage', {
    from: 'Arnold',
    text: 'Let\'s get some brews!'
  });
});

// default event
socket.on('disconnect', function () {
  console.log('Disconnected from the server.');
});

// custom event listener
socket.on('newMessage', function (message) {
  console.log('New message', message);
})