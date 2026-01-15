const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the bot and API latency'),
  
  async execute(interaction) {
    try {
      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
      
      const botLatency = sent.createdTimestamp - interaction.createdTimestamp;
      const apiLatency = Math.round(interaction.client.ws.ping);

      await interaction.editReply(
        `🏓 Pong!\n` +
        `Bot Latency: **${botLatency}ms**\n` +
        `API Latency: **${apiLatency}ms**`
      );
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ An error occurred!', ephemeral: true });
    }
  }
};
