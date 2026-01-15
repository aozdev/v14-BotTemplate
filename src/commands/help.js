const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all available bot commands'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Bot Commands')
            .setColor('#5865f2')
            .addFields(
                { name: '/ping', value: 'Shows bot and API latency' },
                { name: '/eval', value: 'Evaluates JavaScript code (Developer only)' },
                { name: '/typing', value: 'Shows typing in the channel for 5 seconds' }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag} | ${interaction.client.user.username}` });

        await interaction.reply({ embeds: [embed] });
    }
};
