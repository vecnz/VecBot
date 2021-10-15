import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'Short link to the ecs website'
})
export class UserCommand extends Command {
    public async run(message: Message, args: Args) {
        const site_base = "https://ecs.wgtn.ac.nz/"
        if (args.peek("string") !== null) {
            return send(message, `${site_base}Courses/${args.next().toUpperCase()}_${new Date().getFullYear()}T2/WebHome`);
        }

        else {
            return send(message, `${site_base}Main/`);
        }
    }
}
