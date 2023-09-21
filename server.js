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
  console.log(`serveren kører på http://localhost:3000`);
});

app.get("/", async (request, response) => {
  response.send("Hello my brother");
});

app.get("/artist", async (request, response) => {
  const query = "SELECT * FROM artist ORDER BY name;";
  dbConnection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      response.json({ message: error });
    } else {
      response.json(results);
    }
  });
});
