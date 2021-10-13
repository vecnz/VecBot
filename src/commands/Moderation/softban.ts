import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'softban a user',
    preconditions: ['Moderator'],
})
export class UserCommand extends Command {
    public async run(message: Message, args: Args) {
        const user = await args.rest('member');
        const reason = await args.rest('string', { default: `No reason provided for softban. (${message.author.tag})`, minimum: 0 });
        if (user.id === message.author.id) return message.channel.send('You cannot softban yourself.');
        if (user.id === message.guild!.ownerId) return message.channel.send('You cannot softban the server owner.');
        if (user.id === message.guild!.me!.id) return message.channel.send('You cannot softban the bot.');
        if (user.roles.highest.position >= message.member!.roles.highest.position) return message.channel.send('You cannot softban someone with a higher or equal role.');
        if (!user.bannable) return message.channel.send('I cannot softban this user.');
        await message.react('✅');
        await user.ban({ reason: reason, days: 7 });
        return await user.guild.bans.remove(user);
    }
}
