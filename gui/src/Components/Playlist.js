import "./Playlist.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const SERVER = "http://localhost:8080";

function Playlist(props) {
  const { item } = props;
  const [description, setDescription] = useState("");

  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const getPlaylists = () => {
    Axios.get(`${SERVER}/api/playlists`).then((response) => {
      setPlaylists(response.data);
    });
  };
  const deletePlaylist = () => {
    Axios.delete(`${SERVER}/api/playlists/${item.id}`, {
      data: { answer: 42 },
    }).then((response) => {
      console.log(response);
      getPlaylists();
      window.location.reload(false);
    });
  };

  const submitPlaylist = () => {
    Axios.put(`${SERVER}/api/playlists/${item.id}`, {
      description: description,
    }).then((response) => {
      console.log(response);
      getPlaylists();
      window.location.reload(false);
    });
  };

  return (
    <div className="playlist">
      <div className="description">{item.description}</div>
      <div className="createdAt">{item.updatedAt}</div>
      <div className="buttons">
        <button
          className="btn"
          onClick={() => {
            navigate(`/playlist/${item.id}`);
          }}
        >
          Details
        </button>
        <button
          className="btn"
          onClick={() => {
            document.getElementById("form").style.display = "block";
          }}
        >
          Update
        </button>
        <button className="btn" onClick={deletePlaylist}>
          Delete
        </button>
      </div>
      <div id="form" className="form" style={{ display: "none" }}>
        <h2>Update form</h2>
        <input
          type="text"
          placeholder="description"
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <div className="add">
          <input type="button" value="add" onClick={submitPlaylist} />
        </div>
      </div>
    </div>
  );
}

export default Playlist;
