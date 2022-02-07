import { useState } from "react";
import "./Playlist.css";
function PlaylistForm(props) {
  const { onAdd } = props;
  const [description, setDescription] = useState("");
  const addPlaylist = (ev) => {
    onAdd({
      description,
    });
  };

  return (
    <div className="playlist-form">
      <h2>Add a playlist</h2>
      <div className="description">
        <input
          type="text"
          placeholder="description"
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>
      <div className="add">
        <input type="button" value="add" onClick={addPlaylist} />
      </div>
    </div>
  );
}

export default PlaylistForm;
