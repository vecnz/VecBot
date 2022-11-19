import type { Role } from '@prisma/client';
import { container } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';

export function checkVerified(user: GuildMember): boolean {
	// TODO - work out how to get verified role
	return true;
}

export async function getRoles(user: GuildMember): Promise<Role[]> {
	const guildId = user.guild.id;

	// get roles
	const roles = await container.db.role.findMany({
		where: {
			guildId
		}
	});

	// get current user roles and filter out roles the user already has
	user.roles.cache.forEach((role) => {
		roles.filter((r) => r.id !== role.id);
	});

	return roles;
}

export async function getCurrentRoles(user: GuildMember): Promise<Role[]> {
	const guildId = user.guild.id;

	// get roles
	const roles = await container.db.role.findMany({
		where: {
			guildId
		}
	});

	// get current user roles and filter out roles the user already has
	user.roles.cache.forEach((role) => {
		roles.filter((r) => r.id === role.id);
	});

	return roles;
}
