import express from "express";
import fs from "fs/promises";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log(`serveren kører på http://localhost:3000`);
});

app.get("/", async (request, response) => {
    response.send("Hello my brother");
});
