"use strict";

import { endpoint, getAlbums, getArtists, getSongs } from "./rest-service.js";
import { inputSearchChanged } from "./helpers.js";
export { artists, displayArtists };

endpoint;
let artists;
let albums;
let songs;
window.addEventListener("load", artistApp);

async function artistApp() {
  console.log("Velkommen til Musik Databasen!");
  await getArtists();
  await getAlbums();
  await getSongs();
  updateGrid();

  //Searchbar sort
  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
}
//-------------------Update Grid----------------------//

async function updateGrid() {
  artists = await getArtists();
  albums = await getAlbums();
  songs = await getSongs();
  displayArtists(artists);
  displayAlbums(albums);
  displaySongs(songs);
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

//------------------- Get Albums  ----------------------//
function displayAlbums(listOfAlbums) {
  document.querySelector("#albums").innerHTML = "";
  for (const albums of listOfAlbums) {
    showAlbums(albums);
  }
}

function showAlbums(albumObject) {
  const html = /*html*/ `
    <article class="grid-item">
      <h1>${albumObject.title}</h1>
      <div class="grid-info">
        <h2>${albumObject.releaseDate}</h2>
      </div>
      <div class="btns">
        <button class="btn-update">Opdater</button>
        <button class="btn-delete">Slet</button>    
      </div>
    </article>
  `;
  document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
}

//------------------- Get Songs  ----------------------//
function displaySongs(listOfSongs) {
  document.querySelector("#songs").innerHTML = "";
  for (const songs of listOfSongs) {
    showSongs(songs);
  }
}

function showSongs(songsObject) {
  const html = /*html*/ `
    <article class="grid-item">
    <h1>${songsObject.title}</h1>
    <div class="grid-info">
    <h2>${songsObject.releaseDate}</h2>
     <h2>${songsObject.length}</h2>
      </div>
      <div class="btns">
        <button class="btn-update">Opdater</button>
        <button class="btn-delete">Slet</button>    
      </div>
    </article>
  `;
  document.querySelector("#songs").insertAdjacentHTML("beforeend", html);
}
