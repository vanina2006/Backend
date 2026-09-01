const express = require("express");

const {
  getPaiements,
  getPaiementById,
  createPaiement,
  modifierStatut,
  deletePaiement,
} = require("../controller/PaiementController");

const router = express.Router();

// Récupérer tous les paiements
router.get("/", getPaiements);

// Récupérer un paiement par son ID
router.get("/:id", getPaiementById);

// Créer un paiement
router.post("/", createPaiement);

// Modifier le statut d'un paiement
router.put("/:id/statut", modifierStatut);

// Supprimer un paiement
router.delete("/:id", deletePaiement);

module.exports = router;
