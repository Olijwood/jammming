const clientId = '5e938d94c1f14e8b84032176f5a3bc56'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;
let userId;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  getCurrentUserId() {
    if (userId) {
      return Promise.resolve(userId);
    }

    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return userId;
      });
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris, id=null) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    return this.getCurrentUserId().then(userId => {
      if (id) {
        // update existing playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${id}`, {
          headers: headers,
          method: 'PUT',
          body: JSON.stringify({ name: name})
        }).then(() => {
          return fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({ uris: trackUris })
          });
        });
      } else {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: name})
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            });
          });
        }
      });
    },

  getUserPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    return this.getCurrentUserId()
      .then(userId => {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, { headers: headers })
          .then(response => response.json())
          .then(jsonResponse => {
            return jsonResponse.items.map(playlist => ({
              id: playlist.id,
              name: playlist.name
            }));
          });
      });
  },

  getPlaylist(playlistId) {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    console.log(`Fetching playlist with ID: ${playlistId}`);

    return this.getCurrentUserId()
      .then(userId => {
        console.log(`User ID: ${userId}`);
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        console.log(`Fetching URL: ${url}`);

        return fetch(url, { headers: headers })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(jsonResponse => {
            console.log('Fetched playlist tracks:', jsonResponse);
            return jsonResponse.items.map(item => ({
              id: item.track.id,
              name: item.track.name,
              artist: item.track.artists[0].name,
              album: item.track.album.name,
              uri: item.track.uri
            }));
          });
      }).catch(error => {
        console.error('Error fetching playlist:', error);
      });
  }
};

export default Spotify;
