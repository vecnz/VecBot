import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'kick a user',
    preconditions: ['Moderator'],
})
export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const user = await args.rest('member');
        const reason = await args.rest('string', { default: `No reason provided. (${message.author.tag})`, minimum: 0 });
        if (user.id === message.author.id) return message.channel.send('You cannot kick yourself.');
        if (user.id === message.guild!.ownerId) return message.channel.send('You cannot kick the server owner.');
        if (user.id === message.guild!.me!.id) return message.channel.send('You cannot kick the bot.');
        if (user.roles.highest.position >= message.member!.roles.highest.position) return message.channel.send('You cannot kick someone with a higher or equal role.');
        if (!user.kickable) return message.channel.send('I cannot kick this user.');
        await message.react('✅');
        return await user.kick(reason);
    }
}
