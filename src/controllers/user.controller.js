const { generateToken } = require('../utils/JWT');
const userService = require('../services/user.service');

const postUser = async (req, res, next) => {
 try {
  const payload = req.body;

  const { id, displayName, image, email } = await userService.postUser(payload);

  const token = generateToken({ id, displayName, image, email });
  return res.status(201).json({ token });
 } catch (err) {
  console.log(err.message);
  next(err);
 }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    await userService.deleteMe(id);

    return res.status(204).end();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { 
  postUser,
  getAllUsers,
  getUserById,
  deleteMe,
};