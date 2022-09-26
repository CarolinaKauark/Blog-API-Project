const { loginSchema } = require('../utils/loginSchema');
const errorGenerate = require('../utils/errorGenerate');

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    throw errorGenerate(400, 'Some required fields are missing');
  }

  next();
};

module.exports = loginMiddleware;