const { MessagePayload } = require('discord.js');

const Logger = require('./logger');
const { guilds } = require('./config.json');

const logger = new Logger('interactions');

const unhandledInteraction = async (interaction, dataType, data) => {
    logger.warn(`Unknown ${dataType}: ${data}`);
    await interaction.reply({
        content: "🚧 **Oops! Something's broken on our end, please try again later!** 🚧",
        ephemeral: true
    });
};

const handleCommandInteraction = async (interaction) => {
    logger.info(`New interaction of type ${interaction.type} with name ${interaction.commandName}`);
    switch (interaction.commandName) {
        default:
            unhandledInteraction(interaction, 'command', interaction.commandName);
            break;
    }
};

const handleButtonInteraction = async (interaction) => {
    logger.info(`New interaction of type ${interaction.type} with customId ${interaction.customId}`);
    const buttonId = interaction.customId;
    switch (buttonId) {
        default:
            unhandledInteraction(interaction, 'button ID', buttonId);
            break;
    }
};

const handleSelectMenuInteraction = async (interaction) => {
    logger.info(`New interaction of type ${interaction.type} with customId ${interaction.customId}`);
    const menuId = interaction.customId;
    switch (menuId) {
        default:
            unhandledInteraction(interaction, 'menu ID', menuId);
            break;
    }
};

module.exports = async (interaction) => {
    switch (interaction.type) {
        case 'APPLICATION_COMMAND':
            handleCommandInteraction(interaction);
            break;
        case 'MESSAGE_COMPONENT':
            interaction.isButton() && handleButtonInteraction(interaction);
            interaction.isSelectMenu() && handleSelectMenuInteraction(interaction);
            break;
        default:
            unhandledInteraction(interaction, 'interaction type', interaction.type);
            break;
    }
};
