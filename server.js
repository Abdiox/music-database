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

// SEE ARTISTS
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

// SEE ALBUMS
app.get("/album", async (request, response) => {
  try {
    const query = "SELECT * FROM album;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// SEE ARTISTS
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

// SEE SPECIFIC ARTIST
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
