import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistInfo} from '../../spotify/spotify';
import './Playlist.scss'
import Track from '../Track/Track';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState(null);
  let {playlistID} = useParams();
  
  useEffect(()=>{
    let id = playlistID.slice(1);
    const fetchData = async () => {
      const {data} = await getPlaylistInfo(id);
      setPlaylist(data);
      setTracks(data.tracks.items);
    }

    fetchData();
  }, [])

  return (
    <div>
      {!playlist && 
        <LoadingSpinner />
      }
      <div className="playlist-wrapper">
        {playlist && 
          <div className="playlist-top">
            <div className="playlist-image">
              <img src={playlist.images[0].url} alt="playlist "/>
            </div>
            <div className="playlist-info">
              <h1>{playlist.name}</h1>
              <span className="playlist-author">by {playlist.owner.display_name}</span>
              <p>{playlist.description}</p>
              <div className="playlist-stats">
                <div className="info">
                  <span className="number">{playlist.followers.total}</span>
                  <div className="followers">Followers</div>
                </div>
                <div className="info">
                  <span className="number">{playlist.tracks.total}</span>
                  <div className="followers">Tracks</div>
                </div>
                <div className="info">
                  <span className="number">{playlist.public.toString()}</span>
                  <div className="followers">Public</div>
                </div>
              </div>
            </div>
          </div>
        }
        { tracks && 
          <div className="playlist-tracks">
            <h2>Tracks</h2>
            {tracks.map((track, index) => {
              if(track.track) {
                return (
                  <Track
                    url={track.track.album ? track.track.album.images.slice(-1).pop().url : 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png'}
                    track={track.track.name}
                    artists={track.track.artists}
                    album={track.track.album.name}
                    duration={track.track.duration_ms}
                    key={index}
                  />
                )
              }
            })}
          </div>
        }
      </div>
    </div>
  );
}
 
export default Playlist;

