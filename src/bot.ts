import { Client, Intents } from "discord.js";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Routes } from "discord-api-types/v9";

const token = process.env.DISCORD_TOKEN as string;
const clientId = process.env.DISCORD_CLIENT_ID as string;
const guildId = "796914528709247016";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies pong")
    .toJSON(),
];

const rest = new REST({ version: "9" }).setToken(token);

function initClient() {
  return new Promise((resolve) => {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.once("ready", () => {
      console.log("Client is ready");
      resolve(client);
    });

    client.login(token);
  });
}

export default async function initBot() {
  try {
    await initClient();

    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
