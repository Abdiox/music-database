const endpoint = "http://localhost:3333";

export { endpoint, inputSearchChanged, inputSearchChangedAlbum, inputSearchChangedSong };
import { artists, albums, songs, displayAlbums, displayArtists, displaySongs } from "./frontend.js";

// ----------- SEARCH ----------- //

function inputSearchChanged(event) {
  const value = event.target.value;
  const artistToShow = searchArtist(value);
  displayArtists(artistToShow);
}

const searchArtist = (searchValue) => {
  const searchValues = searchValue.toLowerCase();

  return artists.filter((artist) => artist.name.toLowerCase().includes(searchValues));
};

function inputSearchChangedAlbum(event) {
  const value = event.target.value;
  const albumsToShow = searchAlbum(value);
  displayAlbums(albumsToShow);
}

const searchAlbum = (searchValue) => {
  const searchValues = searchValue.toLowerCase();

  return albums.filter((album) => album.title.toLowerCase().includes(searchValues));
};

function inputSearchChangedSong(event) {
  const value = event.target.value;
  const songsToShow = searchSongs(value);
  displaySongs(songsToShow);
}

const searchSongs = (searchValue) => {
  const searchValues = searchValue.toLowerCase();

  return songs.filter((song) => song.title.toLowerCase().includes(searchValues));
};
