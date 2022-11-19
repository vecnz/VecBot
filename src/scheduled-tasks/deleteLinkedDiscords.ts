import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class DeleteLinkedDiscordTask extends ScheduledTask {
	public constructor(context: ScheduledTask.Context, options: ScheduledTask.Options) {
		super(context, {
			// run 25th Feb
			cron: '0 0 25 2 *'
		});
	}

	public async run() {
		// get all courses with a linked discord
		const courses = await this.container.db.course.findMany({ where: { discord: { not: undefined } } });

		// loop through courses
		courses.forEach(async (course) => {
			await this.container.db.course.update({ where: { id: course.id }, data: { discord: undefined } });
		});
	}
}

declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		cron: never;
	}
}
