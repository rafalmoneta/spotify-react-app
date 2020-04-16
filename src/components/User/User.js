import React, { useState, useEffect } from 'react';
import './User.scss';
import { getUserInfo } from '../../spotify/spotify';
import Profile from '../Profile/Profile';


const User = () => {
  const [userData, setUserData] = useState({ user: null, followed: null, playlists: null });

  useEffect(()=>{
    const fetchData = async () => {
      const {user, followed, playlists} = await getUserInfo();
      console.log({user, followed, playlists})
      setUserData({user, followed, playlists});
      
    }
    fetchData();
  },[])

  const {user, followed, playlists} = userData;

  return (
    <div className="user-sidebar">
      {user && 
        <Profile />
      }
    </div>
  );
}
 
export default User;