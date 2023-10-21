const ControllerCategory = require("../controllers/controllerCategory");
const ControllerItem = require("../controllers/controllerItem");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.get("/pub/categories", ControllerCategory.fetchCategoriesPub);
router.get("/pub/items", ControllerItem.pubFetchItems);
router.get("/pub/items/:id", ControllerItem.pubDetailItem);
router.get("/pub/landingPage", ControllerItem.landingPageItem);

// router.use(authentication);
// router.post("/category", ControllerCategory.addCategory);

module.exports = router;
