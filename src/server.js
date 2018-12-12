/* @flow */
/* eslint-disable no-console, no-shadow */

import app from './app';
// import config from './config';
require('../config/config');

// Launch Node.js server
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log(`Node.js server is listening on ${port}`);
});
// server.timeout = 600000; //by default 120000ms(2 min)

// Shutdown Node.js app gracefully
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (err) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
