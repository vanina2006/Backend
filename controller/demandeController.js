const DemandeIntervention = require("../models/demandeIntervention");

// ==========================================
// CRÉER UNE DEMANDE D'INTERVENTION
// ==========================================
const creerDemande = async(req, res) => {
    try {
        const {
            nomClient,
            telephone,
            adresse,
            service,
            description,
            dateIntervention,
        } = req.body;

        // Vérification des champs obligatoires
        if (!nomClient || !telephone || !adresse || !service || !description) {
            return res.status(400).json({
                message: "Veuillez remplir tous les champs obligatoires.",
            });
        }

        // Création de la demande
        const demande = await DemandeIntervention.create({
            nomClient,
            telephone,
            adresse,
            service,
            description,
            dateIntervention: dateIntervention || null,
        });

        return res.status(201).json({
            message: "Demande d'intervention créée avec succès.",
            demande,
        });
    } catch (error) {
        console.error("Erreur création demande :", error);

        return res.status(500).json({
            message: "Erreur lors de la création de la demande.",
            error: error.message,
        });
    }
};

// ==========================================
// RÉCUPÉRER TOUTES LES DEMANDES
// ==========================================
const getDemandes = async(req, res) => {
    try {
        const demandes = await DemandeIntervention.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
        });

        return res.status(200).json(demandes);
    } catch (error) {
        console.error("Erreur récupération demandes :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération des demandes.",
            error: error.message,
        });
    }
};

// ==========================================
// RÉCUPÉRER UNE DEMANDE PAR SON ID
// ==========================================
const getDemandeById = async(req, res) => {
    try {
        const { id } = req.params;

        const demande = await DemandeIntervention.findByPk(id);

        if (!demande) {
            return res.status(404).json({
                message: "Demande introuvable.",
            });
        }

        return res.status(200).json(demande);
    } catch (error) {
        console.error("Erreur récupération demande :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération de la demande.",
            error: error.message,
        });
    }
};

// ==========================================
// MODIFIER LE STATUT D'UNE DEMANDE
// ==========================================
const modifierStatut = async(req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const statutsAutorises = [
            "en_attente",
            "acceptee",
            "en_cours",
            "terminee",
            "refusee",
            "annulee",
        ];

        if (!statutsAutorises.includes(statut)) {
            return res.status(400).json({
                message: "Statut invalide.",
            });
        }

        const demande = await DemandeIntervention.findByPk(id);

        if (!demande) {
            return res.status(404).json({
                message: "Demande introuvable.",
            });
        }

        demande.statut = statut;

        await demande.save();

        return res.status(200).json({
            message: "Statut modifié avec succès.",
            demande,
        });
    } catch (error) {
        console.error("Erreur modification statut :", error);

        return res.status(500).json({
            message: "Erreur lors de la modification du statut.",
            error: error.message,
        });
    }
};

// ==========================================
// SUPPRIMER UNE DEMANDE
// ==========================================
const supprimerDemande = async(req, res) => {
    try {
        const { id } = req.params;

        const demande = await DemandeIntervention.findByPk(id);

        if (!demande) {
            return res.status(404).json({
                message: "Demande introuvable.",
            });
        }

        await demande.destroy();

        return res.status(200).json({
            message: "Demande supprimée avec succès.",
        });
    } catch (error) {
        console.error("Erreur suppression demande :", error);

        return res.status(500).json({
            message: "Erreur lors de la suppression de la demande.",
            error: error.message,
        });
    }
};

module.exports = {
    creerDemande,
    getDemandes,
    getDemandeById,
    modifierStatut,
    supprimerDemande,
};