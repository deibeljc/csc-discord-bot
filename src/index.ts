import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { initClient, initCommands } from "./discrd-bot/init";
import { initCommandHandlers } from "./discrd-bot/commands";

export const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(express.static(`public`));

app.get(`/api`, async (req, res) => {
  res.json({ up: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${PORT}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
  )
);

async function init() {
  const client = await initClient();
  const commands = await initCommandHandlers(client);
  await initCommands(commands);
}

init();
