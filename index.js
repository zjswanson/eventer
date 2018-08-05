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
    if (!eventName) {
      throw new SyntaxError("must specifc the name of event to emit");
    } else if (typeof eventName != 'string') {
      let errMessage = "expected argument 1 to be of type string.  recieved type of " + typeof eventName;
      throw new TypeError(errMessage);
    }

    if (!callBack) {
      throw new SyntaxError("must include callback to be run on event");
    } else if (typeof callBack != 'function') {
      let errMessage = "expected argument 2 to be of type function.  recieved type of " + typeof callBack;
      throw new TypeError(errMessage);
    }

    this.events[eventName] = this.events[eventName] || [];
    let listener = new Listener(callBack, callOnce);
    this.events[eventName].push(listener);
  };

//convenience method for calling a handler no more than once
  once(eventName, callBack) {
    this.on(eventName, callBack, true);
  };

//validate inputs
  emit(eventName, data) {
    if (!eventName) {
      throw new SyntaxError("must specifc the name of event to emit");
    } else if (typeof eventName != 'string') {
      let errMessage = "expected argument 1 to be of type string.  recieved type of " + typeof eventName;
      throw new TypeError(errMessage);
    }

    let listeners = this.events[eventName];
    if (listeners) {
      let listenersToKeep = [];
      listeners.forEach(function(listener) {
        if (typeof listener.callBack == 'function') {
          if (data) {
            listener.callBack(data);
          } else {
            listener.callBack();
          }
        }
        if (!listener.callOnce) {
          listenersToKeep.push(listener);
        }
      });
      this.events[eventName] = listenersToKeep;
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
