import { Precondition } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuInteraction, Guild, Message } from 'discord.js';

export class GuildOnlyPrecondition extends Precondition {
	public override async messageRun(message: Message) {
		// for message command
		return this.checkGuild(message.guild);
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		// for slash command
		return this.checkGuild(interaction.guild);
	}

	public override async contextMenuRun(interaction: ContextMenuInteraction) {
		// for Context Menu Command
		return this.checkGuild(interaction.guild);
	}

	private async checkGuild(guild: Guild | null) {
		if (guild !== null) return this.ok();
		return this.error({ message: 'You can only use this command in a server.' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		GuildOnly: never;
	}
}
