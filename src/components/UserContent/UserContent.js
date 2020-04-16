import React, { useEffect, useState } from 'react';
import './UserContent.scss';
import { getContentForProfilePage } from '../../spotify/spotify';
import FeaturedPlaylistGrid from '../FeaturedPlaylistGrid/FeaturedPlaylistGrid';
import RecentlyPlayed from '../RecentlyPlayed/RecentlyPlayed';
import TopUserTracks from '../TopUserTracks/TopUserTracks';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const UserContent = () => {
  const [contentData, setContentData] = useState({topTracks: null, recentlyPlayed: null, featured: null})


  useEffect(()=>{
    const fetchData = async () => {
      const {topTracks, recentlyPlayed, featured} = await getContentForProfilePage();
      setContentData({topTracks, recentlyPlayed, featured})
    }
    fetchData();
  }, [])

  const {topTracks, recentlyPlayed, featured} = contentData;
  
  return (
    <div>
      <div className="featured-playlists">
      {!featured &&
        <LoadingSpinner />
      }
      {featured && 
        <FeaturedPlaylistGrid 
          playlists={featured.playlists.items}
        />
      }
      </div>
      <div className="user-tracks">
        <div className="recently-played">
        {recentlyPlayed && 
          <RecentlyPlayed
            tracks={recentlyPlayed.items}
          />
        }
        </div>
        <div className="user-content-top-tracks">
          {topTracks && 
            <TopUserTracks 
              tracks={topTracks.items}
            />
          }
        </div>
      </div>
    </div>
  );
}
 
export default UserContent;