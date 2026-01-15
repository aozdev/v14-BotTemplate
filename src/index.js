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
const connectMongo = require("./database/mongo");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

/* Deploy slash commands */
async function deployCommands() {
  const commands = [];
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (!command.data) continue;
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  try {
    console.log("🔄 Deploying slash commands...");

    await rest.put(
      Routes.applicationCommands(config.clientId), 
      { body: commands }
    );

    console.log("✅ Slash commands deployed.");
  } catch (err) {
    console.error("❌ Deploy failed:", err);
  }
}

require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);


(async () => {
  await deployCommands();
  await client.login(config.token);
})();
