const errorGenerate = require('../utils/errorGenerate');
const { authenticate } = require('../utils/JWT');

const authorizationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw errorGenerate(401, 'Token not found');
  }

  try {
    const decoded = authenticate(authorization);
    req.user = { ...decoded };
    
    next();
  } catch (err) {
    throw errorGenerate(401, 'Expired or invalid token');
  }
};

module.exports = { authorizationToken };