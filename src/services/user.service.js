const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const postUser = async (payload) => {
  const { email } = payload;
  const hasUser = await User.findOne({ where: { email } });

  if (hasUser) throw errorGenerate(409, 'User already registered');

  const user = User.create(payload);

  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ 
    where: { id }, 
    attributes: {
    exclude: ['password'],
    },
  });
  console.log(user);

  if (!user) throw errorGenerate(404, 'User does not exist');
  return user;
};

const deleteMe = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = { 
  postUser,
  getAllUsers,
  getUserById,
  deleteMe,
};