const express = require('express');
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/loginMiddleware');

const login = express.Router();

login.post('/', loginMiddleware, loginController.login);

module.exports = login;