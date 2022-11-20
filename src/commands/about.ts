import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'About the bot.'
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
				'This bot is a utility bot for Victoria University clubs and discord communities. It is run free of charge by the Victoria Engineering Club and is fully open source under an AGPLv3 license and can be found [here](https://github.com/vecnz/VecBot). Feel free to add any new features or raise any bugs',
			ephemeral: true
		});
	}
}
