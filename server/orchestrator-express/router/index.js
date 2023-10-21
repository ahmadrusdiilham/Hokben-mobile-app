const router = require("express").Router();

router.use(require("./user"));
router.use(require("./item"));
module.exports = router;
