const express = require("express");

console.log("🔥 demandesRoute.js est chargé");

const {
  creerDemande,

  getDemandes,

  getDemandeById,

  modifierStatut,

  supprimerDemande,
} = require("../controller/demandeController");

const router = express.Router();

// Test de la route

router.post("/test", (req, res) => {
  res.json({
    message: "POST demandes fonctionne",
  });
});

// Créer une demande

router.post("/", creerDemande);

// Récupérer toutes les demandes

router.get("/", getDemandes);

// Récupérer une demande

router.get("/:id", getDemandeById);

// Modifier le statut

router.put("/:id/statut", modifierStatut);

// Supprimer une demande

router.delete("/:id", supprimerDemande);

module.exports = router;
