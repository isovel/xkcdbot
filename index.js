require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const Logger = require('./logger');
const { handleCommandInteraction } = require('./interactions');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const logger = new Logger('client');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    logger.info('Instead of text, ready message contained bobcat.');
    logger.info('Would not buy again.');
});

client.on('interactionCreate', async interaction => handleCommandInteraction(client.commands, interaction));

client.login(process.env.TOKEN).then(() => logger.info(`Logged into the gateway as ${client.user.tag} with ID ${client.user.id}`));
