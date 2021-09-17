import { Client } from "discord.js";
import { Create } from "./Create";
import { Ping } from "./Ping";
import { Players } from "./Players";

export function initCommandHandlers(client: Client) {
  const commands = [Ping(), Create(), Players()];

  client.on(`interactionCreate`, async (interaction) => {
    if (!interaction.isCommand()) return;

    for (const command of commands) {
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
        Object.keys(command.subCommands).includes(
          interaction.options.getSubcommand()
        )
      ) {
        console.log(
          `Handling ${
            interaction.commandName
          }. SubCommand ${interaction.options.getSubcommand()}`
        );
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
