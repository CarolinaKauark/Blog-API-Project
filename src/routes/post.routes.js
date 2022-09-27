const express = require('express');
const postMiddleware = require('../middlewares/postMiddleware');
const postController = require('../controllers/post.controller');
const { authorizationToken } = require('../middlewares/authToken');

const post = express.Router();

post.post('/', authorizationToken, postMiddleware, postController.insertBlogPost);
post.get('/:id', authorizationToken, postController.getBlogPostById);
post.get('/', authorizationToken, postController.getAllBlogPost);

module.exports = post;