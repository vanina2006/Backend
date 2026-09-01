const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Publication = sequelize.define(
  "Publication",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
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

    technicienId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "publications",
    timestamps: true,
  },
);

module.exports = Publication;
