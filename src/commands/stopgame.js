exports.info =
{
	name: 'stopgame',
	value: 'Allows the owner of a game to destroy it.',
};

exports.run = async (client, message, args) =>
{
	const channel = message.channel;

	if (!client.activeGames.has(channel))
	{
		message.reply('There is no game in this channel!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	const game = client.activeGames.get(channel);
	const playerIDs = game.players;

	if (game.owner !== message.author.id)
	{
		message.reply('You are not the owner of this game!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	playerIDs.forEach(p =>
	{
		client.sittingPlayers.delete(p);
	});

	client.activeGames.get(channel).destroy();
	client.activeGames.delete(channel);

	message.reply('Deleted game.')
		.then(msg => msg.delete({ timeout: 2000 }))
		.then(() => message.delete().catch(err => console.log(err)));
};
