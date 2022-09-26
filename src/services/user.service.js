const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const postUser = async (payload) => {
  const { email } = payload;
  const hasUser = await User.findOne({ where: { email } });

  if (hasUser) throw errorGenerate(409, 'User already registered');

  const user = User.create(payload);

  return user;
};

module.exports = { postUser };