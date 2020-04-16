import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist, getArtistTopTracks } from '../../spotify/spotify';
import './Artist.scss';
import Track from '../Track/Track';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


const Artist = () => {
  const [artist, setArtistData] = useState(null);
  const [tracks, setTracks] = useState(null);
  let { artistID } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      let id = artistID.slice(1);
      const {data} = await getArtist(id);
      setArtistData(data);
      const tracks = await getArtistTopTracks(id);
      setTracks(tracks.data.tracks);
    }

    fetchData();
  }, [artistID])

  return (
    <div>
      {!artist && 
        <LoadingSpinner />
      }
      <div className="artist-wrapper">
        {artist && 
          <div className="artist-content">
            <div className="artist-img">
              <img src={artist.images[0].url} alt="artist avatar"/>
            </div>
            <h3>{artist.name}</h3>
            <div className="artist-info">
              <div className="artist-item">
                <span className="number">{artist.followers.total}</span>
                <span className="caption">Followers</span>
              </div>
              <div className="artist-item">
                <span className="genres">{artist.genres.map((x,i) => (<div key={i}>{x}</div>))}</span>
                <span className="caption">Genres</span>
              </div>
              <div className="artist-item">
                <span className="number">{artist.popularity}%</span>
                <span className="caption">Popularity</span>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="artist-tracks-wrapper">
        {tracks && 
          
          <div className="artist-tracks">
            {tracks.map((track, index) =>(
              <Track
                url={track.album.images.slice(-1).pop().url}
                track={track.name}
                artists={track.artists}
                album={track.album.name}
                duration={track.duration_ms}
                key={index}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
}
 
export default Artist;