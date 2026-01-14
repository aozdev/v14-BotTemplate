const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
    client.commands.set(command.data.name, command);
  }
};
