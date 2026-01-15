const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('typing')
        .setDescription('Shows the bot is typing in the channel'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        
        interaction.channel.sendTyping();

        await interaction.editReply({ content: 'Bot now typing in this channel' });
    },
};
