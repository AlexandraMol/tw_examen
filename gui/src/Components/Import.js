import "./Playlist.css";
import Axios from "axios";
import { useState } from "react";
const SERVER = "http://localhost:8080";

function Import() {
  const [result, setResult] = useState({});

  const postPlaylists = () => {
    Axios.post(`${SERVER}/api/importPlaylists`, eval(result)).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <div className="import-container">
      <textarea
        style={{ width: "30em", height: "30em" }}
        onChange={(ev) => setResult(ev.target.value)}
      ></textarea>
      <button
        className="btn"
        style={{ margin: "10px" }}
        onClick={postPlaylists}
      >
        Add
      </button>
    </div>
  );
}
export default Import;
