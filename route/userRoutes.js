const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  modifierRole,
  modifierDisponibilite,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/create", createUser);

router.put("/:id/role", modifierRole);

router.put("/:id/disponibilite", modifierDisponibilite);

router.delete("/:id", deleteUser);

module.exports = router;
