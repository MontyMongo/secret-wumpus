const Discord = require('discord.js');
const Game = require('../game.js');

exports.info =
{
	name: 'help',
	value: 'Displays this help page.',
};

exports.run = async (client, message, args) =>
{
	const titleEmbed = new Discord.MessageEmbed()
		.setTitle('Secret Hitler - Help')
		.attachFiles(new Discord.MessageAttachment('./assets/Splash.png', 'SecretHitler.png'))
		.setImage('attachment://SecretHitler.png');

	const gameCMDEmbed = Game.getHelpMessage(client);

	const clientEmbed = new Discord.MessageEmbed()
		.setTitle('Other Commands');
	client.commands.forEach(h =>
	{
		clientEmbed.addField(`${client.prefix}${h.info.name}`, h.info.value);
	});

	message.delete().catch(err => console.log(err));
	await message.author.send(titleEmbed);
	await message.author.send(gameCMDEmbed);
	await message.author.send(clientEmbed);
};
