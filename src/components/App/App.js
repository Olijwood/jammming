import React, { useState, useCallback } from "react";
import './App.css';

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

function App() {
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <Playlist
            // playlistName={playlistName}
            // playlistTracks={playlistTracks}
            // onNameChange={updatePlaylistName}
            // onRemove={removeTrack}
            // onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
