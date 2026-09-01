const express = require("express");

const {
  getPublications,
  getPublicationById,
  createPublication,
  deletePublication,
} = require("../controller/publicationController");

const upload = require("../middleware/upload");

const router = express.Router();

// Récupérer toutes les publications
router.get("/", getPublications);

// Récupérer une publication par son ID
router.get("/:id", getPublicationById);

// Créer une publication avec une photo
router.post("/", upload.single("photo"), createPublication);

// Supprimer une publication
router.delete("/:id", deletePublication);

module.exports = router;
