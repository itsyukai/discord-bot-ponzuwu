const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content[0] == "!") {
    switch (msg.content) {
      case "!help":
        msg.reply("LOL GOOD LUCK FOO");
        break;
      case "!ping":
        msg.reply("pong");
        break;
      case "!pong":
        msg.reply("ping");
        break;
      default:
        msg.reply("what do you want");
        break;
    }
  }
  //   if (msg.content === "ping") {
  //     msg.reply("pong");
  //   }
});

client.login(process.env.PONZUWU_TOKEN);
