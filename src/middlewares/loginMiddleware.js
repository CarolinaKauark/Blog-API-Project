const { loginSchema } = require('../utils/loginSchema');

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (!error) {
    return res.status(400).json({ 
      message: 'Some required fields are missing', type: 'Invalid Entity',
    });
  }

  next();
};

module.exports = loginMiddleware;