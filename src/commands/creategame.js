const Game = require('../game.js');

exports.info =
{
	name: 'creategame',
	value: 'Creates a game in the channel or group DM, \nprovided there is no current game.',
};

exports.run = async (client, message, args) =>
{
	const channel = message.channel;

	// Allow group DMs! But don't allow singular DMs.
	if (channel.type === 'dm')
	{
		message.reply('You can\'t start a game in a private DM!');
		return;
	}

	if (client.sittingPlayers.has(message.author.id))
	{
		message.reply('You are already in a game!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	if (client.activeGames.has(channel))
	{
		message.reply('There is already a game running in this channel!')
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}

	const newgame = new Game(client, message);

	client.activeGames.set(channel.id, newgame);
	client.sittingPlayers.set(message.author.id, newgame);

	newgame.init();
};
