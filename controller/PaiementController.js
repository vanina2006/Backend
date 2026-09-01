const Paiement = require("../models/Paiement");

// =====================================================
// RÉCUPÉRER TOUS LES PAIEMENTS
// =====================================================
const getPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Paiements récupérés avec succès.",
      paiements,
    });
  } catch (error) {
    console.error("Erreur récupération paiements :", error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des paiements.",
      error: error.message,
    });
  }
};

// =====================================================
// RÉCUPÉRER UN PAIEMENT PAR ID
// =====================================================
const getPaiementById = async (req, res) => {
  try {
    const { id } = req.params;

    const paiement = await Paiement.findByPk(id);

    if (!paiement) {
      return res.status(404).json({
        message: "Paiement introuvable.",
      });
    }

    return res.status(200).json({
      message: "Paiement récupéré avec succès.",
      paiement,
    });
  } catch (error) {
    console.error("Erreur récupération paiement :", error);

    return res.status(500).json({
      message: "Erreur lors de la récupération du paiement.",
      error: error.message,
    });
  }
};

// =====================================================
// CRÉER UN PAIEMENT
// =====================================================
const createPaiement = async (req, res) => {
  try {
    const { montant, methodePaiement, reference, userId, demandeId } = req.body;

    if (!montant || !methodePaiement || !userId || !demandeId) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires.",
      });
    }

    const paiement = await Paiement.create({
      montant,
      methodePaiement,
      reference: reference || null,
      userId,
      demandeId,
    });

    return res.status(201).json({
      message: "Paiement créé avec succès.",
      paiement,
    });
  } catch (error) {
    console.error("Erreur création paiement :", error);

    return res.status(500).json({
      message: "Erreur lors de la création du paiement.",
      error: error.message,
    });
  }
};

// =====================================================
// MODIFIER LE STATUT D'UN PAIEMENT
// =====================================================
const modifierStatut = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const statutsAutorises = ["en_attente", "paye", "echoue"];

    if (!statut || !statutsAutorises.includes(statut)) {
      return res.status(400).json({
        message: "Statut invalide.",
        statutsAutorises,
      });
    }

    const paiement = await Paiement.findByPk(id);

    if (!paiement) {
      return res.status(404).json({
        message: "Paiement introuvable.",
      });
    }

    paiement.statut = statut;

    await paiement.save();

    return res.status(200).json({
      message: "Statut du paiement modifié avec succès.",
      paiement,
    });
  } catch (error) {
    console.error("Erreur modification statut paiement :", error);

    return res.status(500).json({
      message: "Erreur lors de la modification du statut.",
      error: error.message,
    });
  }
};

// =====================================================
// SUPPRIMER UN PAIEMENT
// =====================================================
const deletePaiement = async (req, res) => {
  try {
    const { id } = req.params;

    const paiement = await Paiement.findByPk(id);

    if (!paiement) {
      return res.status(404).json({
        message: "Paiement introuvable.",
      });
    }

    await paiement.destroy();

    return res.status(200).json({
      message: "Paiement supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression paiement :", error);

    return res.status(500).json({
      message: "Erreur lors de la suppression du paiement.",
      error: error.message,
    });
  }
};

module.exports = {
  getPaiements,
  getPaiementById,
  createPaiement,
  modifierStatut,
  deletePaiement,
};
