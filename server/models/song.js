const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Song = sequelize.define("Song", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      len: [5, 255],
    },
  },
  url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  type: {
    type: DataTypes.ENUM,
    values: ["pop", "rock", "instrumental", "trap"],
  },
});

module.exports = Song;
