import React from 'react';
import "./PlaylistListItem.css";

const PlaylistListItem = ({ id, name }) => {
  return (
    <div className="PlaylistListItem">
      <p>{name}</p>
    </div>
  );
};

export default PlaylistListItem;
