const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const findUser = (email, password) => {
 const user = User.findOne({ where: email, password });
 if (!user) throw errorGenerate(400, 'Invalid fields');
};

const login = async ({ email, password }) => {
  await findUser(email, password);
  console.log('servce');
};

module.exports = { login };