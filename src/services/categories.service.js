const { Category } = require('../models');

const insertCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  insertCategory,
};