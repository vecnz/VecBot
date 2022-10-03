import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'About this VecBot.'
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
		await interaction.reply({
			content:
				'This bot is a utility bot for the Victoria Engineering Club Discord server, it is fully open source under an AGPLv3 license and can be found [here](https://github.com/vecnz/VecBot). Feel free to add any new features or raise any bugs',
			ephemeral: true
		});
	}
}
