module.exports = {
  name: "hi",
  aliases: ["henwo", "hewwo", "hello", "fucking kill me"],
  description: "Hello!",
  args: false,
  execute(message, args) {
    message.channel.send(`Hello, ${message.author}`);
  }
};
