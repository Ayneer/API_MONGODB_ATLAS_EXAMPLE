const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./authorize.schema');

const validate = inputValidation.validate(schema.schema);

async function handler(req, res, next) {
  try {

    //validate saved
    res.status(200).send({ 
      user: req.authenticatedUser
    });

  } catch (error) {
    next(error);
  }
}

module.exports = [validate, handler];
