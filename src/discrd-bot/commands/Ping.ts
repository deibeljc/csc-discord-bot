import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export function Ping() {
  const commandName = `ping`;
  async function handler(interaction: CommandInteraction) {
    return `Pong`;
  }

  return {
    commandName,
    subCommands: {},
    command: new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(`Replies pong`)
      .addStringOption((option) =>
        option
          .setName(`category`)
          .setDescription(`Testing`)
          .setRequired(true)
          .addChoices([
            [`Test 1`, `1`],
            [`Test 2`, `2`],
          ])
      )
      .toJSON(),
    handler,
  };
}
