/* @flow */
import { Router } from 'express';
import { users, login } from './routes/application/controller/queries';

const router = new Router();

// Register your routes and middleware to handle them here!!
const defaultEndpoint = (req, res) => {
  res.render('homepagedesktop', { message: 'Home page' });
};

router.get('/', defaultEndpoint);

router.post('/users', users);

router.post('/users/login', login);

// router.delete('/users/me/token', deleteToken);

export default router;
