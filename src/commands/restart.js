exports.info =
{
	name: 'restart',
	value: 'Allows the owner of a game to reinitialize it.',
};

exports.run = async (client, message, args) =>
{
	const stop = require('./stopgame.js');
	const start = require('./creategame.js');

	stop.run(client, message, args);
	start.run(client, message, args);
};
