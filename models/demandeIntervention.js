const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const DemandeIntervention = sequelize.define(
    "DemandeIntervention", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nomClient: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        service: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        dateIntervention: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        statut: {
            type: DataTypes.ENUM(
                "en_attente",
                "acceptee",
                "en_cours",
                "terminee",
                "annulee",
            ),
            defaultValue: "en_attente",
            allowNull: false,
        },
    }, {
        tableName: "demandes_intervention",
        timestamps: true,
    },
);

module.exports = DemandeIntervention;