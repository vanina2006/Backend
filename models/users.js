const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
    "User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        profession: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // AJOUT : disponibilité du technicien
        disponibilite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        role: {
            type: DataTypes.ENUM("client", "technicien", "admin"),
            allowNull: false,
            defaultValue: "client",
        },
    }, {
        tableName: "users",
        timestamps: true,
    },
);
const DemandeIntervention = require("./demandeIntervention");

User.hasMany(DemandeIntervention, {
    foreignKey: "technicienId",
    as: "demandes",
});

DemandeIntervention.belongsTo(User, {
    foreignKey: "technicienId",
    as: "technicien",
});

module.exports = User;