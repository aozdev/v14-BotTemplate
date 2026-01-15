const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (!command.data || !command.data.name) {
      console.log(`❌ Failed to load command: ${file}`);
      continue;
    }

    client.commands.set(command.data.name, command);
    console.log(`✅ Loaded command: ${command.data.name}`);
  }
};
