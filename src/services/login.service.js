const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) throw errorGenerate(400, 'Invalid fields');

  return user;
};

module.exports = { login };