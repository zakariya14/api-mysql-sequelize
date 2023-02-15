const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "sequelize-mysql",
  host: "localhost",
  username: "root",
  password: "",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
