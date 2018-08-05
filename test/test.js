var assert = require('assert');
var eventer = require('../index.js');

describe('Eventer', function() {
  afterEach(function() {
    eventer.removeAllListeners();
  });

  describe('Eventer', function() {
    it('should have the name "eventer"', function() {
      assert.equal(eventer.name, "eventer");
    });
  }),
  describe('on', function() {
    it('should register a custom listener', function() {
      const callBack = function(){console.log('testing');};
            foundCallBack = false;
      eventer.on('test', callBack);
      eventer.events['test'].forEach(function(listener) {
        if (listener.callBack == callBack) {
          foundCallBack = true;
        }
      });

      assert.equal(foundCallBack, true);
    })
  }),
  describe('on', function() {
    it('should register multiple listeners', function() {
      const callBack = function(){console.log('testing');},
            callBack2 = function(){console.log('testing again');};
      let foundCallBack1 = false,
          foundCallBack2 = false;

      eventer.on('test', callBack);
      eventer.on('test', callBack2);

      eventer.events['test'].forEach(function(listener) {
        if (listener.callBack == callBack) {
          foundCallBack = true;
        } else if (listener.callBack == callBack2) {
          foundCallBack2 = true;
        }
      });

      assert.equal(foundCallBack, true);
      assert.equal(foundCallBack2, true);
    })
  }),
  describe('on', function() {
    it('should error if given missing or onvalid arguments', function() {
      assert.throws(
        () => {
          eventer.on('', ()=> {console.log('test function')});
          eventer.on('test', "function!");
          eventer.on('test');
        }
      );
    })
  })
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
    it('should receive arguments from emit call', function() {
      let callBack = function(data){eventResult = data.toReturn},
          eventResult = '',
          data = {toReturn : 'It Worked!'};

      eventer.on('emit', callBack);
      eventer.emit('emit', data);
      assert.equal(eventResult, 'It Worked!');
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
  }),
  describe('emit', function() {
    it('should only trigger listeners when event is emitted', function() {
      let callBack = function(){eventHappened = true},
          callBack2 = function(){otherEventHappened = true},
          otherEventHappened = false,
          eventHappened = false;

      eventer.on('emit', callBack);
      eventer.on('emit2', callBack2);
      eventer.emit('emit');
      assert.equal(eventHappened, true);
      assert.equal(otherEventHappened, false);
    })
  }),
  describe('emit', function() {
    it('should fire listener once for each emit', function() {
      let callBack = function(){eventCount++},
          eventCount = 0;

      eventer.on('emit', callBack);
      eventer.emit('emit');
      eventer.emit('emit');
      eventer.emit('emit');
      assert.equal(eventCount, 3);
    })
  }),
  describe('emit', function() {
    it('should error with missing or non-string argument', function() {
      assert.throws(
        () => {
          eventer.emit('');
          eventer.emit(4);
        }
      );
    })
  }),
  describe('once', function() {
    it('should fire listener no more than once', function() {
      let callBack = function(){eventCount++},
          eventCount = 0;

      eventer.once('emit', callBack);
      eventer.emit('emit');
      eventer.emit('emit');
      eventer.emit('emit');
      assert.equal(eventCount, 1);
    })
  }),
  describe('once', function() {
    it("shouldn't interfere with other listeners on the event", function() {
      let callOnce = function(){onceCount++},
          callABunch = function(){bunchCount++},
          onceCount = 0;
          bunchCount = 0;

      eventer.once('emit', callOnce);
      eventer.on('emit', callABunch);
      eventer.emit('emit');
      eventer.emit('emit');
      eventer.emit('emit');
      assert.equal(onceCount, 1);
      assert.equal(bunchCount, 3);
    })
  }),
  describe('removeAllListeners', function() {
    it('should remove all custom event listeners', function() {
      let callBack = function(){eventHappened = true},
          callBack2 = function(){otherEventHappened = true},
          otherEventHappened = false,
          eventHappened = false;

      eventer.on('emit', callBack);
      eventer.on('emit', callBack2);
      eventer.removeAllListeners();
      eventer.emit('emit');
      assert.equal(eventHappened, false);
      assert.equal(otherEventHappened, false);
    })
  }),
  describe('removeListener', function() {
    it('should remove listeners for a specific event', function() {
      let callBack = function(){eventHappened = true},
          callBack2 = function(){otherEventHappened = true},
          otherEventHappened = false,
          eventHappened = false;

      eventer.on('emit', callBack);
      eventer.on('emit2', callBack2);
      eventer.removeListeners('emit');
      eventer.emit('emit');
      eventer.emit('emit2');
      assert.equal(eventHappened, false);
      assert.equal(otherEventHappened, true);
    })
  })
});
