const express = require('express');
const postMiddleware = require('../middlewares/postMiddleware');
const postController = require('../controllers/post.controller');
const { authorizationToken } = require('../middlewares/authToken');

const post = express.Router();

post.post('/', authorizationToken, postMiddleware, postController.insertBlogPost);
post.get('/', authorizationToken, postController.getAllBlogPost);

post.get('/search', authorizationToken, postController.getByQuery);

post.get('/:id', authorizationToken, postController.getBlogPostById);
post.put('/:id', authorizationToken, postMiddleware, postController.updateBlogPostById);
post.delete('/:id', authorizationToken, postController.deleteBlogPostById);

module.exports = post;