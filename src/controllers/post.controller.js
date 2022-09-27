const postService = require('../services/post.service');

const insertBlogPost = async (req, res, next) => {
  try {
    const payload = req.body;
    
    const userId = req.user.id;
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', userId);

    const blogPost = await postService.insertBlogPost({ ...payload, userId });

    return res.status(201).json(blogPost);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getAllBlogPost = async (req, res, next) => {
  try {
    const allBlogPost = await postService.getAllBlogPost();

    return res.status(200).json(allBlogPost);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  insertBlogPost,
  getAllBlogPost,
};
