import React, { useState, useEffect } from 'react';
import { getTopUser } from '../../spotify/spotify';
import './TopTracks.scss';
import Track from '../Track/Track';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const TopTracks = () => {
  const [timeFrame, setTimeFrame] = useState("long_term");
  const [tracks, setTracks] = useState(null);

  const handleChange = (e) => {
    setTimeFrame(e.target.value)
  }

  useEffect(()=>{
    const fetching = async () => {
      const data = await getTopUser(timeFrame);
      setTracks(data.data.items);
    }
    fetching();
  }, [timeFrame])

  return ( 
    <div>
      {!tracks && 
        <LoadingSpinner />
      }
      <div className="top-tracks-wrapper">
        <div className="top-tracks-header">
          <h2>Your Top tracks</h2>
          <div>
            <select className="top-tracks-select" value={timeFrame} onChange={handleChange}>
              <option value="long_term">All time</option>
              <option value="medium_term">Last 6 months</option>
              <option value="short_term">Last 4 weeks</option>
            </select>
          </div>
        </div>
        <div className="top-tracks-content">
          {tracks &&
            <div className="top-tracks">
              {tracks.map((track, index) => {
                return (
                  <Track
                    url={track.album.images.slice(-1).pop().url}
                    track={track.name}
                    artists={track.artists}
                    album={track.album.name}
                    duration={track.duration_ms}
                    key={index}
                  />
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
 
export default TopTracks;