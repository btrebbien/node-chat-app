var expect = require('expect');

var utils = require('./message.js');


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Brandon';
    var text = 'My first Mocha test';
    var message = utils.generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Brandon';
    var latitude = 69;
    var longitude = 96;
    var url = 'https://www.google.com/maps?q=69,96';
    var message = utils.generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
})
