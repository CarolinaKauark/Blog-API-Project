const { userSchema } = require('../utils/schema');
const errorGenerate = require('../utils/errorGenerate');

const userMiddleware = (req, res, next) => {
  const payload = req.body;
  console.log('oi');

  const { error } = userSchema.validate(payload);

  if (error) {
    throw errorGenerate(400, error.message);
  }

  next();
};

module.exports = userMiddleware;