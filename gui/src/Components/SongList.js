import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import Song from "./Song.js";
import SongForm from "./SongForm.js";
import "./Song.css";

const SERVER = "http://localhost:8080";
function SongList() {
  const [songs, setSongs] = useState([]);
  let { id } = useParams();

  const getSongs = () => {
    console.log(id);
    Axios.get(`${SERVER}/api/playlists/${id}/songs`).then((response) => {
      setSongs(response.data);
    });
  };

  const addSong = (song) => {
    Axios.post(`${SERVER}/api/playlists/${id}/songs`, {
      title: song.title,
      url: song.url,
      type: song.type,
    }).then((response) => {
      console.log(response);
      getSongs();
    });
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <div className="song-list">
        {songs.map((e) => (
          <Song key={e.id} item={e} />
        ))}
        <SongForm onAdd={addSong} />
      </div>
    </>
  );
}

export default SongList;
