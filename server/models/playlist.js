const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Playlist = sequelize.define("Playlist", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      len: [3, 255],
    },
  },
});

module.exports = Playlist;
