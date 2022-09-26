require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign({ data: { payload } }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const authenticate = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};

module.exports = { generateToken, authenticate };