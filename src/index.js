const { 
  Client, 
  GatewayIntentBits, 
  Collection,
  REST,
  Routes
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const config = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

async function deployCommands() {
  const commands = [];
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  try {
    console.log("Started refreshing global application (/) commands.");

    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands }
    );

    console.log("🚀 Successfully reloaded global application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);

(async () => {
  await deployCommands();
  await client.login(config.token);
})();
