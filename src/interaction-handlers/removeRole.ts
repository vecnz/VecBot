import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import type { Guild, GuildMember, SelectMenuInteraction } from 'discord.js';

export class MenuHandler extends InteractionHandler {
	public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
		super(ctx, {
			...options,
			interactionHandlerType: InteractionHandlerTypes.SelectMenu
		});
	}

	public override parse(interaction: SelectMenuInteraction) {
		if (interaction.customId !== 'removeRole') return this.none();
		return this.some();
	}

	public async run(interaction: SelectMenuInteraction) {
		// get the members roles
		const guild = interaction.guild as Guild;
		const member = guild.members.cache.get(interaction.user.id) as GuildMember;

		interaction.values.forEach(async (role) => {
			await member.roles.remove(role);
		});

		await interaction.reply({
			content: 'You are now unsubscribed to the selected groups or events.',
			ephemeral: true
		});
	}
}
