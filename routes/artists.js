import { Router, request, response } from "express";
import dbConnection from "../database.js";

const artistsRouter = Router();

artistsRouter.get("/artist", async (request, response) => {
    const query = "SELECT * FROM music_db1 ORDER BY name;";
    dbConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            response.json(results);
        }
    });
});

artistsRouter.get("/search", async (request, response) => {
    const searchString = request.query.q;
    const query = /*sql*/`
    SELECT * 
    FROM artist
    WHERE name LIKE ?
    ORDER BY name`;
    const values = [`%${searchString}%`];

    const [results] = await dbConnection.execute(query, values);
    response.json(results)
})
