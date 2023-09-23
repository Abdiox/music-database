"use strict";

export { endpoint, getArtists };

const endpoint = "http://localhost:3333";

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}
