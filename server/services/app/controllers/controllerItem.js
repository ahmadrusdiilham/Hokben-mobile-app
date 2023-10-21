const { Item, User, Category, Ingredient } = require("../models/index");
const { sequelize } = require("../models");
class ControllerItem {
  static async fetchItem(req, res, next) {
    try {
      const items = await Item.findAll({
        include: [
          // {
          //   model: User,
          //   attributes: ["username", "email", "role", "phoneNumber", "address"],
          // },
          {
            model: Category,
          },
          {
            model: Ingredient,
          },
        ],
      });
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }
  static async addItem(req, res, next) {
    const t = await sequelize.transaction();
    try {
      console.log(req.body);
      const {
        name,
        description,
        price,
        imgUrl,
        ingredients,
        CategoryId,
        MongoId,
        UserId,
      } = req.body;
      const newItem = await Item.create(
        {
          UserId,
          MongoId,
          name,
          description,
          price,
          imgUrl,
          CategoryId,
        },
        { transaction: t }
      );

      const ingredient = ingredients.split(",").map((el) => {
        return {
          name: el,
          ItemId: newItem.id,
        };
      });
      const newIngredient = await Ingredient.bulkCreate(ingredient, {
        transaction: t,
      });

      await t.commit();
      res.status(201).json({ message: "Success add item" });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async detailItem(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, "masuk ID");
      const item = await Item.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Ingredient,
          },
        ],
      });
      if (!item) {
        throw { name: "item_not_found" };
      }
      res.status(200).json(item);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      const findItem = await Item.findByPk(id);
      if (!findItem) {
        throw { name: "item_not_found" };
      }
      await Item.destroy({
        where: { id },
      });
      res.status(200).json({ message: `Item with id ${id} Success Deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      await Category.destroy({
        where: { id },
      });
      res.status(200).json({ message: "Deleted Success" });
    } catch (err) {
      next(err);
    }
  }

  static async editItem(req, res, next) {
    try {
      const { name, description, price, imgUrl, CategoryId } = req.body;
      const { id } = req.params;
      const item = await Item.findByPk(id);
      if (!item) {
        throw { name: "item_not_found" };
      }
      const updateItem = await Item.update(
        {
          name,
          description,
          price,
          imgUrl,
          CategoryId,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: "Edit Success" });
    } catch (err) {
      next(err);
    }
  }
  static async pubFetchItems(req, res, next) {
    try {
      const { CategoryId } = req.query;
      let option = {
        where: {},
      };
      if (CategoryId) {
        option.where.CategoryId = CategoryId;
      }
      const items = await Item.findAll(option);
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }
  static async pubDetailItem(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
          },
          {
            model: Ingredient,
          },
        ],
      });
      if (!item) {
        throw { name: "item_not_found" };
      }
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }

  static async landingPageItem(req, res, next) {
    try {
      const items = await Item.findAll({ limit: 5 });
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerItem;
