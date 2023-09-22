import { Router } from "express";
import dbConnection from "../database.js";

const artistsRouter = Router();

// GET ARTISTS
artistsRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM artists ORDER BY name;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC ARTIST
artistsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const query = /*sql*/ `
    SELECT * 
    FROM artists WHERE id=?;`; // sql query
  const values = [id];

  try {
    const [results] = await dbConnection.execute(query, values);
    if (results.length === 0) {
      response.status(404).json({ message: "Artist not found" });
    } else {
      response.json(results);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET ARTISTS INDIVIDUAL SONGS ON ALBUM
artistsRouter.get("/:id/albums", async (request, response) => {
  try {
    const artistId = request.params.id;

    // Først skal vi finde kunstnerens oplysninger
    const artistQuery = /*sql*/ `
      SELECT *
      FROM artists
      WHERE id = ?
    `;

    const artistValues = [artistId];

    const [artist] = await dbConnection.execute(artistQuery, artistValues);

    // Nu har vi kunstnerens oplysninger, lad os finde alle hans album
    const albumsQuery = /*sql*/ `
      SELECT *
      FROM albums
      WHERE id IN (
        SELECT DISTINCT albums_songs.album_id
        FROM albums_songs
        INNER JOIN artists_songs ON albums_songs.song_id = artists_songs.song_id
        WHERE artists_songs.artist_id = ?
      )
    `;

    const albumsValues = [artistId];

    const [albums] = await dbConnection.execute(albumsQuery, albumsValues);

    // Nu har vi alle albummene, lad os finde sange for hvert album
    for (const album of albums) {
      const songsQuery = /*sql*/ `
        SELECT songs.*
        FROM songs
        INNER JOIN albums_songs ON songs.id = albums_songs.song_id
        WHERE albums_songs.album_id = ?
      `;

      const songsValues = [album.id];

      const [songs] = await dbConnection.execute(songsQuery, songsValues);

      // Tilføj sange til hvert album
      album.songs = songs;
    }

    // Inkluder kunstnerens navn i resultatet
    const result = {
      artist: artist[0], // Der burde kun være én kunstner med dette ID
      albums: albums,
    };

    response.json(result);
  } catch (error) {
    console.error(error);
    response.json({ message: error.message });
  }
});

export default artistsRouter;
