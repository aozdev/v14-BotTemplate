const fs = require("fs");
const path = require("path");

module.exports = client => {
  const eventFiles = fs
    .readdirSync(path.join(__dirname, "../events"))
    .filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(__dirname, "../events", file));

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};
