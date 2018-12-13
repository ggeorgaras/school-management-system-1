import mongoose from 'mongoose';
import logger from '../../../../logger';

import {
  findClassByClassTeacherId,
  saveClass,
  updateAttendance,
} from '../../dao/class/dao';
import Class from '../../../../db/model/class';

const _ = require('lodash');

const addClass = async (req, res) => {
  try {
    const body = _.pick(req.body, ['name', 'sec', 'students', 'attendance']);
    // eslint-disable-next-line no-underscore-dangle
    body.students.forEach(student => {
      student._id = mongoose.Types.ObjectId();
    });
    body.classTeacherId = req.user._id;
    body.lastUpdated = new Date().getTime();
    const cla = new Class(body);
    const response = await saveClass(cla);
    res.header('x-auth', req.header('x-auth')).send(response);
  } catch (err) {
    res.status(401).send(err);
  }
};

const getClassByClassTeacherId = async (req, res) => {
  try {
    const { id } = req.params;
    logger.debug('got id');
    const response = await findClassByClassTeacherId(id);
    res.header('x-auth', req.header('x-auth')).send(response);
  } catch (err) {
    res.status(401).send(err);
  }
};

const addAttendance = async (req, res) => {
  try {
    // logger.debug(JSON.stringify(req.params));
    const { id } = req.params;
    const body = _.pick(req.body, ['absent']);
    // logger.debug(body.absent);
    body.absent = body.absent.map(student => mongoose.Types.ObjectId(student));
    body.date = new Date();
    // logger.debug(`Absent ${JSON.stringify(body)}${JSON.stringify(id)}`);
    const response = await updateAttendance(body, id);
    res.header('x-auth', req.header('x-auth')).send(response);
  } catch (err) {
    res.status(401).send(err);
  }
};

export { getClassByClassTeacherId, addClass, addAttendance };
