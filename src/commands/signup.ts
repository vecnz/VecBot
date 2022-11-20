import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Sign up to Uni Clubs.'
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
		// get invite code
		const inviteLink = await this.container.db.guild.findUnique({
			where: { id: interaction.guildId! },
			select: { signUpLink: true }
		});

		if (!inviteLink) {
			await interaction.reply({
				content:
					'This server has not set up a sign up link yet or is not a university club. You can search for clubs [here](https://www.wgtn.ac.nz/students/campus/clubs/directory)',
				ephemeral: true
			});
			return;
		}

		await interaction.reply({
			content: `You can signup at to ${interaction.guild?.name} for free at this link [here](${inviteLink}). You can also see the full clubs list [here](https://www.wgtn.ac.nz/students/campus/clubs/directory).`,
			ephemeral: true
		});
	}
}
