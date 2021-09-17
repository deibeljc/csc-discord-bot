import { SlashCommandBuilder } from "@discordjs/builders";
import { Tier } from "@prisma/client";
import { CommandInteraction } from "discord.js";
import { prisma } from "../..";

export function Players() {
  const commandName = `players`;
  async function handler(interaction: CommandInteraction) {
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
      .setDescription(`Replies pong`)
      .addStringOption((option) =>
        option
          .setName(`tier`)
          .setDescription(`Get players for all tiers or a specified one`)
          .addChoices(tierChoices)
      )
      .toJSON(),
    handler,
  };
}
