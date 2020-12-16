/* Triggered on every message.
 *
 */

const gameCmds =
	[
		'nominate',
		'invest',
		'execute',
		'accept',
		'decline',
	];

module.exports = async (client, message) =>
{
	if (message.content.startsWith(client.prefix) == false || message.author.bot) return;

	const playerID = message.author.id;
	const game = client.whatGame(playerID);
	const args = message.content
		.slice(client.prefix.length)
		.replace(/<[@#]?[&!]?([0-9]+)>/g, '\1')
		.trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (gameCmds.includes(command))
	{
		if (game == null)
		{
			message.reply(`${message.member.mention}, you are not in a game!`)
				.then(msg => msg.delete({ timeout: 2000 }))
				.then(() => message.delete().catch(err => console.log(err)));
			return;
		}
		message.delete();
		game.handle(command, args);
	}
	else
	{
		const cmd = client.commands.get(command);
		if (cmd)
		{
			cmd.run(client, message, args);
			return;
		}
		message.reply(`Unknown command '${command}'.`)
			.then(msg => msg.delete({ timeout: 2000 }))
			.then(() => message.delete().catch(err => console.log(err)));
		return;
	}
};
