const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get("/", userController.getAllUsers);
router.get("/downloadExcel", userController.exportUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
