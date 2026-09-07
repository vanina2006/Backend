const express = require("express");

// console.log("🔥 demandesRoute.js est chargé");

const {
    creerDemande,
    getDemandes,
    getDemandeById,
    modifierStatut,
    supprimerDemande,
    getDemandesTechnicien,
} = require("../controller/demandeController");

const router = express.Router();

router.post("/test", (req, res) => {
    res.json({
        message: "POST demandes fonctionne",
    });
});

router.post("/", creerDemande);

router.get("/", getDemandes);

// router.get("/technicien/:technicienId", getDemandesTechnicien);
router.get("/test-technicien", (req, res) => {
    res.json({ message: "ROUTE TECHNICIEN OK" });
});

router.get("/:id", getDemandeById);

router.put("/:id/statut", modifierStatut);

router.delete("/:id", supprimerDemande);

module.exports = router;