const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

module.exports = async () => {
  const commands = [];
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
    if (!command.data) continue;
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  try {
    console.log("🔄 Deploying GLOBAL slash commands...");

    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands }
    );

    console.log("✅ Global slash commands deployed.");
  } catch (err) {
    console.error("❌ Deploy failed:", err);
  }
};
