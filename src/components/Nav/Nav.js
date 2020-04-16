import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';
import MicrophoneIcon from '../../icons/microphone';
import UserIcon from '../../icons/user';
import MusicIcon from '../../icons/music';
import PlaylistIcon from '../../icons/playlist';

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-items">
        <li className="nav-item">
          <NavLink exact={true} to="/" activeClassName="selected">
            <PlaylistIcon />
            <div>Home</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" activeClassName="selected">
            <UserIcon />
            <div>Profile</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/artists" activeClassName="selected">
            <MicrophoneIcon />
            <div>Top Artists</div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tracks" activeClassName="selected">
            <MusicIcon />
            <div>Top Tracks</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
 
export default Nav;