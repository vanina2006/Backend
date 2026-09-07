const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    },
);

const testConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connexion à MySQL réussie !");
    } catch (error) {
        console.error("❌ Erreur de connexion à MySQL :", error.message);
    }
};

module.exports = {
    sequelize,
    testConnection,
};