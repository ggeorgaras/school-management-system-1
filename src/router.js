/* @flow */
import { Router } from 'express';
import { users, login } from './routes/application/controller/User/queries';
import {
  getTeacher,
  createTeacher,
} from './routes/application/controller/Teacher/queries';
import authenticate from './middleware/express-middleware';

const router = new Router();
router.use(authenticate);

// Register your routes and middleware to handle them here!!
const defaultEndpoint = (req, res) => {
  res.render('homepagedesktop', { message: 'Home page' });
};

router.get('/', defaultEndpoint);

router.post('/users', users);

router.post('/users/login', login);

router.get('/users/:id', getTeacher);

router.post('/users/:username', createTeacher);

// router.delete('/users/me/token', deleteToken);

export default router;
