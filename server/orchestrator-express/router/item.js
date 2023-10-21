const ItemController = require("../controllers/itemController");

const router = require("express").Router();

router.get("/items", ItemController.getItems);
router.get("/items/:id", ItemController.detailItem);
router.post("/items", ItemController.createItem);
router.put("/items/:id", ItemController.updateItem);
router.delete("/items/:id", ItemController.deleteItem);

module.exports = router;
