import { Tier } from "@prisma/client";
import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { prisma } from "../..";

export function Create() {
  const commandName = `create`;
  const subCommands = {
    player: `player`,
    franchise: `franchise`,
    team: `team`,
  };
  async function handler(interaction: CommandInteraction, subCommand?: string) {
    let res;
    switch (subCommand) {
      case subCommands.player:
        res = await prisma.player.create({
          data: {
            name: interaction.options.getString(`name`) ?? `no name`,
            discordId: interaction.options.getUser(`user`)?.id ?? ``,
            freeAgent: false,
            tier: (interaction.options.getString(`tier`) as Tier) ?? Tier.MAJOR,
            steamId: ``,
          },
        });
        break;
      case subCommands.team:
        res = await prisma.team.create({
          data: {
            name: interaction.options.getString(`name`) ?? ``,
            acronym: interaction.options.getString(`acronym`) ?? ``,
            tier: (interaction.options.getString(`tier`) as Tier) ?? Tier.MAJOR,
          },
        });
        break;
      case subCommands.franchise:
        res = await prisma.franchise.create({
          data: {
            name: interaction.options.getString(`name`) ?? ``,
          },
        });
        break;
    }

    return `${subCommand} ${JSON.stringify(res?.name)} created`;
  }

  const tierChoices = Object.keys(Tier).map((t): [string, string] => [t, t]);
  return {
    commandName,
    subCommands,
    command: new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(`Create`)
      .addSubcommand((subCommand) =>
        subCommand
          .setName(subCommands.player)
          .setDescription(`Creates a ${subCommands.player}`)
          .addStringOption((opt) =>
            opt
              .setName(`name`)
              .setDescription(`Name of the ${subCommands.player}`)
              .setRequired(true)
          )
          .addUserOption((opt) =>
            opt
              .setName(`user`)
              .setDescription(`Player's discord name`)
              .setRequired(true)
          )
          .addStringOption((opt) =>
            opt
              .setName(`tier`)
              .setDescription(`Tier for the ${subCommands.player}`)
              .addChoices(tierChoices)
              .setRequired(true)
          )
      )
      .addSubcommand((subCommand) =>
        subCommand
          .setName(subCommands.franchise)
          .setDescription(`Creates a ${subCommands.franchise}`)
          .addStringOption((opt) =>
            opt
              .setName(`name`)
              .setDescription(`Name of the ${subCommands.franchise}`)
              .setRequired(true)
          )
      )
      .addSubcommand((subCommand) =>
        subCommand
          .setName(subCommands.team)
          .setDescription(`Creates a ${subCommands.team}`)
          .addStringOption((opt) =>
            opt
              .setName(`name`)
              .setDescription(`Name of the ${subCommands.team}`)
              .setRequired(true)
          )
          .addStringOption((opt) =>
            opt
              .setName(`acronym`)
              .setDescription(`Acryonym of the ${subCommands.team}`)
              .setRequired(true)
          )
          .addStringOption((opt) =>
            opt
              .setName(`tier`)
              .setDescription(`Tier for the ${subCommands.team}`)
              .addChoices(tierChoices)
              .setRequired(true)
          )
      )
      .toJSON(),
    handler,
  };
}
