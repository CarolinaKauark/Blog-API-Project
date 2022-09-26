const loginService = require('../services/login.service');
const { generateToken } = require('../utils/JWT');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { id, displayName, image } = await loginService.login(email, password);

    const token = generateToken({ id, displayName, image });

    return res.status(200).json({ token });
  } catch (err) {
      console.log('Erro no controller login');
      console.log(err.message);
      next(err);
    }
};

module.exports = { login };