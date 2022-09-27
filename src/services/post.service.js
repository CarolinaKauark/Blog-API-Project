 const Sequelize = require('sequelize');
 const config = require('../config/config');

const { Category, BlogPost, PostCategory } = require('../models');
const errorGenerate = require('../utils/errorGenerate');

// Cria a configuração correta para o transaction
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const findCategory = async (ids) => {
  const categories = await Promise.all(
    ids.map(async (id) => Category.findByPk(id)),
  );

  if (categories.some((id) => !id)) {
    throw errorGenerate(400, '"categoryIds" not found');
  }
};

const insertPostCategory = async (categoryIds, postId, t) => {
  await Promise.all(categoryIds
    .map(async (categoryId) => PostCategory.create({ postId, categoryId },
      { transaction: t })));
};

const insertBlogPost = async ({ title, content, userId, categoryIds }) => {
  await findCategory(categoryIds);
  try {
    const result = await sequelize.transaction(async (t) => {
      const newBlogPost = await BlogPost
        .create({ title, content, userId, published: Date.now(), updated: Date.now() },
         { transaction: t });

      await insertPostCategory(categoryIds, newBlogPost.id, t);

      return newBlogPost;
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  insertBlogPost,
};