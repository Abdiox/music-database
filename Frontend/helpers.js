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

// function search() {
//   const searchInput = document.getElementById("searchInput").value.toLowerCase();
//   const searchList = document.getElementById("searchList");
//   searchList.innerHTML = "";

//   // Filtrer søgeresultater baseret på søgekriteriet
//   const results = artists.filter((artist) => artist.name.toLowerCase().includes(searchInput));

//   if (results.length === 0) {
//     searchList.innerHTML = "<li>No results found.</li>";
//   } else {
//     results.forEach((result) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `Type: ${result.type}, Name: ${result.name}`;
//       searchList.appendChild(listItem);
//     });
//   }
// }

// function searchAlbumsByArtist(artistName) {
//   const searchList = document.getElementById("searchList");
//   searchList.innerHTML = "";

//   // Filtrer albums baseret på artistens navn
//   const artistAlbums = database.filter((item) => item.type === "album" && item.name.toLowerCase().includes(artistName.toLowerCase()));

//   if (artistAlbums.length === 0) {
//     searchList.innerHTML = "<li>No albums found for this artist.</li>";
//   } else {
//     artistAlbums.forEach((album) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `Album: ${album.name}`;
//       searchList.appendChild(listItem);
//     });
//   }
// }

// function searchTracksOnAlbum(albumName) {
//   const searchList = document.getElementById("searchList");
//   searchList.innerHTML = "";

//   // Filtrer tracks baseret på albummets navn
//   const albumTracks = database.filter((item) => item.type === "track" && item.name.toLowerCase().includes(albumName.toLowerCase()));

//   if (albumTracks.length === 0) {
//     searchList.innerHTML = "<li>No tracks found on this album.</li>";
//   } else {
//     albumTracks.forEach((track) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `Track: ${track.name}`;
//       searchList.appendChild(listItem);
//     });
//   }
// }
