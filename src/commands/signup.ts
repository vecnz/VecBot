import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Sign up to the Victoria Engineering Club or one of the groups in the Collective.'
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
			content: 'You can signup at to VEC for free at this link [here](https://forms.gle/ooUf1NSCgUJV8h4H9).',
			ephemeral: true
		});
	}
}
