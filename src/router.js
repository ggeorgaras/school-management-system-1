/* @flow */
import { Router } from 'express';
import { users, login } from './routes/application/controller/User/queries';
import {
  getTeacher,
  createTeacher,
} from './routes/application/controller/Teacher/queries';
import {
  addClass,
  getClassByClassTeacherId,
  addAttendance,
} from './routes/application/controller/Class/queries';
import authenticate from './middleware/express-middleware';

const router = new Router();

// Register your routes and middleware to handle them here!!
const defaultEndpoint = (req, res) => {
  res.render('homepagedesktop', { message: 'Home page' });
};

router.get('/', defaultEndpoint);

router.post('/users', users);

router.post('/users/login', login);

router.get('/users/:id', authenticate, getTeacher);

router.post('/users/:username', authenticate, createTeacher);

router.post('/class', authenticate, addClass);

router.get('/teacher/:id/getClass', authenticate, getClassByClassTeacherId);

router.post('/class/:id/attendance', authenticate, addAttendance);

// router.delete('/users/me/token', deleteToken);

export default router;
