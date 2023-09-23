"use strict";

import { endpoint, getArtists } from "./rest-service.js";

endpoint;
let artists;
window.addEventListener("load", artistApp);

async function artistApp() {
  console.log("Velkommen til Musik Databasen!");
  await getArtists();
  updateGrid();
}

// Simuler en liste over artister, albums og tracks (erstat med API-kald)
// const database = [
//   { type: "artist", name: "Artist 1" },
//   { type: "artist", name: "Artist 2" },
//   { type: "album", name: "Album 1" },
//   { type: "album", name: "Album 2" },
//   { type: "track", name: "Track 1" },
//   { type: "track", name: "Track 2" },
//   // Tilføj flere elementer her
// ];

//-------------------Update Grid----------------------//

async function updateGrid() {
  artists = await getArtists();
  displayArtists(artists);
  console.log(artists);
}

//------------------- Get Artist  ----------------------//

function displayArtists(listOfArtist) {
  document.querySelector("#artists").innerHTML = "";
  for (const artist of listOfArtist) {
    showArtists(artist);
  }
}

function showArtists(artistObject) {
  const html = /*html*/ `
    <article class="grid-item">
      <img src= "${artistObject.image}"/>
      <div class="grid-info">
        <h2>${artistObject.name}</h2>
        <h3>${artistObject.genres}</h3>
      </div>
      <div class="btns">
        <button class="btn-update">Opdater</button>
        <button class="btn-delete">Slet</button>    
      </div>
    </article>
  `;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
}

// ----------- SEARCH ----------- //
function search() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const searchList = document.getElementById("searchList");
  searchList.innerHTML = "";

  // Filtrer søgeresultater baseret på søgekriteriet
  const results = database.filter((item) => item.name.toLowerCase().includes(searchInput));

  if (results.length === 0) {
    searchList.innerHTML = "<li>No results found.</li>";
  } else {
    results.forEach((result) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Type: ${result.type}, Name: ${result.name}`;
      searchList.appendChild(listItem);
    });
  }
}

function searchAlbumsByArtist(artistName) {
  const searchList = document.getElementById("searchList");
  searchList.innerHTML = "";

  // Filtrer albums baseret på artistens navn
  const artistAlbums = database.filter((item) => item.type === "album" && item.name.toLowerCase().includes(artistName.toLowerCase()));

  if (artistAlbums.length === 0) {
    searchList.innerHTML = "<li>No albums found for this artist.</li>";
  } else {
    artistAlbums.forEach((album) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Album: ${album.name}`;
      searchList.appendChild(listItem);
    });
  }
}

function searchTracksOnAlbum(albumName) {
  const searchList = document.getElementById("searchList");
  searchList.innerHTML = "";

  // Filtrer tracks baseret på albummets navn
  const albumTracks = database.filter((item) => item.type === "track" && item.name.toLowerCase().includes(albumName.toLowerCase()));

  if (albumTracks.length === 0) {
    searchList.innerHTML = "<li>No tracks found on this album.</li>";
  } else {
    albumTracks.forEach((track) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Track: ${track.name}`;
      searchList.appendChild(listItem);
    });
  }
}
