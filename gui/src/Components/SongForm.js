import { useState } from "react";
import "./Song.css";

function SongForm(props) {
  const { onAdd } = props;
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addSong = (ev) => {
    const e = document.getElementById("typeChoice");
    const type = e.value;
    onAdd({ title, url, type });
  };

  return (
    <div className="song-form">
      <div className="title">
        <input
          type="text"
          placeholder="title"
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>
      <div className="url">
        <input
          type="text"
          placeholder="url"
          onChange={(ev) => setUrl(ev.target.value)}
        />
      </div>
      <div className="type">
        <select id="typeChoice">
          <option value="pop">pop</option>
          <option value="rock">rock</option>
          <option value="instrumental">instrumental</option>
          <option value="trap">trap</option>
        </select>
      </div>
      <div className="add">
        <input type="button" value="add" onClick={addSong} />
      </div>
    </div>
  );
}

export default SongForm;
