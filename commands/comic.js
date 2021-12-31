const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('comic')
		.setDescription('placeholder')
        .addIntegerOption(option => option.setName('number').setDescription('placeholder').setRequired(true)),
		async execute(interaction) {
			await interaction.reply({
				content: `https://xkcd.com/${interaction.options.getInteger('number')}/`
			});
		}
};