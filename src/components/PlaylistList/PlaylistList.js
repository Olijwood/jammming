import React from 'react';
import "./PlaylistList.css";
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem';

const PlaylistList = ({ playlists, onSelect }) => {
  return (
    <div className="PlaylistList">
      {playlists.map(playlist => (
        <PlaylistListItem 
          key={playlist.id}
          playlist={playlist}
          onSelect={onSelect} />
      ))}
    </div>
  );
};

export default PlaylistList;
