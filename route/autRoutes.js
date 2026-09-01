const express = require("express");

const { register, login } = require("../controller/authControllers");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controller/userController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/register", upload.single("photo"), register);

router.post("/login", login);

router.get("/profile/:id", getProfile);

router.put("/profile/:id", upload.single("photo"), updateProfile);

router.put("/profile/:id/password", changePassword);

module.exports = router;
