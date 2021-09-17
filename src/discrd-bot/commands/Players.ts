import { SlashCommandBuilder } from "@discordjs/builders";
import { Tier } from "@prisma/client";
import { CommandInteraction } from "discord.js";
import { prisma } from "../..";

export function Players() {
  const commandName = `players`;
  async function handler(interaction: CommandInteraction) {
    console.log(`Handling players command`);
    if (interaction.options.getString(`tier`)) {
      return JSON.stringify(
        (
          await prisma.player.findMany({
            where: {
              tier: interaction.options.getString(`tier`) as Tier,
            },
          })
        ).map((player) => player.name)
      );
    }

    return JSON.stringify(
      (await prisma.player.findMany()).map((player) => player.name)
    );
  }
  const tierChoices = Object.keys(Tier).map((t): [string, string] => [t, t]);
  return {
    commandName,
    subCommands: {},
    command: new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(`Get all the players`)
      .addStringOption((option) =>
        option
          .setName(`tier`)
          .setDescription(`Get players for a specified tier`)
          .addChoices(tierChoices)
      )
      .toJSON(),
    handler,
  };
}
