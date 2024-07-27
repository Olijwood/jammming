import React, { useCallback } from "react";

import "./Track.css";

const Track = (props) => {
    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.Track);
        },
        [props.onadd, props.track]
    );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);          
        },
        [props.onRemove, props.track]
    );

    const renderAction = () => {
        if (props.isRemoval) {
            return (
                <button className="Track-action" onClick={removeTrack}>
                  -
                </button>
              );
            }
            return (
              <button className="Track-action" onClick={addTrack}>
                +
              </button>
            );
        };
    
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{props.track.name}</h3>
                    <p>
                    {props.track.artist} | {props.track.album}
                    </p>
                    {renderAction()}
                </div>
            </div>
        );
    };

export default Track;