import React from 'react';
import "./PlaylistList.css";
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem';

const PlaylistList = ({ playlists, onSelect }) => {
  return (
    <div className="PlaylistList">
      {playlists.map(playlist => (
        <PlaylistListItem 
          key={playlist.id}
          id={playlist.id} 
          name={playlist.name} 
          onSelect={onSelect} />
      ))}
    </div>
  );
};

export default PlaylistList;
