import logger from '../../../logger';

import generateAuthToken from '../util/util';
import { findByCredential, saveUser, updateToken } from '../dao/dao';
import User from '../../../db/model/user';

const _ = require('lodash');

const users = async (req, res) => {
  logger.debug(`inside /users:${JSON.stringify(req.body)}`);
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const user = new User(body);
    const result = await generateAuthToken(user);
    const response = await saveUser(result.user);

    logger.debug(`result:${JSON.stringify(response)}`);
    res
      .header('x-auth', result.token)
      .send(_.pick(response, ['_id', 'username']));
  } catch (err) {
    res.status(401).send(err);
  }
};

const login = async (req, res) => {
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const user = await findByCredential(body);
    const result = await generateAuthToken(user);
    const response = await updateToken(
      result.user.username,
      result.user.tokens,
    );
    logger.debug(`result:${JSON.stringify(response)}`);
    res
      .header('x-auth', result.token)
      .send(_.pick(response, ['_id', 'username']));
  } catch (err) {
    res.status(401).send(err);
  }
};

export { users, login };
