import express from "express";
import fs from "fs/promises";
import cors from "cors";
import dbConnection from "./database.js";
import artistsRouter from "./routes/artists.js";
import albumsRouter from "./routes/albums.js";
import songsRouter from "./routes/songs.js";

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

// Routers
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/songs", songsRouter);

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
