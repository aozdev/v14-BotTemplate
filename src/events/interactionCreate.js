module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {

      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      // Handle errors gracefully
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "An error occurred while executing this command.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "An error occurred while executing this command.",
          ephemeral: true
        });
      }
    }
  }
};
