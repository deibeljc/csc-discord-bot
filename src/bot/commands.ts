import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, Interaction } from "discord.js";

export function initCommandHandlers(client: Client) {
  const commands = [Ping(), Create()];

  client.on(`interactionCreate`, async (interaction) => {
    if (!interaction.isCommand()) return;

    for (const command of commands) {
      console.log(
        `Handling ${interaction}. SubCommand ${interaction.options.getSubcommand()}`
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
        command.subCommands.includes(interaction.options.getSubcommand())
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
  const subCommands: string[] = [];
  async function handler(interaction: CommandInteraction) {
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
  const commandName = `create`;
  const subCommands = [`player`, `franchise`, `team`];
  async function handler(interaction: CommandInteraction, subCommand?: string) {
    return `Player created with ${subCommand}`;
  }

  return {
    commandName,
    subCommands,
    command: new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(`Create`)
      .addSubcommand((subCommand) =>
        subCommand.setName(subCommands[0]).setDescription(`Creates a player`)
      )
      .addSubcommand((subCommand) =>
        subCommand.setName(subCommands[1]).setDescription(`Creates a franchise`)
      )
      .addSubcommand((subCommand) =>
        subCommand.setName(subCommands[2]).setDescription(`Creates a team`)
      ),
    handler,
  };
}
