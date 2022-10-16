import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

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

	public override async chatInputRun(interaction: Command.ChatInputInteraction) {
		// check if user has permission to send a message in this channel
		let ephemeral;
		if (interaction.channel === null) {
			ephemeral = true;
		} else if (interaction.channel.type === 'DM') {
			ephemeral = false;
		} else {
			ephemeral = !interaction.channel?.permissionsFor(interaction.user)?.has('SEND_MESSAGES');
		}

		await interaction.reply({
			content: 'Micropad is the easy to use powerful notepad app developed by our very own Nick. Check it out [here](https://getmicropad.com)',
			ephemeral
		});
	}
}
