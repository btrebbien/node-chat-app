// opens socket connection to server
var socket = io();

// default event
socket.on('connect', function () {
  console.log('Connected to the server.');

});

// default event
socket.on('disconnect', function () {
  console.log('Disconnected from the server.');
});

// custom event listener
socket.on('newMessage', function (message) {
  console.log('New message', message);
  // use jQuery to create an element
  var li = jQuery('<li></li>');
  // set the text property of li
  li.text(`${message.from}: ${message.text}`);
  // add the element to the DOM via append to the bottom of the ordered list
  jQuery('#messages').append(li);
})

// jquery with e event in callback. We need to do this to override default form behavior
jQuery('#message-form').on('submit', function (e) {
  // prevents the default behavior for the event
  // by default a submit event goes through a page refresh process
  e.preventDefault();

  // emit message using form data including support for a callback from server
  socket.emit('createMessage', {
    from: 'User',
    // selects any element which has a name attribute = message
    // brings back the value with .val()
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
