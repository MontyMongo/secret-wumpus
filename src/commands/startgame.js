exports.info =
{
	name: 'startgame',
	value: 'Allows the owner of a game to start it, \nprovided it has at least 5 seated players.',
};

exports.run = async (client, message, args) =>
{
	const channel = message.channel;

	if (!client.activeGames.has(channel.id))
	{
		message.reply('There is no game in this channel!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	const game = client.activeGames.get(channel.id);

	if (game.owner !== message.author.id)
	{
		message.reply('You are not the owner of this game!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	if (game.players.length < 5)
	{
		message.reply(`There are not enough players! (${game.players.length}/5)`)
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	game.start();
};
