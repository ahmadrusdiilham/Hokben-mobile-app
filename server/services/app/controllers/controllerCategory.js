const { Category } = require("../models/index");

class ControllerCategory {
  static async fetchCategory(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
  static async detailCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const newCategory = await Category.update(
        { name },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: `Category with name ${name} created` });
    } catch (err) {
      next(err);
    }
  }

  static async fetchCategoriesPub(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerCategory;
