/* eslint-disable no-new */
import logger from '../../../../logger';
import Class from '../../../../db/model/class';

const saveClass = async cla =>
  // logger.debug(`user:${JSON.stringify(user)}`);
  new Promise((resolve, reject) => {
    cla.save((err, result) => {
      if (err) {
        logger.error(`Unable to save class in database: ${err}`);
        reject(err);
      } else {
        logger.debug(`Class data saved successfully to mongodb:${result}`);
        resolve(result);
      }
    });
  });

const findClassByClassTeacherId = async id => {
  logger.debug('Creating package in mongodb');
  return new Promise((resolve, reject) => {
    Class.find({ classTeacherId: id }, 'name sec students').then(cla => {
      logger.debug(`Class:${JSON.stringify(cla)}`);
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!cla) {
        logger.debug('Teacher not found');
        reject(new Error('Teacher not found'));
      } else resolve(cla[0]);
    });
  });
};

const updateAttendance = async (attendance, id) => {
  // logger.debug('Creating package in mongodb');
  new Promise((resolve, reject) => {
    Class.findByIdAndUpdate(id, { attendance }, (err, result) => {
      if (err) {
        logger.error(`Unable to  update to attendance in mongoDb. ${err}`);
        reject(err);
      } else {
        logger.debug('Attendance update  successfully to mongodb');
        resolve(result);
      }
    });
  });
};
export { saveClass, findClassByClassTeacherId, updateAttendance };
