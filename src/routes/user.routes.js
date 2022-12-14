const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const userController = require('../controllers/user.controller');
const { authorizationToken } = require('../middlewares/authToken');

const user = express.Router();

user.get('/', authorizationToken, userController.getAllUsers);

user.post('/', userMiddleware, userController.postUser);

user.delete('/me', authorizationToken, userController.deleteMe);

user.get('/:id', authorizationToken, userController.getUserById);

module.exports = user;