import 'colors';
import _ from 'lodash';
import config from '../config/config';
// noop function when login is disabled
let noop = ()=>{};

// logging enabled console log it else noop
let consoleLog = config.logging ? console.log.bind(console) : noop;

// const Logger = {
//   log() {
//     let args = _.toArray(arguments)
//       .map((arg) => {
//         if(typeof arg === 'object') {
//           let string = JSON.stringify(arg, 2);
//           return string.magenta;
//         } else {
//           arg += '';
//           return arg.magenta;
//         }
//       });
//     consoleLog.apply(console, args);
//   }
// };

// module.exports = Logger;

const logger = {
  log() {
    let tag = '[ ✨ LOG ✨ ]'.green;
    // arguments is an array like object with all the passed
    // in arguments to this function
    let args = _.toArray(arguments)
      .map((arg) => {
        if(typeof arg === 'object') {
          // turn the object to a string so we
          // can log all the properties and color it
          let string = JSON.stringify(arg, null, 2);
          return tag + '  ' + string.cyan;
        } else {
          return tag + '  ' + arg.cyan;
        }
      });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  },
  error() {
    let args = _.toArray(arguments)
      .map((arg) => {
        arg = arg.stack || arg;
        let name = arg.name || '[ ❌ ERROR ❌ ]';
        let log = name.yellow + '  ' + arg.red;
        return log;
      });

    consoleLog.apply(console, args);
  }
};

module.exports = logger;
