// const Sequelize = require('sequelize');

const { Category, BlogPost, PostCategory } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

// const config = require('../config/config');

// const env = process.env.NODE_ENV || 'development';

// const sequelize = new Sequelize(config[env]);

const findCategory = async (ids) => {
  const categories = await Promise.all(
    ids.map(async (id) => Category.findByPk(id)),
  );

  if (categories.some((id) => !id)) {
    throw errorGenerate(400, '"categoryIds" not found');
  }
};

// const insertPostCategory = async() => {

// }

const insertBlogPost = async ({ title, content, userId, categoryIds }) => {
  await findCategory(categoryIds);
  try {
    const newBlogPost = await BlogPost
      .create({ title, content, userId, published: Date.now(), updated: Date.now() });

    await Promise.all(categoryIds
      .map(async (categoryId) => PostCategory.create({ postId: newBlogPost.id, categoryId })));

    return newBlogPost;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  insertBlogPost,
};