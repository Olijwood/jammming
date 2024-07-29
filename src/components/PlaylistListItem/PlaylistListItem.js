import React from 'react';
import "./PlaylistListItem.css";

const PlaylistListItem = ({ playlist, onSelect }) => {
  const handleClick = () => {
    onSelect(playlist.id);
  };

  return (
    <div className="PlaylistListItem" onClick={handleClick} >
      <p>{playlist.name}</p>
    </div>
  );
};

export default PlaylistListItem;
