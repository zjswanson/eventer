var assert = require('assert');
var eventer = require('../index.js');

describe('Array', function() {
  describe('Eventer', function() {
    it('should have the name "eventer"', function() {

      assert.equal(eventer.name, "eventer");
    });
  });
});
