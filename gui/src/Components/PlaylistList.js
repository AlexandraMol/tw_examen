import Axios from "axios";
import { useEffect, useState } from "react";
import Playlist from "./Playlist";
import PlaylistForm from "./PlaylistForm";
import { useNavigate } from "react-router";
import "./Playlist.css";

const SERVER = "http://localhost:8080";

function PlaylistList() {
  const [Playlists, setPlaylists] = useState([]);
  const [description, setDescription] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const getPlaylists = () => {
    Axios.get(`${SERVER}/api/playlists`).then((response) => {
      setPlaylists(response.data);
    });
  };

  const getFilteredPlaylist = () => {
    Axios.get(
      `${SERVER}/api/playlistsFiltered?descriptionChosen=${description}&dateChosen=${createdDate}&sortBy=${sortBy}`
    ).then((response) => {
      console.log(response);
      setPlaylists(response.data);
    });
  };

  const addPlaylist = (playlist) => {
    Axios.post(`${SERVER}/api/playlists`, {
      description: playlist.description,
    }).then((response) => {
      console.log(response);
      getPlaylists();
    });
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="playlist-list">
      {Playlists.map((e) => (
        <Playlist key={e.id} item={e} />
      ))}
      <PlaylistForm onAdd={addPlaylist} />
      <div className="filter-list">
        <h2>Apply filters</h2>
        <div className="description">
          <input
            type="text"
            placeholder="description"
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>
        <div className="createdDate">
          <input
            type="text"
            placeholder="created date"
            onChange={(ev) => setCreatedDate(ev.target.value)}
          />
        </div>
        <div className="sortBy">
          <input
            type="text"
            placeholder="sort by"
            onChange={(ev) => setSortBy(ev.target.value)}
          />
        </div>
        <div className="add">
          <input
            className="btn-filters"
            type="button"
            value="Apply filters"
            onClick={getFilteredPlaylist}
          />
          <input
            type="button"
            className="btn-filters"
            value="Reset filters"
            onClick={getPlaylists}
          />
        </div>
      </div>
      <div className="buttons-export-import">
        <button
          className="btn-Import"
          onClick={() => {
            navigate(`/import`);
          }}
        >
          Import as JSON
        </button>
        <button
          className="btn-Export"
          onClick={() => {
            navigate(`/export`);
          }}
        >
          Export as JSON
        </button>
      </div>
    </div>
  );
}

export default PlaylistList;
