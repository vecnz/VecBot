import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'ban a user',
    preconditions: ['Moderator'],
})
export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const user = await args.rest('member');
        const reason = await args.rest('string', { default: `No reason provided. (${message.author.tag})`, minimum: 0 });
        if (user.id === message.author.id) return message.channel.send('You cannot ban yourself.');
        if (user.id === message.guild!.ownerId) return message.channel.send('You cannot ban the server owner.');
        if (user.id === message.guild!.me!.id) return message.channel.send('You cannot ban the bot.');
        if (user.roles.highest.position >= message.member!.roles.highest.position) return message.channel.send('You cannot ban someone with a higher or equal role.');
        await message.react('✅');
        return await user.ban({ reason: reason });
    }
}
