const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = require('./src/client.js');

// Command / event framework.

fs.readdir('./src/events/', (err, files) =>
{
	if (err) return console.error(err);
	files.forEach(file =>
	{
		if (!file.endsWith('.js')) return;
		const event = require(`./src/events/${file}`);
		const ename = file.split('.')[0];
		client.on(ename, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();
fs.readdir('./src/commands/', (err, files) =>
{
	if (err) return console.error(err);
	files.forEach(file =>
	{
		if (!file.endsWith('.js')) return;
		const props = require(`./src/commands/${file}`);
		const fname = file.split('.')[0];
		client.commands.set(fname, props);
	});
});

// Done scopes.
// Login.

client.login(client.token);
