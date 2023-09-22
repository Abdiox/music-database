import { Router } from "express";
import dbConnection from "../database.js";

const songsRouter = Router();

// GET SONG

songsRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM songs;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC SONG
songsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const query = /*sql*/ `
    SELECT *
    FROM songs WHERE id=?;`; // sql query
  const values = [id];

  try {
    const [results] = await dbConnection.execute(query, values);
    if (results.length === 0) {
      response.status(404).json({ message: "Song not found" });
    } else {
      response.json(results);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SONGS FROM SPECIFIK ARTISTS
songsRouter.get("/:id/songs", async (request, response) => {
  try {
    const artistId = request.params.id;

    // Først skal vi finde kunstnerens oplysninger
    const artistQuery = /*sql*/ `
      SELECT * FROM artists WHERE id = ?;
    `;

    const [artistInfo] = await dbConnection.execute(artistQuery, [artistId]);

    if (!artistInfo.length) {
      return response.status(404).json({ message: "Artist not found" });
    }

    // Nu skal vi hente kunstnerens sange
    const songsQuery = /*sql*/ `
      SELECT songs.*, albums.title AS albumTitle
      FROM songs
      INNER JOIN artists_songs ON songs.id = artists_songs.song_id
      INNER JOIN albums_songs ON songs.id = albums_songs.song_id
      INNER JOIN albums ON albums_songs.album_id = albums.id
      WHERE artists_songs.artist_id = ?;
    `;

    const [songs] = await dbConnection.execute(songsQuery, [artistId]);

    // Opret et objekt med kunstnerens oplysninger og hans/hendes sange
    const artistWithSongs = {
      artistInfo: artistInfo[0],
      songs: songs,
    };

    response.json(artistWithSongs);
  } catch (error) {
    console.error(error);
    response.json({ message: error.message });
  }
});

export default songsRouter;
