const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// ==========================================
// INSCRIPTION
// ==========================================

const register = async(req, res) => {
    try {
        const { nom, prenom, adresse, telephone, email, password, profession } =
        req.body;

        // Vérification des champs obligatoires
        if (!nom || !prenom || !adresse || !telephone || !email || !password) {
            return res.status(400).json({
                message: "Veuillez remplir tous les champs obligatoires.",
            });
        }

        // Vérifier si l'email existe déjà
        const userExiste = await User.findOne({
            where: { email },
        });

        if (userExiste) {
            return res.status(409).json({
                message: "Cet email est déjà utilisé.",
            });
        }

        // Hasher le mot de passe
        const passwordHash = await bcrypt.hash(password, 10);

        // Photo
        const photo = req.file ? req.file.filename : null;

        // Création utilisateur
        const user = await User.create({
            nom,
            prenom,
            adresse,
            telephone,
            email,
            password: passwordHash,
            photo,
            profession: profession || null,
            role: "client",
        });

        return res.status(201).json({
            message: "Inscription réussie.",
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                adresse: user.adresse,
                telephone: user.telephone,
                email: user.email,
                photo: user.photo,
                profession: user.profession,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("ERREUR REGISTER :", error);

        return res.status(500).json({
            message: "Erreur lors de l'inscription.",
            error: error.message,
        });
    }
};

// ==========================================
// CONNEXION
// ==========================================

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification
        if (!email || !password) {
            return res.status(400).json({
                message: "Email et mot de passe obligatoires.",
            });
        }

        // Recherche utilisateur
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect.",
            });
        }

        // Vérification mot de passe
        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect.",
            });
        }

        // Création du token
        const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role,
            },
            "techconnect_secret_key_2026", {
                expiresIn: "1d",
            },
        );

        return res.status(200).json({
            message: "Connexion réussie.",
            token,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                adresse: user.adresse,
                telephone: user.telephone,
                email: user.email,
                photo: user.photo,
                profession: user.profession,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("ERREUR LOGIN :", error);

        return res.status(500).json({
            message: "Erreur lors de la connexion.",
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
};