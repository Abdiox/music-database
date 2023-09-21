import express from "express";
import fs from "fs/promises";
import cors from "cors";
import dbConnection from "./database.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());


// Routers
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/songs", songsRouter);

app.get("/", (request, response) => {
  response.send("Node.js Users REST API 🎉");
});

app.listen(port, () => {
  console.log(`serveren kører på http://localhost:${port}`);
});

app.get("/", async (request, response) => {
  response.send("Hello my brother");
});

