import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Interaction } from "discord.js";

export function initCommandHandlers(client: Client) {
  const commands = [Ping(), Create()];

  client.on(`interactionCreate`, async (interaction) => {
    if (!interaction.isCommand()) return;

    for (const command of commands) {
      console.log(
        `Handling ${
          command.commandName
        }. SubCommand ${interaction.options.getSubcommand()}`
      );
      // If we are only a top level command, resolve that way
      if (
        command.commandName === interaction.commandName &&
        !interaction.options.getSubcommand()
      ) {
        await interaction.reply(await command.handler(interaction));
      }
      // If we are a subcommand, resolve the command with a subcommand
      if (
        command.commandName === interaction.commandName &&
        interaction.options.getSubcommand() in command.subCommands
      ) {
        await interaction.reply(
          await command.handler(
            interaction,
            interaction.options.getSubcommand()
          )
        );
      }
    }
  });

  return commands.map((command) => command.command);
}

function Ping() {
  const commandName = `ping`;
  enum subCommands {}
  async function handler(interaction: Interaction) {
    return `Pong`;
  }

  return {
    commandName,
    subCommands,
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

function Create() {
  enum subCommands {
    Player = `player`,
    Franchise = `franchise`,
    Team = `team`,
  }
  const commandName = `create`;
  async function handler(interaction: Interaction, subCommand?: string) {
    return `Player created with ${subCommand}`;
  }

  return {
    commandName,
    subCommands,
    command: new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(`Create`)
      .addSubcommand((subCommand) =>
        subCommand
          .setName(subCommands.Player)
          .setDescription(`Creates a player`)
      )
      .addSubcommand((subCommand) =>
        subCommand
          .setName(subCommands.Franchise)
          .setDescription(`Creates a franchise`)
      )
      .addSubcommand((subCommand) =>
        subCommand.setName(subCommands.Team).setDescription(`Creates a team`)
      ),
    handler,
  };
}
