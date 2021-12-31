const Logger = require('./logger');

const logger = new Logger('interactions');

const unhandledInteraction = async (interaction, dataType, data) => {
    logger.warn(`Unknown ${dataType}: ${data}`);
    await interaction.reply({
        content: "🚧 **Oops! Something's broken on our end, please try again later!** 🚧",
        ephemeral: true
    });
};

const handleCommandInteraction = async (commands, interaction) => {
    if (!interaction.isCommand()) return;
    logger.info(`New interaction of type ${interaction.type} with name ${interaction.commandName}`);
    const command = commands.get(interaction.commandName);
	if (!command) {
        unhandledInteraction(interaction, 'command', interaction.commandName);
        return;
    }
	try {
		await command.execute(interaction);
	} catch (error) {
		unhandledInteraction(interaction, 'error', error);
	}
};

const handleButtonInteraction = async (interaction) => {
    if (!interaction.isButton()) return;
    logger.info(`New interaction of type ${interaction.type} with customId ${interaction.customId}`);
    const buttonId = interaction.customId;
    switch (buttonId) {
        default:
            unhandledInteraction(interaction, 'button ID', buttonId);
            break;
    }
};

const handleSelectMenuInteraction = async (interaction) => {
    if (!interaction.isSelectMenu()) return;
    logger.info(`New interaction of type ${interaction.type} with customId ${interaction.customId}`);
    const menuId = interaction.customId;
    switch (menuId) {
        default:
            unhandledInteraction(interaction, 'menu ID', menuId);
            break;
    }
};

module.exports = { unhandledInteraction, handleCommandInteraction, handleButtonInteraction, handleSelectMenuInteraction };