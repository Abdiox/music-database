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

// ----------------------POST--------------------------//

songsRouter.post("/", async (request, response) => {
    try {
        // Extract song data from the request body
        const { title, releaseDate, length, artistIds, albumIds } = request.body;

        // Insert the new song into the songs table
        const insertSongQuery = /*sql*/ `
      INSERT INTO songs (title, releaseDate, length)
      VALUES (?, ?, ?);
    `;

        const insertSongValues = [title, releaseDate, length];

        const [songResult] = await dbConnection.execute(insertSongQuery, insertSongValues);

        // Get the ID of the newly inserted song
        const songId = songResult.insertId;

        // Insert associations into artists_songs table
        if (artistIds && artistIds.length > 0) {
            const insertArtistSongQuery = /*sql*/ `
        INSERT INTO artists_songs (artist_id, song_id)
        VALUES (?, ?);
      `;

            const insertArtistSongValues = artistIds.map((artistId) => [artistId, songId]);

            // Execute the insert queries for artists in sequence
            for (const values of insertArtistSongValues) {
                await dbConnection.execute(insertArtistSongQuery, values);
            }
        }

        // Insert associations into albums_songs table
        if (albumIds && albumIds.length > 0) {
            const insertAlbumSongQuery = /*sql*/ `
        INSERT INTO albums_songs (album_id, song_id)
        VALUES (?, ?);
      `;

            const insertAlbumSongValues = albumIds.map((albumId) => [albumId, songId]);

            // Execute the insert queries for albums in sequence
            for (const values of insertAlbumSongValues) {
                await dbConnection.execute(insertAlbumSongQuery, values);
            }
        }

        response.status(201).json({ message: "Song created successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

export default songsRouter;
