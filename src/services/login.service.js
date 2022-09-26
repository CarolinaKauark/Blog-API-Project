const { User } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

const findUser = async (email, password) => {
  console.log('findUser');
 const user = await User.findOne({ where: { email } });
 console.log(user);
 if (!user || user.password !== password) throw errorGenerate(400, 'Invalid fields');
};

const login = async (email, password) => {
  await findUser(email, password);
};

module.exports = { login };