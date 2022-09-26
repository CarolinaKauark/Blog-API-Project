const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) throw errorGenerate(400, 'Invalid fields');

  return user;
};

module.exports = { login };