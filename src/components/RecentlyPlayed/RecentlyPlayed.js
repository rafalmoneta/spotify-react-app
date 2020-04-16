import React from 'react';
import './RecentlyPlayed.scss';
import Track from '../Track/Track';

const RecentlyPlayed = ({tracks}) => {

  return (
    <div className="recently-played-tracks">
      <h2>Listening History</h2>
      {tracks.slice(0,5).map((track, index) => {
        return (
          <Track 
            url={track.track.album.images.slice(-1).pop().url}
            track={track.track.name}
            artists={track.track.artists}
            album={track.track.album.name}
            duration={track.track.duration_ms}
            key={index}
          />
        )
      })}
    </div>
  );
}
 
export default RecentlyPlayed;