/*
  Basic Event Emitter.  Should have the following behaviors:
    Define custom events that can be passed arbitrary arguments
    Define listeners on those events which recieve arguments
    Define a listener that is called only once
    ability to remove specific listeners or all listeners

    TODO add error throwing, validate inputs, consider how to do once method (maybe listeners have a class with a prop for how many times they can fire), check test cases are broad enough
*/

class Eventer {
  constructor() {
    this.name = 'eventer';
    this.events = {};
  };

//still needs to validate that callback is a function, event is a string, probs other stuff
  on(eventName, callback) {
    if (callback) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(callback);
    }
  };

//validate inputs
  emit(eventName,data) {
    if (eventName) {
      let listeners = this.events[eventName];
      if (listeners) {
        listeners.forEach(function(listener) {
          if (typeof listener == 'function') {
            listener(data);
          }
        })
      }
    }
  };

  removeAllListeners() {
    this.events = {};
  };

  removeListeners(eventName) {
    if (eventName){
      this.events[eventName] = [];
    }
  };

}

let eventer = new Eventer();
module.exports = eventer;
