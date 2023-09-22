import express from "express";
import fs from "fs/promises";
import cors from "cors";
import dbConnection from "./database.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Node.js Users REST API 🎉");
});

app.listen(port, () => {
  console.log(`serveren kører på http://localhost:3333`);
});

// GET ARTISTS
app.get("/artists", async (request, response) => {
  try {
    const query = "SELECT * FROM artists ORDER BY name;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET ALBUMS
app.get("/albums", async (request, response) => {
  try {
    const query = "SELECT * FROM albums;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET ARTISTS
app.get("/songs", async (request, response) => {
  try {
    const query = "SELECT * FROM songs;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC ARTIST
app.get("/artists/:id", async (request, response) => {
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

// GET SPECIFIC ALBUM
app.get("/albums/:id", async (request, response) => {
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

// GET SPECIFIC SONG
app.get("/songs/:id", async (request, response) => {
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

// GET ARTISTS INDIVIDUAL SONGS ON ALBUM
app.get("/artists/:id/albums", async (request, response) => {
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

// app.get("/:id", async (request, response) => {
//   try {
//     const id = request.params.id;

//     const query = /*sql*/ `
//   SELECT albums_songs.*,
//       artists.name AS artistName,
//       albums_songs.position,
//       songs.id AS songId,
//       songs.title AS songTitle,
//       songs.length AS songLength,
//       songs.releaseDate AS songReleaseDate,
//       artists.id AS artistId
//   FROM albums
//   LEFT JOIN albums_songs ON albums.id = albums_songs.albums_id
//   LEFT JOIN songs ON albums_songs.song_id = songs.id
//   LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
//   LEFT JOIN artists ON artists_songs.artist_id = artists.id
//   WHERE albums.id = ?
//   ORDER BY albums_songs.position;
// `;
//     const values = [id];

//     const [results] = await dbConnection.execute(query, values);

//     if (results[0]) {
//       // If at least one result is found
//       const album = results[0];
//       const albumWithSongs = {
//         id: album.id,
//         title: album.title,
//         releaseDate: album.release_date,
//         songs: results.map((song) => {
//           return {
//             id: song.songId,
//             title: song.songTitle,
//             length: song.songLength,
//             releaseDate: song.songReleaseDate,
//             position: song.position,
//           };
//         }),
//       };

//       response.json(albumWithSongs);
//     } else {
//       // If no results are found
//       response.json({ message: "No album found" });
//     }
//   } catch (error) {
//     // Handle any errors that occur during the database query
//     console.error(error);
//     response.json({ message: error.message });
//   }
// });

// app.get("/", async (request, response) => {
//   response.send("Hello my brother");
// });

// app.get("/artists", async (request, response) => {
//   const query = "SELECT * FROM artists ORDER BY name;";
//   dbConnection.query(query, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//       response.json({ message: error });
//     } else {
//       response.json(results);
//     }
//   });
// });
