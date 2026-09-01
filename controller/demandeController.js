const DemandeIntervention = require("../models/demandeIntervention");

// Créer une demande d'intervention
const creerDemande = async (req, res) => {
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

// Récupérer toutes les demandes
const getDemandes = async (req, res) => {
  try {
    const demandes = await DemandeIntervention.findAll({
      order: [["createdAt", "DESC"]],
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

// Récupérer une demande par son ID
const getDemandeById = async (req, res) => {
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

// Modifier le statut d'une demande
const modifierStatut = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const statutsAutorises = [
      "en_attente",
      "acceptee",
      "en_cours",
      "terminee",
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

// Supprimer une demande
const supprimerDemande = async (req, res) => {
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
