const router = require("express").Router();

router.use(require("./user"));
router.use(require("./pub"));
router.use(require("./admin"));
module.exports = router;
