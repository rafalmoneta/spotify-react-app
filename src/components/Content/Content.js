import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import ScrollToTop from '../../utils/ScrollToTop';
import Nav from '../Nav/Nav';
import './Content.scss';
import UserContent from '../UserContent/UserContent';
import Profile from '../Profile/Profile';
import TopArtists from '../TopArtists/TopArtists';
import TopTracks from '../TopTracks/TopTracks';
import Artist from '../Artist/Artist';
import Playlist from '../Playlist/Playlist';

const Content = () => {
  return (
    <div className="content-wrapper">
      <main className="content">
          <div className="content-container">
            <Nav />
            <ScrollToTop />
            <Switch>
              <Route exact path='/' component={UserContent} />
              <Route path='/profile' component={Profile} />
              <Route path='/artists' component={TopArtists} />
              <Route path='/tracks' component={TopTracks} />
              <Route path='/artist:artistID' component={Artist} />
              <Route path='/playlist:playlistID' component={Playlist} />
            </Switch>
          </div>
      </main>
    </div>
  );
}
 
export default Content;