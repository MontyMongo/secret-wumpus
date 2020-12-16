# Installation
				
Download the source from [my repository](https://github.com/rsarvar1a/secret-wumpus):
```bash
gh repo clone rsarvar1a/secret-wumpus
cd secret-wumpus
```

Set up a `config.json` file in the project root. 
You can generate a bot token at the [Discord Developer API](https://discord.com/developers/applications).
**DO NOT COMMIT A TOKEN!** (The configuration file is already excluded in the `.gitignore`.)
```json5
{
	"prefix": "s-",
	"token": "<TOKEN>"
}
```

Install dependencies and run:
```bash
npm init
node .
```
