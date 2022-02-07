import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaylistList from "./Components/PlaylistList";
import SongList from "./Components/SongList";
import Export from "./Components/Export";
import Import from "./Components/Import";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlaylistList />} />
          <Route path="/playlist/:id" element={<SongList />} />
          <Route path="/export" element={<Export />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
