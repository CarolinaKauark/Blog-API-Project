const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const userController = require('../controllers/user.controller');
const { authorizationToken } = require('../middlewares/authToken');

const user = express.Router();

user.get('/:id', authorizationToken, userController.getUserById);

user.get('/', authorizationToken, userController.listAllUsers);

user.post('/', userMiddleware, userController.postUser);

module.exports = user;