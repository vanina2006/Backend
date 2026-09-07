const User = require("../models/users");
const bcrypt = require("bcryptjs");

// =====================================================
// RÉCUPÉRER TOUS LES UTILISATEURS
// =====================================================
const getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            order: [
                ["createdAt", "DESC"]
            ],
        });

        res.status(200).json({
            message: "Utilisateurs récupérés avec succès.",
            utilisateurs: users,
        });
    } catch (error) {
        console.error("Erreur récupération utilisateurs :", error);

        res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs.",
            error: error.message,
        });
    }
};

// =====================================================
// RÉCUPÉRER UN UTILISATEUR PAR SON ID
// =====================================================
const getUserById = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        res.status(200).json({
            message: "Utilisateur récupéré avec succès.",
            utilisateur: user,
        });
    } catch (error) {
        console.error("Erreur récupération utilisateur :", error);

        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur.",
            error: error.message,
        });
    }
};

// =====================================================
// CRÉER UN UTILISATEUR
// =====================================================
const createUser = async(req, res) => {
    try {
        const {
            nom,
            prenom,
            adresse,
            telephone,
            email,
            password,
            photo,
            profession,
            role,
        } = req.body;

        if (!nom ||
            !prenom ||
            !adresse ||
            !telephone ||
            !email ||
            !password ||
            !role
        ) {
            return res.status(400).json({
                message: "Veuillez remplir tous les champs obligatoires.",
            });
        }

        const userExiste = await User.findOne({
            where: { email },
        });

        if (userExiste) {
            return res.status(400).json({
                message: "Cet email est déjà utilisé.",
            });
        }

        const rolesAutorises = ["client", "technicien", "admin"];

        if (!rolesAutorises.includes(role)) {
            return res.status(400).json({
                message: "Rôle invalide.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nom,
            prenom,
            adresse,
            telephone,
            email,
            password: hashedPassword,
            photo: photo || null,
            profession: profession || null,
            role,
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            message: "Utilisateur créé avec succès.",
            utilisateur: userResponse,
        });
    } catch (error) {
        console.error("Erreur création utilisateur :", error);

        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur.",
            error: error.message,
        });
    }
};

// =====================================================
// RECHERCHER LES TECHNICIENS
// =====================================================
const rechercherTechniciens = async(req, res) => {
    try {
        const { profession } = req.query;

        const whereCondition = {
            role: "technicien",
        };

        // Filtrer par profession si elle est fournie
        if (profession) {
            whereCondition.profession = profession;
        }

        const techniciens = await User.findAll({
            where: whereCondition,
            attributes: { exclude: ["password"] },
            order: [
                ["createdAt", "DESC"]
            ],
        });

        res.status(200).json({
            message: "Techniciens récupérés avec succès.",
            techniciens,
        });
    } catch (error) {
        console.error("Erreur recherche techniciens :", error);

        res.status(500).json({
            message: "Erreur lors de la recherche des techniciens.",
            error: error.message,
        });
    }
};

// =====================================================
// MODIFIER LA DISPONIBILITÉ D'UN TECHNICIEN
// =====================================================
const modifierDisponibilite = async(req, res) => {
    try {
        const { id } = req.params;
        const { disponibilite } = req.body;

        if (typeof disponibilite !== "boolean") {
            return res.status(400).json({
                message: "La disponibilité doit être true ou false.",
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        if (user.role !== "technicien") {
            return res.status(400).json({
                message: "Seul un technicien peut modifier sa disponibilité.",
            });
        }

        user.disponibilite = disponibilite;

        await user.save();

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({
            message: "Disponibilité modifiée avec succès.",
            utilisateur: userResponse,
        });
    } catch (error) {
        console.error("Erreur disponibilité :", error);

        res.status(500).json({
            message: "Erreur lors de la modification de la disponibilité.",
            error: error.message,
        });
    }
};

// =====================================================
// RÉCUPÉRER LE PROFIL
// =====================================================
const getProfile = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({
                message: "Profil introuvable.",
            });
        }

        res.status(200).json({
            message: "Profil récupéré avec succès.",
            utilisateur: user,
        });
    } catch (error) {
        console.error("Erreur profil :", error);

        res.status(500).json({
            message: "Erreur lors de la récupération du profil.",
            error: error.message,
        });
    }
};

// =====================================================
// MODIFIER LE PROFIL
// =====================================================
const updateProfile = async(req, res) => {
    try {
        const { id } = req.params;

        const { nom, prenom, adresse, telephone, email, profession } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        // Vérifier l'email
        if (email && email !== user.email) {
            const emailExiste = await User.findOne({
                where: { email },
            });

            if (emailExiste) {
                return res.status(400).json({
                    message: "Cet email est déjà utilisé.",
                });
            }
        }

        if (nom !== undefined) user.nom = nom;
        if (prenom !== undefined) user.prenom = prenom;
        if (adresse !== undefined) user.adresse = adresse;
        if (telephone !== undefined) user.telephone = telephone;
        if (email !== undefined) user.email = email;
        if (profession !== undefined) user.profession = profession;

        if (req.file) {
            user.photo = req.file.filename;
        }

        await user.save();

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({
            message: "Profil modifié avec succès.",
            utilisateur: userResponse,
        });
    } catch (error) {
        console.error("Erreur modification profil :", error);

        res.status(500).json({
            message: "Erreur lors de la modification du profil.",
            error: error.message,
        });
    }
};

// =====================================================
// MODIFIER LE MOT DE PASSE
// =====================================================
const changePassword = async(req, res) => {
    try {
        const { id } = req.params;
        const { ancienPassword, nouveauPassword } = req.body;

        if (!ancienPassword || !nouveauPassword) {
            return res.status(400).json({
                message: "Veuillez remplir les deux mots de passe.",
            });
        }

        if (nouveauPassword.length < 6) {
            return res.status(400).json({
                message: "Le nouveau mot de passe doit contenir au moins 6 caractères.",
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        const passwordCorrect = await bcrypt.compare(ancienPassword, user.password);

        if (!passwordCorrect) {
            return res.status(400).json({
                message: "L'ancien mot de passe est incorrect.",
            });
        }

        user.password = await bcrypt.hash(nouveauPassword, 10);

        await user.save();

        res.status(200).json({
            message: "Mot de passe modifié avec succès.",
        });
    } catch (error) {
        console.error("Erreur mot de passe :", error);

        res.status(500).json({
            message: "Erreur lors de la modification du mot de passe.",
            error: error.message,
        });
    }
};

// =====================================================
// SUPPRIMER UN UTILISATEUR
// =====================================================
const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "Utilisateur supprimé avec succès.",
        });
    } catch (error) {
        console.error("Erreur suppression :", error);

        res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur.",
            error: error.message,
        });
    }
};

// =====================================================
// EXPORTATIONS
// =====================================================
module.exports = {
    getUsers,
    getUserById,
    createUser,
    rechercherTechniciens,
    modifierDisponibilite,
    getProfile,
    updateProfile,
    changePassword,
    deleteUser,
};