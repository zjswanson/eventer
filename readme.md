# Eventer

Eventer is a simple custom event emitter for Node.js.  Easily register, manage, and trigger custom events for your node app.  Created as a code challenge by Zach Swanson.

### Installation

Eventer has no dependencies for its core functionality.  The test suite uses [Mocha](https://mochajs.org/) as a test runner and Node's built-in [Assert](https://nodejs.org/api/assert.html) library.

To install, simply place the `index.js` file in your project directory and place the following at the top of each module where you want to use Eventer (note, you may have to modify the path based on your project structure)

```sh
const eventer = require('index.js');
```

If you wish to run or modify Eventer's tests, be sure that you have the Mocha library in your project.  The easiest way to do so is to be sure your `package.json` includes:

```sh
  "devDependencies": {
    "mocha": "^5.2.0"
  },
  "scripts": {
    "test": "mocha"
  },
```
then run
```sh
$ npm update --dev
```
This assumes that you have left the `/test` folder at the same level in your directory as the `/node_modules` folder.  If not, you may need to modify the path for requiring eventer on the first line of `test.js`.

### Usage

To get started, just require eventer:
```sh
const eventer = require('index.js');
```

##### eventer.on(eventName, callBack, [runOnce])
creates a custom event and registers an event listener to be fired when the event is emitted.  Callbacks will be called in the order that they are registered.
- eventName = <String> Name of the custom event to register
- callBack = <Function> that will be run when the event is emitted.  Recieves an object with data from the call to emit()
- runOnce(optional) = <Boolean> if true, this will remove this listener after the first time it is run.  Defaults to false.

##### eventer.once(eventName, callBack)
Convenience method for registering single use event listeners.  Equivalent to eventer.on(eventName, callback, true)

##### eventer.emit(eventName, [data])
Emits a custom event.  Has no effect if the event has not been registered through eventer.on().
- eventName = <String> Name of the custom event to emit
- data(optional) = <Object> optional object of arbitrary data.  Will be passed as the only argument to any calback registered with eventer.on().

##### eventer.removeAllListeners()
removes all custom events and listeners that have been registered to this instance of Eventer.

##### eventer.removeListeners(eventName)
removes all listeners that have been registered to this event name.
- eventName = <String> Name of the custom event to emit

### License and Usage Notes
Eventer is provided under the [MIT](https://opensource.org/licenses/MIT).  No need to attribute me.  If this somehow is useful to you or inspires your work, that's great.  Go nuts with it and I accept no credit or liability for what you build.  There are, however, two important usage notes:
- Because of the way Node caches modules, eventer will mostly function as a singleton, but it is probably safest to only use custom events in the same file/module where you define them.  For more info, [this article](https://derickbailey.com/2016/03/09/creating-a-true-singleton-in-node-js-with-es6-symbols/) is helpful.
- You should really consider using Node's built in `events` module instead.  It can do everything this does, and more, and was written by the excellent Node community instead of being written by one dude over a weekend code challenge.  
