const Message = require("../models/message");
const User = require("../models/users");

// =====================================================
// ENVOYER UN MESSAGE
// =====================================================
const envoyerMessage = async (req, res) => {
  try {
    const { expediteurId, destinataireId, contenu } = req.body;

    // Vérifier les champs obligatoires
    if (!expediteurId || !destinataireId || !contenu) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires.",
      });
    }

    // Vérifier que l'expéditeur existe
    const expediteur = await User.findByPk(expediteurId);

    if (!expediteur) {
      return res.status(404).json({
        message: "Expéditeur introuvable.",
      });
    }

    // Vérifier que le destinataire existe
    const destinataire = await User.findByPk(destinataireId);

    if (!destinataire) {
      return res.status(404).json({
        message: "Destinataire introuvable.",
      });
    }

    // Créer le message
    const message = await Message.create({
      expediteurId,
      destinataireId,
      contenu,
      lu: false,
    });

    return res.status(201).json({
      message: "Message envoyé avec succès.",
      messageEnvoye: message,
    });
  } catch (error) {
    console.error("Erreur envoi message :", error);

    return res.status(500).json({
      message: "Erreur lors de l'envoi du message.",
      error: error.message,
    });
  }
};

// =====================================================
// RÉCUPÉRER UNE CONVERSATION
// =====================================================
const getConversation = async (req, res) => {
  try {
    const { expediteurId, destinataireId } = req.params;

    const messages = await Message.findAll({
      where: {
        [require("sequelize").Op.or]: [
          {
            expediteurId: expediteurId,
            destinataireId: destinataireId,
          },
          {
            expediteurId: destinataireId,
            destinataireId: expediteurId,
          },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      message: "Conversation récupérée avec succès.",
      messages: messages,
    });
  } catch (error) {
    console.error("Erreur récupération conversation :", error);

    return res.status(500).json({
      message: "Erreur lors de la récupération de la conversation.",
      error: error.message,
    });
  }
};

// =====================================================
// MARQUER UN MESSAGE COMME LU
// =====================================================
const marquerCommeLu = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        message: "Message introuvable.",
      });
    }

    message.lu = true;

    await message.save();

    return res.status(200).json({
      message: "Message marqué comme lu.",
      messageModifie: message,
    });
  } catch (error) {
    console.error("Erreur modification message :", error);

    return res.status(500).json({
      message: "Erreur lors de la modification du message.",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORTATIONS
// =====================================================
module.exports = {
  envoyerMessage,
  getConversation,
  marquerCommeLu,
};
