const express = require("express");

const {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
} = require("../controllers/user");

const router = express.Router();

router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUserById);
router.get("/users", getUsers);

module.exports = router;
