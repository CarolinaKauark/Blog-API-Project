const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const postUser = async (payload) => {
  const { email } = payload;
  const hasUser = await User.findOne({ where: { email } });

  if (hasUser) throw errorGenerate(409, 'User already registered');

  const user = User.create(payload);

  return user;
};

const listAllUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  return users;
};

module.exports = { 
  postUser,
  listAllUsers,
};