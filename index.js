/*
  Basic Event Emitter.  Should have the following behaviors:
    Define custom events that can be passed arbitrary arguments
    Define listeners on those events which recieve arguments
    Define a listener that is called only once
    ability to remove specific listeners or all listeners

    TODO add error throwing, validate inputs, consider how to do once method (maybe listeners have a class with a prop for how many times they can fire), check test cases are broad enough
*/
class Listener {
  constructor(callBack, callOnce) {
    this.callBack = callBack;
    this.callOnce = callOnce || false;
  }
}

class Eventer {
  constructor() {
    this.name = 'eventer';
    this.events = {};
  };

//still needs to validate that callback is a function, event is a string, probs other stuff
  on(eventName, callBack, callOnce = false) {
    if (callBack) {
      this.events[eventName] = this.events[eventName] || [];
      let listener = new Listener(callBack, callOnce);
      this.events[eventName].push(listener);
    }
  };

//convenience method for calling a handler no more than once
  once(eventName, callBack) {
    this.on(eventName, callBack, true);
  };

//validate inputs
  emit(eventName,data) {
    if (eventName) {
      let listeners = this.events[eventName];
      if (listeners) {
        let listenersToKeep = [];
        listeners.forEach(function(listener) {
          if (typeof listener.callBack == 'function') {
            listener.callBack(data);
          }
          if (!listener.callOnce) {
            listenersToKeep.push(listener);
          }
        });
        this.events[eventName] = listenersToKeep;
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
