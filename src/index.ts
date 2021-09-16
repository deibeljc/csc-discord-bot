import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import initBot from "./bot";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get(`/api`, async (req, res) => {
  res.json({ up: true });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${PORT}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
  )
);

initBot();
