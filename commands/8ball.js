module.exports = {
  name: "8ball",
  aliases: ["8"],
  description: "Tells you how to live your life",
  usage: "8ball <yes or no question>",
  args: false,
  execute(message, args) {
    var roll = Math.floor(Math.random() * 20);

    const messages = [
      "As I see it, yes",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "It is certain",
      "It is decidely so",
      "Most likely",
      "My reply is no",
      "My sources say no",
      "Outlook good",
      "Outlook not so good",
      "Reply hazy try again",
      "Signs point to yes",
      "Very doubtful",
      "Without a doubt",
      "Yes",
      "Yes, definitely",
      "You may rely on it"
    ];
    if (args.length > 0) {
      var msg = "";
      for (var arg in args) {
        msg += args[arg] + " ";
      }
      msg.slice(0, -1);
      message.channel.send(`> ${msg}`);
    }
    message.channel.send(`${messages[roll]}`);
  }
};
