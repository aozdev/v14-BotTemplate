const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "..", "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (event.once) {
      client.once(event.name, (...args) =>
        event.execute(client, ...args)
      );
    } else {
      client.on(event.name, (...args) =>
        event.execute(client, ...args)
      );
    }
  }

  console.log(`✅ Events loaded.`);
};
