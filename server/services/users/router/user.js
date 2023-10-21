const ControllerUser = require("../controllers/userController");

const router = require("express").Router();

router.get("/users", ControllerUser.getUser);
router.get("/users/:id", ControllerUser.findById);
router.post("/users", ControllerUser.createUser);
router.delete("/users/:id", ControllerUser.deleteUser);

module.exports = router;
