import React from 'react';
import './TopUserTracks.scss';
import Track from '../Track/Track';


const TopUserTracks = ({tracks}) => {

  return (
    <div className="top-played-tracks">
      <h2>Your Top Five</h2>
      {tracks.slice(0,5).map((track, index) => {
        return (
          <Track
            url={track.album.images.slice(-1).pop().url}
            track={track.name}
            artists={track.artists}
            album={track.album.name}
            key={index}
          />
        )
      })}
    </div>
  );
}
 
export default TopUserTracks;