// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import 'reflect-metadata';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-editable-commands/register';
import * as colorette from 'colorette';
import { config } from 'dotenv-cra';
import * as Sentry from "@sentry/node";
import { join } from 'path';
import { inspect } from 'util';
import { srcDir } from './constants';

// Read env var
config({ path: join(srcDir, "../", '.env') });

// Setup sentry
Sentry.init({
    dsn: process.env["SENTRYDSN"],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true })
