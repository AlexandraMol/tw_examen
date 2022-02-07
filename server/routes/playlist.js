const Playlist = require("../models/playlist");
const Song = require("../models/song");
const playlistRouter = require("express").Router();
const { Op } = require("sequelize");

//sa obtinem toate playlist-urile

playlistRouter.route("/playlists").get(async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    return res.status(200).json(playlists);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa obtinem un anumit playlist

playlistRouter.route("/playlists/:idPlaylist").get(async (req, res) => {
  try {
    const playlist = await Playlist.findAll({
      where: {
        id: req.params.idPlaylist,
      },
    });

    if (Object.keys(playlist).length !== 0) {
      return res.status(200).json(playlist);
    } else {
      return res.status(404).json({ message: "playlist not found" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa adaugam un playlist

playlistRouter.route("/playlists").post(async (req, res) => {
  try {
    const newPlaylist = await Playlist.create({
      description: req.body.description,
    });
    return res.status(200).json(newPlaylist);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa actualizam un playlist

playlistRouter.route("/playlists/:idPlaylist").put(async (req, res) => {
  try {
    let playlist = await Playlist.findAll({
      where: {
        id: req.params.idPlaylist,
      },
    });
    if (Object.keys(playlist).length !== 0) {
      playlist = await Playlist.update(
        {
          description: req.body.description,
        },
        {
          where: {
            id: req.params.idPlaylist,
          },
        }
      );
      return res.status(200).json({ message: "playlist updated successfully" });
    } else {
      return res.status(404).json({ message: "playlist not found" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa stergem un playlist

playlistRouter.route("/playlists/:idPlaylist").delete(async (req, res) => {
  try {
    let playlist = await Playlist.findAll({
      where: {
        id: req.params.idPlaylist,
      },
    });
    if (Object.keys(playlist).length !== 0) {
      playlist = await Playlist.destroy({
        where: {
          id: req.params.idPlaylist,
        },
      });

      return res.status(200).json({ message: "playlist was deleted" });
    } else {
      return res.status(404).json({ message: "playlist not found" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

//sa filtram dupa descriere si dupa data
//sa fie si sortate cresc dupa un camp

playlistRouter.route("/playlistsFiltered").get(async (req, res) => {
  try {
    const { descriptionChosen } = req.query;
    const { dateChosen } = req.query;
    const { sortBy } = req.query;
    let playlists = await Playlist.findAll({
      where: [
        descriptionChosen
          ? {
              description: {
                [Op.substring]: descriptionChosen,
              },
            }
          : undefined,
        dateChosen
          ? {
              createdAt: {
                [Op.gt]: dateChosen,
              },
            }
          : undefined,
      ],

      order: sortBy ? [[sortBy, "ASC"]] : undefined,
    });

    return res.status(200).json(playlists);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//import de date

playlistRouter.route("/importPlaylists").post(async (req, res) => {
  try {
    for (let p of req.body) {
      const playlist = await Playlist.create({
        description: p.description,
      });
      for (let s of p.songs) {
        const song = await Song.create({
          title: s.title,
          url: s.url,
          type: s.type,
          idPlaylist: playlist.id,
        });
      }
    }
    return res.status(200).json({ message: "imported successfully" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

//export de date

playlistRouter.route("/exportedPlaylists").get(async (req, res) => {
  try {
    const result = [];
    for (let p of await Playlist.findAll()) {
      const playlist = {
        id: p.id,
        description: p.description,
        createdAt: p.updatedAt,
        songs: [],
      };
      for (let s of await p.getSongs()) {
        playlist.songs.push({
          title: s.title,
          url: s.url,
          type: s.type,
          idPlaylist: playlist.id,
        });
      }

      result.push(playlist);
    }

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "playlists not found" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = playlistRouter;
