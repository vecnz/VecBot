import { getRoles } from '#lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Guild, GuildMember, MessageActionRow, MessageSelectMenu } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Subscribe to updates from one of the groups in the Collective.'
})
export class UserCommand extends Command {
	public constructor(context: Command.Context) {
		super(context, {
			preconditions: ['GuildOnly']
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry //
			.registerChatInputCommand((builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
			);
	}

	public override async chatInputRun(interaction: Command.ChatInputInteraction) {
		const guild = interaction.guild as Guild; // we know this is a guild because of the precondition
		const member = guild.members.cache.get(interaction.user.id) as GuildMember;
		const roles = await getRoles(member);

		if (roles.length === 0) {
			await interaction.reply({
				content: 'You already have all the available roles.',
				ephemeral: true
			});
			return;
		}

		const roleOptions = roles.map((role) => ({
			label: role.name,
			value: role.id,
			description: role.description
		}));

		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('addRole')
				.setMinValues(1)
				.setMaxValues(roles.length)
				.setPlaceholder('Nothing selected')
				.setOptions(roleOptions)
		);

		await interaction.reply({
			content: 'Subscribe to updates from one of the groups or events.',
			components: [row],
			ephemeral: true
		});
	}
}
