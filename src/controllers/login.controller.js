require('dotenv/config');
const jwt = require('jsonwebtoken');
const loginService = require('../services/login.service');

const login = async (req, res, next) => {
  console.log('controller');
  try {
    const { email, password } = req.body;
    await loginService.login(email, password);
    console.log('passou do service');

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email } }, process.env.JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
      console.log('Erro no controller login');
      console.log(err.message);
      next(err);
    }
};

module.exports = { login };