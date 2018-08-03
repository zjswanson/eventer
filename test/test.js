var assert = require('assert');
var eventer = require('../index.js');

describe('Array', function() {
  describe('Eventer', function() {
    it('should have the name "eventer"', function() {
      assert.equal(eventer.name, "eventer");
    });
  }),
  describe('Eventer', function() {
    it('should register a custom listener', function() {
      const callBack = function(){console.log('testing');};
      eventer.on('test', callBack);
      assert.equal(eventer.listeners['test'].includes(callback));
    })
  })
});
