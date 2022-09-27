const { Sequelize, Op } = require('sequelize');
const config = require('../config/config');

const { Category, BlogPost, PostCategory, User } = require('../models');
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

const includeDefault = { 
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }, 
    { model: Category, as: 'categories', through: PostCategory },
  ], 
};

const getAllBlogPost = async () => BlogPost.findAll(includeDefault);

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, includeDefault);

  if (!blogPost) throw errorGenerate(404, 'Post does not exist');

  return blogPost;
};

const isAuthorizedUser = async (userId, id) => {
  const blogPost = await getBlogPostById(id);
  if (blogPost.userId !== userId) throw errorGenerate(401, 'Unauthorized user');
};

const updateBlogPostById = async (userId, id, body) => {
  await isAuthorizedUser(userId, id);

  await BlogPost.update(body, { where: { id } });

  const newBlogPost = await getBlogPostById(id);
  return newBlogPost;
};

const deleteBlogPostById = async (userId, id) => {
  await isAuthorizedUser(userId, id);

  await BlogPost.destroy({ where: { id } });
};

const getByQuery = async (q) => BlogPost.findAll({ 
    where: { 
      [Op.or]: [
        { title: { [Op.like]: q } },
        { content: { [Op.like]: q } },
      ],
    },
    ...includeDefault,
  });

module.exports = {
  insertBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
  getByQuery,
};