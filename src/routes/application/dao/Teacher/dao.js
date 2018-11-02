import logger from '../../../../logger';
import Teacher from '../../../../db/model/teacher';

const saveTeacher = async teacher =>
  // logger.debug(`user:${JSON.stringify(user)}`);
  new Promise((resolve, reject) => {
    teacher.save((err, result) => {
      if (err) {
        logger.error(`Unable to save created teacher in database: ${err}`);
        reject(err);
      } else {
        logger.debug(`Teacher data saved successfully to mongodb:${result}`);
        resolve(result);
      }
    });
  });

const findTeacher = async id => {
  logger.debug('Creating package in mongodb');
  return new Promise((resolve, reject) => {
    Teacher.findById(id).then(teacher => {
      logger.debug(`Teacher:${JSON.stringify(teacher)}`);
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!teacher) reject('Teacher not found');
      else resolve(teacher);
    });
  });
};
export { saveTeacher, findTeacher };
