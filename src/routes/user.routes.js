const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const userController = require('../controllers/user.controller');

const user = express.Router();

user.post('/', userMiddleware, userController.postUser);

module.exports = user;