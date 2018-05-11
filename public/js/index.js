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

// custom event listener for new Messages
socket.on('newMessage', function (message) {
  console.log('New message', message);
  // use jQuery to create a list element
  var li = jQuery('<li></li>');
  // set the text property of li
  li.text(`${message.from}: ${message.text}`);
  // add the element to the DOM via append to the bottom of the ordered list
  jQuery('#messages').append(li);
});

// custom event listener to handle displaying google maps links from geolocation
// by using li.text and a.attr we are preventing someone from injecting malicious HTML
socket.on('newLocationMessage', function (message) {
  // use jQuery to create a list element
  var li = jQuery('<li></li>');
  // use jQuery to create an anchor tag
  // the tag will have free text My Current Location
  // target="_blank" will have the browser open the link in a new tab
  var a = jQuery('<a target="_blank">My Current Location</a>');
  // tell who the message is from
  li.text(`${message.from}: `);
  // update the anchor tag and set href = url
  a.attr('href', message.url);
  // append the anchor tag to the list element
  li.append(a);
  // append to the ordered list DOM
  jQuery('#messages').append(li);
});

// jquery with e event in callback. We need to do this to override default form behavior
jQuery('#message-form').on('submit', function (e) {
  // prevents the default behavior for the event
  // by default a submit event goes through a page refresh process
  e.preventDefault();

  // for performance improvement.. only have one jQuery selector
  var messageTextbox = jQuery('[name=message]');

  // emit message using form data including support for a callback from server
  socket.emit('createMessage', {
    from: 'User',
    // selects any element which has a name attribute = message
    // brings back the value with .val()
    text: messageTextbox.val()
  }, function () {
    // after ack from server clear the input
    messageTextbox.val('');
  });
});

// store the jQuery selector in a variable to save calling it again in the future
// only need to manipulate the DOM once this way
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  // if there is no geolocation object on navigator then alert user no geolocation
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  // disabling the button while geolocation is running
  // also update the button's text to tell user the location is being sent
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    // things go well
    // enable send location button again
    // return the button text to the original text
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    // things didn't go well
    // enable send location button again
    // return the button text to the original text
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
