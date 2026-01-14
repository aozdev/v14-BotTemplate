const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const connectMongo = require('./database/mongo');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

if (config.mongoURI && config.mongoURI.length > 0) {
  connectMongo(config.mongoURI);
}

client.login(config.token);
