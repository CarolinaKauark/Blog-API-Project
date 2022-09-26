const { generateToken } = require('../utils/JWT');
const userService = require('../services/user.service');

const postUser = async (req, res, next) => {
 try {
  const payload = req.body;

  const { id, displayName, image, email } = await userService.postUser(payload);

  const token = generateToken({ id, displayName, image, email });
  return res.status(201).json({ token });
 } catch (err) {
  console.log('Erro no controller user');
  console.log(err.message);
  next(err);
 }
};

const listAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.listAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log('Erro no controller listAllUsers');
    console.log(err.message);
    next(err);
  }
};

module.exports = { 
  postUser,
  listAllUsers,
};