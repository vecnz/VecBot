import { roleOptions, roleArray } from '#lib/constants';
import { checkVerified } from '#lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { GuildMember, ActionRowBuilder, StringSelectMenuBuilder, MessageActionRowComponentBuilder } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Unsubscribe to updates from one of the groups in the Collective.'
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
		// get the users roles
		const { guild } = interaction;
		if (!guild) {
			await interaction.reply({
				content: 'You can only use this command in the VEC server.',
				ephemeral: true
			});
			return;
		}
		const member = guild.members.cache.get(interaction.user.id) as GuildMember;

		if (!checkVerified) {
			await interaction.reply({
				content: 'You must be verified to use this command. Run `/verify` to verify.',
				ephemeral: true
			});
			return;
		}

		// get all roles that are in roles
		const currentRoles: string[] = [];
		member.roles.cache.forEach((role) => {
			currentRoles.push(role.id);
			return roleArray.includes(role.id);
		});

		const newRoleOptions = roleOptions.filter((role) => currentRoles.includes(role.value));

		if (newRoleOptions.length === 0) {
			await interaction.reply({
				content: 'You are not subscribed to any groups or events.',
				ephemeral: true
			});
			return;
		}

		const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('removeRole')
				.setMinValues(1)
				.setMaxValues(newRoleOptions.length)
				.setPlaceholder('Nothing selected')
				.setOptions(newRoleOptions)
		);

		await interaction.reply({
			content: 'Unsubscribe to updates from one of the groups or events.',
			components: [row],
			ephemeral: true
		});
	}
}
