const ControllerCategory = require("../controllers/controllerCategory");
const ControllerItem = require("../controllers/controllerItem");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();
router.get("/categories", ControllerCategory.fetchCategory);
router.get("/categories/:id", ControllerCategory.detailCategory);
router.get("/items", ControllerItem.fetchItem);
router.get("/items/:id", ControllerItem.detailItem);

// router.use(authentication);
router.post("/items", ControllerItem.addItem);
router.put("/items/:id", ControllerItem.editItem);
router.put("/categories/:id", ControllerCategory.editCategory);
router.post("/categories", ControllerCategory.addCategory);
router.delete("/items/:id", ControllerItem.deleteItem);
router.delete("/categories/:id", ControllerItem.deleteCategory);

module.exports = router;
