const categoriesService = require('../services/categories.service');
const errorGenerate = require('../utils/errorGenerate');

const insertCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw errorGenerate(400, '"name" is required');

    const newCategory = await categoriesService.insertCategory(name);

    return res.status(201).json(newCategory);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await categoriesService.getAllCategories(); 
    return res.status(200).json(allCategories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  insertCategory,
  getAllCategories,
};