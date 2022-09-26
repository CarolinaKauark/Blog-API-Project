const express = require('express');
const categoriesController = require('../controllers/categories.controller');

const { authorizationToken } = require('../middlewares/authToken');

const categories = express.Router();

categories.post('/', authorizationToken, categoriesController.insertCategory);
categories.get('/', authorizationToken, categoriesController.getAllCategories);

module.exports = categories;