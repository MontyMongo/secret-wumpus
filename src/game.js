const Discord = require ('discord.js');
const path = require('path');
const fs = require('fs');

const game_commands = new Discord.Collection();

fs.readdir('./src/commands-game/', (err, files) =>
{
	if (err) return console.log(err);
	files.forEach(file =>
	{
		if (!file.endsWith('.js')) return;
		const props = require(`./commands-game/${file}`);
		const fname = file.split('.')[0];
		game_commands.set(fname, props);
	});
});


class Game
{
	constructor(client, context)
	{
		this.client = client;

		this.guild = context.guild;
		this.channel = context.channel;
		this.owner = context.author.id;
		this.players = [context.author.id];
		this.seated = 1;
		this.watchingMessage = null;
		this.running = false;

		this.size = null;
	}
}

Game.getHelpMessage = (client) =>
{
	const embed = new Discord.MessageEmbed()
		.setTitle('Game Commands');
	game_commands.forEach(c =>
	{
		embed.addField(`${client.prefix}${c.info.name}`, c.info.value);
	});

	return embed;
};

Game.add = async (playerID) =>
{
	if (this.players.includes(playerID))
	{
		this.channel.send(`<@${playerID}> is already seated!`)
			.then(msg => msg.delete({ timeout: 2000 }));
		return;
	}

	this.players.push(playerID);
	this.seated += 1;

	if (this.seated === 10)
	{
		this.start();
	}
};

Game.init = async () =>
{
}

Game.start = async () =>
{
	this.running = true;
	this.size = this.seated;
};

Game.handle = async (command, args) =>
{
	const cmd = game_commands.get(command);

	if (cmd)
	{
		cmd.run(this, args);
		return;
	}
	this.channel.send(`Unknown command '${command}'.`)
		.then(msg => msg.delete({ timeout: 2000 }));
	return;
};

module.exports = Game;
