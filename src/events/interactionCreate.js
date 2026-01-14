module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'Bir hata oluştu.', ephemeral: true });
      } else {
        await interaction.reply({ content: 'Bir hata oluştu.', ephemeral: true });
      }
    }
  }
};
