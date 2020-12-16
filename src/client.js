const Discord = require ('discord.js');
const CONFIG = require ('../config.json');
const Game = require ('./game.js');

class MyClient extends Discord.Client
{
	constructor()
	{
		super();
		this.prefix = CONFIG.prefix;
		this.token = CONFIG.token;
		this.activeGames = new Map();
		this.sittingPlayers = new Map();
	}
	whatGame(playerID)
	{
		return this.sittingPlayers.has(playerID)
			? this.sittingPlayers.get(playerID)
			: null;
	}
}

module.exports = new MyClient();
