import type { GuildMember } from 'discord.js';

export function checkVerified(user: GuildMember): boolean {
	if (
		user.roles.cache.has('1014305784697466901') || // Student
		user.roles.cache.has('866479683167453194') || // Alumni
		user.roles.cache.has('1014305783619518515') || // Faculty
		user.roles.cache.has('1020611265422434355') // External
	) {
		return true;
	}
	return false;
}
