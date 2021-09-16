import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const commands = [
  {
    name: "ping",
    description: "replies with pong",
  },
];

const rest = new REST({ version: "9" }).setToken(
  process.env.DISCORD_TOKEN as string
);

export default async function initBot() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID as string,
        "796914528709247016"
      ),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
