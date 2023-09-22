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

// Opret og opdater song
// {
//   "title": "xxxxx",
//   "releaseDate": "YYYY-MM-DD",
//   "length": "xx:xx",
//   "artistIds": [x], 
//   "albumIds": [x]
// }

songsRouter.post("/", async (request, response) => {
    try {
        // Udpak sangdata fra anmodningskroppen
        const { title, releaseDate, length, artistIds, albumIds } = request.body;

        // Indsæt den nye sang i songs-tabellen
        const insertSongQuery = /*sql*/ `
      INSERT INTO songs (title, releaseDate, length)
      VALUES (?, ?, ?);
    `;

        const insertSongValues = [title, releaseDate, length];

        const [songResult] = await dbConnection.execute(insertSongQuery, insertSongValues);

        // Få ID'et på den nyindsatte sang
        const songId = songResult.insertId;

        // Indsæt forbindelser i artists_songs-tabellen
        if (artistIds && artistIds.length > 0) {
            const insertArtistSongQuery = /*sql*/ `
        INSERT INTO artists_songs (artist_id, song_id)
        VALUES (?, ?);
      `;

            const insertArtistSongValues = artistIds.map((artistId) => [artistId, songId]);

            // Udfør indsættelsesforespørgslerne for kunstnere i sekvens
            for (const values of insertArtistSongValues) {
                await dbConnection.execute(insertArtistSongQuery, values);
            }
        }

        // Indsæt forbindelser i albums_songs-tabellen
        if (albumIds && albumIds.length > 0) {
            const insertAlbumSongQuery = /*sql*/ `
        INSERT INTO albums_songs (album_id, song_id)
        VALUES (?, ?);
      `;

            const insertAlbumSongValues = albumIds.map((albumId) => [albumId, songId]);

            // Udfør indsættelsesforespørgslerne for album i sekvens
            for (const values of insertAlbumSongValues) {
                await dbConnection.execute(insertAlbumSongQuery, values);
            }
        }

        response.status(201).json({ message: "Sang oprettet med succes" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Intern serverfejl" });
    }
});


// ---------------------PUT-----------------------//

songsRouter.put("/:id", async (request, response) => {
    try {
        const songId = request.params.id;

        // Udtræk opdaterede sangdata fra anmodningskroppen
        const { title, releaseDate, length, artistIds, albumIds } = request.body;

        // Opdater sangen i songs-tabellen
        const updateSongQuery = /*sql*/ `
      UPDATE songs
      SET title = ?, releaseDate = ?, length = ?
      WHERE id = ?;
    `;

        const updateSongValues = [title, releaseDate, length, songId];

        await dbConnection.execute(updateSongQuery, updateSongValues);

        // Opdater forbindelser i artists_songs-tabellen
        if (artistIds && artistIds.length > 0) {
            // Slet eksisterende forbindelser for sangen
            const deleteArtistSongQuery = /*sql*/ `
        DELETE FROM artists_songs
        WHERE song_id = ?;
      `;

            await dbConnection.execute(deleteArtistSongQuery, [songId]);

            // Indsæt nye forbindelser
            const insertArtistSongQueries = artistIds.map((artistId) => {
                return /*sql*/ `
          INSERT INTO artists_songs (artist_id, song_id)
          VALUES (?, ?);
        `;
            });

            const insertArtistSongValues = artistIds.map((artistId) => [artistId, songId]);

            // Udfør alle indsættelsesforespørgsler parallelt
            await Promise.all(
                insertArtistSongQueries.map(async (query, index) => {
                    await dbConnection.execute(query, insertArtistSongValues[index]);
                })
            );
        }

        // Opdater forbindelser i albums_songs-tabellen
        if (albumIds && albumIds.length > 0) {
            // Slet eksisterende forbindelser for sangen
            const deleteAlbumSongQuery = /*sql*/ `
        DELETE FROM albums_songs
        WHERE song_id = ?;
      `;

            await dbConnection.execute(deleteAlbumSongQuery, [songId]);

            // Indsæt nye forbindelser
            const insertAlbumSongQueries = albumIds.map((albumId) => {
                return /*sql*/ `
          INSERT INTO albums_songs (album_id, song_id)
          VALUES (?, ?);
        `;
            });

            const insertAlbumSongValues = albumIds.map((albumId) => [albumId, songId]);

            // Udfør alle indsættelsesforespørgsler parallelt
            await Promise.all(
                insertAlbumSongQueries.map(async (query, index) => {
                    await dbConnection.execute(query, insertAlbumSongValues[index]);
                })
            );
        }

        response.json({ message: "Song updated successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});


// ---------------------Delete----------------------//

songsRouter.delete("/:id", async (request, response) => {
    try {
        const songId = request.params.id;

        // Delete associations in albums_songs table first
        const deleteAlbumSongQuery = /*sql*/ `
      DELETE FROM albums_songs
      WHERE song_id = ?;
    `;

        await dbConnection.execute(deleteAlbumSongQuery, [songId]);

        // Delete associations in artists_songs table
        const deleteArtistSongQuery = /*sql*/ `
      DELETE FROM artists_songs
      WHERE song_id = ?;
    `;

        await dbConnection.execute(deleteArtistSongQuery, [songId]);

        // Delete the song from the songs table
        const deleteSongQuery = /*sql*/ `
      DELETE FROM songs
      WHERE id = ?;
    `;

        await dbConnection.execute(deleteSongQuery, [songId]);

        response.json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

export default songsRouter;
