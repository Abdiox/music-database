import express from "express";
import fs from "fs/promises";
import cors from "cors";
import dbConnection from "./database.js";
import artistsRouter from "./routes/artists.js";
import albumsRouter from "./routes/albums.js";
import songsRouter from "./routes/songs.js";
import searchRouter from "./routes/searchRouter.js";

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
app.use("/search", searchRouter);
