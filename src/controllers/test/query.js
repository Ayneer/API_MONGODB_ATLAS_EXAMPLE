const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./query.schema');
const repoTest = require('./../../repositories/test');

const validate = inputValidation.validate(schema.schema);

async function handler(req, res, next) {
  try {

    let _User = await repoTest.query(req.params.user_name);
    
    //validate saved
    res.status(200).send({ 
      user: _User
    });

  } catch (error) {
    next(error);
  }
}

module.exports = [validate, handler];
