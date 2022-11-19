import '@skyra/env-utilities';
import type { PrismaClient } from '@prisma/client';

declare module '@sapphire/pieces' {
	interface Container {
		db: PrismaClient;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_PREFIX: string;
		NODE_ENV: 'test' | 'development' | 'production';
		REDIS_HOST: string;
	}
}
