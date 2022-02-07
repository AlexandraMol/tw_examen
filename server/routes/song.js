const Song = require("../models/song");
const songRouter = require("express").Router();

//sa obtinem toate melodiile

songRouter.route("/playlists/:idPlaylist/songs").get(async (req, res) => {
  try {
    const songs = await Song.findAll({
      where: {
        idPlaylist: req.params.idPlaylist,
      },
    });

    return res.status(200).json(songs);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa obtinem o anumita melodie

songRouter
  .route("/playlists/:idPlaylist/songs/:idSong")
  .get(async (req, res) => {
    try {
      const song = await Song.findAll({
        where: {
          id: req.params.idSong,
          idPlaylist: req.params.idPlaylist,
        },
      });
      return res.status(200).json(song);
    } catch (e) {
      return res.status(500).json(e);
    }
  });

//sa adaugam o melodie

songRouter.route("/playlists/:idPlaylist/songs").post(async (req, res) => {
  try {
    if (
      req.body.type === "pop" ||
      req.body.type === "rock" ||
      req.body.type === "instrumental" ||
      req.body.type === "trap"
    ) {
      const newSong = await Song.create({
        title: req.body.title,
        url: req.body.url,
        type: req.body.type,
        idPlaylist: req.params.idPlaylist,
      });
      return res.status(200).json(newSong);
    } else {
      return res
        .status(500)
        .json({ message: "this type of song is not supported" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa actualizam o melodie

songRouter
  .route("/playlists/:idPlaylist/songs/:idSong")
  .put(async (req, res) => {
    try {
      let song = await Song.findAll({
        where: {
          id: req.params.idSong,
          idPlaylist: req.params.idPlaylist,
        },
      });
      if (Object.keys(song).length !== 0) {
        song = await Song.update(
          {
            title: req.body.title,
            url: req.body.url,
            type: req.body.type,
          },
          {
            where: {
              id: req.params.idSong,
              idPlaylist: req.params.idPlaylist,
            },
          }
        );
        return res.status(200).json({ message: "song updated successfully" });
      } else {
        return res.status(404).json({ message: "song not found" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  });

//sa stergem o melodie

songRouter
  .route("/playlists/:idPlaylist/songs/:idSong")
  .delete(async (req, res) => {
    try {
      let song = await Song.findAll({
        where: {
          id: req.params.idSong,
          idPlaylist: req.params.idPlaylist,
        },
      });

      if (Object.keys(song).length !== 0) {
        song = await Song.destroy({
          where: {
            id: req.params.idSong,
            idPlaylist: req.params.idPlaylist,
          },
        });
        return res.status(200).json({ message: "song was deleted" });
      } else {
        return res.status(404).json({ message: "song not found" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  });

module.exports = songRouter;
