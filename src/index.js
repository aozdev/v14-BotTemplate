const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');
const connectMongo = require('./database/mongo');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

if (config.mongoURI && config.mongoURI.length > 0) {
connectMongo(config.mongoURI);
}

client.login(config.token);
