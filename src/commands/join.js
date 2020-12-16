exports.info =
{
	name: 'join',
	value: 'Joins the game in this channel if it has not already started.',
};

exports.run = async (client, message, args) =>
{
	const channel = message.client;

	if (!client.activeGames.has(channel.id))
	{
		message.reply('There is no game in this channel!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	const game = client.activeGames.get(channel.id);

	if (client.sittingPlayers.has(message.author.id))
	{
		message.reply('You are already in a game!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	if (game.running)
	{
		message.reply('This game has already started!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	game.add(message.author.id);
	message.delete().catch(err => console.log(err));
	client.sittingPlayers.set(message.author.id, game);
};
