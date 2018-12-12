import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import morgan from 'morgan';
import router from './router';
import logger from './logger';

require('./mongoose/mongoose');
// const _ = require('lodash');
// const { User } = require('./db/model/user');
// const { authenticate } = require('./middleware/express-middleware');

// ========================= Express Middleware ================================

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.set('trust proxy', 'loopback');

app.use(
  cors({
      exposedHeaders: ['x-auth'],
      })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');
pe.withoutColors(); // So that logfile output is clean.
pe.start(); // Ensures that PrettyError is used app-wide.

app.use((err, req, res, next) => {
  process.stderr.write(pe.render(err));
  next();
});

// // *******remove these once Angular front end is written ********
app.use(express.static(`${__dirname}/../public`));
app.set('views', `${__dirname}/../public`); // __dirname is {workspace}/build

app.set('view engine', 'html');

// // ****************************************

// ========================= API Routes ========================================

// ===================== POST /users =======================================

// app.post('/users', (req, res) => {
//   logger.info(`inside /users`);
//   const body = _.pick(req.body, ['username', 'password']);
//   const user = new User(body);

//   user
//     .generateAuthToken()
//     .then(token => {
//       res.header('x-auth', token).send(user.toJSON());
//     })
//     .catch(err => {
//       res.status(400).send(err);
//     });
// });

// // ===================== POST /users/login =======================================

// app.post('/users/login', (req, res) => {
//   const body = _.pick(req.body, ['username', 'password']);

//   User.findByCredentials(body)
//     .then(user =>
//       user.generateAuthToken().then(token => {
//         res.header('x-auth', token).send(user.toJSON());
//       }),
//     )
//     .catch(err => res.status(400).send(err));
// });

// // ===================== DELETE /users/me/token =======================================

// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(
//     () => {
//       res.send();
//     },
//     err => {
//       res.satus(400).send(err);
//     },
//   );
// });

// ========================= STARTING SERVER ON PORT 5001 =======================================

// app.listen(port, () => {
//   console.log(`Server starting at port ${port} !!`);
// });

export default app;
