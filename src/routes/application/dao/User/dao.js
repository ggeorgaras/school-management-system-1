import logger from '../../../../logger';
import User from '../../../../db/model/user';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const _ = require('lodash');

const saveUser = async user =>
  // logger.debug(`user:${JSON.stringify(user)}`);
  new Promise((resolve, reject) => {
    user.save((err, result) => {
      if (err) {
        logger.error(`Unable to save created package in database: ${err}`);
        reject(err);
      } else {
        logger.debug(`Package data saved successfully to mongodb:${result}`);
        resolve(result);
      }
    });
  });

const findByCredential = async body => {
  logger.debug('Creating package in mongodb');
  return new Promise((resolve, reject) => {
    User.findOne({ username: body.username }).then(user => {
      logger.debug(`username:${JSON.stringify(user)}`);
      if (!user) reject();

      bcrypt.compare(body.password, user.password, (err, res) => {
        logger.debug(`res:${JSON.stringify(res)}`);
        if (res) resolve(user);
        else reject();
      });
    });
  });
};

const updateToken = async (username: String, tokens: []) => {
  const updateConditions = { username };
  logger.debug(`Conditions for update: ${JSON.stringify(tokens)}`);
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(updateConditions, { tokens }, (err, result) => {
      if (err) {
        logger.error(`Unable to save update to package in mongoDb. ${err}`);
        reject(err);
      } else {
        logger.debug('Package update saved successfully to mongodb');
        resolve(result);
      }
    });
  });
};

const findByToken = token => {
  logger.debug('Inside find by token');
  let decoded;
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    try {
      decoded = jwt.verify(token, 'abc123');
    } catch (err) {
      logger.error('got error');
      return reject();
    }
    User.findOne(
      {
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth',
      },
      (err, result) => {
        if (err) {
          logger.error(`Unable to save update to package in mongoDb. ${err}`);
          reject(err);
        } else {
          logger.debug('Package update saved successfully to mongodb');
          resolve(result);
        }
      },
    );
  });
};
export { saveUser, findByCredential, updateToken, findByToken };
