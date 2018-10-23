import logger from '../../../logger';

const jwt = require('jsonwebtoken');

const generateAuthToken = async user => {
  logger.debug('Creating package in mongodb');

  const access = 'auth';
  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access,
      },
      'abc123',
    )
    .toString();

  user.tokens.push({
    access,
    token,
  });
  return { user, token };
  // logger.debug(`user:${JSON.stringify(user)}`);
};

export default generateAuthToken;
