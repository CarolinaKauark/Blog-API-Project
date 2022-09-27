const { postSchema } = require('../utils/schema');
const errorGenerate = require('../utils/errorGenerate');

const postMiddleware = (req, res, next) => {
  const payload = req.body;

  const { error } = postSchema.validate(payload);

  if (error) {
    throw errorGenerate(400, 'Some required fields are missing');
  }

  next();
};

module.exports = postMiddleware;