import { Router } from "express";
import dbConnection from "../database.js";

const albumsRouter = Router();

// GET ALBUMS
albumsRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM albums;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC ALBUM
albumsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const query = /*sql*/ `
    SELECT *
    FROM albums WHERE id=?;`; // sql query
  const values = [id];

  try {
    const [results] = await dbConnection.execute(query, values);
    if (results.length === 0) {
      response.status(404).json({ message: "Album not found" });
    } else {
      response.json(results);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SONGS FROM SPECIFIK ALBUM
albumsRouter.get("/:id/songs", async (request, response) => {
  try {
    const albumId = request.params.id;

    // Først skal vi finde albummets oplysninger
    const albumQuery = /*sql*/ `
      SELECT * FROM albums WHERE id = ?;
    `;

    const [albumInfo] = await dbConnection.execute(albumQuery, [albumId]);

    if (!albumInfo.length) {
      return response.status(404).json({ message: "Album not found" });
    }

    // Nu skal vi hente sange, der tilhører dette album
    const songsQuery = /*sql*/ `
      SELECT songs.*, artists.name AS artistName
      FROM songs
      INNER JOIN albums_songs ON songs.id = albums_songs.song_id
      INNER JOIN artists_songs ON songs.id = artists_songs.song_id
      INNER JOIN artists ON artists_songs.artist_id = artists.id
      WHERE albums_songs.album_id = ?;
    `;

    const [songs] = await dbConnection.execute(songsQuery, [albumId]);

    // Opret et objekt med albumoplysninger og de tilhørende sange
    const albumWithSongs = {
      albumInfo: albumInfo[0],
      songs: songs,
    };

    response.json(albumWithSongs);
  } catch (error) {
    console.error(error);
    response.json({ message: error.message });
  }
});

export default albumsRouter;
