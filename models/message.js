const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    expediteurId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    destinataireId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    lu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  },
);

module.exports = Message;
