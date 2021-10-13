import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserPrecondition extends Precondition {
    public async run(message: Message) {
        if (!message.guild) {
            return this.error({ message: 'This cannot be run in dms' });
        }
        return message.member!.permissions.has('BAN_MEMBERS') ? this.ok() : this.error({ message: 'This command can only run by Moderators!' });
    }
}


declare module '@sapphire/framework' {
    interface Preconditions {
        Moderator: never;
    }
}
