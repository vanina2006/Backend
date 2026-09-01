const { Demande } = require("../models");

const getDemandeById = async (req, res) => {
  try {
    const { id } = req.params;

    const demande = await Demande.findByPk(id);

    if (!demande) {
      return res.status(404).json({
        message: "Demande introuvable.",
      });
    }

    res.status(200).json(demande);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};
