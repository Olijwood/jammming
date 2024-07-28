import React from 'react';
import "./PlaylistList.css";
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem';

const PlaylistList = ({ playlists }) => {
  return (
    <div className="PlaylistList">
      {playlists.map(playlist => (
        <PlaylistListItem key={playlist.id} id={playlist.id} name={playlist.name} />
      ))}
    </div>
  );
};

export default PlaylistList;
