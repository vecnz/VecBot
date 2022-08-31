import type { MessageSelectOptionData } from 'discord.js';
export const roles: { [key: string]: string } = {
	VRAM: '900923051619778590',
	VSEC: '942345004062507028',
	VISDA: '934335156360208384',
	'Game Night': '946519293410029568',
	'Class Rep': '959449106877669448',
	Alumni: '866479683167453194'
};

export const roleArray = [
	'900923051619778590',
	'942345004062507028',
	'934335156360208384',
	'946519293410029568',
	'959449106877669448',
	'866479683167453194'
];

export const roleOptions: MessageSelectOptionData[] = [
	{
		label: 'VRAM',
		description: 'Victoria Robotics and Mechatronics',
		value: roles.VRAM
	},
	{
		label: 'VSEC',
		description: 'Victoria SEcurity',
		value: roles.VSEC
	},
	{
		label: 'VISDA',
		description: 'Victoria Information Systems and Data Analytics',
		value: roles.VISDA
	},
	{
		label: 'Game Night',
		description: 'Game Night',
		value: roles['Game Night']
	},
	{
		label: 'Class Rep',
		description: 'Class Rep',
		value: roles['Class Rep']
	},
	{
		label: 'Alumni',
		description: 'Alumni',
		value: roles.Alumni
	}
];
