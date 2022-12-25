import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { getUserInfo } from "../../spotify/spotify";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const [userData, setUserData] = useState({
    user: null,
    followed: null,
    playlists: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { user, followed, playlists } = await getUserInfo();
      setUserData({ user, followed, playlists });
    };
    fetchData();
  }, []);

  const { user, followed, playlists } = userData;

  return (
    <div>
      {!user && <LoadingSpinner />}
      <div className="profile-wrapper">
        {user && (
          <div className="profile-content">
            <div className="profile-img">
              <img src={user?.images[0]?.url} alt="profile avatar" />
            </div>
            <h3>{user.display_name}</h3>
            <div className="profile-info">
              <div className="profile-item">
                <span className="number">{user.followers.total}</span>
                <span className="caption">Followers</span>
              </div>
              <div className="profile-item">
                <span className="number">{followed.length}</span>
                <span className="caption">Following</span>
              </div>
              <div className="profile-item">
                <span className="number">{playlists.items.length}</span>
                <span className="caption">Playlist</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="profile-playlists">
        <h2>Your spotify playlist</h2>
        <div className="profile-playlists-grid">
          {playlists &&
            playlists.items.map((playlist, index) => {
              return (
                <div className="playlist-box" key={index}>
                  <Link className="link" to={`/playlist:${playlist.id}`}>
                    <div className="playlist-box-image">
                      <img
                        alt="playlist"
                        src={
                          playlist.images[1]
                            ? playlist.images[1]?.url
                            : playlist.images[0]?.url
                        }
                      />
                    </div>
                    <div className="playlist-box-info">
                      <span>{playlist.name}</span>
                      <div className="playlist-tracks-number">
                        {playlist.tracks.total} tracks
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
