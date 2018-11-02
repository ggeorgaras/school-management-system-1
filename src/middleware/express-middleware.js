import logger from '../logger';

const { findByToken } = require('../routes/application/dao/User/dao');

const authenticate = async (req, res, next) => {
  const token = req.header('x-auth');
  logger.debug(`insde middleware:${token}`);
  try {
    const user = await findByToken(token);
    if (!user) throw Error;
    else {
      req.user = user;
      req.token = token;
      next();
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

export default authenticate;
