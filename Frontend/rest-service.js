"use strict";

export { endpoint, getArtists, getAlbums, getSongs };

const endpoint = "http://localhost:3333";

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data;
}

async function getSongs() {
  const response = await fetch(`${endpoint}/songs`);
  const data = await response.json();
  return data;
}
