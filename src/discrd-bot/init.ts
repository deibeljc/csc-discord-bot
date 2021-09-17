import { Client, Intents } from "discord.js";
import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";

const token = process.env.DISCORD_TOKEN as string;
const clientId = process.env.DISCORD_CLIENT_ID as string;
const guildId = `888488465132576768`;

const rest = new REST({ version: `9` }).setToken(token);

export async function initClient(): Promise<Client> {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  return new Promise((resolve) => {
    client.once(`ready`, () => {
      console.log(`Client is ready`);
      resolve(client);
    });

    client.login(token);
  });
}

export async function initCommands(commands: any[]) {
  try {
    console.log(`Started refreshing application (/) commands.`);

    for (const command of commands) {
      console.log(`Registered /${command?.name}`);
    }

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}
