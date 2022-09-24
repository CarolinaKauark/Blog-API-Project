const loginService = require('../services/login.service');

const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const sucessLogin = loginService.login({ email, password });

    return res.status(200).json(sucessLogin);
  } catch (err) {
      console.log('Erro no controller login');
      console.log(err.message);
      next(err);
    }
};

module.exports = { login };