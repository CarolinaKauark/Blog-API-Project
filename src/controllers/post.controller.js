const postService = require('../services/post.service');

const insertBlogPost = async (req, res, next) => {
  try {
    const payload = req.body;
    
    const userId = req.user.id;

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

const getBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogPost = await postService.getBlogPostById(id);

    return res.status(200).json(blogPost);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const updateBlogPostById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { body } = req;

    const updatedBlogPost = await postService.updateBlogPostById(userId, id, body);

    return res.status(200).json(updatedBlogPost);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteBlogPostById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await postService.deleteBlogPostById(userId, id);

    return res.status(204).end();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  insertBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
};
