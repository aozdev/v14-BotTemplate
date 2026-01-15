const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`✅ Bot ready: ${client.user.tag}`);

    client.user.setPresence({
      activities: [
        {
          name: "developed by aozdev",
          type: ActivityType.Playing 
        }
      ],
      status: "online"
    });
  }
};
