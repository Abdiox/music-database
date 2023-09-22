import { Router } from "express";
import dbConnection from "../database.js";

const searchRouter = Router();

searchRouter.get("/", async (request, response) => {
    const searchString = request.query.q;

    // Search for artists, songs, and albums
    const artistQuery = /*sql*/ `
        SELECT * 
        FROM artists
        WHERE name LIKE ?
        ORDER BY name`;

    const songQuery = /*sql*/ `
        SELECT * 
        FROM songs
        WHERE title LIKE ?
        ORDER BY title`;

    const albumQuery = /*sql*/ `
        SELECT * 
        FROM albums
        WHERE title LIKE ?
        ORDER BY title`;

    const values = [`%${searchString}%`];

    try {
        // Execute the queries in parallel
        const [artistResults, songResults, albumResults] = await Promise.all([
            dbConnection.execute(artistQuery, values),
            dbConnection.execute(songQuery, values),
            dbConnection.execute(albumQuery, values),
        ]);

        // Combine and send back the results
        const results = {
            artists: artistResults[0],
            songs: songResults[0],
            albums: albumResults[0],
        };

        response.json(results);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

export default searchRouter;
