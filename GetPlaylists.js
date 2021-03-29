const fs = require("fs");
const SpotifyWebApi = require("spotify-web-api-node");
const token =
  "BQCFEfUf3OovLMFIqfFe415B9NVRehIpVDq1wvuOTr9HFw_LswkpSCjUa83DMHpDG59yNntZ8-pcBsGodkOsb36h2m8dIcntKZm03kWfccE41PtXCEa7WTpPzCJuGqWxz0AcxaJcLXIFH6NZ1nnQh3_KfZOtU1oK_bRfRJGmlxLawvEh0eHwuYy1L_BoUaAP-_gCz5Ir5_mRZAjSlV5m8-CagRlzEVkZo-_JmrOsNGwx_vD06oDO2kE-sdFzB9wTmptVvKD82Lo";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getMyData() {
  const myprofile = await spotifyApi.getMe();
  // console.log(myprofile.body);
  getUserPlaylists(myprofile.body.id);
}
async function getUserPlaylists(id) {
  const data = await spotifyApi.getUserPlaylists(id);

  let saloni_tracks = [];
  let venky_tracks = [];
  for (let playlist of data.body.items) {
    name_tracks = await getPlaylistTracks(playlist.id, playlist.name);
    //console.log(name_tracks);
    console.log(name_tracks.length);
    //  let name_file = JSON.stringify(name_tracks);
    let name = playlist.name;
    fs.writeFileSync(name + ".txt", name_tracks);
  }
}
async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 99,
    fields: "items"
  });
  let tracks = [];
  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push({ Song: track.name, Artist: track.artists[0].name });
  }
  return tracks;
}
getMyData();
