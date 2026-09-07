const express = require("express");

console.log("🔥 userRoutes chargé");

const {
    getUsers,
    getUserById,
    createUser,
    modifierDisponibilite,
    deleteUser,
    getProfile,
    updateProfile,
    changePassword,
    rechercherTechniciens,
} = require("../controller/userController");

const router = express.Router();

// ===============================
// GESTION DU PROFIL CLIENT
// ===============================

router.get("/:id/profile", getProfile);

router.put("/:id/profile", updateProfile);

router.put("/:id/password", changePassword);

// ===============================
// RECHERCHE TECHNICIENS
// ===============================

router.get("/techniciens/recherche", rechercherTechniciens);

// ===============================
// GESTION UTILISATEURS
// ===============================

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/create", createUser);

router.put("/:id/disponibilite", modifierDisponibilite);

router.delete("/:id", deleteUser);

module.exports = router;