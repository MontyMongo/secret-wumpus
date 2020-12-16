exports.info =
{
	name: 'invite',
	value: 'Invites a user into the game in this channel, \nprovided you are already seated.',
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

	if (!client.sittingPlayers.has(message.author.id) ||
			client.sittingPlayers.get(message.author.id) !== game)
	{
		message.reply('You are not in this game and can\'t invite someone to it!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	args.forEach(userid =>
	{
		if (game.running)
		{
			message.reply(`Can't add <@${userid}>; this game has already started!`)
				.then(msg => msg.delete({ timeout: 2000 }))
				.then(() => message.delete().catch(err => console.log(err)));
			return;
		}

		if (client.users.fetch(userid) !== null)
		{
			game.add(userid);
			message.delete();
			client.sittingPlayers.set(userid, game);
		}
		else
		{
			message.reply(`User <@${userid}> doesn't exist!`)
				.then(msg => msg.delete({ timeout: 2000 }))
				.then(() => message.delete().catch(err => console.log(err)));
			return;
		}
	});
};
