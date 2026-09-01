const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  console.log("✅ POST /messages reçu");

  res.status(200).json({
    message: "La route /messages fonctionne !",
    donnees: req.body,
  });
});

module.exports = router;
