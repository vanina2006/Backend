const Publication = require("../models/publication");

// =====================================================
// RÉCUPÉRER TOUTES LES PUBLICATIONS
// =====================================================
const getPublications = async (req, res) => {
  try {
    const publications = await Publication.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Publications récupérées avec succès.",
      publications,
    });
  } catch (error) {
    console.error("Erreur récupération publications :", error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des publications.",
      error: error.message,
    });
  }
};

// =====================================================
// RÉCUPÉRER UNE PUBLICATION PAR SON ID
// =====================================================
const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const publication = await Publication.findByPk(id);

    if (!publication) {
      return res.status(404).json({
        message: "Publication introuvable.",
      });
    }

    return res.status(200).json({
      message: "Publication récupérée avec succès.",
      publication,
    });
  } catch (error) {
    console.error("Erreur récupération publication :", error);

    return res.status(500).json({
      message: "Erreur lors de la récupération de la publication.",
      error: error.message,
    });
  }
};

// =====================================================
// CRÉER UNE PUBLICATION
// =====================================================
const createPublication = async (req, res) => {
  try {
    const { titre, description, profession, technicienId } = req.body;

    if (!titre || !description || !technicienId) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires.",
      });
    }

    let photo = null;

    if (req.file) {
      photo = req.file.filename;
    }

    const publication = await Publication.create({
      titre,
      description,
      photo,
      profession: profession || null,
      technicienId,
    });

    return res.status(201).json({
      message: "Publication créée avec succès.",
      publication,
    });
  } catch (error) {
    console.error("Erreur création publication :", error);

    return res.status(500).json({
      message: "Erreur lors de la création de la publication.",
      error: error.message,
    });
  }
};

// =====================================================
// SUPPRIMER UNE PUBLICATION
// =====================================================
const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;

    const publication = await Publication.findByPk(id);

    if (!publication) {
      return res.status(404).json({
        message: "Publication introuvable.",
      });
    }

    await publication.destroy();

    return res.status(200).json({
      message: "Publication supprimée avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression publication :", error);

    return res.status(500).json({
      message: "Erreur lors de la suppression de la publication.",
      error: error.message,
    });
  }
};

module.exports = {
  getPublications,
  getPublicationById,
  createPublication,
  deletePublication,
};
