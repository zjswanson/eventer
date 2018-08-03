var assert = require('assert');
var eventer = require('../index.js');

describe('Array', function() {
  describe('Eventer', function() {
    it('should have the name "eventer"', function() {
      assert.equal(eventer.name, "eventer");
    });
  }),
  describe('on', function() {
    it('should register a custom listener', function() {
      const callBack = function(){console.log('testing');};
      eventer.on('test', callBack);
      assert.equal(eventer.events['test'].includes(callBack), true);
    })
  }),
  describe('on', function() {
    it('should register multiple listeners', function() {
      const callBack = function(){console.log('testing');},
            callBack2 = function(){console.log('testing again');};
      eventer.on('test', callBack);
      eventer.on('test', callBack2);
      assert.equal(eventer.events['test'].includes(callBack), true);
      assert.equal(eventer.events['test'].includes(callBack2), true);
    })
  }),
  describe('emit', function() {
    it('should emit a custom event and fire listeners', function() {
      let callBack = function(){eventHappened = true},
          eventHappened = false;

      eventer.on('emit', callBack);
      eventer.emit('emit');
      assert.equal(eventHappened, true);
    })
  }),
  describe('emit', function() {
    it('should handle multiple listeners for one event', function() {
      let callBack = function(){eventHappened = true},
          callBack2 = function(){otherEventHappened = true},
          otherEventHappened = false,
          eventHappened = false;

      eventer.on('emit', callBack);
      eventer.on('emit', callBack2);
      eventer.emit('emit');
      assert.equal(eventHappened, true);
      assert.equal(otherEventHappened, true);
    })
  })
});
