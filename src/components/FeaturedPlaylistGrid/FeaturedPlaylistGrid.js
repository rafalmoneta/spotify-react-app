import React from 'react';
import './FeaturedPlaylistGrid.scss';
import { Link } from 'react-router-dom';

const FeaturedPlaylistGrid = ({playlists}) => {

  return (
    <div className="featured-playlist-wrapper">
      <h2>Featured playlist</h2>
      <div className="featured-playlist-grid">
        {playlists && 
          playlists.slice(0,6).map((playlist, index) => {
            return (
              <div 
                className="playlist-box"
                key={index}
              >
                <Link className="link" to={`/playlist:${playlist.id}`}>
                  <div className="playlist-box-image">
                    <img alt="playlist" src={playlist.images[0].url} />
                  </div>
                  <div className="playlist-box-info">
                    <span>{playlist.name}</span>
                    <div className="playlist-tracks-number">{playlist.tracks.total} tracks</div>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
 
export default FeaturedPlaylistGrid;