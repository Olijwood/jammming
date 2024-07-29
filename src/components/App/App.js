import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlaylistList from "../PlaylistList/PlaylistList";
import Spotify from "../../util/Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userId, setUserId] = useState("");
  const [playlistId, setPlaylistId] = useState(null);

  useEffect(() => {
    Spotify.getCurrentUserId().then(setUserId);
    Spotify.getUserPlaylists().then(setUserPlaylists);
  }, []);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris, playlistId).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
      setPlaylistId(null);
    });
  }, [playlistName, playlistTracks, playlistId]);

  const selectPlaylist = useCallback((id) => {
    Spotify.getPlaylist(id).then((tracks) => {
      const selectedPlaylist = userPlaylists.find((playlist) => playlist.id === id);
      setPlaylistName(selectedPlaylist.name); // Set the name of the selected playlist
      setPlaylistTracks(tracks);
      setPlaylistId(id); // Set the selected playlist's ID
    }).catch((error) => {
      console.error('Error selecting playlist:', error);
    });
  }, [userPlaylists]);

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      {userId && <h2>User ID: {userId}</h2>}
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
          <PlaylistList playlists={userPlaylists} onSelect={selectPlaylist} />
        </div>
      </div>
    </div>
  );
};

export default App;
