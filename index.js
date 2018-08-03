/*
  Basic Event Emitter.  Should have the following behaviors:
    Define custom events that can be passed arbitrary arguments
    Define listeners on those events which recieve arguments
    Define a listener that is called only once
    ability to remove specific listeners or all listeners
*/

class Eventer {
  constructor() {
    this.name = 'eventer';
    this.listeners = {};
  }

//still needs to validate that callback is a function, event is a string, probs other stuff
  on(event, callback) {
    if (callback) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(callback);
    }
  }

}

let eventer = new Eventer();


module.exports = eventer;
