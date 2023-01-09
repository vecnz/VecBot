import '#lib/setup';
import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import { envParseString } from '@skyra/env-utilities';
import { ScheduledTaskRedisStrategy } from '@sapphire/plugin-scheduled-tasks/register-redis';
import { GatewayIntentBits, Partials } from 'discord.js';

const client = new SapphireClient({
	shards: 'auto',
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
	logger: {
		level: envParseString('NODE_ENV') === 'production' ? LogLevel.Info : LogLevel.Debug
	},
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
