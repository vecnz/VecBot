import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ChannelType } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Micropad!'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry //
			.registerChatInputCommand((builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
			);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		// check if user has permission to send a message in this channel
		let ephemeral;
		if (interaction.channel === null) {
			ephemeral = true;
		} else if (interaction.channel.type === ChannelType.DM) {
			ephemeral = false;
		} else {
			ephemeral = !interaction.channel?.permissionsFor(interaction.user)?.has('SendMessages');
		}

		await interaction.reply({
			content: 'Micropad is the easy to use powerful notepad app developed by our very own Nick. Check it out [here](https://getmicropad.com)',
			ephemeral
		});
	}
}
