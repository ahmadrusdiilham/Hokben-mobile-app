const UserController = require("../controllers/userController");

const router = require("express").Router();

router.get("/users", UserController.getUser);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
