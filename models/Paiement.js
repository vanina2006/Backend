const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Paiement = sequelize.define(
  "Paiement",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    montant: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    methodePaiement: {
      type: DataTypes.ENUM("especes", "mobile_money", "carte"),
      allowNull: false,
    },

    reference: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    statut: {
      type: DataTypes.ENUM("en_attente", "paye", "echoue"),
      defaultValue: "en_attente",
    },

    datePaiement: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    demandeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "paiements",
    timestamps: true,
  },
);

module.exports = Paiement;
