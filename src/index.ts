import '#lib/setup';
import { container, SapphireClient } from '@sapphire/framework';
import { envParseInteger, envParseString } from '@skyra/env-utilities';
import { ScheduledTaskRedisStrategy } from '@sapphire/plugin-scheduled-tasks/register-redis';

const client = new SapphireClient({
	shards: 'auto',
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
	tasks: {
		strategy: new ScheduledTaskRedisStrategy({
			bull: {
				connection: {
					host: envParseString('REDIS_HOST')
				}
			}
		})
	}
});

async function main() {
	try {
		// Login to the Discord gateway
		await client.login();
	} catch (error) {
		container.logger.error(error);
		client.destroy();
		process.exit(1);
	}
}

main().catch(container.logger.error.bind(container.logger));
