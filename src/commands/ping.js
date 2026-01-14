const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Bot gecikmesini gösterir'),

  async execute(interaction) {
    const reply = await interaction.reply({ content: 'Pong!', fetchReply: true });
    const ms = reply.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply(`Pong! ${ms}ms`);
  }
};
