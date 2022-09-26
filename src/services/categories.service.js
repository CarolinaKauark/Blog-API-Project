const { Category } = require('../models');

const insertCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = () => Category.findAll();

module.exports = {
  insertCategory,
  getAllCategories,
};