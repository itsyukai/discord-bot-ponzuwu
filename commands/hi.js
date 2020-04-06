module.exports = {
  name: "hi",
  aliases: ["hello"],
  description: "Hello!",
  args: false,
  execute(message, args) {
    message.channel.send(`Hello, ${message.author}`);
  },
};
