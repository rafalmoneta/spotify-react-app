import React, { useState, useEffect } from 'react';
import './TopArtists.scss';
import { getTopArtists } from '../../spotify/spotify';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const TopArtists = () => {
  const [timeFrame, setTimeFrame] = useState("long_term");
  const [artists, setArtists] = useState(null);

  const handleChange = (e) => {
    setTimeFrame(e.target.value)
  }

  useEffect(()=>{
    const fetching = async () => {
      const data = await getTopArtists(timeFrame);
      setArtists(data.data.items);
    }
    fetching();
  }, [timeFrame])

  return (
    <div>
      {!artists &&
        <LoadingSpinner />
      }
      <div className="top-artists-wrapper">
        <div className="top-artists-header">
          <h2>Your Top Artists</h2>
          <div>
            <select className="top-artists-select" value={timeFrame} onChange={handleChange}>
              <option value="long_term">All time</option>
              <option value="medium_term">Last 6 months</option>
              <option value="short_term">Last 4 weeks</option>
            </select>
          </div>
        </div>
        <div className="top-artist-content">
          {artists && 
            <div className="top-artists">
            {artists.map((artist, index) => {
              return (
                <Link to={`/artist:${artist.id}`} className="artist" key={index}>
                  <div className="artist-image">
                    <img src={artist.images[1] ? artist.images[1].url : artist.images[0].url} alt="artist" />
                  </div>
                  <span className="artist-name">{artist.name}</span>
                </Link>
              )
            })}              
            </div>
          }
        </div>
      </div>
    </div>
  );
}
 
export default TopArtists;