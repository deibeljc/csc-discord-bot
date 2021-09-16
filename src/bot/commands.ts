import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Interaction } from "discord.js";

export function initCommandHandlers(client: Client) {
  const commands = [Ping()];

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    for (const command of commands) {
      if (command.commandName === interaction.commandName) {
        await interaction.reply(await command.handler(interaction));
      }
    }
  });

  return commands.map((command) => command.command);
}

function Ping() {
  const commandName = "ping";
  async function handler(interaction: Interaction) {
    return "Pong";
  }

  return {
    commandName,
    command: new SlashCommandBuilder()
      .setName(commandName)
      .setDescription("Replies pong")
      .addStringOption((option) =>
        option
          .setName("category")
          .setDescription("Testing")
          .setRequired(true)
          .addChoices([
            ["Test 1", "1"],
            ["Test 2", "2"],
          ])
          .addChoices([
            ["Test 3", "1"],
            ["Test 4", "2"],
          ])
      )
      .toJSON(),
    handler,
  };
}
