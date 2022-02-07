const express = require("express");
const sequelize = require("./sequelize");

// Importam tabelele

const Playlist = require("./models/playlist");
const Song = require("./models/song");

// Definim relatiile dintre ele

Playlist.hasMany(Song, { foreignKey: "idPlaylist", sourceKey: "id" });
Song.belongsTo(Playlist, { foreignKey: "idPlaylist", targetKey: "id" });

const app = express();

const port = 8080;

// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Importam rutele

app.use("/api", require("./routes/playlist"));
app.use("/api", require("./routes/song"));

app.listen(port, async () => {
  console.log("Server started on http://localhost:8080");
});

app.get("/create", async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});
