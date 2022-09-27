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

module.exports = {
  insertBlogPost,
};
