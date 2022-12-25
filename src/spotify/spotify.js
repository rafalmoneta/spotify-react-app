import axios from "axios";
import hash from "../utils/hash";

export const authEndpoint = "https://accounts.spotify.com/authorize";
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI =
  process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000";
// export const REDIRECT_URI = "http://localhost:3000";

// your application requests authorization
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-follow-read",
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-collaborative",
  "playlist-read-private",
];

export const getAccessToken = () => {
  let token = hash.access_token;
  return token;
};

export const setToken = (access_token) => {
  token = access_token;
};

export let token = getAccessToken();

//API calls
export const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

console.log(headers);

//get user
export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

//get users following
export const getFollowing = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

//get user playlists
export const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

//get all user info
export const getUserInfo = () =>
  axios.all([getUser(), getFollowing(), getPlaylists()]).then(
    axios.spread(function (user, followedArtist, playlists) {
      return {
        user: user.data,
        followed: followedArtist.data.artists.items,
        playlists: playlists.data,
      };
    })
  );

// browse for new released albums
export const getListOfNewReleases = () =>
  axios.get("https://api.spotify.com/v1/browse/new-releases", { headers });

//get user recently played tracks
export const getRecentlyPlayed = () =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers,
  });

// get user recomendations
export const getFeaturedPlaylists = () =>
  axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
    headers,
  });

export const getTopUser = (time_range) =>
  axios.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}`,
    { headers }
  );

export const getContentForProfilePage = () =>
  axios
    .all([getTopUser("long_term"), getRecentlyPlayed(), getFeaturedPlaylists()])
    .then(
      axios.spread(function (topTracks, recentlyPlayed, featured) {
        return {
          topTracks: topTracks.data,
          recentlyPlayed: recentlyPlayed.data,
          featured: featured.data,
        };
      })
    );

export const getTopArtists = (time_range) =>
  axios.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}`,
    { headers }
  );

export const getArtist = (id) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}`, { headers });

export const getArtistTopTracks = (id) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`, {
    headers,
  });

export const getPlaylistInfo = (id) =>
  axios.get(`https://api.spotify.com/v1/playlists/${id}`, { headers });
