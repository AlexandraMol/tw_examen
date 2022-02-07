import "./Playlist.css";
import Axios from "axios";
import { useState, useEffect } from "react";
const SERVER = "http://localhost:8080";

function Export() {
  const [result, setResult] = useState("");

  const getPlaylists = () => {
    Axios.get(`${SERVER}/api/exportedPlaylists`).then((response) => {
      setResult(JSON.stringify(response.data));
    });
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return <div className="export-container">{result}</div>;
}
export default Export;
