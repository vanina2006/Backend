const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "techConnect", // Nom de la base de données
  "root", // Utilisateur MySQL
  "", // Mot de passe MySQL
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
);

const testConnection = async () => {
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
