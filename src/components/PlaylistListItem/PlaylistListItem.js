import React from 'react';
import "./PlaylistListItem.css";

const PlaylistListItem = ({ id, name, onSelect }) => {
  return (
    <div className="PlaylistListItem" onClick={handleSelect} >
      <p>{name}</p>
    </div>
  );
};

export default PlaylistListItem;
