import "./Song.css";
import Axios from "axios";
import { useState } from "react";
const SERVER = "http://localhost:8080";
function Song(props) {
  const { item } = props;
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [songs, setSongs] = useState([]);

  const getSongs = () => {
    Axios.get(`${SERVER}/api/playlists/${item.idPlaylist}/songs`).then(
      (response) => {
        setSongs(response.data);
      }
    );
  };

  const deleteSong = () => {
    Axios.delete(
      `${SERVER}/api/playlists/${item.idPlaylist}/songs/${item.id}`,
      {
        data: { answer: 22 },
      }
    ).then((response) => {
      console.log(response);
      getSongs();
      window.location.reload(false);
    });
  };

  const submitSong = () => {
    const e = document.getElementById("typeChoice");
    const type = e.value;
    Axios.put(`${SERVER}/api/playlists/${item.idPlaylist}/songs/${item.id}`, {
      title: title,
      url: url,
      type: type,
    }).then((response) => {
      console.log(response);
      getSongs();
      window.location.reload(false);
    });
  };

  return (
    <>
      <div className="song">
        <div className="title">{item.title}</div>
        <div className="url">{item.url}</div>
        <div className="type">{item.type}</div>
        <div className="buttons">
          <button
            className="btn"
            onClick={() => {
              document.getElementById("form").style.display = "block";
            }}
          >
            Update
          </button>
          <button className="btn" onClick={deleteSong}>
            Delete
          </button>
        </div>
        <div id="form" className="form" style={{ display: "none" }}>
          <h2>Update form</h2>
          <input
            type="text"
            placeholder="title"
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <input
            type="text"
            placeholder="url"
            onChange={(ev) => setUrl(ev.target.value)}
          />
          <div>
            <select id="typeChoice">
              <option value="pop">pop</option>
              <option value="rock">rock</option>
              <option value="instrumental">instrumental</option>
              <option value="trap">trap</option>
            </select>
          </div>
          <div className="add">
            <input type="button" value="add" onClick={submitSong} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Song;
