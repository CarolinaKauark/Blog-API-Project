const errorGenerate = require('../utils/errorGenerate');
const { authenticate } = require('../utils/JWT');

const authorizationToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    throw errorGenerate(401, 'Token not found');
    // return res.status(401).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = authenticate(authorization);
    console.log(decoded);
    req.user = { ...decoded };
    next();
  } catch (err) {
    throw errorGenerate(401, 'Expired or invalid token');
  }
};

module.exports = { authorizationToken };