/* Triggered once, when the client has successfully logged in.
 */
module.exports = async (client) =>
{
	console.log(`We are logged in as ${client.user.username}#${client.user.discriminator}!`);
	console.log(client);
};

