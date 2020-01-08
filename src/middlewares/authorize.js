// middleware for authentication
const utils = require('../helpers/authorize');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const user = await utils.isAuthorized(authorization);
    if (user != null) {
      req.authenticatedUser = user;
      next();
    } else {
      res.status(401).send({ errors: [{ message: CODE_ERROR_TRYING_AUTHORIZE }] });
    }

  } catch (error) {
    next(error);
  }
}