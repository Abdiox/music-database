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

artistsRouter.post("/", async (request, response) => {
  try {
    const { name, birthdate, genres, shortDescription, images } = request.body;

    // Indsæt den nye artist i artists-tabellen
    const insertArtistQuery = `
      INSERT INTO artists (name, birthdate, genres, shortDescription, images)
      VALUES (?, ?, ?, ?, ?);
    `;

    const insertArtistValues = [name, birthdate, genres, shortDescription, images];

    const [artistResult] = await dbConnection.execute(insertArtistQuery, insertArtistValues);

    // Hent ID'et for den nyoprettede kunstner
    const artistId = artistResult.insertId;

    response.status(201).json({ message: "Artist created successfully", artistId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

artistsRouter.put("/:id", async (request, response) => {
    try {
        const artistId = request.params.id;

        // Udtræk opdaterede kunstneroplysninger fra anmodningens krop
        const { name, birthdate, genres, shortDescription, images } = request.body;

        // Opdater kunstneren i artists-tabellen
        const updateArtistQuery = /*sql*/ `
        UPDATE artists
        SET name = ?, birthdate = ?, genres = ?, shortDescription = ?, images = ?
        WHERE id = ?;
        `;

        const updateArtistValues = [name, birthdate, genres, shortDescription, images, artistId];

        await dbConnection.execute(updateArtistQuery, updateArtistValues);

        response.json({ message: "Artist updated successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

artistsRouter.delete("/:id", async (request, response) => {
    try {
        const artistId = request.params.id;

        // Slet kunstneren fra artists-tabellen
        const deleteArtistQuery = /*sql*/ `
      DELETE FROM artists
      WHERE id = ?;
    `;

        await dbConnection.execute(deleteArtistQuery, [artistId]);

        // Hvis du vil slette eventuelle tilknyttede data, f.eks. sange eller albums, skal du håndtere det her.

        response.json({ message: "Artist deleted successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});


export default artistsRouter;
