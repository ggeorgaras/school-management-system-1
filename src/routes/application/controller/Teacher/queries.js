import mongoose from 'mongoose';

import { findTeacher, saveTeacher } from '../../dao/Teacher/dao';
import Teacher from '../../../../db/model/teacher';

const _ = require('lodash');

const createTeacher = async (req, res) => {
  try {
    const body = _.pick(req.body, [
      'firstName',
      'lastName',
      'employeeId',
      'timeTable',
    ]);
    // eslint-disable-next-line no-underscore-dangle
    body._id = mongoose.Types.ObjectId(req.user._id);
    body.lastUpdated = new Date().getTime();
    const teacher = new Teacher(body);
    const response = await saveTeacher(teacher);
    res.header('x-auth', req.header('x-auth')).send(response);
  } catch (err) {
    res.status(401).send(err);
  }
};

const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await findTeacher(id);
    res.header('x-auth', req.header('x-auth')).send(response);
  } catch (err) {
    res.status(401).send(err);
  }
};

export { getTeacher, createTeacher };
