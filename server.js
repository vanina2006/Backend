const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");

const User = require("./models/users");
const DemandeIntervention = require("./models/demandeIntervention");

const routesCreateUser = require("./route/autRoutes");
const userRoutes = require("./route/userRoutes");
const demandeRoutes = require("./route/demandesRoute");
const paiementRoutes = require("./route/PaiementRoutes");
const publicationRoutes = require("./route/publicationRoutes");
const messageRoutes = require("./route/messageRoutes");

dotenv.config();

const app = express();
app.get("/test", (req, res) => {
    res.json({
        message: "C'est bien mon serveur !",
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================================================
// AUTHENTIFICATION
// =====================================================
app.use("/users", routesCreateUser);

// =====================================================
// GESTION DES UTILISATEURS
// =====================================================
app.use("/users", userRoutes);

// =====================================================
// DEMANDE D'INTERVENTION
// =====================================================
app.use("/demandes", demandeRoutes);

// =====================================================
// GESTION DES PAIEMENTS
// =====================================================
app.use("/paiements", paiementRoutes);
// =====================================================
// PUBLICATIONS DES TECHNICIENS
// =====================================================
app.use("/publications", publicationRoutes);
app.use("/messages", messageRoutes);

sequelize
    .authenticate()
    .then(() => {
        console.log("✅ Connexion à MySQL réussie");

        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log("✅ Modèles synchronisés");
    })
    .catch((error) => {
        console.error("❌ Erreur de connexion :", error);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});