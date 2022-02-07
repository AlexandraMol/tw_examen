const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("demodb", "postgres", "parola", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
